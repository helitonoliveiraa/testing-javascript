import { Methods, calculateDiscount } from '../utils';

import Dinero from 'dinero.js';

const Money = Dinero;

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

export class Cart {
  methods = new Methods();
  items = [];

  getTotal() {
    return this.items.reduce((acc, { product, condition, quantity }) => {
      const amount = Money({ amount: product.price * quantity });
      let discount = Money({ amount: 0 });

      if (condition) {
        discount = calculateDiscount({
          amount,
          quantity,
          condition,
        });
      }

      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }

  add(item) {
    if (this.methods.find(this.items, item.product)) {
      this.methods.remove(this.items, item.product);
    }

    this.items.push(item);
  }

  remove(item) {
    this.methods.remove(this.items, item);
  }

  summary() {
    const total = this.getTotal();
    const summary = {
      total: total,
      formatted: total.toFormat('$0,0.00'),
      items: this.items,
    };

    return summary;
  }

  checkout() {
    const { items, total } = this.summary();

    this.items = [];

    return {
      items,
      total,
    };
  }
}
