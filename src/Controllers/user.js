import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import userModule from '../Models/User/user.js';
import userAchievementModule from '../Models/Achievement/userAchievement.js';
import appError from '../Errors/appError.js';

const createJwt = (id, email, role, name, lastName) => {
  return jwt.sign({ id, email, role, name, lastName }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class User {
  async signup({ body: { name, lastName, email, password, role } }, res, next) {
    try {
      if (!email || !password) {
        next(appError.badRequest('Empty email or password'));
      }
      const candidate = await userModule.getOne({ where: { email } });
      if (candidate) {
        return next(appError.badRequest('Email already registered'));
      }
      const hash = await bcrypt.hash(password, 5);
      const user = await userModule.create({ name, lastName, email, password: hash, role });
      await userAchievementModule.create({
        achievementId: 1,
        userId: user.id,
        isAchieved: true,
      });
      return res.status(200).json({ message: 'Signed Up successfully' });
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async login({ body: { email, password } }, res, next) {
    try {
      const user = await userModule.getOne({ where: { email } });
      if (!user) {
        next(appError.notFound('User not found'));
      }
      let compare = bcrypt.compareSync(password, user.password);
      if (!compare) {
        next(appError.badRequest('Wrong email or password'));
      }
      if (user.blocked) {
        next(appError.forbidden('Your account is blocked'));
      }
      const token = createJwt(user.id, user.email, user.role, user.name, user.lastName);
      return res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json({ id: user.id, name: user.name, role: user.role, token: token });
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async logout(req, res) {
    return res.status(200).cookie('access_token', 'none').json({ message: 'deleted' });
  }

  async check(req, res) {
    return res.status(200).json({
      id: req.user.id,
      role: req.user.role,
      name: req.user.name,
    });
  }

  async getAll(req, res, next) {
    try {
      const users = await userModule.getAll();
      if (!users) {
        next(appError.notFound('Users does not exist'));
      }
      res.status(200).json(users);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async getById(req, res, next) {
    try {
      if (!req.params.id) {
        next(appError.badRequest('Id was not set'));
      }
      const user = await userModule.getOne({ where: { id: req.params.id } });
      if (!user) {
        next(appError.notFound('Selected user does not exist'));
      }
      if (user.id !== req.user.id) {
        next(appError.forbidden('You does not have access for this account'));
      }
      res.status(200).json(user);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const user = await userModule.create(req.body);
      res.status(201).json(user);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async update(req, res, next) {
    try {
      let user = await userModule.getById(req.params.id);
      if (!user) {
        next(appError.notFound('User not found'));
      }
      await userModule.update({ userId: user.id, photo: req.body.photo });
      user = await userModule.getById(req.params.id);
      return res.status(200).json(user);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async block(req, res, next) {
    try {
      let user = await userModule.getById(req.params.id);
      if (!user) {
        return next(appError.notFound('User not found'));
      }
      await userModule.update({ userId: user.id, blocked: req.body.blocked });
      user = await userModule.getById(req.params.id);
      return res.status(200).json(user);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        next(appError.badRequest('Id was not set'));
      }
      const user = await userModule.delete(req.params.id);
      if (!user) {
        next(appError.notFound('Selected user does not exist'));
      }
      res.status(200).json(user);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
}

export default new User();
