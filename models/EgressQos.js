const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EgressSchema = new Schema(
  {
    policyName: {
      type: String,
      required: true,
    },
    policy: {
      type: String,
      required: true,
    },
    aggCir: {
      type: String,
    },
    aggPir: {
      type: String,
    },
  },
  { collection: 'egressQos' }
);

module.exports = mongoose.model('EgressQos', EgressSchema);
