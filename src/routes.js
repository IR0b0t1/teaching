import Home from "./routes/Home.svelte";
import NotFound from "./routes/NotFound.svelte";
import Countries from "./routes/Countries.svelte";
import ColorPicker from "./routes/ColorPicker.svelte";
// import ChuckNorris from "./routes/ChuckNorris.svelte";

export const routes = {
  "/": Home,
  "/notfound": NotFound,
  "/countries": Countries,
  "/colorpicker": ColorPicker,
  //   "/chucknorris": ChuckNorris,
  "*": NotFound,
};
