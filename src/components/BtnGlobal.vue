<template>
    <button >{{ btn_global }}</button>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
btn_global: String
}
)

// const handleClick = () => {
//     props.onClikBtn;
// };
// const emit = defineEmits()
// console.log(handleClick)

// emit('cambiar nombre', 'nuevo nombre del boton')

</script>

<style>
</style>