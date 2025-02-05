import { Schema, model } from 'mongoose';

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
});

itemSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default model('Item', itemSchema);
