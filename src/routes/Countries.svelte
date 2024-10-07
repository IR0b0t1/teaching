<script>
  let countries = [
    { name: "Afghanistan", code: "af", flag: "🇦🇫" },
    { name: "Albania", code: "al", flag: "🇦🇱" },
    { name: "Algeria", code: "dz", flag: "🇩🇿" },
    { name: "Andorra", code: "ad", flag: "🇦🇩" },
    { name: "Angola", code: "ao", flag: "🇦🇴" },
    { name: "Antigua and Barbuda", code: "ag", flag: "🇦🇬" },
    { name: "Argentina", code: "ar", flag: "🇦🇷" },
    { name: "Armenia", code: "am", flag: "🇦🇲" },
    { name: "Australia", code: "au", flag: "🇦🇺" },
    { name: "Austria", code: "at", flag: "🇦🇹" },
    { name: "Azerbaijan", code: "az", flag: "🇦🇿" },
    { name: "Bahamas", code: "bs", flag: "🇧🇸" },
    { name: "Bahrain", code: "bh", flag: "🇧🇭" },
    { name: "Bangladesh", code: "bd", flag: "🇧🇩" },
    { name: "Barbados", code: "bb", flag: "🇧🇧" },
    { name: "Belarus", code: "by", flag: "🇧🇾" },
    { name: "Belgium", code: "be", flag: "🇧🇪" },
    { name: "Belize", code: "bz", flag: "🇧🇿" },
    { name: "Benin", code: "bj", flag: "🇧🇯" },
    { name: "Bhutan", code: "bt", flag: "🇧🇹" },
    { name: "Bolivia", code: "bo", flag: "🇧🇴" },
    { name: "Bosnia and Herzegovina", code: "ba", flag: "🇧🇦" },
    { name: "Botswana", code: "bw", flag: "🇧🇼" },
    { name: "Brazil", code: "br", flag: "🇧🇷" },
    { name: "Brunei", code: "bn", flag: "🇧🇳" },
    { name: "Bulgaria", code: "bg", flag: "🇧🇬" },
    { name: "Burkina Faso", code: "bf", flag: "🇧🇫" },
    { name: "Burundi", code: "bi", flag: "🇧🇮" },
    { name: "Cabo Verde", code: "cv", flag: "🇨🇻" },
    { name: "Cambodia", code: "kh", flag: "🇰🇭" },
    { name: "Cameroon", code: "cm", flag: "🇨🇲" },
    { name: "Canada", code: "ca", flag: "🇨🇦" },
    { name: "Central African Republic", code: "cf", flag: "🇨🇫" },
    { name: "Chad", code: "td", flag: "🇹🇩" },
    { name: "Chile", code: "cl", flag: "🇨🇱" },
    { name: "China", code: "cn", flag: "🇨🇳" },
    { name: "Colombia", code: "co", flag: "🇨🇴" },
    { name: "Comoros", code: "km", flag: "🇰🇲" },
    { name: "Congo, Democratic Republic of the", code: "cd", flag: "🇨🇩" },
    { name: "Congo, Republic of the", code: "cg", flag: "🇨🇬" },
    { name: "Costa Rica", code: "cr", flag: "🇨🇷" },
    { name: "Croatia", code: "hr", flag: "🇭🇷" },
    { name: "Cuba", code: "cu", flag: "🇨🇺" },
    { name: "Cyprus", code: "cy", flag: "🇨🇾" },
    { name: "Czech Republic", code: "cz", flag: "🇨🇿" },
    { name: "Denmark", code: "dk", flag: "🇩🇰" },
    { name: "Djibouti", code: "dj", flag: "🇩🇯" },
    { name: "Dominica", code: "dm", flag: "🇩🇲" },
    { name: "Dominican Republic", code: "do", flag: "🇩🇴" },
    { name: "Ecuador", code: "ec", flag: "🇪🇨" },
    { name: "Egypt", code: "eg", flag: "🇪🇬" },
    { name: "El Salvador", code: "sv", flag: "🇸🇻" },
    { name: "Equatorial Guinea", code: "gq", flag: "🇬🇶" },
    { name: "Eritrea", code: "er", flag: "🇪🇷" },
    { name: "Estonia", code: "ee", flag: "🇪🇪" },
    { name: "Eswatini", code: "sz", flag: "🇸🇿" },
    { name: "Ethiopia", code: "et", flag: "🇪🇹" },
    { name: "Fiji", code: "fj", flag: "🇫🇯" },
    { name: "Finland", code: "fi", flag: "🇫🇮" },
    { name: "France", code: "fr", flag: "🇫🇷" },
    { name: "Gabon", code: "ga", flag: "🇬🇦" },
    { name: "Gambia", code: "gm", flag: "🇬🇲" },
    { name: "Georgia", code: "ge", flag: "🇬🇪" },
    { name: "Germany", code: "de", flag: "🇩🇪" },
    { name: "Ghana", code: "gh", flag: "🇬🇭" },
    { name: "Greece", code: "gr", flag: "🇬🇷" },
    { name: "Grenada", code: "gd", flag: "🇬🇩" },
    { name: "Guatemala", code: "gt", flag: "🇬🇹" },
    { name: "Guinea", code: "gn", flag: "🇬🇳" },
    { name: "Guinea-Bissau", code: "gw", flag: "🇬🇼" },
    { name: "Guyana", code: "gy", flag: "🇬🇾" },
    { name: "Haiti", code: "ht", flag: "🇭🇹" },
    { name: "Honduras", code: "hn", flag: "🇭🇳" },
    { name: "Hungary", code: "hu", flag: "🇭🇺" },
    { name: "Iceland", code: "is", flag: "🇮🇸" },
    { name: "India", code: "in", flag: "🇮🇳" },
    { name: "Indonesia", code: "id", flag: "🇮🇩" },
    { name: "Iran", code: "ir", flag: "🇮🇷" },
    { name: "Iraq", code: "iq", flag: "🇮🇶" },
    { name: "Ireland", code: "ie", flag: "🇮🇪" },
    { name: "Israel", code: "il", flag: "🇮🇱" },
    { name: "Italy", code: "it", flag: "🇮🇹" },
    { name: "Jamaica", code: "jm", flag: "🇯🇲" },
    { name: "Japan", code: "jp", flag: "🇯🇵" },
    { name: "Jordan", code: "jo", flag: "🇯🇴" },
    { name: "Kazakhstan", code: "kz", flag: "🇰🇿" },
    { name: "Kenya", code: "ke", flag: "🇰🇪" },
    { name: "Kiribati", code: "ki", flag: "🇰🇮" },
    { name: "Kuwait", code: "kw", flag: "🇰🇼" },
    { name: "Kyrgyzstan", code: "kg", flag: "🇰🇬" },
  ];

  let selectedCountry = countries[0];
</script>

<main class="min-h-screen flex flex-col items-center justify-center p-4">
  <h1 class="text-3xl font-bold mb-4">Select a Country</h1>
  <div class="flex items-center mb-4">
    <select
      class="bg-gray-700 text-white mb-0 p-2 border border-gray-300 rounded"
      bind:value={selectedCountry}
    >
      {#each countries as country}
        <option value={country}>
          {country.name}
        </option>
      {/each}
    </select>

    <div class="ml-4 text-center">
      <p class="text-xl mb-2">Selected Country: {selectedCountry.name}</p>
      <img
        alt="{selectedCountry.name} flag"
        src={`https://flagcdn.com/256x192/${selectedCountry.code}.png`}
        class="w-64 h-48"
      />
    </div>
  </div>
</main>

<style>
  main {
    padding: 2rem;
  }
  select {
    width: 200px;
  }
  img {
    border: none;
    border-radius: 5px;
  }
</style>
