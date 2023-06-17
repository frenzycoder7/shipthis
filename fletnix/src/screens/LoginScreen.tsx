import { useState } from "react";
import { APiService } from "../services/apiService"
import { useDispatch } from "react-redux";
import { setToken,setUser } from "../store/user_slice";
import { Link, useNavigate } from "react-router-dom";
import { Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";

export default function LoginScreen() {

  const apiService: APiService = new APiService();

  const [user, updateUser] = useState({
    username:'gaurav4149singh@gmail.com',
    password:'G@123aurav'
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading , setIsLoading] = useState(false);

  const loginRequest = async () => {
    if(user.username === '' || user.password === '') {
      alert('Please fill all fields');
    }else {
      setIsLoading(true);
      try {
        const response = await apiService.loginRequest(user.username, user.password);
          if(response.status === 200) {
        
          localStorage.setItem('token', response.data.token);
          dispatch(setToken(response.data.token));
          dispatch(setUser(response.data.user));
          setIsLoading(false);
          navigate('/home'); 
        }else {
          setIsLoading(false);
          alert('Invalid credentials');
        } 
      } catch (error:any) {
        alert(error.response.data.message);
        setIsLoading(false);
      } 
    }
  }


  return (
    <div style={{paddingLeft:'40%', paddingRight:'40%'}}>
      <Stack direction={"column"}>
        <Typography variant="h4" component="h4" gutterBottom align="center"> Login </Typography>

        <div style={{height:'20px'}}></div>
        <TextField type="string" placeholder="Please enter your email" onChange={(e) => {
          updateUser({...user, username:e.target.value})
        }} value={user.username} />

        <div style={{height:'20px'}}></div>
        <TextField type="password" placeholder="Please enter your password" onChange={(e) => {
          updateUser({...user, password:e.target.value})
        }} value={user.password} />
        <div style={{height:'20px'}}></div>
        
        {
          isLoading ? <div style={{display:'flex', justifyContent:'center'}}>
              <CircularProgress color="secondary" />
          </div> : <Button variant="contained" onClick={loginRequest}>
          Login
        </Button>  
        }

        <div style={{height:'20px'}}></div>

        {
          isLoading ? null : <div style={{display:'flex', justifyContent:'center'}}>
            <Typography>Don't have account? <Link to={'/register'}>Sign Up</Link> </Typography>           

          </div>
        }
      </Stack> 
    </div>

  )
}
