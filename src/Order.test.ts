import { test, expect } from "bun:test";
import { Product } from "./Product.js";
import { Order, LineItem } from "./Order.js";
import { Customer } from "./Customer.js";
import { Location } from "./Location.js";

const testProduct1 = new Product(
  1,
  "Product 1",
  10
);
const testProduct2 = new Product(
  1,
  "Product 2",
  5
);
const item1 = new LineItem(testProduct2, 1);
const item2 = new LineItem(testProduct2, 2);

test("Order can add products", () => {
  const order = new Order();

  expect(order.getLineItems()).toStrictEqual([]);
  order.addLineItem(item1);
  expect(order.getLineItems()).toStrictEqual([
    item1,
  ]);
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

test("Order set location", () => {
  const order = new Order();
  const customer = new Location(
    "Location 1",
    "Address 1"
  );

  expect(order.getLocation()).toBeUndefined();
  order.setLocation(customer);
  expect(order.getLocation()).toBe(customer);
});
