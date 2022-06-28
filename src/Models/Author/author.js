import { Author as authorModule } from './index.js';

class Author {
  getAll() {
    return authorModule.findAll({
      order: [['id', 'ASC']],
    });
  }

  getById(id) {
    return authorModule.findByPk(id);
  }

  getOne({ name }) {
    return authorModule.findOne({
      where: {
        name,
      },
    });
  }

  create(data) {
    return authorModule.create({ ...data });
  }

  update({ authorId, name, location, description, popularity }) {
    const options = {};
    if (name) {
      options.name = name;
    }
    if (location) {
      options.location = location;
    }
    if (description) {
      options.description = description;
    }
    if (popularity) {
      options.popularity = popularity;
    }
    return authorModule.update(options, { where: { id: authorId } });
  }

  delete(id) {
    return authorModule.destroy({
      where: {
        id,
      },
    });
  }
}

export default new Author();
