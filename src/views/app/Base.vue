<template>
<v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
        <Router />
    </v-navigation-drawer>

    <v-app-bar app class="bg-nav" dark dense>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>ระบบจัดการความเสี่ยง</v-toolbar-title>
    </v-app-bar>

    <v-main>
      
        <router-view  />
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
    drawer: any = null
}
</script>

<style>
.bg-nav {
    background: rgb(113, 63, 166);
    background: linear-gradient(90deg, rgba(113, 63, 166, 1) 0%, rgba(79, 63, 152, 1) 100%);
}
</style>
