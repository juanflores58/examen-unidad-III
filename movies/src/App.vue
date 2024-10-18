<template>
  <div id="app">
    <!-- Encabezado -->
    <header>
        <div class="container">
            <img src="./assets/logo.png" alt="Logo de Cinema" class="logo-img">
            <div class="logo">
                <h1>CINEMA c:</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Películas</a></li>
                    <li><a href="#">Series/TV</a></li>
                    <li><a href="#">Ver Gratis</a></li>
                    <li><a href="#">Explorar</a></li>
                </ul>
            </nav>
            <div class="search-bar">
                <input type="text" placeholder="Buscar...">
                <button>Buscar</button>
            </div>

            <nav>
                <ul>
                    <li><a href="#">Log in</a></li>
                    <li><a href="#">logout</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Sección de Tendencias -->
    <main>
        <div class="container">
            <section class="tendencias">
                <h2>Tendencias</h2>
                <div class="movie-grid">
                    <!-- Películas de tendencia se cargarán aquí -->
                </div>
            </section>

            <section class="popular">
                <h2>Lo Más Popular</h2>
                <div class="movie-grid">
                    <!-- Películas populares se cargarán aquí -->
                </div>
            </section>

            <section class="ver-gratis">
                <h2>Ver Gratis</h2>
                <div class="movie-grid">
                    <!-- Películas gratuitas se cargarán aquí -->
                </div>
            </section>

            <section class="series-tv">
                <h2>Series o TV</h2>
                <div class="movie-grid">
                    <!-- Series o programas de TV se cargarán aquí -->
                </div>
            </section>
        </div>
    </main>

    <!-- Pie de página -->
    <footer>
        <div class="container">
            <p>&copy; PAGINA DE PELICULAS PIRATAS PARA LA CLASE DE JHONA todos los derechos reservados SA. DE CV.</p>
        </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
/* Puedes agregar tu archivo CSS aquí o importarlo si lo tienes en un archivo separado */
</style>
