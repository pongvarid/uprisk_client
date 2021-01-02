<template>
  <v-app id="inspire">
    <v-navigation-drawer  v-model="drawer" app  >
       <Router />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> 
      <v-toolbar-title>ระบบจัดการความเสี่ยง</v-toolbar-title>
    </v-app-bar>

    <v-main>
       <router-view />
    </v-main>
  </v-app> 
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Router from '@/components/app/Router.vue'
@Component({
  components: {
  Router
  },
})
export default class Home extends Vue {
    drawer:any =  null
}
</script>
