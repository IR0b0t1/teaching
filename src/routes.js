import Home from "./routes/Home.svelte";
import GameDetail from "./routes/GameDetail.svelte";
import NotFound from "./routes/NotFound.svelte";

export const routes = {
  "/": Home,
  "/game/:id": GameDetail,
  "*": NotFound,
};
