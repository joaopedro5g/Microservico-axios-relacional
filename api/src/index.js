import express from 'express';
import axios from 'axios';

import service from './JSON/service';

const app = express();

let request = 0;

function requestCapture(req,res,next) {
    request++;
    next();
}

app.get('/',(req,res)=>{
    return res.send("Welcome to Application with Microservices");
});

app.get('/users/list',requestCapture,async (req,res)=>{
    let url;
    service.services.map(async service =>{
        if(service.name === 'Users') {
            url = service.url;
        }
    });
    axios({
        url:url+'/list',
        method: 'GET',
        headers: {
            allow: 'gateway'
        }
    }).then((response)=>{
        if(response.data.error) {
            console.log("Error in microservice 'Post' please check application log now");
            return res.json({error: 'Error in list posts sorry'});
        }
        return res.json(response.data);
    }).catch((err)=>{
        if(err) console.log(err);
    });
});

app.get('/users/:id',requestCapture,async (req,res)=>{
    const { id } = req.params;
    let url;
    service.services.map(async service =>{
        if(service.name === 'Users') {
            url = service.url;
        }
    });
    axios({
        url:url+'/'+id,
        method: 'GET',
        headers: {
            allow: 'gateway'
        }
    }).then((response)=>{
        if(response.data.error) {
            console.log("Error in microservice 'Post' please check application log now");
            return res.json({error: 'Error in list posts sorry'});
        }
        return res.json(response.data);
    }).catch((err)=>{
        if(err) console.log(err);
    });
});

app.get('/posts/list',requestCapture,(req,res)=>{
    let url;
    service.services.map(async service =>{
        if(service.name === 'Posts') {
            url = service.url;
        }
    });
    axios({
        url:url+'/list',
        method: 'GET',
        headers: {
            allow: 'gateway'
        }
    }).then((response)=>{
        if(response.data.error) {
            console.log("Error in microservice 'Post' please check application log now");
            return res.json({error: 'Error in list posts sorry'});
        }
        return res.json(response.data);
    }).catch((err)=>{
        if(err) console.log(err);
    });
});

app.get('/request',(req,res)=>{
    return res.json({request})
});

app.listen(3000);