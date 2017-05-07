import express from 'express';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';
import schema from './graphql';
import path from 'path';

const app = express();

mongoose.connect('mongodb://localhost:27017/sample');
const db = mongoose.connection;
db.on('error', () => console.log('Error connecting mongodb'))
.once('open', () => console.log('Successfully connected to DB'));

/* app.get('/',function(req,res){
  console.log(path.join(__dirname, '../public', '/index.html'));
  res.sendFile(path.join(__dirname, '../public', '/index.html'));
}); */

app.get('/', (req, res) => {
  res.send('Welcome to graphl server');
})

app.use('/graphql', graphqlHTTP(() => ({
  schema,
  graphiql: true,
  pretty: true
})))

app.listen(8080, () => {
  console.log('Graphql server is started');
})
