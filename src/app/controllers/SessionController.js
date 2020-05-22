import * as Yup from 'yup';
import authConfig from '../../config/authConfig';
import jwt from 'jsonwebtoken';

import User from '../models/Users';

class SessionController{
  async store(req,res){
    const schema = Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().required(),
    });

    if(!(await schema.isValid(req.body))){
        return res.status(400).json({error: 'Validation fails'});
    }

    const {email, password} = req.body;

    const user = await User.findOne({where: {email}});

    if(!user){
      return res.status(401).json({error: 'User not found'})
    }

    if(!user.checkPassword(password)){
      return res.status(401).json({error: 'Password does not match'})
    }

    const {id, name} = user;

    const token = jwt.sign(
      {id},
      authConfig.secret,
      {expiresIn: authConfig.expiresIn}
    );

    return res.json({
      user: {
        id,
        name,
        email
      },
      token: token
    });
  }
}

export default new SessionController();
