import express from "express";
import { pool, response } from "./config.js"

var database_user = express.Router();
 
// middleware that is specific to this router 
// database_user.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// });

// http:///localhost:9493/database_user/test
database_user.get('/test', async (req, res) => {
    console.log('Hello Database User');
    res.json( response.success( '200', 'OK', '1') );
});

// http:///localhost:9493/database_user/login
database_user.post('/login', async (req, res) => {
    const promisePool = pool.promise();
    const [rows, fields] = await promisePool.query(
        `SELECT id FROM user WHERE id LIKE '${req.body.id}' AND pw LIKE '${req.body.pw}'`);
    console.log(rows);

    if ( rows[0] ) {
        console.log(`Welcome, ${req.body.id}`);
        res.send('1');
    }
    else {        
        console.log('Please, check your information')
        res.send('0');
    }
});

// http:///localhost:9493/database_user/signup
database_user.post('/signup', async (req, res) => {
    const promisePool = pool.promise();
    const [rows, fields] = await promisePool.query(`SELECT id FROM user WHERE id LIKE '${req.body.id}'`);
    console.log(rows);

    if ( rows[0] ) {
        console.log('Already registered.');
        console.log(`id : ${rows[0].id}`);
        res.send('0');
    }
    else {
        console.log("You can register.");
        const [rows2, fields2] = await promisePool.query
        (`INSERT INTO client.user(id,pw,email,name) 
        VALUES ('${req.body.id}', '${req.body.pw}','${req.body.email}', '${req.body.name}')`);
        res.send('1');
    }
});

database_user.post('/edit_profile', async (req, res) => {
    const promisePool = pool.promise();
    const [rows, fields] = await promisePool.query
    (`UPDATE user SET pw='${req.body.pw}', pw='${req.body.email}', name='${req.body.name}' WHERE id='${req.body.id}'`);
    res.send('1');;
});

database_user.post('/withdraw', async (req, res) => {
    const promisePool = pool.promise();
    const [rows, fields] = await promisePool.query
    (`UPDATE user SET withdraw='${req.body.withdraw}' where id='${req.body.id}'`);
    res.send('1');
});

database_user.post('/delete', async (req, res) => {
    const promisePool = pool.promise();
    const [rows, fields] = await promisePool.query
    (`DELETE FROM user WHERE id='${req.body.id}'`);
    res.send('1');
});

export {database_user};