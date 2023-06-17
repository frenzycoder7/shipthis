import { useEffect, useState } from "react";
import {APiService} from "./apiService";

export const useApiRequestHook = (token:string , params:any) => {

    const apiService:APiService = new APiService(); 
    const [response, setResponse] = useState(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiService.getShowsRequest(params, token);
            setResponse(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false); 
        }
    }

    useEffect(() => {
        fetchData();
    }, [params]);

    const reftech = () => fetchData();
                   
  
    return { response, error, loading , reftech};
}