import { Request, Response } from 'express';
import db, { Admin } from '../database';
import jwt from 'jsonwebtoken';

export default class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await db<Admin>('admin')
        .where({
          username,
          password,
        })
        .select();

      if (user[0]) {
        const token = jwt.sign(
          { username },
          process.env.JWT_SECRET as string
        );
        return res.status(200).send({ token });
      }
      return res.status(401).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  }
}