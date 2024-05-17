const multer = require('multer');
const path = require('path');

// Configure storage options for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination directory for uploaded files
        cb(null, path.join(__dirname, '../../uploads/'));
    },
    filename: (req, file, cb) => {
        // Set the filename for uploaded files
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("Seuls les fichiers images sont autorisés !"), false);
    }
    cb(null, true);
};

// Limit file size to 7MB
const limits = {
    fileSize: 1024 * 1024 * 7 
};

// Create the multer upload middleware with the defined options
const upload = multer({ storage: storage, fileFilter: fileFilter, limits: limits });

module.exports = upload;
