const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator');

const EgressQos = require('../../../models/EgressQos');

//@route    GET api/configGenerator/egressQos/
//@desc     GET All Qos
//@access   Private
router.get('/', auth, async (req, res) => {
  if (req.params.eqType.includes('7210K')) {
    req.params.eqType = '7210K';
  }
  try {
    const policy = await EgressQos.find();

    res.status(200).json(policy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/configGenerator/egressQos/:eqType
//@desc     Gets Egress Qos Policy eq type in the name
//@access   Private
router.get('/:eqType', auth, async (req, res) => {
  if (req.params.eqType.includes('7210K')) {
    req.params.eqType = '7210K';
  }
  if (req.params.eqType === '7210M') {
    return res.status(404).json({
      msg: 'EQ type 7210M has no egress policies',
    });
  }
  try {
    console.log(req.params.eqType);
    const policy = await EgressQos.find({
      policyName: { $regex: `.*${req.params.eqType}.*` },
    });

    if (policy.length == 0) {
      return res.status(404).json({
        msg: 'QOS Policy Not Found, Please Check Your Query Parameters',
      });
    }

    res.json(policy);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'QOS Policy Not Found, Please Check Your Query Parameters',
      });
    }
    res.status(500).send('Server Error');
  }
});

//@route    GET api/configGenerator/egressQos/:eqType/:cos
//@desc     Gets Ingress Qos Policy by eq type in the name and the COS from the name
//@access   Private
router.get('/:eqType/:cos', auth, async (req, res) => {
  try {
    if (req.params.eqType.includes('7210K')) {
      req.params.eqType = '7210K';
    }
    if (req.params.eqType === '7210M') {
      return res.status(404).json({
        msg: 'EQ type 7210M has no egress policies',
      });
    }
    const policy = await EgressQos.find({
      policyName: { $regex: `.*${req.params.eqType}.*${req.params.cos}.*` },
    });

    if (policy.length === 0) {
      return res.status(404).json({
        msg: 'QOS Policy Not Found, Please Check Your Query Parameters',
      });
    }

    res.json(policy);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'QOS Policy Not Found, Please Check Your Query Parameters',
      });
    }
    res.status(500).send('Server Error');
  }
});

//@route    GET api/configGenerator/egressQos/:eqType/:cos/:qos
//@desc     Gets Ingress Qos Policy by eq type,cos, and qos from the name
//@access   Private
router.get('/:eqType/:cos/:qos', auth, async (req, res) => {
  if (req.params.eqType.includes('7210K')) {
    req.params.eqType = '7210K';
  }
  try {
    const policy = await EgressQos.find({
      policyName: {
        $regex: `.*${req.params.eqType}.* ${req.params.qos} .*${req.params.cos}.*`,
      },
    });

    if (policy.length == 0) {
      return res.status(404).json({
        msg: 'QOS Policy Not Found, Please Check Your Query Parameters',
      });
    }

    res.json(policy);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'QOS Policy Not Found, Please Check Your Query Parameters',
      });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
