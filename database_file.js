import express from "express";
import fs from "fs";
import path from "path"
import multer from "multer";

import { pool, storage, fileFilter, response } from "./config.js"

var database_file = express.Router();

const dir_name = 'C:\\Project\\Postman\\uploads'
const upload = multer({ storage: storage, fileFilter: fileFilter });

// middleware that is specific to this router 
database_file.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// http:///localhost:9493/database_file/test
database_file.get('/test', async (req, res) => {
    console.log('Hello Database file');
    res.json( response.success( '200', 'OK', '1') );
});

// http://localhost:9493/database_file/post/song
database_file.get('/post/:author', async (req, res) => {
    const promisePool = pool.promise();
    const [rows, fields] = await promisePool.query
    (
        `SELECT * FROM post WHERE author = '${req.params.author}'`
    );
    
    console.log(rows);
    res.json(rows);
});

// http://localhost:9493/database_file/comment_detail/1
database_file.get('/comment_detail/:postnum', async (req, res) => {
    const promisePool = pool.promise();
    const [rows, fields] = await promisePool.query
    (
        `SELECT * FROM comment WHERE postnum = '${req.params.postnum}'`
    );

    console.log(rows);
    res.json(rows);
});

// http://localhost:9493/database_file/comment_count/1
database_file.get('/comment_count/:postnum', async (req, res) => {
    const promisePool = pool.promise();
    const [rows, fields] = await promisePool.query
    (
        `SELECT COUNT(CASE WHEN postnum = '${req.params.postnum}' THEN 1 END) AS \`count\` from comment`
    );

    console.log(rows);
    res.json(rows);
});

// http://localhost:9493/database_file/attachments/1
database_file.get('/attachments/:postnum', async (req, res) => {
    const promisePool = pool.promise();
    const [rows, fields] = await promisePool.query
    (
        `SELECT * FROM attachments WHERE postnum = '${req.params.postnum}'`
    );

    console.log(rows);
    res.json(rows);
});

/*
// http://localhost:9493/database_user/query_string?id=song&code=200
database_user.get('/query_string', (req, res) => {
    res.send( req.query.id + ' ' + req.query.code );
});
*/

// http://localhost:9493/database_file/download2?path=C:\\Project\\Postman\\uploads\\test1.jpg
database_file.get('/download2', (req, res) => {
    read_dir();
    var location = path.normalize(req.query.path);

    if (fs.existsSync(location)) {
        res.sendFile( location, (err) => {
            if( err ) {
                console.log( err );
            } else {
                console.log('Send image');                
            }
        })
    }
    else {
        console.err('File not exist');
        res.end('Error');
    }
});

// http://localhost:9493/database_file/download/C:\\Project\\Postman\\uploads\\test1.jpg
database_file.get('/download/:path', (req, res) => {
    read_dir();
    var location = path.normalize(req.params.path);

    if (fs.existsSync(location)) {
        res.sendFile( location, (err) => {
            if( err ) {
                console.log( err );
            } else {
                console.log('Send image');                
            }
        })
    }
    else {
        console.err('File not exist');
        res.end('Error');
    }
});

// http://localhost:9493/database_file/upload
database_file.post('/upload', upload.array('photo', 10), function (req, res) {
    console.log(req.file);
    console.log(req.fields.date);
    res.end('Get file');
});

function read_dir() {
    fs.readdir(path.normalize(dir_name), (err, data) => {
        // console.log('path sep :', path.sep, 'path delimiter :', path.delimiter);
        console.log('find directory :', path.normalize(dir_name));
        if (err) {
            console.log(err);
        }
        else {
            data.forEach((name, cnt) => {
                console.log(cnt, ':', name);
            });
        }
    });
}

export {database_file};