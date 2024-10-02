<template>
<!-- TODO : Quand j'update la donation, passer le texte de bleu à vert, vert étant la couleur du comptage -->
  <div class="font-bold text-primary text-3xl w-[140px]" >
    <CountUp :end="websiteStore.current_amount" /> €
  </div>
</template>


<script setup lang="ts">
const donationCurrentAmount = ref(0);
const websiteStore = useWebsiteStore();

onMounted(async () => {
  await websiteStore.fetch();

  donationCurrentAmount.value = websiteStore.data.current_amount;

});
</script>