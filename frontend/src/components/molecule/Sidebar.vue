<script setup></script><template>
  <nav class="sidebar">
    <ul>
      <li v-for="item in navItems" :key="item.name">
        <router-link :to="item.route" active-class="actived">
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const navItems = ref([
  { name: 'Administrateur', route: '/' },
  { name: 'Listes', route: '/listes' },
]);
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  background-color: #000000;
  color: #FFFFFF;
  padding-top: 20px;
  z-index: 99;
  font-family: 'ALATA', sans-serif;
}

.sidebar ul {
  list-style: none;
  padding: 70% 0 0 0;
}
/* Astralaga */

.sidebar li {
  margin: 10px 0;
}

.sidebar a {
  color: #FFFFFF;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.sidebar a:hover {
  background-color: #333333;
}

.sidebar a.actived {
  background-color: #1a1a1a; /* Gris pour la route active */
  font-weight: bold;
}

.sidebar i {
  margin-right: 10px;
  font-size: 1.2em;
}
</style>