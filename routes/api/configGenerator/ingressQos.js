const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator');

const IngressQos = require('../../../models/IngressQos');

//@route    GET api/configGenerator/ingressQos/
//@desc     GET All Qos
//@access   Private
router.get('/', async (req, res) => {
  try {
    const policy = await IngressQos.find();

    res.status(200).json(policy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/configGenerator/ingressQos/:eqType
//@desc     Gets Ingress Qos Policy eq type in the name
//@access   Private
router.get('/:eqType', async (req, res) => {
  try {
    if (req.params.eqType.includes('7210K')) {
      req.params.eqType = '7210K';
    }
    if (req.params.eqType.includes('7210M')) {
      req.params.eqType = '7210M';
    }
    console.log(req.params.eqType);
    const policy = await IngressQos.find({
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
      return res.status(404).json({ msg: 'Policy not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route    GET api/configGenerator/ingressQos/:eqType/:cos
//@desc     Gets Ingress Qos Policy by eq type in the name and the COS from the name
//@access   Private
router.get('/:eqType/:cos', async (req, res) => {
  try {
    if (req.params.eqType.includes('7210K')) {
      req.params.eqType = '7210K';
    }
    if (req.params.eqType.includes('7210M')) {
      req.params.eqType = '7210M';
    }
    const policy = await IngressQos.find({
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
      return res.status(404).json({ msg: 'Policy not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route    GET api/configGenerator/ingressQos/:eqType/:cos/:qos
//@desc     Gets Ingress Qos Policy by eq type,cos, and qos from the name
//@access   Private
router.get('/:eqType/:cos/:qos', async (req, res) => {
  if (req.params.eqType.includes('7210K')) {
    req.params.eqType = '7210K';
  }

  try {
   
    const policy = await IngressQos.find({
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
      return res.status(404).json({ msg: 'Policy not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
