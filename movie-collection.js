window.addEventListener("load",(e)=>
{
    setmovies()
})
function setmovies()
{
getmovies((data)=>
{
    //console.log(data)
    //console.log(localStorage.getItem("type"))
    let filtermovies=document.getElementById("fliter-movies")
    if(localStorage.getItem("type")=="bollywood")
    {
        filtermovies.style.display="none"
    }
    else
    {
        filtermovies.style.display="block"
    }
    document.getElementById("appendmovies").innerHTML=""
    let current=localStorage.getItem("movies-type")
    if(current=="hollywood")
    {

    }
 for(let i=0;i<data.length;i++)
 {
     let image
    if(data[i].poster_path==null)
    {
        image="./img/noimage.jpg"
    }
    else
    {
        image=`http://image.tmdb.org/t/p/w500${data[i].poster_path}`
    }
    let language=data[i].original_language
    if(language=="en")
    {
        language="English"
    }
    else if(language=="hi")
    {
        language="Hindi"
    }
    let perroun=data[i].vote_average;
    let half=document.createElement("div");
    half.className="col-12 col-md-6"
    half.innerHTML=`<div class="container-fluid" style="margin-top:10px!important;margin-bottom:10px!important;">
    <div class="row showw">
      <div class="col-4 col-sm-4 col-md-4">
        <div class="card colla">
            <img src="${image}" class="card-img" >
        </div>
      </div>
      <div class="col">
        <strong class="name${i}" 
        id="search-name" >${data[i].original_title}</strong>
        <hr>
        <span class="lead">Rating:</span>
        <div class="stars-outer">
            <div class="stars-inner" style="width:${perroun*10}%;">
            </div>
          </div>
          <p>Language : ${language}</p>
        <p>Release: ${data[i].release_date}</p>
      </div>
    </div>
  </div>
  </div>`
  half.dataset.id=data[i].id;
  half.addEventListener("click",(e)=>
  {
      Responseaction(half.dataset.id)
  })
  half.addEventListener("mouseover",(e)=>
  {
     half.style.backgroundColor="#dfede3"
  })
  half.addEventListener("mouseout",(e)=>
  {
     half.style.backgroundColor="white"
  })
  document.getElementById("appendmovies").appendChild(half)
 }
})
}
document.getElementById("filter-1").addEventListener("click",(e)=>
{
    //console.log("filter-1")
    localStorage.setItem("movies-type","https://api.themoviedb.org/3/discover/movie?api_key=cf326b43d46977051bba81ac584f6377&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")
     setmovies()
})
document.getElementById("filter-2").addEventListener("click",(e)=>
{
    //console.log("filter-2")
    localStorage.setItem("movies-type","https://api.themoviedb.org/3/movie/upcoming?api_key=cf326b43d46977051bba81ac584f6377&language=en-US&page=1")
    setmovies()
})
document.getElementById("filter-3").addEventListener("click",(e)=>
{
    //console.log("filter-3")
    localStorage.setItem("movies-type","https://api.themoviedb.org/3/movie/top_rated?api_key=cf326b43d46977051bba81ac584f6377&language=en-US&page=1")
    setmovies()
})
let Responseaction=(currentid)=>
{
    localStorage.setItem("currentid",currentid);
    location.assign("movie-details.html");
}
if(localStorage.getItem("type")=="hollywood")
{
document.querySelector("#movie-name-head").innerHTML="Hollywood Movies";
}
else
{
    document.querySelector("#movie-name-head").innerHTML="Bollywood Movies";
}
