<template>
  <div class="admin-container">
    <div class="admin-body">
      <Sidebar />
      <main class="admin-content">
        <Header :nav-items="adminNavItems" />
        <h1>Liste Entity</h1>
        <div class="admin-section">
          <div class="balance">
            <table>
              <thead>
                <tr>
                  <th v-for="header in tableHeaders" :key="header">{{ header }}</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in listeEntite" :key="item.id_Entity">
                  <tr>
                    <td>
                      <a @click.prevent="openDetailModal(item.id_Entity)">{{ item.name }}</a>
                    </td>
                    <td>
                      <button class="action-button update" @click="openUpdateModal(item)">Update</button>
                      <button class="action-button delete" @click="deleteEntity(item.id_Entity)">Delete</button>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <ShowDetail :showModal="showDetailModal" @close="closeDetailModal">
            <h2>Détails de l'entité</h2>
            <!-- <p><strong>ID:</strong> {{ selectedEntity?.id_Entity }}</p> -->
            <p><strong>Nom:</strong> {{ selectedEntity?.name }}</p>
          </ShowDetail>

          <ShowUpdate :showModal="showUpdateModal" @close="closeUpdateModal" @submit="submitUpdate">
            <InputChamp v-model="updateForm.name" label="Nom" />
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
import DAOService from '@/services/DAOService';

const daoServices = new DAOService();
const tableHeaders = ['Name', 'Options'];
const listeEntite = ref([]);
const adminNavItems = [
  { name: 'Liste Entity', route: '/liste-entity' },
  { name: 'Liste User', route: '/liste-user' },
  { name: 'Liste User Entity', route: '/liste-user-entity' },
];

const showDetailModal = ref(false);
const showUpdateModal = ref(false);
const selectedEntity = ref(null);
const updateForm = ref({
  name: '',
});
const errorMessage = ref('');

onMounted(async () => {
  try {
    listeEntite.value = await daoServices.findAllEntity();
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
    errorMessage.value = 'Une erreur s’est produite lors du chargement des données.';
  }
});

const openDetailModal = async (id) => {
  try {
    selectedEntity.value = await daoServices.findEntityById(id);
    showDetailModal.value = true;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails:', error);
    errorMessage.value = 'Une erreur s’est produite lors de la récupération des détails.';
  }
};

const closeDetailModal = () => {
  showDetailModal.value = false;
  selectedEntity.value = null;
};

const openUpdateModal = (entity) => {
  updateForm.value = {
    name: entity.name,
  };
  selectedEntity.value = entity;
  showUpdateModal.value = true;
};

const closeUpdateModal = () => {
  showUpdateModal.value = false;
  selectedEntity.value = null;
  updateForm.value = { name: '' };
};

const submitUpdate = async () => {
  try {
    await daoServices.updateEntity(selectedEntity.value.id_Entity, updateForm.value);
    const index = listeEntite.value.findIndex(
      (entity) => entity.id_Entity === selectedEntity.value.id_Entity
    );
    if (index !== -1) {
      listeEntite.value[index] = { ...listeEntite.value[index], ...updateForm.value };
    }
    closeUpdateModal();
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    errorMessage.value = 'Une erreur s’est produite lors de la mise à jour.';
  }
};

const deleteEntity = async (id) => {
  if (confirm('Voulez-vous vraiment supprimer cette entité ?')) {
    try {
      await daoServices.deleteEntity(id);
      listeEntite.value = listeEntite.value.filter((entity) => entity.id_Entity !== id);
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

.action-button.update {
  background-color: #03735E;
  color: white;
}

.action-button.delete {
  background-color: #BF5B45;
  color: white;
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
