<script>
  import { push } from "svelte-spa-router";

  let games = [];

  async function fetchGames() {
    try {
      const response = await fetch(
        "https://api.rawg.io/api/games?key=de4d513680fd4e698af5f40511424237",
      );
      const data = await response.json();
      games = data.results.slice(0, 20); // Get first 20 games (4x5)
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }

  function navigateToGameDetail(gameId) {
    push(`/game/${gameId}`); // Navigate to the game detail page
  }

  fetchGames();
</script>

<main>
  <h1>Popular Games</h1>
  <div class="game-preview">
    <div class="game-grid">
      {#each games as game}
        <div class="game-card" on:click={() => navigateToGameDetail(game.id)}>
          <img src={game.background_image} alt={game.name} />
          <h2>{game.name}</h2>
        </div>
      {/each}
    </div>
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
</style>
