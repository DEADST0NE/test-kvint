import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const paramsSchema = new Schema({
  value: String,
});

export default Mongoose.model('params', paramsSchema);