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

    get(url, tkn){
        return this.request(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tkn}`
            },
        });
    }

    authenticate(url, data){
        return this.request(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
    }

    post(url, tkn, data){
        return this.request(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tkn}`
            },
            body: JSON.stringify(data),
        });
    }

    put(url, tkn, data){
        return this.request(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tkn}`
            },
            body: JSON.stringify(data),
        });
    }

    delete(url, tkn){
        return this.remove(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tkn}`
            }
        });
    }
}

export const NorthWindClient = new APIClient();