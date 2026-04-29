import { getReasonPhrase } from "http-status-codes";
import { AuthManager } from "@root/demo/CryptoDemo";
import { DB } from "@root/demo/AbsurdDb";

const API_BASE_URL = "http://localhost:5000/api/";

class MockAPI {
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

    authenticate(url, data){
        try {
            return AuthManager.authenticate(data.usr, data.pwd);
        } catch (response) {
            const error = new Error(`HTTP Error: ${response.status} ${getReasonPhrase(response.status)}`);
            error.status = response.status;
            throw error;
        }
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

//FOR LIVE DEMO (absurd-sql integration)
export const AbsurdClient = new MockAPI();