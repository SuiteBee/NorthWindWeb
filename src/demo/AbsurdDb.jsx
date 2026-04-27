import init, { Database } from "@npiesco/absurder-sql";
import fs from "fs";

class AbsurdDb {

    async query(queryString) {
        let db = null;

        try {
            // Initialize WASM
            await init();

            db = await Database.newDatabase("northwind.db");

            const buffer = await fs.readFile("./Northwind_data.sqlite");
            const toLoad = new Uint8Array(buffer);

            await db.importFromFile(toLoad);
            db = await Database.newDatabase("northwind.db");
        } catch (e) {
            console.error("Error loading DB:", e);
        }

        try {
            const result = await db.execute(queryString);
            const data = JSON.parse(result);
            return data;
        } catch (e) {
            console.error("Error querying DB:", e);
        } finally {
            await db.close();
        }
    }

}

export const DB = new AbsurdDb();