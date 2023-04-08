import { readFile } from "fs/promises";
import { prompt } from "./prompt.js";
import chalk from "chalk";
import { readFileSync, writeFileSync } from "fs";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

export async function magicFixFile(filePath: string, testResults: string) {
  console.log(
    chalk.yellowBright.bold("✨ Attempting to fix file: ", filePath, "\n")
  );
  const fileContent = readFileSync(filePath, { encoding: "utf-8" });

  //console.log("```\n", chalk.italic.dim(fileContent.slice(0, 130)), "\n```\n");

  //await wait(6000);

  const rawFile = await prompt([
    ...promptMessages,
    {
      role: "user",
      content: `Test results: \n \`\`\`\n${testResults}\n\`\`\` \n Here is the suspected file: \n\n \`\`\`\n${fileContent}\n\`\`\` \n`,
    },
  ]);

  const newFile = rawFile?.replace(/```/g, "");

  // Write file
  writeFileSync(filePath, newFile || "");
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const promptMessages: ChatCompletionRequestMessage[] = [
  {
    role: "system",
    content: "You are an expert typescript programming assistant",
  },
  {
    role: "user",
    content:
      "I will give you the results of a unit test run and the suspected file that is causing the failed test. You will only reply with the content of the fixed file",
  },
  {
    role: "assistant",
    content:
      "Yes. I will only answer with the content of the fixed file when presented with the test results and suspected file.",
  },
  {
    role: "user",
    content: `Test results:
\`\`\`
Order.test.ts:
 7 | test("Order can add products", () => {
 8 |   const order = new Order();
 9 | 
10 |   expect(order.getLineItems()).toStrictEqual([]);
11 |   order.addLineItem(testLineItem);
12 |   expect(order.getLineItems()).toStrictEqual([testLineItem]);
      ^
error: expect(received).toStrictEqual(expected)

+ []
- [
-   {
-     "id": 1,
-     "product": {
-       "id": 1,
-       "name": "Product 1",
-       "price": 10
-     },
-     "quantity": 1
-   }
- ]

- Expected  - 11
+ Received  + 1

      at /Users/dion/Projects/codeai/Order.test.ts:12:2
✗ Order can add products

 0 pass
 1 fail
 2 expect() calls
Ran 1 tests across 1 files [24.00ms]
\`\`\`
Here is the suspected file:

\`\`\`
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

  constructor(id?: number) {
    this.id = id;
  }

  async load() {}

  setLineItems(lineItems: LineItem[]) {
    this.lineItems = lineItems;
  }

  addLineItem(lineItem: LineItem) {}

  getLineItems() {
    return this.lineItems;
  }

  getTotal() {
    return this.lineItems.reduce((total, lineItem) => {
      return total + lineItem.product?.price || 0;
    }, 0);
  }
}
\`\`\`
`,
  },
  {
    role: "assistant",
    content: `
      \`\`\`
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
      }
      \`\`\`
      `,
  },
];
