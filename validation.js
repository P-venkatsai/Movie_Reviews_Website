//signup username validation
let Verificationcount=0;
let emailverification=false;

let su=0;
let se=0;
let sp=0;
let srp=0;
document.getElementById("signupusername").addEventListener("input",(e)=>
{
    let s=e.target.value;
    let a=s.charCodeAt(0);
    if(s.length<7||(!((a>64&&a<91)||(a>96&&a<123))))
    {
        su=0;
        enable();
        document.getElementById("signupusernamevalid").style.color="red";
        document.getElementById("signupusernamevalid").innerHTML="*UserName Should Be Atleast 6 Characters And First Character Should Be Alphabet"
    }
    else
    {
        document.getElementById("signupusernamevalid").innerHTML=""
        checkusername((user)=>
        {
            if(user=="ok")
            {
                  console.log("ok")
                  su=1;
            }
            else
            {
                document.getElementById("signupusernamevalid").style.color="red";
                document.getElementById("signupusernamevalid").innerHTML="*UserName already present"
                su=0;        
            }
            enable();
        })
        enable();
    }
})
//signup email validation
document.getElementById("signupemail").addEventListener("input",(e)=>
{
let reg=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
let x=reg.test(e.target.value);
if(!x)
{
    se=0;
    enable();
    document.getElementById("signupemailvalid").style.color="red";
    document.getElementById("signupemailvalid").innerHTML="*Invalid Email"
}
else
{
    document.getElementById("signupemailvalid").style.color="#212529";
    document.getElementById("signupemailvalid").innerHTML="Your email will not ever be shared"; 
    checkifpresent((user)=>
    {
        console.log(user)
       if(user=="ok")
       {
        document.getElementById("verifybutton").disabled=false;
        document.getElementById("signupemailvalid").style.color="#212529";
        document.getElementById("signupemailvalid").innerHTML="Your email will not ever be shared"; 
         se=1
         enable()
        }
       else
       {
        document.getElementById("verifybutton").disabled=true;
        document.getElementById("signupemailvalid").style.color="red";
        document.getElementById("signupemailvalid").innerHTML="Email already present"
        se=0
        enable()
       }
    })
}
})
//password validation
let password;
document.getElementById("signuppassword").addEventListener("input",(e)=>
{
   password=e.target.value;
   let cap=0;
   let spec=0;
   for(let i=0;i<password.length;i++)
   {
       let a=password.charCodeAt(i);
       if(!((a>64&&a<91)||(a>96&&a<123)))
       {
          spec++;
       }
       if((a>64&&a<91))
       {
           cap++;
       }
   }
   if(spec<1||cap<1)
   {
    sp=0;
    enable();
    document.getElementById("signuppasswordvalid").style.color="red";
    document.getElementById("signuppasswordvalid").innerHTML="*Password should contain atleast one special character and capital letter";    
  }
   else
   {
       sp=1;
       enable();
    document.getElementById("signuppasswordvalid").style.color="#212529";
    document.getElementById("signuppasswordvalid").innerHTML="";    
   }
})
document.getElementById("signupconfirmpassword").addEventListener("input",(e)=>
{
let pass=e.target.value;
if(pass!==password)
{
    srp=0;
    enable();
    document.getElementById("signupretypepasswordvalid").style.color="red";
    document.getElementById("signupretypepasswordvalid").innerHTML="Password Doesn't Match";    
}
else
{
    document.getElementById("signupretypepasswordvalid").innerHTML="";    
    srp=1;
    enable();
}
})
let enable=()=>
{
    //console.log(su,se,sp,srp)
    if(su==1&&se==1&&sp==1&&srp==1&&emailverification)
    {
        document.getElementById("signup").disabled=false;
    }
    else
    {
        document.getElementById("signup").disabled=true;
    }
}
/*document.querySelector("#verify").addEventListener("click",(e)=>
{
    console.log("hai")
    //checkifpresent()
})*/
function checkifpresent(callback)
{
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            let d=JSON.parse(e.target.responseText);
            console.log(d.user)
            callback(d.user)
        }
    })
    let email=document.getElementById("signupemail").value
    req.open("GET",`https://young-headland-05683.herokuapp.com/users/present/${email}`)
    req.send()
    //console.log(document.getElementById("signupemail").value)
}
    document.getElementById("verifybutton").addEventListener("click",(e)=>
    {
        e.preventDefault()
        const req=new XMLHttpRequest()
    let params=
    {
        name:`${document.getElementById("signupemail").value}`,
    }
        req.addEventListener("readystatechange",(e)=>
        {
            if(e.target.readyState==4&&e.target.status==200)
            {
                let d=JSON.parse(e.target.responseText)
                document.querySelector("#verifyText").innerHTML=`
                <input type="Email" placeholder="Enter Verification code" class="form-control"
                 id="mailtext">`
                 //console.log(d)
                 seteventListener(d)
            }
            else if(e.target.readyState==4)
            {
             //console.log("hai")
            }
        })
        req.open("POST",`https://peaceful-chamber-48058.herokuapp.com/`,true)
      req.setRequestHeader('Content-type','application/json')
        req.send(JSON.stringify(params))
    })
function seteventListener(mailtext)
{
    //console.log(mailtext)
    document.getElementById("mailtext").addEventListener("input",(e)=>
    {
        //console.log(mailtext.msg,document.getElementById("mailtext").value)
        if(mailtext.msg==document.getElementById("mailtext").value)
        {
            document.getElementById("verify").innerHTML=
            `<div class="col-12">Verification Sucessfull</div>`
            emailverification=true;
            enable()
        }
    })
}
//emailverification=true;
document.querySelector("#signup").addEventListener("click",(e)=>
{
    e.preventDefault()
    const now = moment()
    $('#loginsignup').modal('show')
    document.getElementById("output").style.backgroundColor="blue";
    document.getElementById("output").innerHTML="Waiting for response"
    const req=new XMLHttpRequest()
   let params=
   {
      username:`${document.getElementById("signupusername").value}`,
      email:`${document.getElementById("signupemail").value}`,
      password:`${document.getElementById("signuppassword").value}`,
      date:`${now.format('DD-MM-YYYY')}`
   }
    req.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            let d=JSON.parse(e.target.responseText)
            console.log(d.token)
            if(d!=null)
            {
                localStorage.setItem("token",d.token);
                let x=document.getElementById("signintoggle")
                  if(x)
                  {
                      createlogout(x)
                  }
                  let y=document.getElementById("signouttoggle")
                  if(y)y.remove()
                $('#signupmodal').modal('hide')
                $('#loginsignup').modal('show')
                console.log(localStorage.getItem("signin"))
                document.getElementById("output").style.backgroundColor="green";
                document.getElementById("output").innerHTML="NEW USER CREATED" 
                removemodal() 
                incrementuser()  
            }
            else
            {
                document.getElementById("output").style.backgroundColor="red";
                document.getElementById("output").innerHTML="Server are busy try later"
                removemodal()
            }
        }
        else if(e.target.readyState==4)
        {
            document.getElementById("output").style.backgroundColor="red";
                document.getElementById("output").innerHTML="Server are busy try later"
        }
    })
    req.open("POST",`https://young-headland-05683.herokuapp.com/users`,true)
    req.setRequestHeader('Content-type','application/json')
    req.send(JSON.stringify(params))
})
document.getElementById("signin").addEventListener("click",(e)=>
{
    e.preventDefault()
    console.log("hai")
    $('#loginsignup').modal('show')
    document.getElementById("output").style.backgroundColor="blue";
    document.getElementById("output").innerHTML="Waiting for response"
    const req=new XMLHttpRequest()
        req.addEventListener("readystatechange",(e)=>
        {
            document.getElementById("signin").disabled=true;
            console.log(e.target.responseText)
            if(e.target.readyState==4&&e.target.status==200)
            {
                let d=JSON.parse(e.target.responseText)
                localStorage.setItem("uid",d.uid)
                localStorage.setItem("token",d.token)
                  let x=document.getElementById("signintoggle")
                  if(x)createlogout(x)
                  let y=document.getElementById("signouttoggle")
                  if(y)y.remove()
                    let useless=signed(true)
                    $('#loginModal').modal('hide')
                    $('#loginsignup').modal('show')
                    document.getElementById("output").style.backgroundColor="green";
                    document.getElementById("output").innerHTML="Login Succesful"   
                    removemodal()
            }
            else if(e.target.readyState==4)
            {
                //console.log("hai bro")
                $('#loginsignup').modal('show')
                document.getElementById("signin").disabled=false;
                document.getElementById("output").style.backgroundColor="red";
                document.getElementById("output").innerHTML="Invalid Username or Password"  
                removemodal()
            }
        })
        let email=document.getElementById("signinemail").value
        let password=document.getElementById("signinpassword").value
        let params=
        {
            username:email,
            password:password
        }
        //console.log(password)
        req.open("POST",`https://young-headland-05683.herokuapp.com/users/login`,true)
        req.setRequestHeader('Content-type','application/json')
          req.send(JSON.stringify(params))  
})
let removemodal=()=>
{
    //console.log("hai")
    setTimeout(()=>
    {
        $('#loginsignup').modal('hide')
        document.getElementById("output").innerHTML=""   
        document.getElementById("output").style.backgroundColor="white";
    },1000)
}
let signed=(input)=>
{
    return true
}
 let createlogout=(x)=>
 {
     x.innerHTML=`<button class="btn btn-dark" id="logout"
     style="color:rgba(255,255,255,.5);">Log out</button>`;
     logoutevent()
 }   
 let logoutevent=()=>
 {
     document.getElementById("logout").addEventListener("click",(e)=>
     {
         localStorage.clear()
         location.assign("index.html")     
     })
 }
 setTimeout(()=>
    {
        checklogin()     
    },2000)
 function checklogin()
 {
    const req=new XMLHttpRequest()
        req.addEventListener('readystatechange',(e)=>
        {
            if(e.target.readyState==4&&e.target.status==200)
            {
                let x=document.getElementById("signintoggle")
                if(x)
                {
                    createlogout(x)
                }
                let y=document.getElementById("signouttoggle")
                if(y)y.remove()
            }
            else if(e.target.readyState==4)
            {
                    console.log("hai");          
            }
        }) 
        req.open("GET",`https://young-headland-05683.herokuapp.com/users/verifyuser`)
        let token=localStorage.getItem("token")
        req.setRequestHeader('Authorization',`Bearer ${token}`)
        req.send() 
 }
 let checkusername=(callback)=>
 {
    const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            let d=JSON.parse(e.target.responseText);
            console.log(d.user)
            callback(d.user)
        }
    })
    let username=document.getElementById("signupusername").value
    req.open("GET",`https://young-headland-05683.herokuapp.com/users/present/username/${username}`)
    req.send()
 }
 document.getElementById("closesignup").addEventListener("click",(e)=>
 {
    let emailverification=false;
    let su=0;
    let se=0;
    let sp=0;
    let srp=0; 
      document.getElementById("signupusername").value=""
      document.getElementById("signupemail").value=""
      document.getElementById("signuppassword").value=""
      document.getElementById("signupconfirmpassword").value=""
      document.querySelector("#verifyText").innerHTML=""
 })
 let incrementuser=()=>
 {
     const now = moment()
     console.log(now.format('DD-MM-YYYY'))
     const req=new XMLHttpRequest()
    req.addEventListener("readystatechange",(e)=>
    {
        if(e.target.readyState==4&&e.target.status==200)
        {
            let d=JSON.parse(e.target.responseText);
            console.log(d)
            if(d==null)
            {
                createnewdate()
            }
        }
    })
    let token=localStorage.getItem("token")
    req.open("GET",`https://young-headland-05683.herokuapp.com/trackusers/${now.format('DD-MM-YYYY')}`)
    req.setRequestHeader('Authorization',`Bearer ${token}`)
    req.send()     
 }
let createnewdate=()=>
{
    const now = moment()
    now.format('DD/MM/YYYY')
    let params=
    {
        _id:`${now.format('DD-MM-YYYY')}`,
        numberusers:1,
        time:now.valueOf(),
        uid:`1234`
    }
    const req=new XMLHttpRequest()
   req.addEventListener("readystatechange",(e)=>
   {
       if(e.target.readyState==4&&e.target.status==200)
       {
           let d=JSON.parse(e.target.responseText);
           console.log(d)
       }
       else if(e.target.readyState==4)
       {
           console.log(params)
       }
   })
   let token=localStorage.getItem("token")
   req.open("POST",`https://young-headland-05683.herokuapp.com/trackusers/newdate/1`,true)
   req.setRequestHeader('Content-type','application/json')
   req.setRequestHeader('Authorization',`Bearer ${token}`)
   req.send(JSON.stringify(params))
}
console.log(localStorage.getItem("token"))
