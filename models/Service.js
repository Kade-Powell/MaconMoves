const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceVarSchema = new Schema({
  deviceType: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  sdp1: {
    type: String,
  },
  sdp2: {
    type: String,
  },
  //terminating specific fields
  isTerminating: {
    type: Boolean,
    required: true,
  },
  terminatingPort: {
    type: String,
  },
  isMcLag: {
    type: Boolean,
  },
  icbSdp: {
    type: String,
  },
  vlan: {
    type: String,
  },
  classOfService: {
    type: String,
  },
  ingressQos: {
    type: String,
  },
  egressQos: {
    type: String,
  },
});

const ServiceSchema = new Schema(
  {
    //generic info
    market: {
      type: String,
      required: true,
    },
    neonProjectId: {
      type: String,
      required: true,
      unique: true,
    },
    circuitId: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    secondServiceId: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    deviceVars: [DeviceVarSchema],
  },
  { collection: 'services' }
);

module.exports = mongoose.model('Service', ServiceSchema);
