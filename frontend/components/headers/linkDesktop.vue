<template>
    <li class="hover-effect" @click="handleClick"
        :class="{ 'clicked-class': isHeaderActiveLink(to) }">
        <nuxt-link class="flex items-center h-full text-sm hover:text-primary transition-colors duration-300 font-medium" :target="target" :to="to">
            <!-- You can use slots to make the component's content dynamic -->
                <slot></slot>
        </nuxt-link>
    </li>
</template>

<style scoped>
.hover-effect {
    position: relative;
}

.hover-effect::after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background: #72BC7A; /* Change this to the color you want */
    transition: width .3s;
    position: absolute;
    left: 0; /* Add this to align the pseudo-element with the left edge of the .hover-effect element */
}

.hover-effect:hover::after, .clicked-class::after {
    width: 100%;
}
</style>

<script setup lang="ts" >
    const { setHeaderActiveLink, isHeaderActiveLink } = useHeaderActiveLink();

    const props = defineProps({
        to: {
            type: String,
            required: true
        },
        target: {
            type: String,
            default: '_self'
        }
    });

    const handleClick = () => {
        setHeaderActiveLink(props.to);
    };

    const isClicked = ref(false);

    const clicked = () => {
        isClicked.value = !isClicked.value;
    };
</script>