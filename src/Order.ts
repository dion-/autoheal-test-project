export class Customer {}

export class Product {
  id: number;
  name: string;
  price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

export class LineItem {
  id?: number;
  product: Product;
  quantity: number;

  constructor(id: number, product: Product, quantity: number) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
  }
}

export class Order {
  id?: number;
  customer?: Customer;
  private lineItems: LineItem[] = [];
  private note: string = "";

  constructor(id?: number) {
    this.id = id;
  }

  async load() {}

  setLineItems(lineItems: LineItem[]) {
    this.lineItems = lineItems;
  }

  addLineItem(lineItem: LineItem) {
    this.lineItems.push(lineItem);
  }

  getLineItems() {
    return this.lineItems;
  }

  getTotal() {
    return this.lineItems.reduce((total, lineItem) => {
      return total + (lineItem.product?.price || 0) * lineItem.quantity;
    }, 0);
  }

  getNote() {
    return this.note;
  }

  setNote(newNote: string) {}
}
