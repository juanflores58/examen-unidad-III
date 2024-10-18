const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjE5MTEyMzZhYTkxZDlkMzdhZDJiMWE3NmJlM2M1ZCIsIm5iZiI6MTcyODk3MTMxNC4xMjM4MTcsInN1YiI6IjY3MDZiZmIwYTg4NjE0ZDZiMDhiMGYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lwlyMf7CuxWuOhyz45aDuyveXT9gWJ9EQ90n0l1YMt8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w1280'; // Tamaño adecuado para el banner
const API_KEY = '0f1911236aa91d9d37ad2b1a76be3c5d'

// Función para cargar las 5 películas más populares en el carrusel
async function loadCarouselMovies() {
    const data = await fetchData('/movie/popular');
    
    // Verifica si los datos fueron correctamente recibidos
    if (!data || !data.results || data.results.length === 0) {
        console.error('No se encontraron películas populares');
        return;
    }
    
    const popularMovies = data.results.slice(0, 5); // Tomar las primeras 5 películas

    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.innerHTML = ''; // Limpiar el contenido previo

    popularMovies.forEach((movie, index) => {
        const activeClass = index === 0 ? 'active' : ''; 
        const imagePath = movie.backdrop_path 
            ? `${IMAGE_BASE_URL + movie.backdrop_path}` 
            : `${IMAGE_BASE_URL + movie.poster_path}`;

        if (imagePath) {
            console.log('Cargando imagen:', imagePath); // Depurar URL de imagen
            const carouselItem = `
                <div class="carousel-item ${activeClass}">
                    <img src="${imagePath}" alt="${movie.title}">
                    <div class="carousel-caption">
                        <h3>${movie.title}</h3>
                        <p>${movie.overview}</p>
                    </div>
                </div>
            `;
            carouselInner.innerHTML += carouselItem;
        } else {
            console.warn(`No se encontró imagen para la película: ${movie.title}`);
        }
    });

    initCarousel(); // Inicializar la funcionalidad del carrusel
}


// Función para inicializar el carrusel
function initCarousel() {
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    // Mostrar el elemento inicial
    items[currentIndex].classList.add('active');

    // Botón siguiente
    document.querySelector('.next').addEventListener('click', () => {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
    });

    // Botón anterior
    document.querySelector('.prev').addEventListener('click', () => {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        items[currentIndex].classList.add('active');
    });
}

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

// Llamar a la función de carga de películas en el carrusel al cargar la página
window.onload = () => {
    loadCarouselMovies(); // Cargar el carrusel
    init(); // Cargar el resto de la página
};

// Función para hacer una petición a la API
async function fetchData(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    const data = await response.json();
    return data;
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
    getTrendingMovies();
    getPopularMovies();
    getPopularTVShows();
    getFreeMovies();
}

// Llamar a la función para inicializar cuando la página cargue
window.onload = init;
