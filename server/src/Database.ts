import _sqlite3, { Database } from 'sqlite3';
import fs from 'fs/promises';
import { constants } from 'fs';
import path from 'path';
import camelcaseKeys from 'camelcase-keys';

// Let's get stack traces.
const sqlite3 = _sqlite3.verbose();

// An example of the singleton design pattern where the database is lazily
// initialized. A good place to think about eager versus lazy and performance
// in large applications.
export class DB {
  private static instance: Database | null;
  private static readonly DB_PATH: string = 'app.db';
  private static hasInitialized: boolean;
  private static memo: Map<string, string> = new Map();

  private constructor() {
    /* no op */
  }

  private static async exists(): Promise<boolean> {
    try {
      await fs.access(DB.DB_PATH, constants.F_OK);
      return true;
    } catch (err) {
      return false;
    }
  }

  private static async cleanupDB(): Promise<void> {}

  private static async initializeDB(): Promise<Database> {
    const existsAlready = await DB.exists();
    const db = new sqlite3.Database(DB.DB_PATH);

    if (!existsAlready && !this.hasInitialized) {
      // We can do this because TypeScript is single-threaded and guaranteed
      // not to put us back into a wait queue if we don't await.
      DB.hasInitialized = true;

      // Build a database with the commands in sql/schema.sql
      const schema = await slurp('schema');
      return new Promise((resolve, reject) =>
        db.exec(schema, err => {
          if (err) {
            reject(err);
          } else {
            resolve(db);
          }
        }),
      );
    }

    return db;
  }

  private static async getDB(): Promise<Database> {
    if (!this.instance) {
      this.instance = await this.initializeDB();
      this.cleanupDB();
    }

    return this.instance;
  }

  // This is casual memoization. It's a little racy.
  public static async runQuery(path: string, ...args: any[]): Promise<any[]> {
    let query: string;
    const hasQuery = DB.memo.get(path);
    if (hasQuery) {
      query = hasQuery;
    } else {
      query = await slurp(path);
      this.memo.set(path, query);
    }

    const db = await this.getDB();
    // Here, we have a callback that expects two arguments (resolve and
    // reject), both of which are themselves callbacks.
    return new Promise((resolve, reject) => {
      db.all(query, args, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map(r => camelcaseKeys(r)));
        }
      });
    });
  }
}

async function slurp(sqlFile: string): Promise<string> {
  const buf = await fs.readFile(path.join('src', 'sql', `${sqlFile}.sql`));
  return buf.toString('utf8');
}
