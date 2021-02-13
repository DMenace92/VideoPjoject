let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "video/mp4" || file.mimetype == "video/AVI") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only mp4 and avi format allowed!'));
        }
    }
});

// User model
let Video = require('../modules/video.js');

router.post('/video', upload.single('uploadVid'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const video = new Video({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        uploadVid: url + '/public/' + req.file.filename
    });
    video.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            videoCreated: {
                _id: result._id,
                uploadVid: result.uploadVid
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

// router.get("/", (req, res, next) => {
//     User.find().then(data => {
//         res.status(200).json({
//             message: "User list retrieved successfully!",
//             users: data
//         });
//     });
// });

module.exports = router;