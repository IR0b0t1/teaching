<script>
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import Chart from "chart.js/auto";

    export let params;

    let gameDetails = {};
    let chartInstance = null;

    async function fetchGameDetails() {
        try {
            const response = await fetch(
                `https://api.rawg.io/api/games/${params.id}?key=de4d513680fd4e698af5f40511424237`,
            );
            const data = await response.json();
            gameDetails = data;
            createChart();
        } catch (error) {
            console.error("Error fetching game details:", error);
        }
    }

    function createChart() {
        if (chartInstance) {
            chartInstance.destroy();
        }

        const canvas = document.getElementById("ratingsChart");
        if (canvas instanceof HTMLCanvasElement) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                const ratings = gameDetails.ratings || [];
                const labels = ratings.map((rating) => rating.title);
                const dataValues = ratings.map((rating) => rating.percent);

                chartInstance = new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels,
                        datasets: [
                            {
                                data: dataValues,
                                backgroundColor: [
                                    "#4caf50",
                                    "#2196f3",
                                    "#ffeb3b",
                                    "#f44336",
                                ],
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: "bottom",
                            },
                        },
                    },
                });
            }
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
            <button class="back-button" on:click={goBackToGames}>
                Back to Games
            </button>
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
            <canvas id="ratingsChart"></canvas>
            <div class="requirements">
                <h3>System Requirements</h3>
                <p>
                    {gameDetails.platforms?.find(
                        (p) => p.platform.slug === "pc",
                    )?.requirements?.minimum || "No data available"}
                </p>
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

    canvas {
        max-width: 400px;
        margin: 20px auto;
        display: block;
    }

    .requirements {
        text-align: center;
        margin-top: 20px;
    }
</style>
