<template>
  <div class="balance">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in data" :key="item">
          <tr>
            <td>{{ item }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  headers: {
    type: Array,
    required: true,
  },
});

</script>

<style>
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #d1d1d1;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

th,
td {
  padding: 1rem;
  text-align: left;
  font-family: 'ALATA', sans-serif;
}

th {
  background: #0a0a0a;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.9em;
}

td {
  color: #0a0a0a;
  font-size: 0.95em;
  border-bottom: 2px solid #1a1a1a;
  transition: color 0.3s ease;
}


/* tr td */
tr td {
  position: relative;
  transition: transform 0.3s ease, background 0.3s ease;
}

/* tr:hover td */

tr:hover td {
  background: #0a0a0acf;
  /* transform: translateX(-10px) scale(1.02); */
  cursor: pointer;
  border: none;
  color: #ffffff;
}

tr:hover td a {
  color: #ffffff;
}

a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

a:hover {
  text-decoration: underline;
}

.action-button.update {
  background-color: #03735E;
  color: white;
}

.action-button.delete {
  background-color: #BF5B45;
  color: white;
}
</style>