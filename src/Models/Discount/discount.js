import { Discount as discountModule } from '../Discount/index.js';

class Discount {
  create(data) {
    return discountModule.create(data);
  }

  getAll() {
    return discountModule.findAll();
  }

  getOne(discountId) {
    return discountModule.findByPk(discountId);
  }

  delete(discountId) {
    return discountModule.destroy({
      where: {
        id: discountId,
      },
    });
  }

  deleteAll() {
    return discountModule.destroy({
      where: {},
    });
  }
}

export default new Discount();
