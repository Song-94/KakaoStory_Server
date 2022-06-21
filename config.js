import multer from "multer";
import mysql from "mysql2";

const response = {
    success : (status, message, data) => {
        return {
            status  : status,
            success : true,
            message : message,
            data    : data
        }
    },
    fail    : (status, message) => {
        return {
            status  : status,
            success : fail,
            message : message
        }
    }
}

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '0215',
    database: 'client',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
        console.log(`file count : '${Object.keys(req.body).length}'`);
        console.log(`file date  : '${req.body.date}'`);
    },
});

const fileFilter = (req, file, cb) => {
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
};

export{ pool, storage, fileFilter, response };