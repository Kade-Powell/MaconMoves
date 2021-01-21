const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngressSchema = new Schema(
  {
    policyName: {
      type: String,
      required: true,
    },
    policy: {
      type: String,
      required: true,
    },
    aggRate: {
      type: String,
      required: true,
    },
    burst: {
      type: String,
      required: true,
    },
  },
  { collection: 'ingressQos' }
);

module.exports = IngressQos = mongoose.model('IngressQos', IngressSchema);
