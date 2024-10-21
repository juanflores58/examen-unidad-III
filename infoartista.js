const app = Vue.createApp({
  data() {
    return {
      selectedArtistId: 17696, // ID inicial (Kathryn Hahn)
      apiKey: '0f1911236aa91d9d37ad2b1a76be3c5d',
      person: null,
      combinedCredits: [],
      knownFor: [],
      artists: [], // Lista de artistas para seleccionar
    };
  },
  computed: {
    imageUrl() {
      return this.person && this.person.profile_path 
        ? `https://image.tmdb.org/t/p/w500${this.person.profile_path}`
        : 'https://via.placeholder.com/200'; // Placeholder si no hay imagen
    },
    gender() {
      if (this.person && this.person.gender) {
        return this.person.gender === 1 ? 'Female' : 'Male'; // 1 para femenino, 2 para masculino
      }
      return 'Not available';
    }
  },
  methods: {
    async fetchArtists() {
      // Aquí puedes hacer una llamada a la API para obtener la lista de artistas, o puedes definirlos manualmente.
      const response = await fetch('https://api.themoviedb.org/3/person/popular?api_key=' + this.apiKey);
      const data = await response.json();
      this.artists = data.results; // Guarda la lista de artistas
    },
    async getCast() {
      try {
        // Obtener detalles del artista seleccionado
        const personResponse = await fetch(`https://api.themoviedb.org/3/person/${this.selectedArtistId}?api_key=${this.apiKey}`);
        const personData = await personResponse.json();
        this.person = personData;

        // Obtener los créditos combinados (películas y series)
        const creditsResponse = await fetch(`https://api.themoviedb.org/3/person/${this.selectedArtistId}/combined_credits?api_key=${this.apiKey}`);
        const creditsData = await creditsResponse.json();
        this.combinedCredits = creditsData.cast;
        this.knownFor = this.combinedCredits.slice(0, 5); // Los primeros 5 conocidos

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    getPosterUrl(posterPath) {
      return posterPath 
        ? `https://image.tmdb.org/t/p/w200${posterPath}`
        : 'https://via.placeholder.com/100'; // Placeholder si no hay imagen
    }
  },
  mounted() {
    this.fetchArtists(); // Llamada para obtener la lista de artistas
    this.getCast(); // Obtener la información inicial del artista
  }
});

app.mount('#app');
