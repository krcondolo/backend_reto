const { Schema, model } = require('mongoose');

const LogsSchema = Schema({
  action: {
    type: String,
    required: true
  },
  descr: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('Logs', LogsSchema);