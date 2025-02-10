<script>
    import { push } from "svelte-spa-router";
    import { onMount } from "svelte";

    let games = [];
    let nextPageUrl = null;
    let prevPageUrl = null;
    let currentPage = 1;
    let searchTerm = "";

    function getUrlForPage(page, query = "") {
        const base = `https://api.rawg.io/api/games?key=de4d513680fd4e698af5f40511424237&page=${page}`;
        return query ? `${base}&search=${encodeURIComponent(query)}` : base;
    }

    async function fetchGames(query) {
        if (!query) return;
        try {
            const response = await fetch(
                `https://api.rawg.io/api/games?key=de4d513680fd4e698af5f40511424237&search=${encodeURIComponent(query)}`,
            );
            const data = await response.json();
            games = data.results.filter((game) =>
                game.name.toLowerCase().includes(query.toLowerCase()),
            );
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    }

    function navigateToGameDetail(gameId) {
        localStorage.setItem("currentPage", currentPage.toString());
        push(`/game/${gameId}`);
    }

    function goToNextPage() {
        if (nextPageUrl) {
            currentPage++;
            fetchGames(nextPageUrl);
        }
    }

    function goToPreviousPage() {
        if (prevPageUrl) {
            currentPage--;
            fetchGames(prevPageUrl);
        }
    }

    function goToFirstPage() {
        currentPage = 1;
        fetchGames(getUrlForPage(1, searchTerm));
    }

    // Wczytywanie wyszukiwania
    function loadSearchResults() {
        const hash = window.location.hash;
        const urlParams = new URLSearchParams(hash.split("?")[1]);
        console.log(urlParams);
        searchTerm = urlParams.get("q") || "";
        console.log("Loaded search term:", searchTerm);
        if (searchTerm) {
            fetchGames(searchTerm);
        }
    }

    onMount(() => {
        loadSearchResults();
        window.addEventListener("popstate", loadSearchResults);
    });
</script>

<main>
    <h1>
        {searchTerm ? `Search Results for "${searchTerm}"` : "Popular Games"}
    </h1>
    <div class="game-preview">
        <div class="game-grid">
            {#each games as game}
                <div
                    class="game-card"
                    on:click={() => navigateToGameDetail(game.id)}
                >
                    <img src={game.background_image} alt={game.name} />
                    <h2>{game.name}</h2>
                </div>
            {/each}
        </div>
    </div>

    <div class="pagination-buttons">
        <button on:click={goToFirstPage}>First</button>
        <button on:click={goToPreviousPage} disabled={!prevPageUrl}
            >Previous</button
        >
        <button on:click={goToNextPage} disabled={!nextPageUrl}>Next</button>
    </div>
</main>

<style>
    main {
        text-align: center;
        padding: 20px;
        background-color: #111;
        color: white;
    }

    .game-preview {
        display: flex;
        justify-content: center;
    }

    h1 {
        margin-bottom: 20px;
    }

    .game-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 15px;
        padding: 10px;
        width: 80%;
    }

    .game-card {
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.2s;
    }

    .game-card:hover {
        transform: scale(1.05);
    }

    .game-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .game-card h2 {
        position: absolute;
        bottom: 10px;
        left: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.7);
        padding: 8px;
        font-size: 14px;
        text-align: center;
        border-radius: 5px;
    }

    .pagination-buttons {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        gap: 10px;
    }

    .pagination-buttons button {
        background-color: #333;
        color: white;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s;
    }

    .pagination-buttons button:hover {
        background-color: #555;
    }

    .pagination-buttons button:disabled {
        background-color: #777;
        cursor: not-allowed;
    }
</style>
