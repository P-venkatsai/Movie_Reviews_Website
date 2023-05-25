let x=document.querySelector("#bar-graph")
//let a=[10,0,20,30,40,60,20,20,30,70,60,80,30,20,50]
let createbargraph=(d)=>
{
    let count=0;
    for(let i=10;i>=0;i--)
    {
        let y=document.createElement("div")
        let z=document.createElement("div")
        z.style.animationName="example"
        z.style.animationDuration="2s"
        y.style.width="1%";
        y.style.backgroundColor="blue"
        y.style.position="absolute"
        z.style.position="absolute"
        y.style.top=`${100-d[i].numberusers}%`
        y.style.height=`${d[i].numberusers}%`
        z.style.backgroundColor=`white`
        z.style.width="100%"
        z.style.height="0%"
        y.appendChild(z)
        y.style.transition=``
        let lef=7*count;
        y.style.left=`${lef+1}%`
        count++;
        x.appendChild(y)
      }
}
let createdges=()=>
{
    let top=[10,45,96.5]
    let nums=[100,50,0]
    let left=[-4.5,-3.5,-2.5]
    for(let i=0;i<3;i++)
    {
    let z=document.createElement("small")
    z.style.position="absolute"
    z.style.top=`${top[i]}%`
    z.style.left=`${left[i]}%`
    z.innerHTML=`${nums[i]}`
    x.appendChild(z) 
     z=document.createElement("strong")
    z.style.position="absolute"
    z.style.top=`${top[i]-1}%`
    z.style.left=`-1%`
    z.innerHTML="-"
    x.appendChild(z)
    }
}
let createdates=(d)=>
{
    let count=0;
    for(let i=10;i>=0;i--)
    {
        let z=document.createElement("div")
        z.style.width="1%";
        z.style.position="absolute"
        let lef=7*count;
        count++;
        z.style.left=`${lef+1}%`
        let s=""
        if(d[i]._id.charAt(1)=='-')
        {
          s=d[i]._id.substring(0,1)+"/"+d[i]._id.substring(2,4);
        }
        else
        {
            s=d[i]._id.substring(0,2)+"/"+d[i]._id.substring(3,5);
        }
        z.innerHTML=`<small>${s}</small>`
        y.appendChild(z)
    }
}
let create=(d)=>
{ 
    let y=document.createElement("div")
    y.style.height=`90%`
    y.style.width="2px";
    y.style.backgroundColor="black"
    y.style.position="absolute"
    y.style.top=`10%`
    y.style.left=`0%`
    x.appendChild(y)
    createdges(d)   
    createdates(d)
    createbargraph(d)
}
let y=document.querySelector("#dates")
// let b=["7/11","8/11","9/11","7/11","7/11","7/11","7/11","7/11","7/11","7/11","7/11",
// "7/11","7/11","7/11","7/11"]
   const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            let d=JSON.parse(e.target.responseText);
            console.log(d)     
            create(d)
            //senddates()
        }
    })
    let token=localStorage.getItem("token")
    req.open("GET",`https://young-headland-05683.herokuapp.com/trackusers/getusers/dates`)
    req.setRequestHeader('Authorization',`Bearer ${token}`)
    req.send()     
    let senddates=()=>
    {
    let params=
    {
        _id:`6-10-20`,
        numberusers:46,
        time:1601965985766,
    }
        req.addEventListener("readystatechange",(e)=>
        {
            if(e.target.readyState==4&&e.target.status==200)
            {
                let d=JSON.parse(e.target.responseText)
               console.log(d)   
            }
            else if(e.target.readyState==4)
            {
             console.log("hai")
            }
        })
        req.open("POST",`https://young-headland-05683.herokuapp.com/trackusers/newdate/1`,true)
      req.setRequestHeader('Content-type','application/json')
        req.send(JSON.stringify(params))
    }
let tbody=document.getElementById("body-append")
let table_count=1; 

let createrow=(time,type,working)=>
{
    let t=document.createElement("tr")
    t.innerHTML=` <th scope="row">${table_count}</th>
    <td>${type}</td>
    <td>${working}</td>
    <td>${time} ms</td>`
    tbody.appendChild(t);
    table_count++;
}
getpopularmovies((working,time)=>
{
    console.log(time)
    if(working)
    {
      let y=new Date();
      createrow(y-time,"Get Popular Movies","YES")
    }
    else
    {
      let y=new Date();
      createrow(y-time,"Get Popular Movies","NO")
    }  
})
getcurrentmovie((working,time)=>
{
    console.log(time)
    if(working)
    {
      let y=new Date();
      createrow(y-time,"Get Current Movie","YES")
    }
    else
    {
      let y=new Date();
      createrow(y-time,"Get Current Movie","NO")
    }  
})
createnewmovie((working,time)=>
{
    console.log(time)
    if(working)
    {
      let y=new Date();
      createrow(y-time,"Create new movie","YES")
    }
    else
    {
      let y=new Date();
      createrow(y-time,"Create new movie","NO")
    }  
})
verifyuser((working,time)=>
{
    console.log(time)
    if(working)
    {
      let y=new Date();
      createrow(y-time,"Verify User","YES")
    }
    else
    {
      let y=new Date();
      createrow(y-time,"Verify User","NO")
    }  
})
getsimilarmovies((working,time)=>
{
    console.log(time)
    if(working)
    {
      let y=new Date();
      createrow(y-time,"Get Similar Movies","YES")
    }
    else
    {
      let y=new Date();
      createrow(y-time,"Get Similar Movies","NO")
    }  
})
setyoutubetrailer((working,time)=>
{
    console.log(time)
    if(working)
    {
      let y=new Date();
      createrow(y-time,"Set Youtube Trailer","YES")
    }
    else
    {
      let y=new Date();
      createrow(y-time,"Set Youtube Trailer","NO")
    }  
})
getmoviecast((working,time)=>
{
    console.log(time)
    if(working)
    {
      let y=new Date();
      createrow(y-time,"Get Movie Cast","YES")
    }
    else
    {
      let y=new Date();
      createrow(y-time,"Get Movie Cast","NO")
    }  
})
movieinfo((working,time)=>
{
    console.log(time)
    if(working)
    {
      let y=new Date();
      createrow(y-time,"Get Movie Info","YES")
    }
    else
    {
      let y=new Date();
      createrow(y-time,"Get Movie Info","NO")
    }  
})
checkemailpresent((working,time)=>
{
    console.log(time)
    if(working)
    {
      let y=new Date();
      createrow(y-time,"Check Mail Present","YES")
    }
    else
    {
      let y=new Date();
      createrow(y-time,"Check Mail Present","NO")
    }  
})
getmovies((working,time)=>
{
    console.log(time)
    if(working)
    {
      let y=new Date();
      createrow(y-time,"Get Movies(slick)","YES")
    }
    else
    {
      let y=new Date();
      createrow(y-time,"Get Movies(slick)","NO")
    }  
})
gettrailers((working,time)=>
{
    console.log(time)
    if(working)
    {
      let y=new Date();
      createrow(y-time,"Get Trailers(Slick)","YES")
    }
    else
    {
      let y=new Date();
      createrow(y-time,"Get Trailers(Slick)","NO")
    }  
})
englishmovies((working,time)=>
{
    console.log(time)
    if(working)
    {
      let y=new Date();
      createrow(y-time,"Get Eng Movies","YES")
    }
    else
    {
      let y=new Date();
      createrow(y-time,"Get Eng Movies","NO")
    }  
})
hindimovies((working,time)=>
{
    console.log(time)
    if(working)
    {
      let y=new Date();
      createrow(y-time,"Get Hin Movies(Slick)","YES")
    }
    else
    {
      let y=new Date();
      createrow(y-time,"Get Hin Movies(Slick)","NO")
    }  
})
sendmail((working,time)=>
{
    console.log(time)
    if(working)
    {
      let y=new Date();
      createrow(y-time,"Send Mail","YES")
    }
    else
    {
      let y=new Date();
      createrow(y-time,"Send Mail","NO")
    }  
})
login((working,time)=>
{
    console.log(time)
    if(working)
    {
      let y=new Date();
      createrow(y-time,"Login","YES")
    }
    else
    {
      let y=new Date();
      createrow(y-time,"Login","NO")
    }  
})
signup((working,time)=>
{
    console.log(time)
    if(working)
    {
      let y=new Date();
      createrow(y-time,"SignUp","YES")
    }
    else
    {
      let y=new Date();
      createrow(y-time,"SignUp","NO")
    }  
})