const fs = require('fs')
const request = require('request')
const mp3z = require('./sensient')

mp3z.map( (mp3, i) =>{

  request
    .get(mp3)
    .on('response', function(response) {
      console.log(response) // 200 
      // console.log(response.headers['content-type']) // 'image/png' 
      // const links = $('.download a')
      // links.map(el => console.log(links[el].href))
    })
    .on('error', function(err) {
      // handle error
    })
    .pipe(fs.createWriteStream(i+'.mp3'));

} )