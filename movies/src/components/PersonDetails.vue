<template>
    <div class="person-details">
      <div v-if="person">
        <img :src="person.profile_path ? `https://image.tmdb.org/t/p/w300${person.profile_path}` : ''" alt="Profile" class="profile-pic"/>
        <div class="info">
          <h1>{{ person.name }}</h1>
          <p><strong>Fecha de nacimiento:</strong> {{ person.birthday || 'No disponible' }}</p>
          <p><strong>Biografía:</strong> {{ person.biography || 'No disponible' }}</p>
        </div>
      </div>
      <div v-else>
        <p>Cargando...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        person: null,
      };
    },
    created() {
      this.fetchPersonDetails();
    },
    methods: {
      async fetchPersonDetails() {
        const url = 'https://api.themoviedb.org/3/person/82055?language=es-MX'; // URL correcta con idioma
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjE5MTEyMzZhYTkxZDlkMzdhZDJiMWE3NmJlM2M1ZCIsIm5iZiI6MTcyOTI3NjcwNy4wMTYyNzUsInN1YiI6IjY3MDZiZmIwYTg4NjE0ZDZiMDhiMGYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zlVJFWVDBx0R9gUhQR8X0eNL6SKVUQW-m-HnwXpC7UY';
  
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
  
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
          }
  
          const data = await response.json();
          this.person = data;
        } catch (error) {
          console.error('Error al cargar los detalles:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .person-details {
    display: flex;
    padding: 20px;
    background-color: white;
    max-width: 900px;
    margin: 40px auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .profile-pic {
    width: 200px;
    height: auto;
    border-radius: 10px;
    margin-right: 20px;
  }
  .info {
    display: flex;
    flex-direction: column;
  }
  .info h1 {
    margin: 0;
    font-size: 2em;
  }
  .info p {
    margin: 10px 0;
  }
  </style>
  