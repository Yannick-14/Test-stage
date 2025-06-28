<template>
  <header class="header">
    <nav class="nav">
      <router-link
        v-for="item in navItems"
        :key="item.name"
        :to="item.route"
        custom
        v-slot="{ navigate, isActive }"
      >
        <span
          class="nav-link"
          :class="{ 'active': isActive, 'clicked': isClicked }"
          @click="handleNavigate(navigate)"
        >
          <i class="fas fa-home"></i> {{ item.name }}
        </span>
      </router-link>
    </nav>
  </header>
</template>

<script setup>
import { ref,defineProps } from 'vue';

const props = defineProps({
  navItems: {
    type: Array,
    required: true,
  },
});

const isClicked = ref(false);

const handleNavigate = (navigate) => {
  isClicked.value = true;
  setTimeout(() => {
    navigate();
    isClicked.value = false;
  }, 200);
};
</script>

<style scoped>
.header {
  position:relative;
  width: 96%;
  background-color: #000000;
  color: #FFFFFF;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2% 5%;
  margin-top:-3%;
  margin-left:-3%;
  z-index: 100;
  font-family: "ALATA";
}

.nav {
  display: flex;
  align-items: center;
  justify-content:center;
  gap: 22px;
}

.nav-link {
  color: #FFFFFF;
  text-decoration: none;
  font-size: 21px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.nav-link i {
  margin-right: 8px;
  font-size: 1.2em;
}

.nav-link.active {
  color: #03735E; /* Rouge pour l'élément actif */
  font-weight: bold;
}

.nav-link:hover {
  color: #D0D0D0;
  transform: scale(1.05);
  text-decoration:underline;
}

.nav-link.clicked {
  animation: pulse 0.2s ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); color: #03735E; }
  50% { transform: scale(1.1); color: #FFFFFF; }
  100% { transform: scale(1); color: #03735E; }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    padding: 15px;
  }

  .nav {
    justify-content: center;
    flex-wrap: wrap;
  }

  .nav-link {
    font-size: 1.2em;
  }
}

@media (max-width: 480px) {
  .nav-link {
    font-size: 1em;
  }
}
</style>