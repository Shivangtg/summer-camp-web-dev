import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useUserContext } from '../hooks/useUserContext';
import { useThemeContext } from '../hooks/useThemeContext';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const [authType,setAuthType]=useState("Login")
  const [password,setPassword]=useState("")
  const [username,setUsername]=useState("")
  const [useremail,setUseremail]=useState("")
  const [error,setError]=useState({isPresent:false,errorString:""})
  const {user,dispatchUser}=useUserContext()
  const {theme,dispatchTheme}=useThemeContext()


  const navigate=useNavigate()
  useEffect(()=>{
    if(sessionStorage.getItem("user")){
        dispatchUser({type:"Login",username:sessionStorage.getItem("user")})
        navigate("/")
    }
    
  },[])



  const handleSubmit=async ()=>{
    setError({isPresent:false,errorString:""})
    let endpoint;
    const backendOrigin=import.meta.env.VITE_BACKEND_ORIGIN
    if(authType=="Login"){
      endpoint="/login"
      const requestPoint=backendOrigin+endpoint
      const res=await fetch(requestPoint,{
        method:"POST",
        body:JSON.stringify({password:password,useremail:useremail}),
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
      const json=await res.json()
      if(!res.ok){
        setError({isPresent:true,errorString:json.error})
      }
      
      await dispatchUser({type:"Login",username:json.user.username})
      sessionStorage.setItem("user",json.user.username)
      await navigate("/")
    }else if(authType=="Signup"){
      endpoint="/signup"
      const requestPoint=backendOrigin+endpoint
      const res=await fetch(requestPoint,{
        method:"POST",
        body:JSON.stringify({username:username,password:password,useremail:useremail}),
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include" //cookies set hi nahi hote iske bina
        
      })
      const json=await res.json()
      if(!res.ok){
        setError({isPresent:true,errorString:json.error})
      }
      
      await dispatchUser({type:"Login",username:json.user.username})
      sessionStorage.setItem("user",json.user.username)
      await navigate("/")
    }

    
  }

  return (
    <div style={{display:"inline-flex",border:"2px solid gray",borderRadius:"2rem",padding:"3rem" ,alignContent:'center',justifyContent:"center",position:"relative"}}>
      
      <div style={{display:"flex",flexDirection:"column",alignContent:'center',justifyContent:"center", rowGap:"20px"}}>
        
        <div style={{width:"100%"}}>
          
          <Button variant="text" 
                  style={{border:"none",borderRadius:"0",borderBottom:(authType=="Login")?"2px solid red":"2px solid grey",width:"50%"}}
                  onClick={(e)=>{
                    setAuthType("Login")
                    setPassword("")
                    setUseremail("")
                    setUsername("")
                  }}
          >
            Login
          </Button>
          
          <Button variant="text" 
          style={{border:"none",borderRadius:"0",borderBottom:(authType=="Signup")?"2px solid red":"2px solid grey",width:"50%"}}
          onClick={(e)=>{
            setAuthType("Signup")
            setPassword("")
            setUseremail("")
            setUsername("")
          }}
          >
            Signup
          </Button>
        
        </div>

        {
          authType=="Login"?(
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",rowGap:"10px"}}>
              <TextField id="outlined-basic" label="Useremail" variant="outlined" value={useremail} onChange={(e)=>{setUseremail(e.currentTarget.value)}} />
              <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e)=>{setPassword(e.currentTarget.value)}} />
              <Button variant="contained" onClick={handleSubmit}>Log In</Button>
            </div>

          ):<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",rowGap:"10px"}}>
              <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e)=>{setUsername(e.currentTarget.value)}} />
              <TextField id="outlined-basic" label="Useremail" variant="outlined" value={useremail} onChange={(e)=>{setUseremail(e.currentTarget.value)}} />
              <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e)=>{setPassword(e.currentTarget.value)}} />
              <Button variant="contained" onClick={handleSubmit}>Sign Up</Button>
          </div>
        }

      </div>
      
      <img src="logo.svg" alt="" width={"300px"} style={{paddingLeft:"30px"}}/>
        
      {error.isPresent?<div className='error'>{error.errorString}</div>:null}
    </div>
  )
}

export default Authentication