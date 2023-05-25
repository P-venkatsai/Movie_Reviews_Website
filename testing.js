let getcurrentmovie=(callback)=>
{
    let timegcm=new Date()
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            callback(true,timegcm)
        }
        else if(e.target.readyState==4)
        {
          callback(false,timegcm)
        }
    })
    ////console.log(x)
    req.open("GET",`https://young-headland-05683.herokuapp.com/movies/${497582}`)
    req.send()
}
let createnewmovie=(callback)=>
{
    let timecnm=new Date()
  const req=new XMLHttpRequest()
  let params=
 {
    _id:498572,
     movie_name:`bro`
 }
  req.addEventListener("readystatechange",(e)=>
  {
      if(e.target.readyState==4&&e.target.status==200)
      {
          callback(true,timecnm)
      }
      else if(e.target.readyState==4&&(e.target.status==500||e.target.status==401))
      {
          callback(true,timecnm)
      }
      else if(e.target.readyState==4)
      {
          callback(false)          
      }
  })
  req.open("POST",`https://young-headland-05683.herokuapp.com/movies/newmovie`,true)
  req.setRequestHeader('Content-type','application/json')
  req.send(JSON.stringify(params))
}
let verifyuser=(callback)=>
{
    let timevu=new Date()
    const req=new XMLHttpRequest()
  req.addEventListener('readystatechange',(e)=>
  {
     if(e.target.readyState==4&&e.target.status==200)
     {
         callback(true,timevu)
     }
     else if(e.target.readyState==4&&(e.target.status==401||e.target.status==500))
     {
         callback(true,timevu)
     }
     else if(e.target.readyState==4)
     {
         callback(false,timevu)
     }
  }) 
  req.open("GET",`https://young-headland-05683.herokuapp.com/users/verifyuser`)
 let token=localStorage.getItem("token")
 req.setRequestHeader('Authorization',`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc1ZTRlZTBmMjMyZDA1ODgzN2MxYTYiLCJpYXQiOjE2MDE1NjIxNjksImV4cCI6MTYwMTU2NTc2OX0.NTdWuCRIY7l6deMToWWhJ9T6Y88Aq1HY2DZkLij6wrY`)
  req.send()
}
let getsimilarmovies=(callback)=>
{
    let timegsm=new Date()
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
      if(e.target.readyState==4&&e.target.status==200)
      {
          callback(true,timegsm)
      }
      else if(e.target.readyState==4&&(e.target.status==500||e.target.status==401))
      {
          callback(true,timegsm)
      }
      else if(e.target.readyState==4)
      {
          callback(false,timegsm)          
      }
    })
    req.open("GET",`https://api.themoviedb.org/3/movie/${498572}/similar?api_key=cf326b43d46977051bba81ac584f6377&page=1`)
    req.send();
}
function getpopularmovies(callback)
{
    let time=new Date()
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
      if(e.target.readyState==4&&e.target.status==200)
      {
          callback(true,time)
      }
      else if(e.target.readyState==4)
      {
          callback(false,time)          
      }
    })
    req.open("GET",`https://api.themoviedb.org/3/discover/movie?api_key=cf326b43d46977051bba81ac584f6377&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
    req.send()
}
function setyoutubetrailer(callback)
{
    let timesyt=new Date()
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
      if(e.target.readyState==4&&e.target.status==200)
      {
          callback(true,timesyt)
      }
      else if(e.target.readyState==4&&(e.target.status==500||e.target.status==401))
      {
          callback(true,timesyt)
      }
      else if(e.target.readyState==4)
      {
          callback(false)          
      }
    })
    req.open("GET",`https://www.googleapis.com/youtube/v3/search/?key=AIzaSyAYXjziSGTWaV-AlA7PJh6i6HOrFcOlHuM&q=bahubali-trailer`);
    req.send()
}
let getmoviecast=(callback)=>
{
    let timegemc=new Date()
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
      if(e.target.readyState==4&&e.target.status==200)
      {
          callback(true,timegemc)
      }
      else if(e.target.readyState==4&&(e.target.status==500||e.target.status==401))
      {
          callback(true,timegemc)
      }
      else if(e.target.readyState==4)
      {
          callback(false)          
      }
    })
    req.open("GET",`https://api.themoviedb.org/3/movie/${498572}/credits?api_key=cf326b43d46977051bba81ac584f6377`)
     req.send()
}
let movieinfo=(callback)=>
{
    let timemi=new Date()
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
      if(e.target.readyState==4&&e.target.status==200)
      {
          callback(true,timemi)
      }
      else if(e.target.readyState==4&&(e.target.status==500||e.target.status==401))
      {
          callback(true,timemi)
      }
      else if(e.target.readyState==4)
      {
          callback(false)          
      }
    })
    req.open("GET",`https://api.themoviedb.org/3/movie/${498572}?api_key=cf326b43d46977051bba81ac584f6377`);
    req.send()
}
let checkemailpresent=(callback)=>
{
    let timecepp=new Date()
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            let d=JSON.parse(e.target.responseText);
            callback(true,timecepp)
        }
        else if(e.target.readyState==4)
        {
            callback(true,timecepp)
        }
    })
    req.open("GET",`https://young-headland-05683.herokuapp.com/users/present/venkatsaivenke@gmail`)
    req.send()
}
function getmovies(callback)
{
    let timegm=new Date()
  const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            callback(true,timegm)
        }
        else if(e.target.readyState==4)
        {
          callback(true,timegm)
        }
    }) 
    req.open("GET",localStorage.getItem("movies-type"))
    req.send();  
}
function gettrailers(callback)
{
    let timegt=new Date()
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            callback(true,timegt)
        }
        else if(e.target.readyState==4)
        {
          callback(true,timegt)
        }
    }) 
    req.open("GET",trailertype)
    req.send();  
}
function englishmovies(callback)
{
    let timeem=new Date()
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            callback(true,timeem)
        }
        else if(e.target.readyState==4)
        {
          callback(false,timeem)
        }
    }) 
    req.open("GET","https://api.themoviedb.org/3/discover/movie?api_key=cf326b43d46977051bba81ac584f6377&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020")
    req.send();  
}
function hindimovies(callback)
{
    let timehm=new Date()
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            callback(true,timehm)
        }
        else if(e.target.readyState==4)
        {
          callback(false,timehm)
        }
    })
    req.open("GET","https://api.themoviedb.org/3/discover/movie?api_key=cf326b43d46977051bba81ac584f6377&language=hi-IN&region=IN&sort_by=popularity.desc&page=1&primary_release_year=2018&with_original_language=hi")
    req.send();
}
function sendmail(callback)
{
    let timesm=new Date()
    const req=new XMLHttpRequest()
    let params=
    {
        name:`venkatsaivenke@gmail.com`,
    }
        req.addEventListener("readystatechange",(e)=>
        {
            if(e.target.readyState==4&&e.target.status==200)
            {
              callback(true,timesm)       
            }
            else if(e.target.readyState==4)
            {
              callback(false,timesm)  
            }
        })
        req.open("POST",`https://peaceful-chamber-48058.herokuapp.com/`,true)
      req.setRequestHeader('Content-type','application/json')
        req.send(JSON.stringify(params))
}
function login(callback)
{
    let timel=new Date()
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
        {
            if(e.target.readyState==4&&(e.target.status==200||e.target.status==401||
                e.target.status==403||e.target.status==500))
            {
              callback(true,timel)       
            }
            else if(e.target.readyState==4)
            {
              callback(false,timel)  
            }
        })
    let params=
        {
            username:"ulli",
            password:"hulli"
        }
        //console.log(password)
        req.open("POST",`https://young-headland-05683.herokuapp.com/users/login`,true)
        req.setRequestHeader('Content-type','application/json')
          req.send(JSON.stringify(params)) 
}
function signup(callback)
{
    let times=new Date()
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
        {
            if(e.target.readyState==4&&(e.target.status==200||e.target.status==401||
                e.target.status==403||e.target.status==500))
            {
              callback(true,times)       
            }
            else if(e.target.readyState==4)
            {
              callback(false,times)  
            }
        })
    let params=
   {
      username:`broo`,
      email:`broo`,
      password:`broo`,
      date:`broo`
   }
    req.open("POST",`https://young-headland-05683.herokuapp.com/users`,true)
    req.setRequestHeader('Content-type','application/json')
    req.send(JSON.stringify(params))
}