<template>
  <div class="admin-container">
    <div class="admin-body">
      <Sidebar />
      <main class="admin-content">
        <Header :nav-items="adminNavItems" />

        
        <div class="admin-section">
            <form @submit.prevent="submitForm">
              <h1>Insertion User</h1>
              <InputChamp label="User name" v-model="usernameInsert" />
              <InputChamp label="Email" v-model="mailInsert" type="email" />
              <InputChamp label="Password" v-model="passwordInsert" type="password" />
              <button>Enregister</button>
              <p>{{ reponse.message }}</p>
            </form>
            
        </div>
      </main>
    </div>
  </div>
</template>
<script setup>
import Header from '../molecule/Header.vue'
import Sidebar from '../molecule/Sidebar.vue';
import InputChamp from '../molecule/InputChamp.vue';
import { ref } from 'vue';

import InsertionService from '@/services/InsertionService';

const insertService=new InsertionService();

const adminNavItems = [
  { name: 'Insertion Entity', route: '/insert-entity' },
  { name: 'Insertion User', route: '/insert-user' },
  { name: 'Insertion User Entity', route: '/insert-user-entity' },
];

const usernameInsert=ref('');
const mailInsert=ref('');
const passwordInsert=ref('');
const reponse=ref('');

const submitForm=async ()=>{
    try {
        reponse.value=await insertService.createUser(usernameInsert,mailInsert,passwordInsert);
    } catch (error) {
        alert(error);
        console.error("Erreur lors de la soumission du formulaire :", error);
    }
}
</script>

<style scoped>
.admin-container {
  background-color: #1a1a1a;
  color: white;
  min-height: 100vh;
}

.admin-body {
  display: flex;
}

.admin-content {
  margin-left: 200px;
  padding: 2rem;
  width: calc(100% - 200px);
}

@media (max-width: 768px) {
  .admin-body {
    margin-top: 60px;
  }

  .admin-content {
    margin-left: 0;
    width: 100%;
  }
}
</style>