const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const url="http://www.omdbapi.com/?apikey=8730e0e&'";
const app = express();


var cache={};
app.use(morgan('dev'));
app.get('/', (req, res)=> {
    let MovieKey = req.url;

    if(cache[MovieKey]){
        console.log('Getting movie from cache');
        return res.json(cache[MovieKey]);
    } else {
        console.log("getting movie from OMDB...", MovieKey);
        return axios.get('http://www.omdbapi.com'+ MovieKey + '&apikey=8730e0e').then(response => {
            let MovieData=response.data;
            console.log('We got the Movie data');
            cache[MovieKey]=MovieData;
            return res.json(MovieData);
        }).catch(err =>{
            console.log(err);
            return res.json("Error")
        })
    

    }

});

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;