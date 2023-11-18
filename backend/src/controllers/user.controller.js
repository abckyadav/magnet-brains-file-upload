const path = require("path");

const express = require("express");

const { upload, uploadUser, uploadGallery } = require("../middlewares/file-upload");

const { User}= require("../models/user.model");

const router = express.Router();
// for single file uploading
// uploadSingle("profile_pic") = calling a function as a middleware and passing argument - handeling
router.post("/profile", uploadUser("profile_pic"), async (req, res) => {
    try {
      const user = await User.create({
        first_name:req.body.first_name ,
        last_name:req.body.last_name,
        profile_pic: req.file.path,
        //give path to the profile_pic on the postman
     });

      return res.send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
});
 
// for multiple file uploading
router.post("/gallery", uploadGallery("profile_pic") ,async (req, res) => {
  try {
    // for multiple we can give res.file.path istead of that we can give
    const filePaths = req.files.map(file => file.path)
    const user = await User.create({
      first_name:req.body.first_name ,
      last_name:req.body.last_name,
      profile_pic: filePaths,
      //give path to the profile_pic on the postman
   });

    return res.send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// users
router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.send({ users });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
