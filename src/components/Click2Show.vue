<script setup>

import { ref } from 'vue';

const {isShow} = defineProps({
    value: {
      type: String,
      required: true
    },
    divClass: {
      type: String
    },
    divStyle: {
      type: String
    },
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
    },
    vHtml: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: false
    }
})

let show = ref(isShow)

</script>
<template>
    <q-btn
      v-if="!show"
      outline
      rounded
      :color="btnColor"
      :label="label"
      @click="show=true"
      :size="btnSize"
    />
    <div v-else-if="vHtml" :class="divClass" :style=divStyle v-html="value"></div>
    <div v-else :class="divClass" :style=divStyle >{{ value }}</div>

</template>
