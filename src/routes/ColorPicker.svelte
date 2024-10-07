<script>
  let colorRed = 0;
  let colorGreen = 0;
  let colorBlue = 0;
  let format = "rgb";
  let brightness = 1;

  function rgbToHex(r, g, b) {
    const toHex = (n) => n.toString(16).padStart(2, "0").toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function calculateBrightness(r, g, b) {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  $: colorDisplay =
    format === "rgb"
      ? `rgb(${Math.floor(colorRed * brightness)}, ${Math.floor(colorGreen * brightness)}, ${Math.floor(colorBlue * brightness)})`
      : rgbToHex(
          Math.floor(colorRed * brightness),
          Math.floor(colorGreen * brightness),
          Math.floor(colorBlue * brightness)
        );

  $: textColor =
    calculateBrightness(
      colorRed * brightness,
      colorGreen * brightness,
      colorBlue * brightness
    ) < 128
      ? "white"
      : "black";

  function toggleFormat() {
    format = format === "rgb" ? "hex" : "rgb";
  }
</script>

<div class="container">
  <div
    class="color-box"
    style="background: {colorDisplay}; color: {textColor};"
  >
    {colorDisplay}
  </div>

  <div class="sliders">
    <p>Red</p>
    <input type="range" min="0" max="255" bind:value={colorRed} />

    <p>Green</p>
    <input type="range" min="0" max="255" bind:value={colorGreen} />

    <p>Blue</p>
    <input type="range" min="0" max="255" bind:value={colorBlue} />

    <p>Brightness</p>
    <input type="range" min="0" max="1" step="0.01" bind:value={brightness} />

    <button on:click={toggleFormat} class="toggle-btn">
      Switch to {format === "rgb" ? "HEX" : "RGB"}
    </button>
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding: 0 5%;
    box-sizing: border-box;
  }

  .color-box {
    width: 40%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    border-radius: 8px;
  }

  .sliders {
    width: 40%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  p {
    margin-bottom: 8px;
    font-size: 1.2rem;
  }

  input[type="range"] {
    width: 100%;
    margin-bottom: 20px;
  }

  .toggle-btn {
    margin-top: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .toggle-btn:hover {
    background-color: #e0e0e0;
  }
</style>
