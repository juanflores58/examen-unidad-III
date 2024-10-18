<template>
    <div id="app">
      <PersonDetails />
    </div>
  </template>
  
  <script>
  import PersonDetails from './components/PersonDetails.vue';
  
  export default {
    components: {
      PersonDetails
    }
  };
  </script>
  
  <style>
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }
  </style>
  