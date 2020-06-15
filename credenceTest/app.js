//Include the required modules...
'use strict';
const axios = require('axios');
const fs = require('fs');
const path = require('path');

//Specify the details of the request in the config object
const config = {
    responseType: 'stream',
    data:{}
}
let url = 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22';
const Path = path.resolve(__dirname,'downloads','weather.json');

async function getJson(){
    //let res = await axios.get(url, config);
    return axios.get(url, {config} )
                .then(response => {
                    //Download JSON from internet with the provided API
                    fs.writeFile(Path, JSON.stringify(response.data), (err)=>{
                        if(err) throw err;
                        console.log('File has been saved')
                    });
                   
                    return response.data
                })
                .catch(error =>{
                    console.log(error);
                });
}

module.exports = getJson();

