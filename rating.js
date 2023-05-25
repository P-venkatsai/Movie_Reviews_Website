
let count=0;
let starss=["firststar","seconstar","thirstar","fourstar","fivestar"];
let cartitle=["cardtitle1","cardtitle2","cardtitle3","cardtitle4","cardtitle5"];
//movies names function
let sor;
function movienames()
{
  let k=1;
  sor=movies
  movies.sort((a,b)=>parseFloat(b.day)-parseFloat(a.day));
  for(let item in sor)
  {
    document.getElementById(`${cartitle[k-1]}`).innerHTML=sor[item].name
    let x=[];
    x=sor[item].images
    for(let q=0;q<3;q++)
    {
      document.querySelector(`#carousel${k} #imagecar${q+1}`).src=x[q];
    }
    k++;
    if(k>5)
    {
      break;
    }
  }
  getrating()
  if(count<1)
  {
  settrailers((hai)=>
  {
    //console.log("hai")
  })
  }
}
//rating function
function getrating()
{
    let k=0;
    sor.forEach(function(item)
    {
      if(k<5)
      {
      let ratper=((item.rating/5)*100);
      let perroun=`${Math.round(ratper/10)*10}%`
      document.querySelector(`#${starss[k]}`).style.width=perroun;
      }
      k++;
    })
}
//english movies
let moviesstring=JSON.stringify(movies);
localStorage.setItem("enlishstring",moviesstring)
englishmovies((data1,err)=>
{
  if(!err)
  {
    document.getElementById("hollywood").style.display="block"
      let count=1;
      let moviedata=data1.results
      for(let i=0;i<moviedata.length;i++)
      {
        let k=1;
        document.querySelector(`.movie-name-${count}`).innerHTML=moviedata[i].original_title
        document.querySelector(`.movie-img-${count}`).src=`http://image.tmdb.org/t/p/w500${moviedata[i].poster_path}`
        let perroun=moviedata[i].vote_average;
          document.querySelector(`#e${count}star`).style.width=`${perroun*10}%`;
          document.querySelector(`.movie-name-${count}`).dataset.id=moviedata[i].id;
          document.querySelector(`.movie-img-${count}`).dataset.id=moviedata[i].id;
        count++;
        if(count>6)
        {
          break;
        }
        }
        StoreEnglish();
   }
   else
   {
     console.log("error has ocurred")
   }
})
let StoreEnglish=()=>
{
for(let i=1;i<=6;i++)
{
  let y=document.querySelector(`.movie-name-${i}`)
  document.querySelector(`.movie-img-${i}`).addEventListener("click",(e)=>
  {
      let x=document.querySelector(`.movie-img-${i}`).dataset.id
      localStorage.setItem("currentid",x);
      location.assign("movie-details.html");
  })
  y.addEventListener("click",(e)=>
  {
    let y=document.querySelector(`.movie-name-${i}`).dataset.id
    localStorage.setItem("currentid",y);
    location.assign("movie-details.html");
  })
}
}
//movie search
document.getElementById("movie-search1").addEventListener("input",(e)=>
{
 let x=""
 x=e.target.value;
 if(x.length>0)
 {
const request=new XMLHttpRequest();
request.addEventListener("readystatechange",(e)=>
{
if(e.target.readyState==4&&e.target.status==200)
{
  try
  {
    for(let i=0;i<6;i++)
    {
      let x=document.querySelector(`#bro${i}`)
      x.remove()
    }
  }
  catch(e)
  {

  }
    data=JSON.parse(e.target.responseText);
    for(let i=0;(i<6)&&(i<data.results.length);i++)
    {
      let x=document.createElement("div")
      x.id=`bro${i}`;
      let img=`http://image.tmdb.org/t/p/w500${data.results[i].poster_path}`
      if(data.results[i].poster_path==null)
      {
          img="./img/noimage.jpg";
      }
      x.style.maxHeight="120px"
      x.addEventListener("mouseover",(e)=>
      {
        colourupdate(x);
      })
      x.addEventListener("mouseout",(e)=>
      {
        colourback(x);
      })
      x.addEventListener("click",(e)=>
      {
        searchupdate(data.results[i].id)
      })
      try
      {
        x.innerHTML=`<div class="container-fluid" style="margin-top:10px!important;margin-bottom:10px!important;">
        <div class="row showw">
          <div class="col-sm-2 col-3">
            <div class="card">
                <img src="${img}" class="card-img" style="max-height:100px!important;">
            </div>
          </div>
          <div class="col-9 col-sm-10" style="max-height:100px!important;">
            <strong class="name${i}" style="position:absolute;top:20%;left:10%;color:white" id="search-name" 
             >${data.results[i].original_title}(${data.results[i].release_date.substring(0,4)})</strong>
          </div>
        </div>
      </div>`
       let y=document.querySelector("strong")
      }
      catch(e)
      {

      }        
      document.querySelector("#appen").appendChild(x);
      if(i>5)
      {
        break;
      }
    }
}
})
request.open("GET",`https://api.themoviedb.org/3/search/movie?api_key=cf326b43d46977051bba81ac584f6377&language=en-US&query=${x}&page=1&sort_by=popularity.desc`);
request.send()
}
})
//AIzaSyAYXjziSGTWaV-AlA7PJh6i6HOrFcOlHuM
function searchupdate(e)
{
  localStorage.setItem("currentid",e);
    location.assign("movie-details.html");
}
function colourupdate(x)
{
  x.children[0].children[0].children[1].children[0].style.color="#3976dc";
  x.style.cursor="pointer"
}
function colourback(x)
{
  x.children[0].children[0].children[1].children[0].style.color="white";
}
//bollywood movies
hindimovies((data1,err)=>
{ 
  if(!err)
  {
    document.getElementById("bollywood").style.display="block"
  data1
  let count=1;
  let moviedata=data1.results
for(let i=1;i<moviedata.length;i++)
{
  let k=1;
   document.querySelector(`.movie-name-hindi-${count}`).innerHTML=moviedata[i].original_title
   document.querySelector(`.movie-img-hindi-${count}`).src=`http://image.tmdb.org/t/p/w500${moviedata[i].poster_path}`
   let perroun=moviedata[i].vote_average;
    document.querySelector(`#h${count}star`).style.width=`${perroun*10}%`;
    document.querySelector(`.movie-name-hindi-${count}`).dataset.id=moviedata[i].id;
    document.querySelector(`.movie-img-hindi-${count}`).dataset.id=moviedata[i].id;
   count++;
   if(count>6)
   {
     break;
   }
  }
  StoreHindi();
 }
})
let StoreHindi=()=>
{
for(let i=1;i<=6;i++)
{
  let y=document.querySelector(`.movie-name-hindi-${i}`)
  document.querySelector(`.movie-img-hindi-${i}`).addEventListener("click",(e)=>
  {
      let x=document.querySelector(`.movie-img-hindi-${i}`).dataset.id
      localStorage.setItem("currentid",x);
      location.assign("movie-details.html");
  })
  y.addEventListener("click",(e)=>
  {
    let y=document.querySelector(`.movie-name-hindi-${i}`).dataset.id
    localStorage.setItem("currentid",y);
    location.assign("movie-details.html");
  })
}
}
function settrailers(callback)
{
gettrailers((trailers,err)=>
{
  //console.log("bye")
  if(!err)
  {
    document.getElementById("trailers").style.display="block"
  trailers=trailers.results
  document.querySelector("#trailer-container").style.backgroundImage=
   `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),
   url("http://image.tmdb.org/t/p/w500${trailers[0].backdrop_path}")`
  //console.log(trailers)
  let app=document.querySelector(".slider");
  app.innerHTML=" ";
  for(let i=0;i<trailers.length;i++)
  {
    if(trailers[i].backdrop_path==null)continue;
  let ndiv=document.createElement("div")
  ndiv.className="card mx-2"
  ndiv.style.border="0px";
  ndiv.dataset.backimg=trailers[i].backdrop_path
  ndiv.addEventListener("mouseover",(e)=>
  {
    let x=ndiv.dataset.backimg
    if(x!="null")
    {
   document.querySelector("#trailer-container").style.backgroundImage=
   `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),
   url("http://image.tmdb.org/t/p/w500${ndiv.dataset.backimg}")`
    }
  })
  ndiv.dataset.name=trailers[i].original_title
  //console.log(ndiv.dataset.name);
  let play=document.createElement("div")
  play.innerHTML=`<i class="fa fa-play text-white"></i>`
  play.style.position="absolute"
  play.style.left="50%"
  play.style.top="50%"
  play.dataset.toggle="modal"
  play.dataset.target="#loginModa"
  play.addEventListener("click",(e)=>
  {
    e.preventDefault()
    $('#loginModa').modal('hide');
    document.querySelector("iframe").src="";
    setyoutubeid(ndiv.dataset.name)
  })
  let cardimg=document.createElement("img");
  let backimage
  cardimg.src=`http://image.tmdb.org/t/p/w500${trailers[i].backdrop_path}`
  cardimg.alt="./img/noimage.jpg"
  cardimg.className="card-img"
  ndiv.appendChild(play)
  ndiv.appendChild(cardimg)
  app.appendChild(ndiv)
  }
  if(count>0)
  {
    $('.slider').slick('unslick')
  }
  slickk()
  count++;
  callback("hai")
}
})
}
function setyoutubeid(currentmovie)
{
const req=new XMLHttpRequest();
try
{
req.addEventListener("readystatechange",(e)=>
{
if(e.target.readyState==4&&e.target.status==200)
{
    data=JSON.parse(e.target.responseText);
    let countt=0;
    for(h in data.items[0].id)
    {
        countt++;
        if(countt==2)
        {
      let x=document.querySelector("iframe")
      x.src="";
       x.src=`https://www.youtube.com/embed/${data.items[0].id[h]}?enablejsapi=1`
        }
    }
}
})
req.open("GET",`https://www.googleapis.com/youtube/v3/search/?
key=AIzaSyAYXjziSGTWaV-AlA7PJh6i6HOrFcOlHuM&q=${currentmovie}-trailer`);
req.send()
}
catch(e)
{
}
}
document.querySelector("#hollybutton").addEventListener("click",(e)=>
{
  document.querySelector("#bollybutton").style.backgroundColor="#007bff"
  document.querySelector("#bollybutton").style.borderColor="#007bff"
  document.querySelector("#hollybutton").style.backgroundColor="#bd2130"
  document.querySelector("#hollybutton").style.borderColor="#bd2130"
  hollywood()
  settrailers((hai)=>
  {
    //console.log(hai)
  })
})
document.querySelector("#bollybutton").addEventListener("click",(e)=>
{
  document.querySelector("#bollybutton").style.backgroundColor="#bd2130"
  document.querySelector("#bollybutton").style.borderColor="#bd2130"
  document.querySelector("#hollybutton").style.backgroundColor="#007bff"
  document.querySelector("#hollybutton").style.borderColor="#007bff"
  bollywood()
  settrailers((hai)=>
  {
    //console.log(hai)
  })
})
document.querySelector("#movie-name-head").addEventListener("click",(e)=>
{
  localStorage.setItem("type","hollywood");
  localStorage.setItem("movies-type","https://api.themoviedb.org/3/movie/now_playing?api_key=cf326b43d46977051bba81ac584f6377&language=en-US&page=1")
  location.assign("movie-collections.html")
})
document.querySelector(".bollywood-movies").addEventListener("click",(e)=>
{
  localStorage.setItem("type","bollywood");
  localStorage.setItem("movies-type","https://api.themoviedb.org/3/discover/movie?api_key=cf326b43d46977051bba81ac584f6377&language=hi-IN&region=IN&sort_by=popularity.desc&page=1&primary_release_year=2018&with_original_language=hi");
  location.assign("movie-collections.html")
})
let car=[674779,594669,0,545609,448119]
for(let i=1;i<=5;i++)
{
  if(i!=3)
  {
  document.querySelector(`#slider${i}`).dataset.id=car[i-1];
  document.querySelector(`#slider${i}`).addEventListener("click",(e)=>
  {
    localStorage.setItem("currentid",document.querySelector(`#slider${i}`).dataset.id);
    location.assign("movie-details.html");
  })
  }
}
/*let y=document.querySelector(`.movie-name-hindi-${i}`).dataset.id
    localStorage.setItem("currentid",y);
    location.assign("movie-details.html");*/
    /*setTimeout(()=>
    {
       document.getElementById("scrollablecontainer").style.display="block"
    },1000)*/