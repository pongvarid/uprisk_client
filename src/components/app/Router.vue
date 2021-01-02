<template>
<div>
    <v-list-item>
        <v-list-item-content>
            <v-list-item-title class="title">
                Pongvarid
            </v-list-item-title>
            <v-list-item-subtitle>
                ผู้ใช้ทั่วไป
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
        <v-list-item :class="($route.name ==item.name)?'bg-green-200':'' ||($route.query.state ==item.name)?'bg-green-200':'' " v-for="item in items" :key="item.title" v-if="item.enabled" link @click="$router.push(item.path)">
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ item.title }} <!-- <br> {{$route.fullPath}} {{item.path}} ---> </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
          <v-list-item     link @click="$router.push(item.path)">
            <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>ออกจากระบบ</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash'

@Component({
    components: {

    },
})
export default class Routers extends Vue {
    items: any = [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
    ]
    current:any = ''
    right: any = null

    async created() {
        let routerAll: any = _.find(this.$router.options.routes, function (x: any) { return x.name == 'App' })
        this.items = routerAll.children
        console.log(this.$route);
    }
}
</script>
