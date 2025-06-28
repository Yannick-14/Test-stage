<template>
  <div class="admin-container">
    <div class="admin-body">
      <Sidebar />
      <main class="admin-content">
        <Header :nav-items="adminNavItems" />

        <h1>Liste User</h1>
        <div class="admin-section">
            <div class="balance">
            <table>
              <thead>
                <tr>
                  <th v-for="header in tableHeaders" :key="header">{{ header }}</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in data" :key="item">
                  <tr>
                    <td>
                      <a @click.prevent="openDetailModal(item.id_User)">{{ item.userName }}</a>
                    </td>
                    <td>{{ item.email }}</td>
                    <td>
                      <button class="action-button update" @click="openUpdateModal(item)">Update</button>
                      <button class="action-button delete" @click="deleteUser(item.id_User)">Delete</button>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <div v-if="showDetailModal" class="modal">
            <div class="modal-content">
              <h2>Détails de l'utilisateur</h2>
              <!-- <p><strong>ID:</strong> {{ selectedUser?.id_User }}</p> -->
              <p><strong>Nom:</strong> {{ selectedUser?.userName }}</p>
              <p><strong>Email:</strong> {{ selectedUser?.email }}</p>
              <button class="modal-button" @click="closeDetailModal">Fermer</button>
            </div>
          </div>

          <div v-if="showUpdateModal" class="modal">
          <div class="modal-content">
            <h2>Modifier l'utilisateur</h2>
            <form @submit.prevent="submitUpdate">
              <InputChamp v-model="updateForm.userName"/>
              <InputChamp v-model="updateForm.email" type="email"/>
              <InputChamp v-model="updateForm.password" type="password"/>
              <div class="form-actions">
                <button type="submit" class="modal-button">Enregistrer</button>
                <button type="button" class="modal-button cancel" @click="closeUpdateModal">Annuler</button>
              </div>
            </form>
          </div>
        </div>


        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../molecule/Header.vue'
import Sidebar from '../molecule/Sidebar.vue';
import Table from './Table.vue';
import Liste from '@/services/DAOService';
import { onMounted } from 'vue';
import InputChamp from '../molecule/InputChamp.vue';

const daoServices = new DAOService;

const adminNavItems = [
  { name: 'Liste Entity', route: '/liste-entity' },
  { name: 'Liste User', route: '/liste-user' },
  { name: 'Liste User Entity', route: '/liste-user-entity' },
];

const tableHeaders = ['Name', 'Email','Options'];

const data=ref([]);
const showDetailModal = ref(false);
const showUpdateModal = ref(false);
const selectedUser = ref(null);
const updateForm = ref({
  userName: '',
  email: '',
  password: '',
});
const errorMessage = ref('');
onMounted(async () => {
  try {
    data.value =await daoServices.findAllUser();
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
    errorMessage.value = 'Une erreur s’est produite lors du chargement des données.';
  }
});

const openDetailModal = async (id) => {
  try {
    selectedUser.value = await daoServices.findUserById(id);
    showDetailModal.value = true;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails:', error);
    errorMessage.value = 'Une erreur s’est produite lors de la récupération des détails.';
  }
};

const closeDetailModal = () => {
  showDetailModal.value = false;
  selectedUser.value = null;
};

const openUpdateModal = (user) => {
  updateForm.value = {
    userName: user.userName,
    email: user.email,
    password: '',
  };
  selectedUser.value = user;
  showUpdateModal.value = true;
};

const closeUpdateModal = () => {
  showUpdateModal.value = false;
  selectedUser.value = null;
  updateForm.value = { userName: '', email: '', password: '' };
};


const submitUpdate = async () => {
  try {
    const updatedData = { ...updateForm.value };
    if (!updatedData.password) delete updatedData.password; // Ne pas envoyer le mot de passe s'il est vide
    await daoServices.updateUser(selectedUser.value.id_User, updatedData);
    // Mettre à jour la liste localement
    const index = data.value.findIndex((user) => user.id_User === selectedUser.value.id_User);
    if (index !== -1) {
      data.value[index] = { ...data.value[index], ...updatedData };
    }
    closeUpdateModal();
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    errorMessage.value = 'Une erreur s’est produite lors de la mise à jour.';
  }
};

const deleteUser = async (id) => {
  if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
    try {
      await daoServices.deleteUser(id);
      data.value = data.value.filter((user) => user.id_User !== id);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      errorMessage.value = 'Une erreur s’est produite lors de la suppression.';
    }
  }
};

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

.action-button {
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* .action-button.update {
  background-color: #4caf50;
  color: white;
}

.action-button.delete {
  background-color: #f44336;
  color: white;
} */

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #2a2a2a;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

/* .modal-button {
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
}

.modal-button.cancel {
  background-color: #f44336;
} */

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
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