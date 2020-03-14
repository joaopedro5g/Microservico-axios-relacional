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
                code: 'P-1'
            }
        })
    }
}

app.get('/list',middleware,(req,res)=>{
    let posts = [
        {_id: '5erhere5wehrwebbfb',_v:0,title: 'Using express with microservices',description: 'Hello my name is João pedro am say from Brazil and my year is 16 old so..... is this',postOwner: '5erensnsfweinefiwi'},
        {_id: '5erhere5wehrwebbfb',_v:0,title: 'Using express with microservices',description: 'Hello my name is João pedro am say from Brazil and my year is 16 old so..... is this',postOwner: '5eekfmwkeweafakmfm'},
    ];
    posts.map(async (post,i)=>{
        const response = await axios({
            url: 'http://localhost:3000/users/'+post.postOwner,
            method: 'GET'
        });
        posts[i].postOwner = response.data;
    });
    setTimeout(()=>{
        return res.json(posts);
    },800);
});

app.listen(3334);