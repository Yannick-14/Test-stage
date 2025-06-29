import axios from "axios";

class BaseUrlAPI
{
    getApi() {
        const apiClient = axios.create({
            baseURL: 'http://localhost:3001/'
        });
        return apiClient;
    }
}
export default BaseUrlAPI;