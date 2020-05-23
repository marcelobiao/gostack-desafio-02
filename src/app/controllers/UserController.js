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

  }

  async delete(req, res){

  }
}

export default new UserController();
