import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import Regiser from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import { useEffect} from 'react'
import { APiService } from './services/apiService'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, setUser } from './store/user_slice'

const router = createBrowserRouter(
  [
    { path: '/home', element: <HomeScreen />},
    { path: '/register', element: <Regiser />},
    {path: '/',  element: <LoginScreen />, },
  ]
)


export default function App() {
    const apiService: APiService = new APiService();
    const token = useSelector((state: any) => state.user.token);
    const dispatch = useDispatch();

    useEffect(() => {
        validateToken();
    },[token]);

    const validateToken = async () => {
        try {
            const response = await apiService.getProfileRequest(token);
            if(response.status === 200) {
                dispatch(setUser(response.data.user));
                router.navigate('/home');
            } 
        } catch (error:any ) {
           if(error.response.status == 400){
            localStorage.removeItem('token');
            dispatch(setUser(null));
            dispatch(setToken(null));
            router.navigate('/');
           }
        } 
    }
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}
