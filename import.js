//1. Csv data to JSON
// my first ...good...thought was to use a custom stream in a node js and then use piping
//read through Node Steam docs :/ surprisingly not terrible

//Below code manually does csv to json string 
// var Transform = require('stream').Transform

// //you can use npm's csv-streamify ...in theory
// var csv = require('csv-streamify')
// var JSONStream = require('JSONStream');

// //set objestMode to true so we get an object and not a string
// var csvToJson = csv({objectMode: true});

// //simple parser function 
// //throw err; "unhandled error event --f" objectMode insnt set to TRUE!!)
// var parser = new Transform({objectMode: true});
// parser._transform = function(data, encoding, done) {
//   this.push({row: data});
//   done();
// };

// //stdout needs strings so send json to strings
// var jsonToStrings = JSONStream.stringify(false);

// //piping 
// //calling pipe method to send data to a writable
// //run functions
// process.stdin
// .pipe(csvToJson)
// .pipe(parser)
// .pipe(jsonToStrings)
// .pipe(process.stdout);


////expect a csv file to be turned into arrays
// //Yay it works how I expected it to work!

 // //cat sample_customers.csv | node parser

//1. Lets just use the csvtojson coverter (See above code if you would)
//2. POST request
var util = require('util')
var https = require("https");
var request = require("request");
var Converter = require("csvtojson").Converter;
var converter = new Converter({});

converter.on("end_parsed", function (jsonArray) {

  var options = {
    host: 'zzz-madelinebagby.desk.com',
    //Just a heads up...Its a sample customers csv file...not cases
    json: true,
    path: '/api/v2/customers',
    method: 'POST',
    auth: 'MadelineBagbyDev@gmail.com:Madeline15',
    headers: {"content-type": "application/json"}
 };

    var post = https.request(options, function(res){
      res.setEncoding('utf8');
      res.on('data', function(chunk){
        console.log('Response:' + chunk);
      });
  });

  //POST THE DATA
     json = JSON.stringify(jsonArray)//.replace(/\\n/g, "\\n")
    //                                   .replace(/\\'/g, "\\'")
    //                                   .replace(/\\"/g, '\\"')
    //                                   .replace(/\\&/g, "\\&")
    //                                   .replace(/\\r/g, "\\r")
    //                                   .replace(/\\t/g, "\\t")
    //                                   .replace(/\\b/g, "\\b")
    //                                   .replace(/\\f/g, "\\f")
    // json= json.replace(json[0], "'")
    //           .replace(json[json.length-1], "'")

    // console.log(json);
  post.write(json);
  post.end();

});

// '{"first_name":"John","last_name":"Doe"}'


require("fs").createReadStream("./sample_customers.csv").pipe(converter);
//just used the given csv file 










