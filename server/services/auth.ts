import argon2 from 'argon2';
import { randomBytes } from 'crypto';

import { UserModel } from '../models/user';

import jwt from 'jsonwebtoken'

export default class AuthService {
  constructor(){}

  public async Login(email, password): Promise<any> {
    const userRecord = await UserModel.findOne({ email });
    if (!userRecord) {
      throw new Error('User not found')
    } else {
      const correctPassword = await argon2.verify(userRecord.password, password);
      if (!correctPassword) {
        throw new Error('Incorrect password')
      }
    }

    return {
      user: {
        email: userRecord.email,
        name: userRecord.name,
      },
      token: this.generateJWT(userRecord),
    }
  }

  public async LoginAs(email): Promise<any> {
    const userRecord = await UserModel.findOne({ email });
    console.log('Finding user record...');
    if (!userRecord) {
      throw new Error('User not found');
    }
    return {
      user: {
        email: userRecord.email,
        name: userRecord.name,
      },
      token: this.generateJWT(userRecord),
    }
  }

  public async SignUp(email, password, name): Promise<any> {
    const salt = randomBytes(32);
    const passwordHashed = await argon2.hash(password, { salt });

    const userRecord = await UserModel.create({
      password: passwordHashed,
      email,
      salt: salt.toString('hex'),
      name,
    });
    const token = this.generateJWT(userRecord);
    return {
      user: {
        email: userRecord.email,
        name: userRecord.name,
      },
      token,
    }

  }

  private generateJWT(user) {

    return jwt.sign({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    }, 'MySuP3R_z3kr3t.', { expiresIn: '6h' });
  }

}