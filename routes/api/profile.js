const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const multer = require('multer');
const path = require('path');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

//Set multer storage engine
const storage = multer.diskStorage({
  destination: 'client/src/uploads/avatars/',
  filename: function (req, file, cb) {
    cb(null, req.user.id + path.extname(file.originalname));
  },
});
//init upload variable
const upload = multer({
  storage: storage,
}).single('avatar');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

//@route    GET api/profile/me
//@desc     get profile for user id in token
//@access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    //if there is a profile
    res.json(profile);
  } catch (err) {
    console.error(err.messge);
    res.status(500).send('Server Error');
  }
});

//@route    POST api/profile/
//@desc     creae or update profile for user
//@access   Private
router.post(
  '/',
  [
    auth,
    [
      check('coxtitle', 'Current Title is Required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      coxtitle,
      skills,
      youtube,
      twitter,
      facebook,
      instagram,
      linkedin,
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (coxtitle) profileFields.coxtitle = coxtitle;
    if (skills) {
      profileFields.skills = skills
        .toString()
        .split(',')
        .map((skill) => skill.trim());
    }
    //build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //create if not found
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    POST api/profile/avatar
//@desc     create or update profile avatar for user
//@access   Private
router.post('/avatar', auth, async (req, res) => {
  try {
    upload(req, res, async () => {
      //find profile to add avatar to
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { avatar: req.file.path },
          { new: true }
        );
        console.log(profile);
        return res.json(profile);
      }

      //get upset if not found
      if (!profile) {
        res.status(403).send('You need a profile before uploading an avatar');
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/profile/
//@desc     Get all profiles
//@access   Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/profile/user/:user_id
//@desc     Get profile by user ID
//@access   Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route    DELETE api/profile
//@desc     DELETE profile, user & posts
//@access   Private
router.delete('/', auth, async (req, res) => {
  try {
    //remove users post when deleted
    await Post.deleteMany({ user: req.user.id });

    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    PUT api/profile/experience
//@desc     Add profle experience
//@access   Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      //unshift pushes onto the front so most recent gets put first instead of push()
      profile.experience.unshift(newExp);
      //await the save so we dont have to use .then() promise syntax
      await profile.save();
      //return the whole object
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    DELETE api/profile/experience/:exp_id
//@desc     DELETE a profle experience
//@access   Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    PUT api/profile/education
//@desc     Add profle education
//@access   Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      //unshift pushes onto the front so most recent gets put first instead of push()
      profile.education.unshift(newEdu);
      //await the save so we dont have to use .then() promise syntax
      await profile.save();
      //return the whole object
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    DELETE api/profile/education/:edu_id
//@desc     DELETE a profle education
//@access   Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/profile/github/:username
//@desc     GET users repos from github
//@access   Public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github Profile Found' });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
