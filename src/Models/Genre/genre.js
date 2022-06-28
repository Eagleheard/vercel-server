import { Genre as genreModule } from './index.js';

class Genre {
  getAll() {
    return genreModule.findAll();
  }

  getById(id) {
    return genreModule.findByPk(id);
  }

  getOne({ name }) {
    return genreModule.findOne({
      where: {
        name,
      },
    });
  }

  create(data) {
    return genreModule.create(data);
  }

  async update(id, data) {
    const genre = await genreModule.findByPk(id);
    await genre.update(data);
    return genre;
  }

  async delete(id) {
    const genre = await genreModule.findByPk(id);
    await genre.destroy();
    return genre;
  }
}

export default new Genre();
