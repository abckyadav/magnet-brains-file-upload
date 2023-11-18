const path = require("path");
const multer = require('multer');


// require 2 things destination where the file upload and filename what file need to upload
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "../uploads"));
        // callback(error, path)
    },
    filename: function (req, file, callback) {
        const uniquePrefix = Date.now() + Math.random().toString();
        callback(null, `${ uniquePrefix } ${file.originalname}`);
    },
});

function fileFilter (req, file, callback) {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
  
    
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
          // To accept the file pass `true`, like so:
        callback(null, true)  
    } else {
        // To reject this file pass `false`, like so:
        callback(null, false)
    }
}

// created middleware

    
  const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024*1024*5,
        
    },
  })
    

  const uploadUser = (fileKey) => {
    return function (req, res, next) {//handelling middleware
        const uploadItem = upload.single(fileKey);
        uploadItem(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(500).send(err.message)
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(500).send(err.message)
        }
        // Everything went fine.
         next();
    })
}
};

const uploadGallery = (fileKey) => {
    return function (req, res, next) {//handelling middleware
        const uploadItem = upload.any(fileKey);
        uploadItem(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(500).send(err.message)
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(501).send(err.message)
        }
        // Everything went fine.
         next();
    })
}
};

module.exports= {upload, uploadUser, uploadGallery}