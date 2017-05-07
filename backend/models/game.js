import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gameSchema = Schema({
  title: String,
  company: String,
  price: String,
  year: String,
  cover: String
}, {collection: 'games'});

export default mongoose.model('games', gameSchema);
