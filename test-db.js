const mongoose = require('mongoose');

async function test() {
  await mongoose.connect("mongodb+srv://admin:Lumberjack11!@cluster0.hft4x.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0");
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log(collections.map(c => c.name));
  process.exit(0);
}
test();
