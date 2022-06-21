import express from "express";
import { database_user } from "./database_user.js" // express modularity by using Router.
import { database_file } from "./database_file.js" // express modularity by using Router.
import { response } from "./config.js"

const app = express();

app.use(express.json());
app.use('/database_user', database_user); // access http://localhost:9493/database_user
app.use('/database_file', database_file); // access http://localhost:9493/database_file
//app.use('/uploads', express.static('uploads'));

app.listen(9493, () => {
    console.log('Server Start');
});

// http://127.0.0.1:9493
app.get('', function (req, res) { // (request, response)
    console.log('Hello Main');
    res.json( response.success( '200', 'OK', '1') );
});

app.post('', (req, res) => {
    console.log('Hello Post');
    res.end('Hi'); // send message.
});

/* // Query Test.
function Table_Show() {
    pool.query("select * from user", (err, rows, fields) => {
        console.log(rows);
     });
}

async function Table_Show2() {
    const promisePool = pool.promise();
    const [rows,fields] = await promisePool.query("select * from user");
    console.log(rows);
}

Table_Show();
Table_Show2();

*/

/* // Query Test2.
app.post('/signup.', async (req, res) => {
    const promisePool = pool.promise();

    let id = req.body.id;
    let pw = req.body.pw;
    let email = req.body.email;
    let name = req.body.name;

    pool.query(`SELECT id FROM user WHERE id LIKE '${req.body.id}'`, 
    (err, rows, fields) => {
        if( rows ) {
            console.log( "Already registered.");
            console.log(`id : ${rows[0].id} ${id}`);
            console.log(`pass : ${rows[0].pw} ${pw}`);
            console.log(`email : ${rows[0].email} ${email}`);
            console.log(`name : ${rows[0].name} ${name}`);
        }
        else {
            console.log("You can register.");
        }
    })
    res.end('sign up');
});
*/
