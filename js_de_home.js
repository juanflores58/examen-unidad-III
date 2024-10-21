const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjE5MTEyMzZhYTkxZDlkMzdhZDJiMWE3NmJlM2M1ZCIsIm5iZiI6MTcyOTQ3MDQ5NC4yMTE0MzcsInN1YiI6IjY3MDZiZmIwYTg4NjE0ZDZiMDhiMGYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.snL8HmtpWNPRre3ekS6LSb20PGPJ3djfNRLuFx9_CMw'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const api_key = '0f1911236aa91d9d37ad2b1a76be3c5d'; 

async function loadBannerMovie() {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${api_key}`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }

        const data = await response.json();
        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];

        if (!randomMovie || !randomMovie.backdrop_path) {
            console.error('No se encontró una película válida o no tiene imagen de fondo');
            return;
        }

        const imageUrl = `${IMAGE_BASE_URL}${randomMovie.backdrop_path}`;
        const banner = document.getElementById('banner');
        banner.style.backgroundImage = `url(${imageUrl})`;
        banner.style.backgroundSize = 'cover';
        banner.style.backgroundPosition = 'center';

        document.querySelector('.banner h1').textContent = randomMovie.title;
        document.querySelector('.banner p').textContent = randomMovie.overview;
    } catch (error) {
        console.error('Error al obtener la película:', error);
        // Considera mostrar un mensaje de error al usuario
    }
}

window.onload = loadBannerMovie;


// Función auxiliar para hacer fetch de datos desde la API
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
    }
}

// Función para mostrar las películas en la sección correspondiente
function renderMovies(movies, section) {
    const sectionElement = document.querySelector(section);
    sectionElement.innerHTML = ''; // Limpiar contenido previo

    movies.forEach(movie => {
        const movieCard = `
            <div class="movie-card">
                <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title || movie.name}</h3>
            </div>
        `;
        sectionElement.innerHTML += movieCard;
    });
}

// Obtener y mostrar las películas de "Tendencias"
async function getTrendingMovies() {
    const data = await fetchData('/trending/movie/week');
    renderMovies(data.results, '.tendencias .movie-grid');
}

// Obtener y mostrar las películas de "Lo más popular"
async function getPopularMovies() {
    const data = await fetchData('/movie/popular');
    renderMovies(data.results, '.popular .movie-grid');
}

// Obtener y mostrar las series populares
async function getPopularTVShows() {
    const data = await fetchData('/tv/popular');
    renderMovies(data.results, '.series-tv .movie-grid');
}

// Obtener y mostrar las películas de "Ver Gratis" (simulado, ya que TMDb no tiene categoría de gratis)
async function getFreeMovies() {
    const data = await fetchData('/movie/top_rated'); // Usamos 'top_rated' como ejemplo
    renderMovies(data.results, '.ver-gratis .movie-grid');
}

// Inicializar la página cargando los datos
function init() {
    loadBanner(); // Cargar la imagen del banner
    getTrendingMovies();
    getPopularMovies();
    getPopularTVShows();
    getFreeMovies();
}

// Llamar a la función para inicializar cuando la página cargue
window.onload = init;
















//'0f1911236aa91d9d37ad2b1a76be3c5d'