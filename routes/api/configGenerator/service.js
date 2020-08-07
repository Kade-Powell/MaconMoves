//this file will handle creation of project, and returning of project information
const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Service = require('../../../models/Service');

///API to add a project
//@route    POST api/serviceConfigurator/service
//@desc     Create a Service
//@access   Private
router.post(
  '/',
  [
    auth,
    [
      check('market', 'market is required').not().isEmpty(),
      check('neonProjectId', 'neonProjectId is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //create json array of obj to insert into service object
      deviceVarArray = [];
      req.body.deviceVars.forEach((element) => {
        deviceVarArray.push({
          deviceType: element.deviceType,
          ipAddress: element.ipAddress,
          sdp1: element.sdp1,
          sdp2: element.sdp2,
          isTerminating: element.isTerminating,
          terminatingPort: element.terminatingPort,
          isMcLag: element.isMcLag,
          icbSdp: element.icbSdp,
          vlan: element.vlan,
          classOfService: element.classOfService,
          ingressQos: element.ingressQos,
          egressQos: element.egressQos,
        });
      });

      //create new service object
      const newService = new Service({
        market: req.body.market,
        neonProjectId: req.body.neonProjectId,
        circuitId: req.body.circuitId,
        serviceType: req.body.serviceType,
        serviceId: req.body.serviceId,
        secondServiceId: req.body.secondServiceId,
        customerName: req.body.customerName,
        customerId: req.body.customerId,

        deviceVars: deviceVarArray,
      });

      const service = await newService.save();

      res.json(service);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
//to delete

//to update

//generate config

//ssh to eq and drop configs

//get sdps

module.exports = router;
