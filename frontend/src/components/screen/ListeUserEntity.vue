<template>
  <div class="admin-container">
    <div class="admin-body">
      <Sidebar />
      <main class="admin-content">
        <Header :nav-items="adminNavItems" />
        <h1>Liste User Entity</h1>
        <div class="admin-section">
          <div class="balance">
            <table>
              <thead>
                <tr>
                  <th v-for="header in tableHeaders" :key="header">{{ header }}</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in listeUserEntite" :key="item.id_UserEntity">
                  <tr>
                    <td>
                      <a @click.prevent="openDetailModal(item.id_UserEntity)">{{ item.user_ID?.userName }}</a>
                    </td>
                    <td>{{ item.entity_ID?.name }}</td>
                    <td>
                      <button class="action-button update" @click="openUpdateModal(item)">Update</button>
                      <button class="action-button delete" @click="deleteUserEntity(item.id_UserEntity)">Delete</button>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <ShowDetail :showModal="showDetailModal" @close="closeDetailModal">
            <h2>Détails de l'association</h2>
            <!-- <p><strong>ID:</strong> {{ selectedUserEntity?.id_UserEntity }}</p> -->
            <p><strong>User:</strong> {{ selectedUserEntity?.user_ID?.userName }}</p>
            <p><strong>Entity:</strong> {{ selectedUserEntity?.entity_ID?.name }}</p>
          </ShowDetail>

          <ShowUpdate :showModal="showUpdateModal" @close="closeUpdateModal" @submit="submitUpdate">
            <InputChamp v-model="updateForm.user_ID" label="User ID" />
            <InputChamp v-model="updateForm.entity_ID" label="Entity ID" />
          </ShowUpdate>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import Header from '../molecule/Header.vue';
import Sidebar from '../molecule/Sidebar.vue';
import ShowDetail from '../molecule/ShowDetail.vue';
import ShowUpdate from '../molecule/ShowUpdate.vue';
import InputChamp from '../molecule/InputChamp.vue';
import Liste from '@/services/DAOService';

const daoServices = new DAOService;
const tableHeaders = ['User', 'Entity', 'Options'];
const listeUserEntite = ref([]);
const adminNavItems = [
  { name: 'Liste Entity', route: '/liste-entity' },
  { name: 'Liste User', route: '/liste-user' },
  { name: 'Liste User Entity', route: '/liste-user-entity' },
];

const showDetailModal = ref(false);
const showUpdateModal = ref(false);
const selectedUserEntity = ref(null);
const updateForm = ref({
  user_ID: '',
  entity_ID: '',
});
const errorMessage = ref('');

onMounted(async () => {
  try {
    listeUserEntite.value = await daoServices.findAllUserEntity();
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
    errorMessage.value = 'Une erreur s’est produite lors du chargement des données.';
  }
});

const openDetailModal = async (id) => {
  try {
    selectedUserEntity.value = await daoServices.findByIdUserEntity(id);
    showDetailModal.value = true;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails:', error);
    errorMessage.value = 'Une erreur s’est produite lors de la récupération des détails.';
  }
};

const closeDetailModal = () => {
  showDetailModal.value = false;
  selectedUserEntity.value = null;
};

const openUpdateModal = (userEntity) => {
  updateForm.value = {
    user_ID: userEntity.user_ID?.id_User || '',
    entity_ID: userEntity.entity_ID?.id_Entity || '',
  };
  selectedUserEntity.value = userEntity;
  showUpdateModal.value = true;
};

const closeUpdateModal = () => {
  showUpdateModal.value = false;
  selectedUserEntity.value = null;
  updateForm.value = { user_ID: '', entity_ID: '' };
};

const submitUpdate = async () => {
  try {
    await daoServices.updateUserEntity(selectedUserEntity.value.id_UserEntity, updateForm.value);
    const index = listeUserEntite.value.findIndex(
      (ue) => ue.id_UserEntity === selectedUserEntity.value.id_UserEntity
    );
    if (index !== -1) {
      listeUserEntite.value[index] = { ...listeUserEntite.value[index], ...updateForm.value };
    }
    closeUpdateModal();
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    errorMessage.value = 'Une erreur s’est produite lors de la mise à jour.';
  }
};

const deleteUserEntity = async (id) => {
  if (confirm('Voulez-vous vraiment supprimer cette association ?')) {
    try {
      await daoServices.deleteUserEntity(id);
      listeUserEntite.value = listeUserEntite.value.filter((ue) => ue.id_UserEntity !== id);
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