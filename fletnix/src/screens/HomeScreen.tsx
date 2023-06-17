import { useSelector } from "react-redux";
import { APiService } from "../services/apiService";
import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";

export default function HomeScreen() {
  const token = useSelector((state: any) => state.user.token);
  const apiService:APiService = new APiService();

  let timeOut:any = null;
  const [filterOptions, setFilterOptions] = useState<string[]>([]);

  const [isOpen, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState<any>(null);

  const [limit, setLimit] = useState(15);
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(0);
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      const params:any = {
        limit:limit, 
        skip:skip,
        search:search, 
      }
      if(filter !== 'all') {
        params['filter'] = filter;
      }
      
      const response = await apiService.getShowsRequest(params, token);
      if(response.status == 200){
        console.log(response.data)
        console.log(skip)
        setCount(response.data.count);
        setData(response.data.shows);
      }
    }
    fetchData();
  }, [limit, skip, search, filter]);


  useEffect(() => {
    fetchFilterOptions();
  }, []);


  const fetchFilterOptions = async () => {
    const response = await apiService.getFilterOptionsRequest(token);
    if(response.status == 200){
      console.log(response.data);
      setFilterOptions(response.data.types);
    }
  }


  const searchShows = async (e:any) => {
    if(timeOut != null){
      clearTimeout(timeOut);
      timeOut = null;
    } else {
      timeOut = setTimeout(() => {
        setSearch(e); 
      }, 1000);
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <>
      <Stack spacing={1} direction={"row"}> 
        <TextField type="string" placeholder="Search" onChange={(e) => searchShows(e.target.value)} />
        <FormControl size="medium" sx={{width:250}}>
            <InputLabel>
              Filter
            </InputLabel>

            <Select label="Filter" onChange={(e) => setFilter(e.target.value as string)} value={filter}>
              <MenuItem value="all">All</MenuItem>
              {
                filterOptions.map((item:any) => {
                  return <MenuItem key={item} value={item}>{item}</MenuItem>
                })
              }
            </Select>
        </FormControl>
        <Button variant="contained" color="warning" onClick={logout}>
        
          Logout
        </Button>
      </Stack>
      
      <Box sx={{paddingLeft: 10, paddingRight:10, paddingTop:5, paddingBottom:5, height:'70vh', overflow:'scroll', display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'10px'}}>
            {
              data.map((item:any) => {
                return <ShowItem key={item._id} data={item}  setCurrentData={setCurrentData} setOpen={setOpen} />
              })
            }
      </Box>
      <ShowDeails isOpen={isOpen} data={currentData} setOpen={setOpen}/>
      
      <Pagination count={Math.round(count/limit)} variant="outlined" shape="rounded"  onChange={(e,p) => setSkip(p)} />
    </> 
  )
}

interface ShowDetailsProps {
  isOpen: boolean;
  data: any;
  setOpen: any;
}

function ShowDeails({isOpen, data, setOpen}: ShowDetailsProps) {
  return (
    <Box>
      <Dialog open={isOpen} onClose={() => {setOpen(false)}} >
        <DialogTitle>
          {data == null ? "NOT FOUND" : data?.title}
        </DialogTitle>
        <DialogContent>
          {
            data == null ? "NOT FOUND" : Object.keys(data).map((key:any) => {
              return (
              <Stack direction={'row'} spacing={1}>
                <div style={{color:"green",}}> {key} </div> : {data[key]}
              </Stack>)
            } )
          }
        </DialogContent>

        <DialogActions>

        </DialogActions>
      </Dialog> 
    </Box>
  )
}


interface ShowItemProps {
  setCurrentData: any;
  setOpen: any;
  data: any;
}


function ShowItem({setCurrentData, setOpen, data}: ShowItemProps) {
  return (
    <Card variant={'outlined'} sx={{height: '200px'}} onClick={(e) => {
      setCurrentData(data);
      setOpen(true);
    }}>
      <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {data.type}
      </Typography>
      <Typography variant="h5" component="div">
        {data.title}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {data.rating}
      </Typography>
      <Typography variant="body2">
        {data.listed_in}
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    </Card>
  )
}

