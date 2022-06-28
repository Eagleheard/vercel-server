import userModule from './index.js';

class User {
  getAll() {
    return userModule.findAll({
      order: [['id', 'ASC']],
    });
  }

  getById(id) {
    return userModule.findByPk(id);
  }

  getOne(data) {
    return userModule.findOne(data);
  }

  create(data) {
    return userModule.create(data);
  }

  update(options) {
    return userModule.update(options, {
      where: {
        id: options.userId,
      },
    });
  }

  async delete(id) {
    const user = await userModule.findByPk(id);
    await user.destroy();
    return user;
  }
}

export default new User();
