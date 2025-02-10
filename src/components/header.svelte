<script>
  import { push } from "svelte-spa-router";

  let searchQuery = "";
  let stores = [];
  let genres = [];
  let platforms = [];

  async function fetchData(url, setter) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setter(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function searchGames(event) {
    if (searchQuery.length > 2 && event.key === "Enter") {
      push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  }

  // Pobieranie danych
  fetchData(
    "https://api.rawg.io/api/stores?key=de4d513680fd4e698af5f40511424237",
    (data) => (stores = data),
  );
  fetchData(
    "https://api.rawg.io/api/genres?key=de4d513680fd4e698af5f40511424237",
    (data) => (genres = data),
  );
  fetchData(
    "https://api.rawg.io/api/platforms/lists/parents?key=de4d513680fd4e698af5f40511424237",
    (data) => (platforms = data),
  );
</script>

<nav class="nav-top">
  <input
    type="text"
    id="search-bar"
    placeholder="Search games..."
    bind:value={searchQuery}
    on:keyup={searchGames}
  />

  <ul id="nav-list">
    <li class="menu-div">
      <div class="dropbtn"><a href="../routes/Home.svelte">Home</a></div>
    </li>
    <li class="menu-div">
      <button class="dropbtn">Stores</button>
      <div class="dropdown-content">
        {#each stores as store}
          <a href="#" target="_blank">{store.name}</a>
        {/each}
      </div>
    </li>
    <li class="menu-div">
      <button class="dropbtn">Genres</button>
      <div class="dropdown-content">
        {#each genres as genre}
          <a href="#" target="_blank">{genre.name}</a>
        {/each}
      </div>
    </li>
    <li class="menu-div">
      <button class="dropbtn">Platforms</button>
      <div class="dropdown-content">
        {#each platforms as platform}
          <a href="#" target="_blank">{platform.name}</a>
        {/each}
      </div>
    </li>
  </ul>
</nav>

<style>
  .nav-top {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px;
    background-color: #222;
  }

  #search-bar {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  ul {
    list-style: none;
    display: flex;
    gap: 15px;
  }

  .menu-div {
    position: relative;
    display: inline-block;
  }

  .dropbtn {
    background-color: #444;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    min-width: 150px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .menu-div:hover .dropdown-content {
    display: block;
  }

  .dropdown-content a {
    padding: 8px;
    display: block;
    color: black;
    text-decoration: none;
  }

  .dropdown-content a:hover {
    background-color: #ddd;
  }
</style>
