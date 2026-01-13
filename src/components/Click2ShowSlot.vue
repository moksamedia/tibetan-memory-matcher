<script setup>

import { ref } from 'vue';

const {link} = defineProps({
    btnSize: {
      type: String,
      default: 'xs'
    },
    btnColor: {
      type: String,
      default: 'primary'
    },
    label: {
      type: String,
      default: 'show'
    }
})

let show = ref(false)

</script>
<template>
    <q-btn
      v-if="!show"
      outline
      rounded
      :color="btnColor"
      label="show"
      @click="show=true"
      :size="btnSize"
    />
    <slot v-else></slot>
</template>
