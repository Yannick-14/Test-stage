<template>
    <button></button>
</template>
<script setup></script>
<style>
button {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  font-size: 16px;
  background-color: #020202;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
  font-family: "ALATA";
  width:20%;
  transition: background-color 0.2s ease-in-out;
}

button:hover {
  background-color: #0a0a0acf;
  color: #fff;
}

form {
  margin-top:4%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items:center;
  justify-content:center;
  /* margin:0 auto; */
  width:100%;
}
h1
{
  font-family: "Astralaga";
}

.modal-button {
  padding: 1rem 1rem;
  margin: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #03735E;
  color: white;
  width:70%;
}

.modal-button.cancel {
  background-color: #f44336;
}


</style>