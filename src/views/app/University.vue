<template>
<div class="container">
    <ul class="breadcrumb">
        <li> <v-btn @click="$router.push('/app/')" style="font-size:16px;" text small color="blue">หน้าแรก</v-btn> </li>
        <li> <v-btn style="font-size:16px;" text small>มหาวิทยาลัย</v-btn> </li> 
    </ul>
  <div class="p-3 mt-2">
 <h2 class="text-2xl">ข้อมูลความเสี่ยงของมหาวิทยาลัย</h2> 
    <form @submit.prevent="loadAgency()" class="mt-2">
        <v-text-field @keyup="searchTimeOut()" v-model="search" placeholder="ระบุชื่อคณะ" label="ค้นหา" filled></v-text-field>
    </form>
  </div> 
    <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 xl:w-1/3 p-3" v-for="list,index in UNIVERSITY" :key="index">  
            <div class="bg-white border rounded shadow p-2 h-20" @click="$router.push(`/app/risk?agency=${list.id}&state=${$route.name}`)" >
                <div class="flex flex-row items-center">
                   <v-btn color="success" rounded fab><v-icon>mdi mdi-school</v-icon></v-btn>
                    <div class="flex-1 text-right md:text-center">
                        <h5 class="font-bold uppercase text-gray-500">{{list.name}}</h5>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Core } from '../../store/core'
@Component({
    components: {

    },
})
export default class University extends Vue {
    private UNIVERSITY: any = null
    private search: string = ''
    private awaitingSearch: boolean = false
    private async created() {
        await this.loadAgency()
    }
    private async loadAgency() {
        this.UNIVERSITY = await Core.getHttp(`/api/default/agency/?agency_type=3&search=${this.search}`)
    }

    async searchTimeOut() {
        if (!this.awaitingSearch) {
            setTimeout(async () => {
                await this.loadAgency()
                this.awaitingSearch = false;
            }, 2000);
        }
        this.awaitingSearch = true;
    }
}
</script>
