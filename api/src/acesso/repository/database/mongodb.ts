import * as mongoDB from "mongodb";
import {IMongoDB} from "../interfaces/Imongodb"

export class MongoDB implements IMongoDB{
    url: string;
    database: string;
    collection: string

    constructor(url: string) {
        this.url = url
    }

    async getCollection(database: string, collection: string): Promise<mongoDB.Collection> {
        this.database = database
        this.collection = collection

        const client: mongoDB.MongoClient = new mongoDB.MongoClient(this.url)
        
        await client.connect();

        const db: mongoDB.Db = client.db(database);
  
        return db.collection(collection);     
    }
}