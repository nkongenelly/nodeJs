//import app.js file
const jsonData = require("./app");
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const Path = path.resolve(__dirname,'downloads','report.html');

jsonData.then(data => {
    //Create array of values to be looped in the table
    var tables = [
        {"name":"City", "value":data.name},
        {"name":"Weather", "value": data.weather[0].main },
        {"name":"Description", "value": data.weather[0].description },
        {"name":"Current Temperature", "value": data.main.temp },
        {"name":"Maximum Temperature", "value": data.main.temp_max },
        {"name":"Minimum Temperature", "value": data.main.temp_min },
        {"name":"Pressure", "value": data.main.pressure },
        {"name":"Humidity", "value": data.main.humidity },
        {"name":"Visibility", "value": data.visibility }
    ]
    //create the HTML template
    var source1 = "<!DOCTYPE html><html><body><table border='1' cellspacing='0'>"+
                    "{{#each tables}}<tr><td>{{name}}</td><td>{{value}}</td></tr>{{/each}}"+ 
                    "</table></body></html>";
    var prefix =  "{{#each tables}}<tr><td>{{name}}</td><td>{{value}}</td></tr>{{/each}}"
    try{
        //register partials
        handlebars.registerPartial('myPartial',prefix);
        var template = handlebars.compile(source1)

        var result = template({tables: tables})
    }
    catch (error){
        console.log(error)
    }
    
    //save the html report file in the defined path
    fs.writeFile(Path, result, (err)=>{
        if(err) throw err;
        console.log('HTML file has been created')
    });
})
// app.listen(5000);
