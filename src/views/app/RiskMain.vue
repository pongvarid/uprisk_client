<template>
<div class="container">
    <ul class="breadcrumb"> 
        <li>
            <v-btn @click="$router.push('/app/')" style="font-size:16px;" text small color="blue">หน้าแรก</v-btn>
        </li>
        <li>
            <v-btn @click="$router.go(-1)" style="font-size:16px;" text small color="blue">หน่วยงาน</v-btn>
        </li>
        <li>
            <v-btn style="font-size:16px;" text small>{{CURRENT_AGENCY.name}} <span>({{YEARS.name}})</span> </v-btn>
        </li>
    </ul>
    <div class="p-3 mt-3">
        <!-- <h2 class="text-2xl">{{CURRENT_AGENCY.name}} </h2> 
        <span class="text-base text-purple-600" v-if="YEARS"> ปีงบประมาณ {{YEARS.name}}</span> -->
        <v-tabs color="primary" slider-color="primary"  >
            <v-tab>
                แผนบริหารจัดการความเสี่ยงและควบคุมภายใน (RM-Plan)
            </v-tab>
            <v-tab-item>
                <RMPlan />
            </v-tab-item>
            <v-tab>
                รายงานผลการดำาเนินงานตามแผนบริหารจัดการความเสี่ยงและควบคุมภายใน (RM-R6)
            </v-tab>
            <v-tab-item>
                <RMR6 />
            </v-tab-item>
            <v-tab>
                รายงานผลการดำเนินงานตามแผนบริหารจัดการความเสี่ยงและควบคุมภายใน (RM-R12)
            </v-tab>
            <v-tab-item>
                <RMR12 />
            </v-tab-item>
        </v-tabs>
    </div>

</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Core } from '../../store/core'
import RMPlan from '../../components/app/RMPlan.vue'
import RMR6 from '../../components/app/RMR6.vue'
import RMR12 from '../../components/app/RMR12.vue'
@Component({
    components: {
        RMR6,
        RMPlan,
        RMR12
    },
})
export default class RiskMain extends Vue {

    private CURRENT_AGENCY: any = null
    private PERMISSION: boolean = false
    private YEARS:any = null
    private async created() {
        await this.getPermission();
        await this.getCurrentAgency()
        console.log(this.$route);
    }
    private async getPermission() {
        this.PERMISSION = true;
    }
    private async getCurrentAgency() {
        this.CURRENT_AGENCY = await Core.getHttp(`/api/default/agency/${this.$route.query.agency}/`)
        this.YEARS = await Core.getHttp(`/api/default/year/${this.$route.query.year}`)

    }

}
</script>
