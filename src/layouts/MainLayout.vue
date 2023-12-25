<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Memory Matcher
        </q-toolbar-title>

        <div>Reveals {{ reveals }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useMatcherGameStore } from 'src/stores/matcher-game-store'
import { storeToRefs } from 'pinia'

const linksList = [
  {
    title: 'Numbers',
    caption: 'Generate random numbers',
    icon: 'school',
    link: '/numbers'
  },
  {
    title: 'Dates',
    caption: 'Generate random dates',
    icon: 'school',
    link: '/dates'
  },
  {
    title: 'Times',
    caption: 'Generate random times',
    icon: 'school',
    link: '/times'
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {

    const leftDrawerOpen = ref(false)

    const store = useMatcherGameStore()
    const {reveals,rows,cols} = storeToRefs(store)

    return {
      reveals,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
