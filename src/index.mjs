#!/usr/bin/env node

import os from "os";
import { program } from "commander";
import window from "window-size";
import { check, list, purge, record } from "./db.mjs";
import pkg from "./package.mjs";
import { render } from "./chart.mjs";

const getTerminalWidth = () => window.get().width;

const print = async () => {
  const measurements = await list();
  const values = measurements.map(({ value }) => value);

  if (values.length > 0) {
    render(values, { width: getTerminalWidth() });
  } else {
    console.log("No measurements found");
  }
};

program
  .name(pkg.name)
  .description(pkg.description)
  .version(pkg.version)
  .option("-p, --purge", "purge all measurements")
  .option("-c, --check", "check that the measurements file exists")
  .option("-l, --lines", "count lines received on STDIN as the metric")
  .option("-p, --print", "print all recorded measurements")
  .parse(process.argv);

process.stdin.setEncoding("utf8");

const options = program.opts();

if (options.purge) {
  await purge();
}

if (options.check) {
  await check();
}

if (options.lines) {
  let count = 0;
  process.stdin.on("readable", () => {
    const chunk = process.stdin.read();

    if (chunk !== null) {
      count += chunk.split(os.EOL).length;

      process.stdout.write(Buffer.from(chunk));
    }
  });

  process.stdin.on("end", async () => {
    await record(count);
    const hr = "─".repeat(getTerminalWidth());
    console.log(
      `${os.EOL}${hr}${os.EOL}Latest measurement: ${count} lines${os.EOL}`
    );

    if (options.print) {
      await print();
    }

    process.exit(0);
  });
}

if (!options.lines && options.print) {
  await print();
}
