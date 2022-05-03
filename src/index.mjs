import { check, purge } from "./db.mjs";
import { program } from "commander";
import pkg from "./package.mjs";

program
  .name(pkg.name)
  .description(pkg.description)
  .version(pkg.version)
  .option("-p, --purge", "purge all measurements")
  .option("-c, --check", "check that the measurements file exists")
  .parse(process.argv);

const options = program.opts();

if (options.purge) {
  await purge();
}

if (options.check) {
  await check();
}
