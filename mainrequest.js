let trailertype=
"https://api.themoviedb.org/3/movie/now_playing?api_key=cf326b43d46977051bba81ac584f6377&language=en-US&page=1";
function gettrailers(callback)
{
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            callback(JSON.parse(e.target.responseText))
        }
    })
    req.open("GET",`https://www.googleapis.com/youtube/v3/search/?key=AIzaSyAYXjziSGTWaV-AlA7PJh6i6HOrFcOlHuM`)
    req.send()
}
function hindimovies(callback)
{
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            callback(JSON.parse(e.target.responseText),false)
        }
        else if(e.target.readyState==4)
        {
          callback(null,true)
        }
    })
    req.open("GET","https://api.themoviedb.org/3/discover/movie?api_key=cf326b43d46977051bba81ac584f6377&language=hi-IN&region=IN&sort_by=popularity.desc&page=1&primary_release_year=2018&with_original_language=hi")
    req.send();
}
function englishmovies(callback)
{
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            callback(JSON.parse(e.target.responseText),false)
        }
        else if(e.target.readyState==4)
        {
          callback(null,true)
        }
    }) 
    req.open("GET","https://api.themoviedb.org/3/discover/movie?api_key=cf326b43d46977051bba81ac584f6377&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020")
    req.send();  
}
function gettrailers(callback)
{
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            callback(JSON.parse(e.target.responseText),false)
        }
        else if(e.target.readyState==4)
        {
          callback(null,true)
        }
    }) 
    req.open("GET",trailertype)
    req.send();  
}
let slickk=()=>
{
  $('.slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows:true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
}
function hollywood()
{
  trailertype="https://api.themoviedb.org/3/movie/now_playing?api_key=cf326b43d46977051bba81ac584f6377&language=en-US&page=1";
}
function bollywood()
{
   trailertype="https://api.themoviedb.org/3/discover/movie?api_key=cf326b43d46977051bba81ac584f6377&language=hi-IN&region=IN&sort_by=popularity.desc&page=1&primary_release_year=2018&with_original_language=hi"
}
//localStorage.setItem("movies-type",trailertype);
//let currenttype=localStorage.getItem("movies-type")
function getmovies(callback)
{
  console.log()
  const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            callback(JSON.parse(e.target.responseText).results,false)
        }
        else if(e.target.readyState==4)
        {
          callback(null,true)
        }
    }) 
    req.open("GET",localStorage.getItem("movies-type"))
    req.send();  
}
function redirectcollections()
{
  setmovies()
}