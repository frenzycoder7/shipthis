import { Button, CircularProgress, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { APiService } from "../services/apiService";

export default function RegisterScreen() {

  const apiService: APiService = new APiService();

  const [user, updateUser] = useState({
    username:'gaurav4149singh@gmail.com',
    password:'G@123aurav',
    name:'Gaurav Singh',
    age: '0',
  });
  const navigate = useNavigate();

  const [isLoading , setIsLoading] = useState(false);

  const registerRequest = async () => {
    try {
      if(user.username === '' || user.password === '' || user.name === '' || user.age == '0') {
        alert('Please fill all fields');
      }else {
        setIsLoading(true);
        const response = await apiService.registerRequest(user.name, user.age, user.password,user.username);
        console.log(response.data)
        if(response.status === 201) {
          alert('User registered successfully');
          setIsLoading(false);
          navigate('/'); 
        }else {
          setIsLoading(false);
          alert('Invalid credentials');
        }
      }
    } catch (error:any) {
      console.log(error);
      alert(error.response.data.message);
      setIsLoading(false); 
    }
  }
  return (
    <div style={{paddingLeft:'40%', paddingRight:'40%'}}>
      <Stack direction={"column"}>
        <Typography variant="h4" component="h4" gutterBottom align="center"> Login </Typography>

        <div style={{height:'20px'}}></div>
        <TextField type="text" placeholder="Please enter your email" onChange={(e) => {
          updateUser({...user, username:e.target.value})
        }} value={user.username} />

        <div style={{height:'20px'}}></div>
        <TextField type="password" placeholder="Please enter your password" onChange={(e) => {
          updateUser({...user, password:e.target.value})
        }} value={user.password} />
        <div style={{height:'20px'}}></div>
        
        <TextField type="text" placeholder="Please enter your name" onChange={(e) => {
          updateUser({...user, name:e.target.value})
        }} value={user.name} />
        <div style={{height:'20px'}}></div>
        
        <TextField type="text" placeholder="Please enter your age" onChange={(e) => {
          updateUser({...user, age:e.target.value})
        }} value={user.age} />
        <div style={{height:'20px'}}></div>
        
        {
          isLoading ? <div style={{display:'flex', justifyContent:'center'}}>
              <CircularProgress color="secondary" />
          </div> : <Button variant="contained" onClick={registerRequest}>
          Register
        </Button>  
        }

        <div style={{height:'20px'}}></div>

        {
          isLoading ? null : <div style={{display:'flex', justifyContent:'center'}}>
            <Typography>Already have an account? <Link to={'/'}>Login</Link> </Typography>           

          </div>
        }
      </Stack> 
    </div>
  )
}
