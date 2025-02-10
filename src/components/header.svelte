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

  // Funkcja wyszukiwania gier na podstawie różnych parametrów
  function searchGames(event, type, id) {
    event.preventDefault(); // Zatrzymuje domyślne działanie linku (np. przejście do #)

    if (type === "search" && searchQuery.length > 2 && event.key === "Enter") {
      push(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else if (type === "store") {
      push(`/search?store=${id}`);
    } else if (type === "genre") {
      push(`/search?genre=${id}`);
    } else if (type === "platform") {
      push(`/search?platform=${id}`);
    }
  }

  // Pobieranie danych z API
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
    on:keyup={(event) => searchGames(event, "search")}
  />

  <ul id="nav-list">
    <li class="menu-div">
      <div class="dropbtn">
        <button on:click={() => push("/home")}>Home</button>
      </div>
    </li>
    <li class="menu-div">
      <button class="dropbtn">Stores</button>
      <div class="dropdown-content">
        {#each stores as store}
          <button on:click={(event) => searchGames(event, "store", store.id)}
            >{store.name}</button
          >
        {/each}
      </div>
    </li>
    <li class="menu-div">
      <button class="dropbtn">Genres</button>
      <div class="dropdown-content">
        {#each genres as genre}
          <button on:click={(event) => searchGames(event, "genre", genre.id)}
            >{genre.name}</button
          >
        {/each}
      </div>
    </li>
    <li class="menu-div">
      <button class="dropbtn">Platforms</button>
      <div class="dropdown-content">
        {#each platforms as platform}
          <button
            on:click={(event) => searchGames(event, "platform", platform.id)}
            >{platform.name}</button
          >
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

  .dropdown-content button {
    padding: 8px;
    display: block;
    color: black;
    background: none;
    border: none;
    text-align: left;
    width: 100%;
    cursor: pointer;
  }

  .dropdown-content button:hover {
    background-color: #ddd;
  }
</style>
