let data
let currentid
let currentmovie
let currentmoviedata
window.onload=function seteverything()
{
  //console.log(emailverification)
    currentid=this.localStorage.getItem("currentid")
    const request=new XMLHttpRequest();
    request.addEventListener("readystatechange",(e)=>
    {
    if(e.target.readyState==4)
    {
        data=JSON.parse(e.target.responseText);
        currentmoviedata=data
        this.getmovie()
        let y=document.querySelector("#card-image")
        y.src=`http://image.tmdb.org/t/p/w500${data.backdrop_path}`
        //this.//console.log(data)
        document.title=`${data.original_title} review`
        if(data.homepage=="")
        {
         let x=document.getElementById(`Movie-info-watch`);
         x.remove();
         x.children[0].remove();
         document.getElementById(`Movie-p-watch`).innerHTML="Currently unavialable"
        }
        else
        {
          document.getElementById(`Movie-info-watch`).href=`${data.homepage}`;
        }
    let genree=""
    for(let i=0;i<data.genres.length;i++)
    {
         genree=genree+data.genres[i].name
         genree=genree+" ";
         if(i>3)
         {
             break;
         }
    }
    currentmovie=data.original_title
    this.document.getElementById("Movie-info-name").innerHTML=data.original_title
    this.document.getElementById("Movie-info-date").innerHTML=data.release_date
    this.document.getElementById("Movie-info-genre").innerHTML=genree
    this.document.getElementById("Movie-info-synopsis").innerHTML=data.overview
    this.document.getElementById("Movie-info-runtime").innerHTML=`${data.runtime} min`
    this.document.getElementById("ratingstar").style.width=`${data.vote_average*10}%`
    castset()
    setyoutubeid()
    getpopular()
    similarmovies()
    }
    })
    request.open("GET",`https://api.themoviedb.org/3/movie/${currentid}?api_key=cf326b43d46977051bba81ac584f6377`);
    request.send()
    
}
function castset()
{
    let castcount=1;
let mr=new XMLHttpRequest()
mr.addEventListener("readystatechange",(e)=>
{
    if(e.target.readyState==4&&e.target.status==200)
    {
      let height;
        let d=JSON.parse(e.target.responseText);
        let cast=d.cast
        for(let i=0;i<6;i++)
        {
          let castimg
          let nooimage=0;
          if(cast[i].profile_path==null)
          {
            noimage=1;
             if(cast[i].gender==1)
             {
               castimg="./img/noprofilewoman.jpg"
             }
             else
             {
               castimg="./img/noprofileman.jpg"
             }
          }
          else
          {
            castimg=`http://image.tmdb.org/t/p/w500${cast[i].profile_path}`
          }
        this.document.getElementById(`cast-image-${i+1}`).src=castimg
        if(i==0&&nooimage!=1)
        {
            height=this.document.getElementById(`cast-image-${i+1}`).offsetHeight;
            this.document.getElementById(`cast-image-${i+1}`).style.minHeight=`${height}px`
        }
        else
        {
          this.document.getElementById(`cast-image-${i+1}`).style.minHeight=`${height}px`
        }
        let castname=cast[i].name.split(" ")
        this.document.querySelector(`#cast-${i+1} #first-name`).innerHTML=castname[0]
        if(castname[1])
        {
        this.document.querySelector(`#cast-${i+1} #last-name`).innerHTML=castname[1]
        }
        else
        {
          let ln=this.document.querySelector(`#cast-${i+1} #last-name`)
          ln.remove()
        }
        if(!cast[i].character)
        {
          let rem=this.document.querySelector(`#cast-${i+1} #position`)
          //console.log("hai")
          rem.remove()
        }
        else
        {
        this.document.querySelector(`#cast-${i+1} #position`).innerHTML=`as ${cast[i].character}`
        }
        
      }
    }
})
mr.open("GET",`https://api.themoviedb.org/3/movie/${currentid}/credits?api_key=cf326b43d46977051bba81ac584f6377`)
mr.send()
}
function setyoutubeid()
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
       x.src=`https://www.youtube.com/embed/${data.items[0].id[h]}?enablejsapi=1`
        }
    }
}
})
req.open("GET",`https://www.googleapis.com/youtube/v3/search/?key=AIzaSyAYXjziSGTWaV-AlA7PJh6i6HOrFcOlHuM&q=${currentmovie}-trailer`);
req.send()
}
catch(e)
{
}
}
function getpopular()
{
    let request=new XMLHttpRequest();
    request.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            let data=JSON.parse(e.target.responseText)
            data=data.results
            try
            {
            for(let i=0;i<10;i++)
            {
                let perroun=data[i+6].vote_average;
                document.querySelector(`#list-item-${i+1} .list-movie`).innerHTML=data[i+6].original_title
                document.querySelector(`#list-item-${i+1} .stars-inner`).style.width=`${perroun*10}%`;
                document.querySelector(`#list-item-${i+1} .list-movie`).dataset.id=data[i+6].id;
                document.querySelector(`#list-item-${i+1} .list-movie`).addEventListener("click",(e)=>
                {
                  x=document.querySelector(`#list-item-${i+1} .list-movie`).dataset.id
                  localStorage.setItem("currentid",x);
                  location.assign("movie-details.html");
                })
              }
            }
            catch(e)
            {
            }
        }
    })
    request.open("GET","https://api.themoviedb.org/3/discover/movie?api_key=cf326b43d46977051bba81ac584f6377&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")
    request.send()
}
function similarmovies()
{
const requestholly=new XMLHttpRequest();
  requestholly.addEventListener("readystatechange",(e)=>
{  
  let data1
if(e.target.readyState==4&&e.target.status==200)
{
  data1=JSON.parse(e.target.responseText);
  ////console.log(data1)
  let count=1;
  let moviedata=data1.results
  if(moviedata.length==0)
  {
    document.getElementById("similarsection").style.display="none"
  }
  else
  {
    document.getElementById("similarsection").style.display="block"
  }
for(let i=0;i<moviedata.length;i++)
{
  let posterimg
  if(moviedata[i].vote_count==0)
  {
    continue;
  }
  if(moviedata[i].poster_path==null)
  {
    ////console.log(moviedata[i])
    posterimg="./img/noimage.jpg"
  }
  else
  {
    posterimg=`http://image.tmdb.org/t/p/w500${moviedata[i].poster_path}`
  }
  let k=1;
   document.querySelector(`.movie-name-${count}`).innerHTML=moviedata[i].original_title
   document.querySelector(`.movie-img-${count}`).src=posterimg
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
  if(count<=6)
  {
    for(let i=count;i<=6;i++)
    {
      let column= document.querySelector(`#movie-image-${i}`)
      column.remove()
      //column.innerHTML=``;
    }
  }
  Store(count)
}
})
requestholly.open("GET",`https://api.themoviedb.org/3/movie/${currentid}/similar?api_key=cf326b43d46977051bba81ac584f6377&page=1`)
requestholly.send();
}
let Store=(count)=>
{
for(let i=1;i<count;i++)
{
  let y=document.querySelector(`.movie-name-${i}`)
  document.querySelector(`.movie-img-${i}`).addEventListener("click",(e)=>
  {
      x=document.querySelector(`.movie-img-${i}`).dataset.id
      localStorage.setItem("currentid",x);
      location.assign("movie-details.html");
      //console.log(localStorage.getItem("currentid"))
  })
  y.addEventListener("click",(e)=>
  {
    let y=document.querySelector(`.movie-name-${i}`).dataset.id
    localStorage.setItem("currentid",y);
    location.assign("movie-details.html");
  })
}
}
//search movie
document.getElementById("movie-search1").addEventListener("change",(e)=>
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
  let i
  try
  {
    for(i=0;i<6;i++)
    {
      let x=document.querySelector(`#bro${i}`)
      x.remove()
    }
  }
  catch(e)
  {
    //console.log(i)
  }
    data=JSON.parse(e.target.responseText);
    //console.log(`results=${data.results.length}`)
    let j=0;
    for(i=0;(i<6)&&(j<data.results.length);i++)
    {
      ////console.log(data.results[i].id)
      if(data.results[j].vote_count==0)
      {
        i--;
        j++
        continue;
      }
      let x=document.createElement("div")
      x.id=`bro${i}`;
      let img=`http://image.tmdb.org/t/p/w500${data.results[j].poster_path}`
      //console.log(j)
      if(data.results[j].poster_path==null)
      {
          img="./img/noimage.jpg";
      }
      x.dataset.id=data.results[j].id;
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
        searchupdate(x.dataset.id)
      })
      //try
      //{
        x.innerHTML=`<div class="container-fluid" style="margin-top:10px!important;margin-bottom:10px!important;">
        <div class="row">
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
      //}
      /*catch(e)
      {
        //console.log(e)
      }*/        
      document.querySelector("#appen").appendChild(x);
      j++;
    }
}
})
request.open("GET",`https://api.themoviedb.org/3/search/movie?api_key=cf326b43d46977051bba81ac584f6377&language=en-US&query=${x}&page=1&sort_by=popularity.desc`);
request.send()
}
})
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
for(let i=1;i<=5;i++)
{
  console.log()
document.getElementById(`star${i}`).addEventListener('mouseover',(e)=>
{
  fill(i)
})
}
let userrating=0;
let fill=(i)=>
{
  userrating=i;
  for(let j=1;j<=5;j++)
  {
    document.getElementById(`inner${j}`).style.width="0%"
  }
  for(let j=1;j<=i;j++)
  {
    document.getElementById(`inner${j}`).style.width="100%"
  }
}
document.getElementById("userreview").addEventListener("click",(e)=>
{
  console.log("haii")
  const req=new XMLHttpRequest()
  req.addEventListener('readystatechange',(e)=>
  {
     if(e.target.readyState==4&&e.target.status==200)
     {
        sendmoviedetails() 
     }
     else if(e.target.readyState==4)
     {
      $('#loginsignup').modal('show')
      document.getElementById("output").style.backgroundColor="red";
      removemodal1()
     }
  }) 
  req.open("GET",`https://young-headland-05683.herokuapp.com/users/verifyuser`)
 let token=localStorage.getItem("token")
 req.setRequestHeader('Authorization',`Bearer ${token}`)
  req.send()
})
function getmovie()
{
console.log(currentid)
const req=new XMLHttpRequest()
req.addEventListener("readystatechange",(e)=>
{
    if(e.target.readyState==4&&e.target.status==200)
    {
        let ret=JSON.parse(e.target.responseText)
        console.log(ret)
        createreviews(ret.comments)//this function is used to craete recent reviews
        alreadyrating(ret.comments)//this function is used to fill the your rating con nex line
                                   //part if its already present in backend
    }
    else if(e.target.readyState==4)
    {
      console.log("brooo")
       createnewmovie();
    }
})
////console.log(x)
req.open("GET",`https://young-headland-05683.herokuapp.com/movies/${currentid}`)
req.send()
}
//this method is called when movie is not already present
let createnewmovie=()=>
{
////console.log(currentmoviedata)
  const req=new XMLHttpRequest()
  let params=
 {
    _id:currentid,
     movie_name:`${currentmoviedata.original_title}`
 }
  req.addEventListener("readystatechange",(e)=>
  {
      if(e.target.readyState==4&&e.target.status==200)
      {
          console.log(e.target.responseText)
      }
  })
  req.open("POST",`https://young-headland-05683.herokuapp.com/movies/newmovie`,true)
  req.setRequestHeader('Content-type','application/json')
  req.send(JSON.stringify(params))
  //console.log(params)
}
let createreviews=(comments)=>
{
  if(comments.length==0)
  {
    let row=document.createElement("div")
    row.className="row"
    row.innerHTML=`<div class="col-12"><strong>No reviews</strong></div>`
    document.getElementById("reviewcontainer").appendChild(row)
  }
  else
   {
    document.getElementById("reviewcontainer").innerHTML=``
     for(let i=0;i<comments.length;i++)
     {
       //if(comment[i].rating==0)continue;
         let row=document.createElement("div")
         row.className="row"
         row.innerHTML=` <div class="card" style="border: 0px;">
         <div class="card-body p-0">
           <div class="row py-1">
               <div class="col-12">
                   <strong class="px-2">${comments[i].author}</strong>
                   <small class="px-2 ">${moment(comments[i].updatedat).fromNow()}</small>
               </div>
               <div class="col-12 py-2 px-3">
                  <div class="stars-outer">
                  <div class="stars-inner" id="reviewstar${i}">
              </div>
              </div>
              </div>
              <div class="col-12">
                <p>${comments[i].comment}</p>
              </div>
           </div>
         </div>
       </div>`
       document.getElementById("reviewcontainer").appendChild(row)
     }
     fillreviewrating(comments)
   } 
}
let fillreviewrating=(comments)=>
{
  for(let i=0;i<comments.length;i++)
  {
    document.getElementById(`reviewstar${i}`).style.width=`${(comments[i].rating*20)}%`
  }
}
let alreadyrating=(comments)=>
{
    let uid=localStorage.getItem('uid')
    for(let i=0;i<comments.length;i++)
    {
      if(comments[i]._id==uid)
      {
        fill(comments[i].rating)
        document.getElementById("userreviewbox").value=comments[i].comment
      }
    } 
}
let sendmoviedetails=()=>
{
  let uid=localStorage.getItem("uid") 
  let uname=localStorage.getItem("username") 
  let comment=document.querySelector("#userreviewbox").value
   console.log(userrating)
    const now=moment()
    const nowTimestamp = now.valueOf()
    let x=nowTimestamp
    const req=new XMLHttpRequest()
    let params=
   {
      comment:`${comment}`,
      rating:userrating,
      updatedat:x
   }
    req.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            let ret=JSON.parse(e.target.responseText)
            createreviews(ret.comments)
           alreadyrating(ret.comments)
        }
    })
    let token=localStorage.getItem("token")
    console.log(currentid)
    req.open("POST",`https://young-headland-05683.herokuapp.com/movies/${currentid}/comment`,true)
    req.setRequestHeader('Content-type','application/json')
    req.setRequestHeader('Authorization',`Bearer ${token}`)
    req.send(JSON.stringify(params))
  }
  let removemodal1=()=>
{
    setTimeout(()=>
    {
        $('#loginsignup').modal('hide')
    },1000)
}
const now = moment()
// //now.subtract(1, 'week').subtract(20, 'days')
// //console.log(now.format('MMMM Do, YYYY'))
// const nowTimestamp = now.valueOf()
// console.log(now.fromNow(0))
// console.log(moment(1601391415448).valueOf())
// console.log(nowTimestamp)