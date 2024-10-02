<template>
  <span v-html="formatNumber(currentValue)"></span>
</template>

<style scoped>
.number-part {
  margin-right: 10px; /* Adjust as needed */
}
</style>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  end: {
    type: Number,
    required: true,
  },
  start: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 3000,
  },
});

let hasAnimationPlayed = false;
let start = 0;

watch(() => props.end,
  (newVal, oldVal) => {
    if (newVal != 0 && !hasAnimationPlayed) {
      startAnimation();

      setTimeout(() => {
        start = newVal;
      }, props.duration);
    }
  }
);


const startAnimation = () => {
  let startTimestamp = null;
  currentValue.value = start;

  const easeOutCubic = (t) => 1 - (1 - t) ** 3;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    // const rawProgress = Math.min((timestamp - startTimestamp) / props.duration, 1);
    // const progress = easeOutCubic(rawProgress);

    const elapsedTime = timestamp - startTimestamp;
    // Calculate the progress as a ratio of elapsed time to the total duration
    const rawProgress = Math.min(elapsedTime / props.duration, 1);

    currentValue.value = Math.floor(rawProgress * (props.end - start) + start);
    if (rawProgress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

const formatNumber = (value) => {
  const parts = value.toString().split(/(?=(?:...)*$)/);
  return parts.map(part => `<span class="mr-1">${part}</span>`).join('  ');
};

const currentValue = ref(props.start);

onMounted(() => {
  if (props.start !== props.end) {
    startAnimation();
  } else {
    currentValue.value = props.end;
  }
});

</script>
