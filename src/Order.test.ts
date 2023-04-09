import { test, expect } from "bun:test";
import { Product } from "./Product.js";
import { Order, LineItem } from "./Order.js";
import { Customer } from "./Customer.js";

const testProduct = new Product(1, "Product 1", 10);
const testLineItem = new LineItem(testProduct, 1);

test("Order can add products", () => {
  const order = new Order();

  expect(order.getLineItems()).toStrictEqual([]);
  order.addLineItem(testLineItem);
  expect(order.getLineItems()).toStrictEqual([testLineItem]);
});

test("Order calculates total", () => {
  const order = new Order();

  expect(order.getTotal()).toBe(0);
  order.addLineItem(testLineItem);
  expect(order.getTotal()).toBe(10);
  expect(order.getLineItems()).toStrictEqual([testLineItem]);
});

test("Order set note", () => {
  const order = new Order();

  expect(order.getNote()).toBe("");
  order.setNote("This is a note");
  expect(order.getNote()).toBe("This is a note");
});

test("Order set customer", () => {
  const order = new Order();
  const customer = new Customer();

  expect(order.getCustomer()).toBeUndefined();
  order.setCustomer(customer);
  expect(order.getCustomer()).toBe(customer);
});
