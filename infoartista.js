const app = Vue.createApp({
    data() {
      return {
        personId: 17696, // ID de Kathryn Hahn
        apiKey: '0f1911236aa91d9d37ad2b1a76be3c5d', // Tu API Key de TMDb
        person: null,
        combinedCredits: [],
        knownFor: []
      };
    },
    computed: {
      imageUrl() {
        // Si no hay una foto de perfil disponible, mostrar un placeholder
        return this.person && this.person.profile_path 
          ? `https://image.tmdb.org/t/p/w500${this.person.profile_path}`
          : 'https://via.placeholder.com/200'; // Placeholder en caso de que no haya imagen
      }
    },
    methods: {
      async fetchPersonDetails() {
        try {
          // Petición para obtener los detalles de la persona
          const personResponse = await fetch(`https://api.themoviedb.org/3/person/${this.personId}?api_key=${this.apiKey}`);
          const personData = await personResponse.json();
          console.log('Person data:', personData); // Verifica si los datos de la persona llegan correctamente
          this.person = personData;
  
          // Petición para obtener los créditos combinados (películas y series)
          const creditsResponse = await fetch(`https://api.themoviedb.org/3/person/${this.personId}/combined_credits?api_key=${this.apiKey}`);
          const creditsData = await creditsResponse.json();
          console.log('Credits data:', creditsData); // Verifica si los créditos llegan correctamente
          this.combinedCredits = creditsData.cast;
          this.knownFor = this.combinedCredits.slice(0, 5); // Los primeros 5 conocidos
  
        } catch (error) {
          console.error('Error fetching data:', error); // Ver error si ocurre un problema
        }
      },
      getPosterUrl(posterPath) {
        // Verificar si la película tiene una imagen y devolver la URL correcta
        return posterPath 
          ? `https://image.tmdb.org/t/p/w200${posterPath}`
          : 'https://via.placeholder.com/100'; // Placeholder en caso de que no haya imagen
      }
    },
    mounted() {
      this.fetchPersonDetails();
    }
  });
  
  app.mount('#app');
  