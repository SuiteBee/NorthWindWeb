import {
    getReasonPhrase
} from "http-status-codes";

const API_BASE_URL = "https://localhost:44303/api/";

class APIClient{
    async request(url, options){
        const response = await fetch(`${API_BASE_URL}${url}`, options);
        if(!response.ok){
            return this.notOk(response);
        }
        
        return await response.json();
    }

    async remove(url, options){
        const response = await fetch(`${API_BASE_URL}${url}`, options);
        if(!response.ok){
            return this.notOk(response);
        }
        
        return await response;
    }

    async notOk(response){
        const error = new Error(`HTTP Error: ${response.status} ${getReasonPhrase(response.status)}`);
        error.status = response.status;
        
        try{
            error.response = await response.json();
        }catch{
            error.response = null;
        }

        throw error;
    }

    get(url){
        return this.request(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    post(url, data){
        return this.request(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }

    put(url, data){
        return this.request(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }

    delete(url){
        return this.remove(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
    }
}

export const NorthWindClient = new APIClient();