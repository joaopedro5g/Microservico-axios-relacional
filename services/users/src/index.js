import express from 'express';
import axios from 'axios';

const app = express();

function middleware(req,res,next){
    if(req.headers.allow === 'gateway') {
        next();
    } else {
        res.json({
            error: {
                message:'Not authenticator for this action',
                code: 'U-1'
            }
        })
    }
}

app.get('/list',middleware,(req,res)=>{
    let users = [
        {_id: '5erensnsfweinefiwi',_v:0,name: 'João Pedro',age: 16},
        {_id: '5eekfmwkeweafakmfm',_v:0,name: 'Willian',age: 32},
    ];
    return res.json(users);
});

app.get('/:id',middleware,(req,res)=>{
    const { id } = req.params;
    let users = [
        {_id: '5erensnsfweinefiwi',_v:0,name: 'João Pedro',age: 16},
        {_id: '5eekfmwkeweafakmfm',_v:0,name: 'Willian',age: 32},
    ];
    const user = users.find((element)=> element._id === id);
    return res.json(user);s
});

app.listen(3335);