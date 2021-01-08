<template>
<div class="container">
    <ul class="breadcrumb">
        <li> <v-btn @click="$router.push('/app/')" style="font-size:16px;" text small color="blue">หน้าแรก</v-btn> </li>
        <li> <v-btn style="font-size:16px;" text small>คณะ</v-btn> </li> 
    </ul>
  <div class="p-3 mt-2">
 <h2 class="text-2xl font-semibold">ข้อมูลความเสี่ยงของคณะ</h2> 
 <p>เลือกคณะเพื่อดูหรือจัดการข้อมูล</p>
    <form @submit.prevent="loadAgency()" class="mt-2">
        <v-text-field @keyup="searchTimeOut()" v-model="search" placeholder="ระบุชื่อคณะ" label="ค้นหา" filled></v-text-field>
    </form>
  </div> 
    <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 xl:w-1/3 p-3" v-for="list,index in SCHOOLS" :key="index"> 
            <div class="bg-white border rounded shadow p-2 h-20" @click="(chooseAgency=list.id) && (dialog=true)" >
                <div class="flex flex-row items-center">
                   <v-btn color="success" rounded fab><v-icon>mdi mdi-school</v-icon></v-btn>
                    <div class="flex-1 text-right md:text-center">
                        <h5 class="font-bold uppercase text-gray-500">{{list.name}}</h5>
                    </div>
                </div>
            </div>
            <!--/Metric Card-->
        </div>
    </div>

     <v-dialog v-model="dialog" scrollable   persistent :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
               <v-icon>mdi-calendar-clock</v-icon> เลือกปีงบประมาณ <v-spacer></v-spacer> 
               <v-btn @click="dialog=false" small fab text ><v-icon>mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-card-text>
                <v-select filled
                    :items="YEARS"
                    item-value="id"
                    item-text="name"
                    v-model="chooseYear"
                    label="ปีงบประมาณ"
                ></v-select>
            </v-card-text>
            <v-card-actions class="bg-green-600">
                <v-btn @click="$router.push(`/app/risk?agency=${chooseAgency}&year=${chooseYear}&state=${$route.name}`)" large text class="w-full" dark><v-icon>mdi-check-circle</v-icon>ยืนยัน</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Core } from '../../store/core'
@Component({
    components: {

    },
})
export default class Home extends Vue {
    private SCHOOLS: any = null
    private YEARS: any = null
    private search: string = ''
    private awaitingSearch: boolean = false

    private dialog:boolean = false
    private chooseYear:number|null = null
    private chooseAgency:number|null = null 

    private async created() {
        await this.loadAgency()
    }
    private async loadAgency() {
        this.SCHOOLS = await Core.getHttp(`/api/default/agency/?agency_type=2&search=${this.search}`)
         this.YEARS = await Core.getHttp(`/api/default/year/`)
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
