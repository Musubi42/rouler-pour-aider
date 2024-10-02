export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    data: null,
    timeoutId: null, // Changed from incrementInterval to timeoutId for clarity
    isFetching: false,  // flag to indicate fetching status
  }),
  getters: {
    current_amount: (state) => state.data ? state.data.current_amount : 0,
    contributors_count: (state) => state.data ? state.data.contributors_count : 0,
  },
  actions: {
    async fetch() {
      if (this.isFetching) return; // Guard clause to prevent multiple fetches
      this.isFetching = true;

      try {
        const data = await $fetch('https://donation-api.roulerpouraider.fr/donations', {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
          server: false,
        });

        this.setupData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    },
    setupData(data) {
      this.clearTimeouts();  // Ensure any existing timers are cleared
      
      // Start from 90% of the actual values
      const initialCurrentAmount = Math.floor(data.current_amount * 0.9);
      const initialContributorsCount = Math.round(data.contributors_count * 0.9);

      this.data = {
        ...data,
        current_amount: initialCurrentAmount,
        contributors_count: initialContributorsCount,
      };

      // Calculate the amount to increment every minute to reach the actual value in 15 minutes
      // Based on the difference between real contributors_count and 10% of it, 
      // determine the number of increments 
      const contributorsGap = data.contributors_count - initialContributorsCount;

      const incrementsGap = 15000; // 15 seconds

      // Based on contributorsGap, calculate the number time between increments
      // Each increment will be elapsed in a random time, but the sum of all increments will be 15 minutes
      const timeBetweenIncrements = [];

      // the first 2 increments are 30, and 45 seconds
      for (let i = -1; i < contributorsGap; i++) {
        timeBetweenIncrements.push(incrementsGap);
      }


      const amountIncrementPerMinute = Math.round((data.current_amount - initialCurrentAmount) / contributorsGap);

      let incrementStep = 0;
      
      const performIncrement = () => {
        incrementStep++;

        if (incrementStep >= timeBetweenIncrements.length) {
          return;
        }

        this.data = {
          ...this.data,
          current_amount: this.data.current_amount + amountIncrementPerMinute,
          contributors_count: this.data.contributors_count + 1,
        };

        // this.data.contributors_count += 1;
        // this.data.current_amount += amountIncrementPerMinute;

        // Recursively schedule the next increment
        this.timeoutId = setTimeout(performIncrement, timeBetweenIncrements[incrementStep]);
      };

      // Start the first increment
      this.timeoutId = setTimeout(performIncrement, timeBetweenIncrements[incrementStep]);
      // setTimeout(() => {
      //   performIncrement();
      // }, 5000);
    },
    clearTimeouts() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
  }
});
