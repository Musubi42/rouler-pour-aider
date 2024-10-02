
<template>
  <div class="cursor-none z-50">
    <div
      class="h-full bg-secondary w-10 md:w-80 right-0 fixed z-[20] transform translate-x-full"
      :class="{ animate: !isMenuOpen }"
      id="separation" ></div>
    <div
      class="bg-close h-screen bg-secondary flex flex-row items-center fixed z-[20] right-0 w-full md:w-1/2 transform translate-x-full"
      aria-label="menu"
      id="bg" >
      <div
        class="top-10 relative md:absolute md:right-0 z-auto md:transform md:translate-x-full flex flex-col items-center md:block ml-[20%] md:ml-0"
        id="title"
        :class="{ animate: !isMenuOpen }"
        @mousemove="titleOffset" >
        
        <div
          class="text-2xl text-white font-semibold my-auto flex flex-col place-content-between gap-6"
        >
            <div class="z-10 relative">
              <NuxtLink
                to="/"
                class="block"
                @click="goToPage"
                >Accueil</NuxtLink
              >
            </div>
            <div class="z-10 relative">
              <NuxtLink
                to="https://solidarite.fondationaphp.fr/projects/rouler-pour-aider-fr"
                target="_blank"
                class="block"
                @click="goToPage"
                >Faire un don</NuxtLink
              >
            </div>
            <div class="z-10 relative">
              <div
                class="block"
                @click="showSubLink"
                aria-label="whoWeAre"
                >Qui sommes-nous ?</div>
                <div v-show="isShowSubLinkWhoWeAre" class="flex flex-col gap-2 text-xl font-medium pl-4 mt-4">
                  <NuxtLink to="/qui-sommes-nous/association" class="block" @click="goToPage">L'association</NuxtLink>
                  <NuxtLink to="/qui-sommes-nous/hopital-necker" class="block" @click="goToPage">L’Hôpital Necker – Enfants malades AP-HP</NuxtLink>
                  <!-- <NuxtLink to="/gallerie" class="block" @click="goToPage">Gallerie</NuxtLink> -->
                </div>
            </div>
            <div class="z-10 relative">
              <NuxtLink
                to="/premiere-edition"
                class="block"
                @click="goToPage"
                >Première édition</NuxtLink
              >
            </div>
            <div class="z-10 relative">
              <NuxtLink
                to="/nos-partenaires"
                class="block"
                @click="goToPage"
                >Nos partenaires</NuxtLink
              >
            </div>
            <div class="z-10 relative">
              <div
                class="block"
                @click="showSubLink"
                aria-label="ourPublicRelations"
                >Nos relations publiques</div>
                <div  v-show="isShowSubLinkOurPublicRelations" class="flex flex-col gap-2 text-xl font-medium pl-4 mt-4">
                  <NuxtLink to="/nos-retombees-presse/nos-articles-de-presse" class="block" @click="goToPage">Nos articles de presse</NuxtLink>
                  <NuxtLink to="/nos-retombees-presse/nos-reportages-tv" class="block" @click="goToPage">Nos reportages TV</NuxtLink>
                  <NuxtLink to="/nos-retombees-presse/nos-passages-radio" class="block" @click="goToPage">Nos passages radio</NuxtLink>
                </div>
            </div>
            <div class="z-10 relative">
              <NuxtLink
                to="/contact"
                class="block"
                @click="goToPage"
                >Contact</NuxtLink
              >
            </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#separation {
  transition: all 0.1s ease-in-out;
}

#separation.animate {
  transform: translateX(100%);
}

#title {
  transition: all 0.5s ease-in-out;
}

#title.animate {
  transform: translateX(100%);
}

#bg {
  transition: all 0.5s cubic-bezier(0.89, 0.06, 0.45, 0.97);
}

#bg.animate {
  transform: translateX(100%);
}

.eparation-open {
  transform: translateX(100%);
}

.eparation-close {
  transform: translateX(0px);
}

.title-open {
  transform: translateX(100%);
}

.title-close {
  transform: translateX(0px);
}

.bg-close {
  transform: translateX(100%);
}

.bg-open {
  transform: translateX(0px);
}

.part1-close {
  animation: part1-close-animation 0.6s none;
  animation-fill-mode: forwards;
}

@keyframes part1-close-animation {
  0% {
    transform: translate(0px, 0px);
    width: 10px;
    height: 25px;
    fill: white;
  }

  35% {
    transform: translate(0px, 7px);
    width: 10px;
    height: 6px;
    fill: white;
  }
}
</style>

<script>
export default {
  // setup() {
  //   const isCloseMenu = closeMenu();

  //   watch(isCloseMenu, (newValue, oldValue) => {
  //     console.log(newValue, oldValue, "isCloseMenu");
  //     IntroAnimation.value = newValue;
  //   });

  //   console.log(isCloseMenu);

  //   return {
  //     isCloseMenu,
  //   };
  // },
  props: ["isMenuOpen"],
  data() {
    return {
      offsetElement: 0,
      defaultBG: "#ff0066",
      menuTitles: ["work", "about"],
      animateSeparation: false,
      animateTitle: false,
      animateBg: false,
      isShowSubLinkOurPublicRelations: ref(false),
      isShowSubLinkWhoWeAre: ref(false),
      // isMenuOpen: false,
    };
  },
  watch: {
    isMenuOpen() {
      this.isMenuOpen ? this.openMenu() : this.closeMenu();
    },
    isCloseMenu() {
      // this.isCloseMenu ? this.closeMenu() : this.openMenu();
    },
    // isCloseMenu: {
    //   handler: function (newVal, oldVal) {
    //     console.log(newVal, oldVal, "isCloseMenu");
    //     if (newVal === false) {
    //       // this.toggleMenuBurger();
    //     }
    //   },
    //   deep: true, // Ceci est nécessaire si 'isMenuOpen' est un objet
    // },
  },
  mounted() {},
  methods: {
    titleAnimation(value) {
      // Changement de couleur du Background
      if (typeof value === "string") {
        document.getElementById("bg").style.backgroundColor = value;
      } else {
        document.getElementById("bg").style.backgroundColor =
          value.target.attributes["data-color"].value;
      }

      const workTitle = document.getElementById("workTitle");
      const aboutTitle = document.getElementById("aboutTitle");
      const contactTitle = document.getElementById("contactTitle");

      workTitle.classList.add("menu-text-overlay");
      aboutTitle.classList.add("menu-text-overlay");
      contactTitle.classList.add("menu-text-overlay");
    },
    titleOffset(event) {
      // this.offsetElement = parseInt(
      //   window.getComputedStyle(event.srcElement.offsetParent.offsetParent.offsetParent)
      //     .left
      // );
    },
    defaultBGColor() {
      // Retirer le before puis le translate pour éviter la boucle infinie
      // const workTitle = document.getElementById("workTitle");
      // const aboutTitle = document.getElementById("aboutTitle");
      // const contactTitle = document.getElementById("contactTitle");

      // workTitle.classList.remove("menu-text-overlay");
      // aboutTitle.classList.remove("menu-text-overlay");
      // contactTitle.classList.remove("menu-text-overlay");

      // document.getElementById("bg").style.backgroundColor = this.defaultBG;
    },
    goToPage(page) {
      this.closeMenu();
      this.$emit("update:isMenuOpen", !this.isMenuOpen);
    },
    showSubLink(event) {
      const label = event.srcElement.ariaLabel;

      if (label === "whoWeAre") {
        this.isShowSubLinkWhoWeAre = !this.isShowSubLinkWhoWeAre;
      } else if (label === "ourPublicRelations") {
        this.isShowSubLinkOurPublicRelations = !this.isShowSubLinkOurPublicRelations;
      }
    },
    toggleMenuBurger() {
      const menuBurger = document.getElementById("menu-burger");
      const rectElements = menuBurger.querySelectorAll("rect");

      const rect1 = rectElements[0];
      const rect2 = rectElements[1];
      const rect3 = rectElements[2];

      // Add to rect1 the CSS property "fill: black"

      rect1.classList.remove("part1-open");
      rect2.classList.remove("part2-open");
      rect3.classList.remove("part3-open");

      rect1.classList.add("part1-close");
      rect2.classList.add("part2-close");
      rect3.classList.add("part3-close");
    },
    openMenu() {
      const separationWidth = (window.innerWidth / 2) * 0.2;
      document.getElementById("separation").style.width = `${separationWidth}px`;

      // separation
      document.getElementById("separation").style.transform = "translateX(0)";
      document.getElementById("separation").style.transition = "all 0.1s ease-in-out";

      // Title
      setTimeout(function () {
        // TODO: Calculer un translateX et width pour separation dynamique en fonction de la taille de l'écran

        // document.getElementById("title").style.transform = "translateX(-50%)"; // Pour petit écran
        document.getElementById(
          "title"
        ).style.transform = `translateX(-${separationWidth}px)`; // Pour grand écran
        document.getElementById("title").style.transition = "all 0.5s ease-in-out";
      }, 0);

      // BG
      document.getElementById("bg").classList.remove("bg-close");
      document.getElementById("bg").classList.add("bg-open");
      document.getElementById("bg").style.transition =
        "transform 0.5s cubic-bezier(0, 0.75, 0.83, 0.67)";

      //  A la fin de l'animation faire disparaitre la séparation, pour que le changement de couleur soit fluide
    },
    closeMenu() {
      document.getElementById("separation").style.display = "block";

      // separation
      setTimeout(function () {
        document.getElementById("separation").style.transform = "translateX(100%)";
        document.getElementById("separation").style.transition = "all 0.1s ease-in-out";
      }, 400);

      // Title
      document.getElementById("title").style.transform = "translateX(100%)";
      document.getElementById("title").style.transition = "all 0.5s ease-in-out";

      // BG
      setTimeout(function () {
        document.getElementById("bg").classList.remove("bg-open");
        document.getElementById("bg").classList.add("bg-close");
      }, 100);

      this.defaultBGColor();
    },
  },
};
</script>

<script setup>
// definePageMeta({
//   layout: "menu",
// });
</script>
