import { readFile } from "fs/promises";
import { prompt } from "./prompt.js";
import { magicFixFile } from "./magicFixFile.js";
import chalk from "chalk";

await run();

async function run() {
  let testResults = runTests();
  //let isPassing = areTestResultsPassing(testResults);

  //const filesToFix = await parseTestResults(testResults);
  const filesToFix = ["Order.ts"];
  console.log("PASSING", testResults.success);
  while (testResults.success === false) {
    console.log(chalk.bold("Tests failing. Details:"));
    console.log(
      "```\n",
      chalk.italic.dim(testResults.details.slice(0, 150)),
      "\n```\n"
    );

    if (testResults.success) {
      return;
    }

    for (const file of filesToFix) {
      await magicFixFile(file, testResults.details);
    }

    console.log(chalk.bold("Running tests again...\n"));
    testResults = runTests();
    if (testResults.success) {
      console.log(chalk.green.bold("All tests are passing!"));
    } else {
      console.log(chalk.red.bold("Tests are still failing. Retrying...\n"));
    }

    return;
  }
}

function runTests() {
  const proc = Bun.spawnSync(["bun", "wiptest"], {});
  //const text = proc?.stdout?.toString();
  // console.log("response:::::", proc?.stderr?.toString());
  // console.log("DONE~");
  return {
    success: proc?.success,
    details: proc?.stderr?.toString() || "",
  };

  // const proc = Bun.spawn(["bun", "test"], {});
  // //console.log("success", proc.success);
  // const text = await new Response(proc.stdout).text();
  // const text2 = await new Response(proc.stderr).text();
  // const text2 = await new Response(proc.stderr).text();
  // console.log("response:", proc., text, text2);
  // console.log("done:");
  // return text || "";
}

function areTestResultsPassing(testResults: string) {
  return testResults.includes("0 fail");
}

async function parseTestResults(testResults: string): Promise<string[]> {
  // Extract the failing test name and files to modify
  const response = await prompt([
    {
      role: "system",
      content:
        "You simple agent who simply replaced with a list of files e.g., -[FILEONE].ts\n- [FILE2].ts\n\n If you have already provided the list, just reply again.",
    },
    {
      role: "user",
      content: `
      List the files are likely to be causing the test failures:

      ----
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
       15 | test("Order calculates total", () => {
       16 |   const order = new Order();
       17 |
       18 |   expect(order.getTotal()).toBe(0);
       19 |   order.addLineItem(testLineItem);
       20 |   expect(order.getTotal()).toBe(10);
             ^
       error: expect(received).toBe(expected)

       Expected: 10
       Received: 0

             at /Users/dion/Projects/codeai/Order.test.ts:20:2
       ✗ Order calculates total

        0 pass
        2 fail
        4 expect() calls
       Ran 2 tests across 1 files [10.00ms]`,
    },
    {
      role: "assistant",
      content: "- Order.ts",
    },
    {
      role: "user",
      content:
        `List the files are likely to be causing the test failures:

      ----\n` + testResults,
    },
  ]);

  return response ? response.split("\n ") : [];
}
