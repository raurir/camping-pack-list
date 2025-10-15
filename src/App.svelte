<script lang="ts">
  let nights = 4;
  let temperature: 'cold' | 'hot' = 'cold';
  let swimming = false;

  interface PackItem {
    name: string;
    emoji: string;
    count: number;
  }

  $: packList = calculatePackList(nights, temperature, swimming);

  function calculatePackList(nights: number, temp: 'cold' | 'hot', hasSwimming: boolean): PackItem[] {
    // Base stats for 4 nights, cold, no swimming
    const baseNights = 4;
    const nightRatio = nights / baseNights;

    // Calculate base items with night ratio
    let tshirts = Math.ceil(4 * nightRatio);
    let jumpers = Math.ceil(3 * nightRatio);
    let trackpants = Math.ceil(3 * nightRatio);
    let shorts = Math.ceil(2 * nightRatio);
    let underpants = Math.ceil(4 * nightRatio);
    let socks = Math.ceil(4 * nightRatio);
    let hat = 1;
    let rainJacket = 1;
    let swimmers = 0;
    let towels = 0;

    // Adjust for temperature
    if (temp === 'hot') {
      // Hot weather: more shorts and tshirts, fewer jumpers and trackpants
      tshirts = Math.ceil(tshirts * 1.5); // More tshirts for hot weather
      shorts = Math.ceil(shorts * 2); // Double the shorts
      jumpers = Math.max(1, Math.ceil(jumpers * 0.5)); // Reduce jumpers by half (min 1)
      trackpants = Math.max(1, Math.ceil(trackpants * 0.3)); // Minimal trackpants (min 1)
    }

    // Adjust for swimming
    if (hasSwimming) {
      swimmers = 1; // Always bring 2 swimmers
      towels = Math.max(1, Math.ceil(nights * 0.25)); // At least 2 towels, or 1 per 2 nights
    }

    return [
      { name: 'T-shirts', emoji: '👕', count: tshirts },
      { name: 'Jumpers', emoji: '🧶', count: jumpers },
      { name: 'Trackpants', emoji: '👖', count: trackpants },
      { name: 'Shorts', emoji: '🩳', count: shorts },
      { name: 'Underpants', emoji: '🩲', count: underpants },
      { name: 'Pairs of Socks', emoji: '🧦', count: socks },
      { name: 'Hat', emoji: '🧢', count: hat },
      { name: 'Rain Jacket', emoji: '🧥', count: rainJacket },
      { name: 'Swimmers', emoji: '🩱', count: swimmers },
      { name: 'Towels', emoji: '🏖️', count: towels },
    ].filter(item => item.count > 0);
  }
</script>

<main class="min-h-screen bg-gradient-to-br from-amber-100 via-green-100 to-sky-100 py-12 px-6 md:px-16">
  <div class="max-w-5xl mx-auto">
    <h1 class="text-5xl md:text-6xl font-bold text-center mb-6 text-green-700">
      ⛺ Kids Camping Pack List
    </h1>
    <p class="text-center text-gray-700 mb-16 text-xl">Figure out what to pack for your adventure!</p>

    <!-- Input Controls -->
    <div class="bg-white rounded-2xl shadow-xl p-8 lg:p-10 mb-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Number of nights -->
        <div>
          <label for="nights" class="block text-base font-bold text-gray-700 mb-3">
            🌙 Number of Nights
          </label>
          <input
            id="nights"
            type="number"
            min="1"
            max="14"
            bind:value={nights}
            class="w-full px-5 py-2 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-lg"
           
          />
        </div>

        <!-- Temperature -->
        <div>
          <label class="block text-base font-bold text-gray-700 mb-3">
            🌡️ Temperature
          </label>
          <div class="flex gap-3">
            <button
              class="flex-1 px-5 py-3 rounded-xl font-bold transition-all {temperature === 'cold' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
              on:click={() => temperature = 'cold'}
             
            >
              ❄️ Cold
            </button>
            <button
              class="flex-1 px-5 py-3 rounded-xl font-bold transition-all {temperature === 'hot' ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
              on:click={() => temperature = 'hot'}
             
            >
              ☀️ Hot
            </button>
          </div>
        </div>

        <!-- Swimming -->
        <div>
          <label class="block text-base font-bold text-gray-700 mb-3">
            🏊 Swimming?
          </label>
          <button
            class="w-full px-5 py-3 rounded-xl font-bold transition-all {swimming ? 'bg-cyan-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
            on:click={() => swimming = !swimming}
           
          >
            {swimming ? '✅ Yes' : '❌ No'}
          </button>
        </div>
      </div>
    </div>

    <!-- Pack List Grid -->
    <div class="bg-white rounded-2xl shadow-xl p-8 md:p-10">
      <h2 class="text-3xl font-bold text-gray-800 mb-8">
        📋 Your Packing List
      </h2>
      <div class="space-y-3">
        {#each packList as item}
          <div class="grid grid-cols-3 gap-2 items-center bg-gradient-to-r from-yellow-50 via-green-50 to-blue-50 rounded-xl p-2">
            <div class="text-4xl text-center">{item.emoji}</div>
            <div class="font-bold text-gray-800 text-xl">{item.name}</div>
            <div class="text-4xl font-bold text-green-600 text-center">{item.count}</div>
          </div>
        {/each}
      </div>

      <!-- Total items count -->
      <div class="mt-10 pt-8">
        <div class="text-center">
          <span class="text-xl text-gray-700">Total items to pack: </span>
          <span class="text-3xl font-bold text-green-600">
            {packList.reduce((sum, item) => sum + item.count, 0)}
          </span>
        </div>
      </div>
    </div>
  </div>
</main>
