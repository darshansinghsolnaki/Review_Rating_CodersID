const multer = require('multer')
const path = require("path")

// img storage path 
const imgconfig = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "..", "/uploads/"));
    },
    filename: (req, file, callback) => {
        callback(null, `Image_${Date.now()}.${file.originalname}`)
    },
});


const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(new Error("only image is allowed"))
    }
};


const upload = multer({
    storage: imgconfig,
    fileFilter: isImage
})


module.exports = {
    upload,
}