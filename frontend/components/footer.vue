<template>
  <footer
    class="relative bottom-0 w-full text-sm font-normal text-secondary mt-20"
    :style="{ 'margin-bottom': isRadioPage ? '80px' : '' }"
  >
    <div class="mx-6 md:mx-32">
      <div class="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-10">
        <div class="flex flex-col md:flex-row items-center w-full gap-4 " >
          <NuxtLink to="/" class="block w-1/3">
            <img src="/images/logoBig_roulerPourAider.png" alt="logo" class="w-32 h-32" />
          </NuxtLink>
          <!-- CTA -->
          <div class="md:max-w-[40vw] mt-12 flex flex-col">
            <button type="" class="mb-5">
              <NuxtLink
                to="https://solidarite.fondationaphp.fr/projects/rouler-pour-aider-fr"
                class="text-white bg-primary py-3 px-5 rounded-xl"
                target="_blank" >
                Faites un don
              </NuxtLink>
            </button>
            <p class="text-center mx-6">
              L’association Rouler pour aider récolte des dons pour améliorer le bien-être des enfants et de leur famille à l’Hôpital Necker – Enfants malades AP-HP. Cette récolte de dons est couplée d’un projet sportif d’ampleur.  N’hésitez pas à soutenir cette action en faisant un don.
            </p>
          </div>
        </div>
        <!-- Réseaux sociaux -->
        <div class="mt-8">
          <h2 class="mb-2 text-center md:text-left -ml-4">Nous suivre</h2>
          <div class="flex flex-row text-xl">
            <NuxtLink to="https://www.linkedin.com/company/rouler-pour-aider" class="mr-4" target="_blank">
              <IconsLinkedin class="" />
            </NuxtLink>
            <NuxtLink to="https://www.facebook.com/roulerpouraider" class="mr-4" target="_blank">
              <IconsFacebook class="" />
            </NuxtLink>
            <NuxtLink to="https://www.tiktok.com/@roulerpouraider?_t=8kyEoHbGNN3&_r=1" class="mr-4" target="_blank">
              <IconsTiktok class="" />
            </NuxtLink>
            <NuxtLink to="https://www.instagram.com/roulerpouraider/" class="mr-4" target="_blank">
              <IconsInstagram class="" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-300 mt-10 py-4">
      <div class="flex justify-center items-center flex-col md:flex-row my-auto gap-4">
        <img class="h-10 w-auto" src="/Grande-cause-nationale-Bouge-chaque-jour.png" alt="">
        <p class="text-center mx-6" >Association labellisée Grande Cause Nationale par le ministère des Sports et des Jeux Olympiques et Paralympiques</p>
      </div>
    </div>

    <div class="border-t border-gray-300 py-6">
      <div class="flex justify-center flex-col md:flex-row my-auto gap-4">
        <div class="flex items-center cursor-default justify-center">
          Rouler pour aider © {{ actualYear() }}
        </div>
        <nav class="">
          <ul class="list-none flex flex-col md:flex-row items-center -ml-[17px]">
            <li class="">
              <NuxtLink to="/cookies" class="mt-4 mb-6 cursor-pointer hover:text-primary"
                >Cookies</NuxtLink
              >
            </li>
            <li class="">
              <NuxtLink
                to="/mentions-legales"
                class="mt-4 mb-6 cursor-pointer hover:text-primary"
              >
                Mentions légales
              </NuxtLink>
            </li>
            <!-- <li class="">
              <NuxtLink
                to="/calendrier"
                class="mt-4 mb-6 cursor-pointer hover:text-primary"
              >
                Calendrier
              </NuxtLink>
            </li> -->
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
ul > li::before {
  content: "•";
  margin-left: 1rem;
  margin-right: 0.5rem;
}
</style>

<script setup>
// Ajouter du margin pour voir correctement le footer
const route = useRoute();
const isRadioPage = computed(
  () => route.path === "/nos-retombees-presse/nos-passages-radio"
);

const actualYear = () => {
  const date = new Date();
  return date.getFullYear();
};
</script>
