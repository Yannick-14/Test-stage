import BaseUrlAPI from './BaseUrlAPI.js';
const baseUrlAPI = new BaseUrlAPI();

class Liste {
    async findAllUser() {
        try {
            const response = await baseUrlAPI.getApi().get('users');
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async findUserById(id) {
        try {
            const response = await baseUrlAPI.getApi().get(`users/${id}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id, userData) {
        try {
            const response = await baseUrlAPI.getApi().put(`users/${id}`, userData);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const response = await baseUrlAPI.getApi().delete(`users/${id}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async findAllEntity() {
        try {
            const response = await baseUrlAPI.getApi().get('entities');
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async findEntityById(id) {
        try {
            const response = await baseUrlAPI.getApi().get(`entities/${id}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateEntity(id, userData) {
        try {
            const response = await baseUrlAPI.getApi().put(`entities/${id}`, userData);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteEntity(id) {
        try {
            const response = await baseUrlAPI.getApi().delete(`entities/${id}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async findAllUserEntity() {
        try {
            const response = await baseUrlAPI.getApi().get('user-entities');
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async findByIdUserEntity(id) {
        try {
            const response = await baseUrlAPI.getApi().get(`user-entities/${id}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateUserEntity(id, userData) {
        try {
            const response = await baseUrlAPI.getApi().put(`user-entities/${id}`, userData);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteUserEntity(id) {
        try {
            const response = await baseUrlAPI.getApi().delete(`user-entities/${id}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default Liste;