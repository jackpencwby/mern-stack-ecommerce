const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./files/ProductImages");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + `.${file.originalname.split(".")[1]}`);
    }
});

const upload = multer({ storage: storage }).single("image");

module.exports = upload;