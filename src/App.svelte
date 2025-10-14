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
      swimmers = 2; // Always bring 2 swimmers
      towels = Math.max(2, Math.ceil(nights * 0.5)); // At least 2 towels, or 1 per 2 nights
    }

    return [
      { name: 'T-shirts', emoji: '👕', count: tshirts },
      { name: 'Jumpers', emoji: '🧥', count: jumpers },
      { name: 'Trackpants', emoji: '👖', count: trackpants },
      { name: 'Shorts', emoji: '🩳', count: shorts },
      { name: 'Underpants', emoji: '🩲', count: underpants },
      { name: 'Socks', emoji: '🧦', count: socks },
      { name: 'Hat', emoji: '🧢', count: hat },
      { name: 'Rain Jacket', emoji: '☔', count: rainJacket },
      { name: 'Swimmers', emoji: '🩱', count: swimmers },
      { name: 'Towels', emoji: '🛁', count: towels },
    ].filter(item => item.count > 0);
  }
</script>

<main class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold text-center mb-2 text-green-800">
      ⛺ Kids Camping Pack List
    </h1>
    <p class="text-center text-gray-600 mb-8">Figure out what to pack for your adventure!</p>

    <!-- Input Controls -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Number of nights -->
        <div>
          <label for="nights" class="block text-sm font-semibold text-gray-700 mb-2">
            🌙 Number of Nights
          </label>
          <input
            id="nights"
            type="number"
            min="1"
            max="14"
            bind:value={nights}
            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
          />
        </div>

        <!-- Temperature -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            🌡️ Temperature
          </label>
          <div class="flex gap-2">
            <button
              class="flex-1 px-4 py-2 rounded-lg font-medium transition-all {temperature === 'cold' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
              on:click={() => temperature = 'cold'}
            >
              ❄️ Cold
            </button>
            <button
              class="flex-1 px-4 py-2 rounded-lg font-medium transition-all {temperature === 'hot' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
              on:click={() => temperature = 'hot'}
            >
              ☀️ Hot
            </button>
          </div>
        </div>

        <!-- Swimming -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            🏊 Swimming?
          </label>
          <button
            class="w-full px-4 py-2 rounded-lg font-medium transition-all {swimming ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
            on:click={() => swimming = !swimming}
          >
            {swimming ? '✅ Yes' : '❌ No'}
          </button>
        </div>
      </div>
    </div>

    <!-- Pack List Grid -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">
        📋 Your Packing List
      </h2>
      <div class="space-y-2">
        {#each packList as item}
          <div class="grid grid-cols-3 gap-4 items-center bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="text-5xl text-center">{item.emoji}</div>
            <div class="font-semibold text-gray-800 text-lg">{item.name}</div>
            <div class="text-3xl font-bold text-green-600 text-right">{item.count}</div>
          </div>
        {/each}
      </div>

      <!-- Total items count -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <div class="text-center">
          <span class="text-lg text-gray-600">Total items to pack: </span>
          <span class="text-2xl font-bold text-green-600">
            {packList.reduce((sum, item) => sum + item.count, 0)}
          </span>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
</style>
