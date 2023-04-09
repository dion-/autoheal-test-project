import { test, expect } from "bun:test";
import { Order, Product, LineItem } from "./Order.js";

const testProduct = new Product(1, "Product 1", 10);
const testLineItem = new LineItem(1, testProduct, 1);

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
