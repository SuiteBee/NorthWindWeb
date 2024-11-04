const API_BASE_URL = "https://localhost:44303/api/";

class APIClient{
    async request(url, options){
        const response = await fetch(`${API_BASE_URL}${url}`, options);
        if(!response.ok){
            const error = new Error("HTTP Error");
            error.status = response.status;
            error.response = await response.json();
            throw error;
        }
        
        return await response.json();
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
        return this.request(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
    }
}

export const NorthWindClient = new APIClient();