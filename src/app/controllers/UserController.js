import * as Yup from 'yup';
import Users from '../models/Users';
import bcrypt from 'bcryptjs';

class UserController{
  async index(req, res){
    const users = await Users.findAll({
      attributes: {exclude: ['password_hash']}
    });
    return res.status(200).json(users);
  }

  async get(req, res){

  }

  async store(req, res){
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
      password_confirmation: Yup.string().required().oneOf([Yup.ref('password')]),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'});
    }

    const {name, email} = req.body;
    const password_hash = bcrypt.hashSync(req.body.password, 8);

    if(await Users.findOne({where: {email: email}}))
      return res.status(400).json({error: 'Email in use'});

    const user = await Users.create({
      name: name,
      email: email,
      password_hash: password_hash
    });

    return res.status(200).json({name, email});
  }

  async update(req, res){
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().min(6).when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      )
    })

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'});
    }

    const {email, oldPassword} = req.body;

    const user = await Users.findByPk(req.params.userId);

    if (email && email != user.email) {
      const userExists = await Users.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already Exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  }

  async delete(req, res){
    const schema = Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'});
    }

    const user = await Users.findByPk(req.params.userId);

    if(!user){
      return res.status(401).json({error: 'User not found'})
    }

    const {email, password} = req.body;

    if (password && !(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.destroy();

    return res.status(200).json({success: 'User deleted'});
  }
}

export default new UserController();
