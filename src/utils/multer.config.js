const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("Seuls les fichiers images sont autorisés !"), false);
    }
    cb(null, true);
};

const limits = {
    fileSize: 1024 * 1024 * 7 
};

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: limits });

module.exports = upload;
