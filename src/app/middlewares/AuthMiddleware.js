import jwt from 'jsonwebtoken';
import {promisify} from 'util';

import authConfig from '../../config/authConfig';


export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({error: 'Token, not provided'});
  }

  const [, token] = authHeader.split(' ');

  try{
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.body.user_id = decoded.id;
    next();
  }catch(err){
    return res.status(401).json({error: 'Token invalid'});
  }
}
