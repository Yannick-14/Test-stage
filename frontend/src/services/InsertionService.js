import BaseUrlAPI from './BaseUrlAPI.js';
const baseUrlAPI = new BaseUrlAPI();

class InsertionService {
    async createUser(usernameInsert,mail,pwd) {
        try {
            const body={
                userName:usernameInsert.value,
                email:mail.value,
                password: pwd.value
            };
            const response = await baseUrlAPI.getApi().post('users',body);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createEntity(nameInsert) {
        try {
            console.log(nameInsert.value);
            
            const body={
                name:String(nameInsert.value)
            };
            const response = await baseUrlAPI.getApi().post('entities',body);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createUserEntity(data) {
        try {
            const response = await baseUrlAPI.getApi().post('user-entities',data);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default InsertionService;