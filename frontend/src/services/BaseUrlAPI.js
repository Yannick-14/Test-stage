import axios from "axios";

class BaseUrlAPI
{
    getApi() {
        const apiClient = axios.create({
            baseURL: 'http://localhost:3000/'
        });
        return apiClient;
    }
}
export default BaseUrlAPI;