<template>
  <div class="admin-container">
    <div class="admin-body">
      <Sidebar />
      <main class="admin-content">
        <Header :nav-items="adminNavItems" />

        <div class="admin-section">
          <form @submit.prevent="handleSubmit">
            <h1>Insertion User Entity</h1>
            <select v-model="selectedUser">
              <option v-for="user in users" :value="user.id_User">{{ user.userName }}</option>
            </select>

            <select v-model="selectedEntities" multiple>
              <option v-for="entity in entities" :value="entity.id_Entity">{{ entity.name }}</option>
            </select>

            <!-- <SelectChamp
              label="Choisir un utilisateur"
              :options="users"
              v-model="selectedUser"
              name="user"
            />
            <SelectChamp
              label="Choisir des entit s"
              :options="entities"
              v-model="selectedEntities"
              name="entities"
              :multiple="true"
            /> -->
            <button type="submit">Enregistrer</button>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Header from '../molecule/Header.vue'
import Sidebar from '../molecule/Sidebar.vue'
import SelectChamp from '../molecule/SelectChamp.vue'
import Button from '../molecule/Button.vue'
import { ref, onMounted } from 'vue'
import Liste from '@/services/DAOService'
import InsertionService from '@/services/InsertionService'

const adminNavItems = [
  { name: 'Insertion Entity', route: '/insert-entity' },
  { name: 'Insertion User', route: '/insert-user' },
  { name: 'Insertion User Entity', route: '/insert-user-entity' }
]

const users = ref([])
const entities = ref([])
const selectedUser = ref('')
const selectedEntities = ref([])
const daoService = new DAOService;
const insertService = new InsertionService();

onMounted(async () => {
  try {
    users.value = await daoService.findAllUser()
    entities.value = await daoService.findAllEntity()
  } catch (error) {
    console.error('Erreur chargement:', error)
  }
})

const handleSubmit = async () => {
  if (!selectedUser.value || selectedEntities.value.length === 0) {
    alert('Veuillez s lectionner un utilisateur et au moins une entit .')
    return
  }

  try {
    console.log(selectedUser);
    console.log(selectedEntities.value);
    
    const associations = selectedEntities.value.map(entityId => ({
      user_ID: selectedUser.value,
      entity_ID:entityId
    }))
    console.log("Associations  enregistrer :", associations)
    await Promise.all(associations.map(data => insertService.createUserEntity(data)))
    alert('Enregistrement terminer ')
  } catch (error) {
    console.error('Erreur insertion:', error)
  }
}
</script>

<style scoped>
.admin-container {
  background-color: #1a1a1a;
  color: white;
  min-height: 100vh;
  font-family: "ALATA";
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
