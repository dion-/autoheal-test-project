import { test, expect } from "bun:test";
import { Customer } from "./Customer.js";

test("Customer set customer name", () => {
  const customer = new Customer();

  expect(customer.name).toBeUndefined();
  customer.setName("John Doe");
  expect(customer.name).toBe("John Doe");
});

test("Customer set sms and email marketing optin", () => {
  const customer = new Customer();

  expect(customer.smsOptin).toBe(false);
  expect(customer.emailOptin).toBe(false);
  customer.setMarketingOptin(true, true);
  expect(customer.smsOptin).toBe(true);
  expect(customer.emailOptin).toBe(true);
});
