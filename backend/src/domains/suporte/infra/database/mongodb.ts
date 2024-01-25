import * as mongoDB from "mongodb";

export class MongoDB {
    url: string;
    database!: string
    collection!: string

    constructor(url: string) {
        this.url = url
    }

    protected async getCollection(database: string, collection: string): Promise<mongoDB.Collection> {
        this.database = database
        this.collection = collection

        const client: mongoDB.MongoClient = new mongoDB.MongoClient(this.url)
        
        await client.connect();

        const db: mongoDB.Db = client.db(database);
  
        return db.collection(collection);     
    }
}