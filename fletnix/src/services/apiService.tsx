import axios from 'axios';

export class APiService {
    baseUrl: string;
    constructor() {
        this.baseUrl = 'http://172.20.131.217:7002/api/v1/';
    }

    loginRequest = async (username: string, password: string) => {
        const response = await axios.post(this.baseUrl + 'auth/login', {
            email: username,
            password: password
        }); 

        return response;
    }

    registerRequest = async (name: string, age: string, password: string, email: string) => {
        const response = await axios.post(this.baseUrl + 'auth/register', {
            name: name,
            age: age,
            password: password,
            email: email
        }); 

        return response;
    }


    getProfileRequest = async (token:string | null) => {
        const response = await axios.get(this.baseUrl + 'auth/validate', {
            headers: {
                Authorization: token
            }
        }); 

        return response;
    }

    getFilterOptionsRequest = async (token:any) => {

        const response = await axios.get(this.baseUrl + 'shows/filter-options', {
            headers: {
                Authorization: token
            }
        }); 
        return response;
    }

    getShowsRequest = async (params: any, token:string) => {
        const response = await axios.get(this.baseUrl + 'shows', {
            headers: {
                Authorization: token
            },
            params: params,
        }); 
        
        return response;
    }
}