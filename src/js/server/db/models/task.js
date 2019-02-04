const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Task', taskSchema)
