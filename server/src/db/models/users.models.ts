import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  catalogue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalogue',
  }
});

const User = mongoose.model("User", userSchema);

export { User }