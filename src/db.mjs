import path from "path";
import os from "os";
import fs from "fs";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const DB_FILENAME = path.join(os.homedir(), ".memorial.db");

const METRICS_TABLE = "metrics";

// open the database
export const db = await open({
  filename: DB_FILENAME,
  driver: sqlite3.Database,
});

// ensure the metrics table exists
await db.exec(
  `CREATE TABLE IF NOT EXISTS ${METRICS_TABLE} (id INTEGER PRIMARY KEY AUTOINCREMENT, value INT)`
);

export const purge = () => db.exec(`DELETE FROM ${METRICS_TABLE}`);

export const check = async () => {
  const tables = await db.all(
    `SELECT name FROM sqlite_schema WHERE type='table' ORDER BY name`
  );

  if (tables.find(({ name }) => name === METRICS_TABLE)) {
    console.log(`👍 ${METRICS_TABLE} exists`);
  }
};

export const record = async (value) => {
  await db.run(`INSERT INTO ${METRICS_TABLE}(value) VALUES (?)`, value);
};

export const list = async () => {
  const rows = await db.all(
    `SELECT id, value FROM ${METRICS_TABLE} ORDER BY id`
  );
  return rows;
};
