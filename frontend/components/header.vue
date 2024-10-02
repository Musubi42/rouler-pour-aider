<template>
  <header class="fixed block w-full z-50 bg-transparent" 
    :style="{ 'box-shadow': ( !dynamicStyle && !isMobile ) ? 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)' : 'de', '--tw-shadow-colored': ( dynamicStyle && !isMobile ) ? '0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)' : '', '--tw-shadow': ( dynamicStyle && !isMobile ) ? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' : '' }"
    :class="{ 'bg-white': (isHovered && !isMobile) }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave" >
    <!-- Partie Desktop -->
    <nav class="relative h-16 bg-transparent z-[1000]" 
      :style="{ 'background-color': ( dynamicStyle && !isMobile && !isTop ) ? 'white' : '' }" >
      <div class="px-4">
        <div class="flex items-center justify-between relative">
          <!-- Logo -->
          <NuxtLink class="flex text-lg font-bold" to="/">
            <NuxtImg
              format="webp"
              quality="80"
              class="h-16 w-auto cursor-pointer"
              src="/images/logoBig_roulerPourAider.png"
              alt="Logo rouler pour aider"
            />
          </NuxtLink>

          <!-- Menu burger pour mobile -->
          <div class="lg:hidden ml-auto z-50">
            <IconsMenuBurger
              aria-label="menuBurger"
              :style="{ height: burgerHeight + 'px', y: y + 'px' }"
              :y="y"
              class="text-[50px] fill-black"
              ref="menuBurger"
              @click="toggleMenuBurger"
            />
          </div>
          <!-- :style="{ 'color': ( !isTop && ( dynamicStyle || isHovered ) ) ? 'blue' : 'white' }" -->
          <ul class="hidden lg:flex lg:w-auto lg:space-x-12 h-16 items-stretch text-white"
            :style="{ 'color': ( dynamicStyle || isHovered ) ? 'blue' : 'white' }" >
            <HeadersLinkDesktop to="/">Accueil</HeadersLinkDesktop>
            <HeadersLinkDesktop to="https://solidarite.fondationaphp.fr/projects/rouler-pour-aider-fr" target="_blank" >Faire un don</HeadersLinkDesktop>
            <HeadersSubNavTest
              :subMenus="subMenuItemsWhoAreWe"
              @clicked-link="handleClicked"
              @clickedOnLink="handleLinkClicked"
              class="cursor-pointer" >
              Qui sommes-nous ?
            </HeadersSubNavTest>
            <HeadersLinkDesktop to="/premiere-edition">Première édition</HeadersLinkDesktop>
            <HeadersLinkDesktop to="/nos-partenaires">Nos partenaires</HeadersLinkDesktop>
            <HeadersSubNavTest
              class="cursor-pointer"
              :subMenus="subMenuItemsPress" >
              Nos relations publiques
            </HeadersSubNavTest>
            <HeadersLinkDesktop to="/contact">Contact</HeadersLinkDesktop>
          </ul>

          <div class="hidden lg:flex">
            <HeadersDonationAmount />
          </div>
        </div>
      </div>
    </nav>

    <!-- Partie mobile -->
      <Menu :isMenuOpen="toggleMenu" @update:isMenuOpen="handleMenuUpdate" class="z-[100] absolute -mt-16" />
  </header>
</template>

<style>
.blend-mode {
  mix-blend-mode: difference;
}

.part1-open {
  animation: part1-open-animation 0.6s none;
  animation-fill-mode: forwards;
}

@keyframes part1-open-animation {
  /* Start the animation right away */
  0% {
    transform: translateY(0px);
    width: 32px;
    height: 6px;
    fill: black;
  }

  /* Finish changes by here */
  35% {
    transform: translate(3px, 7px);
    /* transform: translateY(7px); */
    width: 32px;
    height: 6px;
    fill: black;
  }

  60% {
    transform: translate(3px, 7px);
    width: 10px;
    height: 6px;
    fill: white;
  }

  /* Between 20% and 100%, nothing changes */
  100% {
    transform: translate(3px, 0px);
    width: 10px;
    height: 25px;
    fill: white;
  }
}

/* [class^="i-"][class*="__part2"] { */
.part2-open {
  animation: part2-open-animation 0.6s none;
  animation-fill-mode: forwards;
}

@keyframes part2-open-animation {
  /* Start the animation right away */
  0% {
    transform: translate(0px, 0px);
    width: 32px;
    height: 6px;
    fill: black;
  }

  /* Finish changes by here */
  35% {
    transform: translate(0px, 0px);
    width: 32px;
    height: 6px;
    fill: black;
  }

  60% {
    transform: translate(16px, 0px);
    width: 10px;
    height: 6px;
    fill: white;
  }

  /* Between 20% and 100%, nothing changes */
  100% {
    transform: translate(16px, -7px);
    width: 10px;
    height: 50px;
    fill: white;
  }
}

.part3-open {
  animation: part3-open-animation 0.6s none;
  animation-fill-mode: forwards;
}

@keyframes part3-open-animation {
  /* Start the animation right away */
  0% {
    transform: translateY(0px);
    width: 32px;
    height: 6px;
    fill: black;
  }

  /* Finish changes by here */
  35% {
    transform: translate(0px, -7px);
    width: 32px;
    height: 6px;
    fill: black;
  }

  60% {
    transform: translate(29px, -7px);
    width: 10px;
    height: 6px;
    fill: white;
  }

  /* Between 20% and 100%, nothing changes */
  100% {
    transform: translate(29px, -14px);
    width: 10px;
    height: 50px;
    fill: white;
  }
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

  60% {
    transform: translate(0, 7px);
    width: 32px;
    height: 6px;
    fill: black;
  }

  100% {
    transform: translateY(0px);
    width: 32px;
    height: 6px;
    fill: black;
  }
}

.part2-close {
  animation: part2-close-animation 0.6s none;
  animation-fill-mode: forwards;
}

@keyframes part2-close-animation {
  0% {
    transform: translate(16px, -7px);
    width: 10px;
    height: 50px;
    fill: white;
  }

  35% {
    transform: translate(16px, 0px);
    width: 10px;
    height: 6px;
    fill: white;
  }

  60% {
    transform: translate(0px, 0px);
    width: 32px;
    height: 6px;
    fill: black;
  }

  100% {
    transform: translate(0px, 0px);
    width: 32px;
    height: 6px;
    fill: black;
  }
}

.part3-close {
  animation: part3-close-animation 0.6s none;
  animation-fill-mode: forwards;
}

@keyframes part3-close-animation {
  0% {
    transform: translate(32px, -14px);
    width: 10px;
    height: 50px;
    fill: white;
  }

  35% {
    transform: translate(32px, -7px);
    width: 10px;
    height: 6px;
    fill: white;
  }

  60% {
    transform: translate(0px, -7px);
    width: 32px;
    height: 6px;
    fill: black;
  }

  100% {
    transform: translateY(0px);
    width: 32px;
    height: 6px;
    fill: black;
  }
}
</style>

<script>
export default {
  props: {
    dynamicStyle: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      isClicked: false,
      isHovered: false,
      isAccueilPage: this.$route.fullPath === "/",
      subMenuItemsPress: [
        { name: 'Nos articles de presse', path: '/nos-retombees-presse/nos-articles-de-presse' },
        { name: 'Nos reportages TV', path: '/nos-retombees-presse/nos-reportages-tv' },
        { name: 'Nos passages radio', path: '/nos-retombees-presse/nos-passages-radio' },
      ],
      subMenuItemsWhoAreWe: [
        { name: "L'association", path: '/qui-sommes-nous/association' },
        { name: "L’Hôpital Necker – Enfants malades AP-HP", path: '/qui-sommes-nous/hopital-necker' },
      
      ],
      isMenuOpen: false,
      toggleMenu: false,
      menuBurgerOpened: false,
      burgerHeight: 24,
      y: 0,
      isMobile: false,
      isTop: true,
    };
  },
  //   { name: 'Gallerie photo', path: '/qui-sommes-nous/gallerie' },
  methods: {
    checkScroll() {
      this.isTop = window.scrollY === 0;
    },
    handleMouseEnter() {
      this.isHovered = true;
    },
    handleMouseLeave() {
      if (!this.isClicked) {
        this.isHovered = false;
      }
    },
    handleClicked() {
      this.isClicked = !this.isClicked;
    },
    handleLinkClicked() {
      this.isClicked = false;
      this.isHovered = false;
    },
    toggleMenuBurger() {
      this.isMenuOpen = !this.isMenuOpen;
      this.toggleMenu = !this.toggleMenu;
      this.menuBurgerOpened = !this.menuBurgerOpened;

      // change the height here
      this.burgerHeight = this.menuBurgerOpened ? 50 : 24;

      const svgElement = this.$refs.menuBurger.$el;
      const rectElements = svgElement.querySelectorAll("rect");
      const rect1 = rectElements[0];
      const rect2 = rectElements[1];
      const rect3 = rectElements[2];

      rect1.style.y = this.menuBurgerOpened ? "-13px" : "0px";
      rect2.style.y = this.menuBurgerOpened ? "-6px" : "8px";
      rect3.style.y = this.menuBurgerOpened ? "1px" : "16px";

      if (this.menuBurgerOpened) {
        // Block the scrolling, so no problem with the image on hover
        document.body.style.overflow = "hidden";

        rect1.classList.remove("part1-close");
        rect2.classList.remove("part2-close");
        rect3.classList.remove("part3-close");

        rect1.classList.add("part1-open");
        rect2.classList.add("part2-open");
        rect3.classList.add("part3-open");
      } else {
        document.body.style.overflow = "auto";

        rect1.classList.remove("part1-open");
        rect2.classList.remove("part2-open");
        rect3.classList.remove("part3-open");

        rect1.classList.add("part1-close");
        rect2.classList.add("part2-close");
        rect3.classList.add("part3-close");
      }
    },

    handleMenuUpdate(event) {
      this.toggleMenuBurger();

      // // Update current language in use
      // this.isMobileUpdateLanguage++;
    },
  },

  mounted() {
    this.isMobile = window.innerWidth <= 768;
    window.addEventListener('scroll', this.checkScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.checkScroll);
  },
};
</script>
