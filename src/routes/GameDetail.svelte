<script>
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";

    export let params;

    let gameDetails = {};

    async function fetchGameDetails() {
        try {
            const response = await fetch(
                `https://api.rawg.io/api/games/${params.id}?key=de4d513680fd4e698af5f40511424237`,
            );
            const data = await response.json();
            gameDetails = data;
        } catch (error) {
            console.error("Error fetching game details:", error);
        }
    }

    function goBackToGames() {
        const savedPage = localStorage.getItem("currentPage") || "1";
        push(`/?page=${savedPage}`);
    }

    onMount(() => {
        fetchGameDetails();
    });
</script>

<main>
    <div class="container">
        <div class="header">
            <button class="back-button" on:click={goBackToGames}
                >Back to Games</button
            >
            <h1>{gameDetails.name}</h1>
        </div>
        <div>
            <div class="game-data">
                <img
                    src={gameDetails.background_image}
                    alt={gameDetails.name}
                />
                <p class="description-p">{gameDetails.description_raw}</p>
            </div>
            <ul>
                <li>Released: {gameDetails.released}</li>
                <li>Rating: {gameDetails.rating}</li>
                <li>
                    Genres: {gameDetails.genres
                        ?.map((genre) => genre.name)
                        .join(", ")}
                </li>
            </ul>
            <div class="metacritic">
                <p>Metacritic score: {gameDetails.metacritic}</p>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        text-align: left;
        background-color: #111;
        color: white;
    }

    .header {
        position: relative;
        padding: 20px 0;
    }

    h1 {
        font-size: 40px;
        font-family: "Courier New", Courier, monospace;
        text-align: center;
    }

    .game-data {
        display: flex;
    }

    .description-p {
        width: 50%;
        font-family: "Courier New", Courier, monospace;
        padding: 20px;
    }

    img {
        width: 50%;
        height: 50%;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 5px 0;
    }

    .back-button {
        display: block;
        padding: 10px 20px;
        background-color: #333;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        position: absolute;
        left: 0;
        top: 20px;
    }

    .back-button:hover {
        background-color: #555;
    }
</style>
