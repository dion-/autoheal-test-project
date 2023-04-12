import { Customer } from "./Customer.js";
import { Product } from "./Product.js";
import { Location } from "./Location.js";

export class LineItem {
  id?: number;
  product: Product;
  quantity: number;

  constructor(product: Product, quantity: number, id?: number) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
  }
}

export class Order {
  id?: number;
  private customer?: Customer;
  private lineItems: LineItem[] = [];
  private note: string = "";
  private location?: Location;

  constructor(id?: number) {
    this.id = id;
  }

  getLineItems() {
    return this.lineItems;
  }

  addLineItem(lineItem: LineItem) {
    this.lineItems.push(lineItem);
  }

  getTotal() {
    return this.lineItems.reduce((total, lineItem) => {
      return lineItem.product.price + total;
    }, 0);
  }

  getNote() {
    return this.note;
  }

  setNote(note: string) {
    this.note = note;
  }

  getCustomer() {
    return this.customer;
  }

  setCustomer(customer: Customer) {
    this.customer = customer;
  }

  getLocation() {
    return this.location;
  }

  setLocation(location: Location) {
    this.location = location;
  }

  reset() {
    this.lineItems = [];
  }
}
