<script>
    import { onMount } from "svelte";
    export let params; // Otrzymujemy parametry URL

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

    onMount(() => {
        fetchGameDetails();
    });
</script>

<main>
    <h1>{gameDetails.name}</h1>
    <div>
        <img src={gameDetails.background_image} alt={gameDetails.name} />
        <p>{gameDetails.description_raw}</p>
        <ul>
            <li>Released: {gameDetails.released}</li>
            <li>Rating: {gameDetails.rating}</li>
            <li>
                Genres: {gameDetails.genres
                    ?.map((genre) => genre.name)
                    .join(", ")}
            </li>
        </ul>
    </div>
</main>

<style>
    main {
        text-align: center;
        padding: 20px;
        background-color: #111;
        color: white;
    }

    img {
        width: 100%;
        max-width: 600px;
        margin: 20px 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 5px 0;
    }
</style>
