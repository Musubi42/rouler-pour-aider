<template>
  <div
    class="container"
    @mousemove="moveImage"
    @mouseenter="showImage"
    @mouseleave="hideImage"
  >
    <slot></slot>
    <img
      id="image"
      v-if="isVisible"
      :src="imageSrc"
      :style="imageStyle"
      class="image-on-hover hidden md:block"
    />
  </div>
</template>

<script>
export default {
  props: ["imageSrc", "offsetParent"],
  watch: {
    offsetParent(newVal, oldVal) {
      this.decalageX = newVal;
    },
  },
  data() {
    return {
      isVisible: false,
      imageX: 0,
      decalageX: 0,
      imageY: 0,
      scrollOffset: 0,
      right: 0,
      clientY: 0,
      clientX: 0,
      initialX: 0,
    };
  },
  mounted() {
  },
  unmounted() {
  },
  methods: {
    // showImage(event) {
    //   // Premiere position de l'image
    //   this.initialX = event.clientX
 
    //   this.scrollOffset = window.pageYOffset; // Pour que le mnu n'est pas ouver en haut de la page, quand on scroll
      
    //   this.isVisible = true;
    // },
    hideImage() {
      // Reset la position de l'image
      this.isVisible = false;
    },
    moveImage(event) {
      this.right =
        event.pageX - window.innerWidth / 2 + (window.innerWidth / 2) * 0.2;

      this.imageY = event.pageY;
    },
  },
  computed: {
    imageStyle() {
      return {
        position: "fixed",
        left: `${this.right - this.decalageX }px`,
        top: `${this.imageY - this.scrollOffset }px`,
        transform: "translate(-50%, -120%)",
        pointerEvents: "none",
        zIndex: 9,
      };
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  width: fit-content;
  height: 100%;
  /* margin: 5%;
  margin-bottom: 15%; */
}
/* .image-on-hover {
  transition: transform 0.3s;
  width: auto;
  max-width: 100%;
  width: fit-content;
  z-index: 1;
} */
</style>