export class Methods {
  find(items, product) {
    return items.find(
      item => JSON.stringify(item.product) === JSON.stringify(product),
    );
  }

  remove(items, product) {
    const index = items.findIndex(
      item => JSON.stringify(item.product) === JSON.stringify(product),
    );

    items.splice(index, 1);
  }
}
