const axios = require('axios')
  
// Make request
let country='Oceania'
axios.get(`https://jsonmock.hackerrank.com/api/countries?name=${country}`)
  
  // Show response data
  .then(res => {
    console.log(res.data.data[0])
    if(!res.data.length)
    {
        console.log("-1")
    }
    else
    {
        // console.log(res.data.data[0].capital)
    }
  })
  .catch(err => console.log(err))