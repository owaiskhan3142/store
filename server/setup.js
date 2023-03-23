import { MongoClient, ServerApiVersion } from 'mongodb'
import items from './items.js'

const client = new MongoClient(
  'mongodb://meee:meeepass@ac-ide0yu1-shard-00-00.0nygasv.mongodb.net:27017,ac-ide0yu1-shard-00-01.0nygasv.mongodb.net:27017,ac-ide0yu1-shard-00-02.0nygasv.mongodb.net:27017/?ssl=true&replicaSet=atlas-dvcbcl-shard-0&authSource=admin&retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1, }
)
await client.connect()
const db = client.db('Coursework-1-Indvidual')

// setup data in mongo db
try {
  await db.dropCollection('items')
  await db.dropCollection('orders')
}
catch { }

await db.collection('items').insertMany(items)
console.log(await db.collection('items').find().toArray());
process.exit();
