<template>
<div class="pt-4">
    <h2 class="text-xl">แผนบริหารจัดการความเสี่ยงและควบคุมภายใน (RM-Plan)</h2>  
    <div class="flex flex-col mt-2" v-if="response">
        <div class="flex flex-wrap md:flex-row">
            <v-text-field dense readonly filled :value="CURRENT_AGENCY.name" label="ชื่อหน่วยงาน"></v-text-field>
             <v-select dense :items="YEARS" item-text="name" item-value="id" label="ปีงบประมาณ" filled placeholder="เลือกปีงบประมาณ"></v-select>
            <v-autocomplete dense :items="MISSION" filled multiple label="การบริหารจัดการความเสี่ยงตามพันธกิจ" item-text="name" item-value="id"></v-autocomplete>
        </div>
        <div class="flex flex-wrap md:flex-row">
            <v-autocomplete dense filled label="ยุทธศาสตร์" item-text="name" item-value="id" :items="STRATEGIC"></v-autocomplete>
            <v-text-field dense filled label="ค่าเป้าหมาย"></v-text-field>
            <v-autocomplete dense filled label="กลยุทธ์" item-text="name" item-value="id" :items="STRATEGY"></v-autocomplete>
        </div>

        <RMPlanTable />
        
        <v-btn @click="dialogSign=true" color="success">การลงนาม</v-btn>
        <v-dialog v-model="dialogSign" max-width="550" scrollable persistent :overlay="false" transition="dialog-transition">
            <v-card>
                <v-card-title primary-title>
                    การลงนาม <v-spacer></v-spacer>
                    <v-btn @click="dialogSign=false" small icon fab color="success">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <div class="flex flex-col">
                        <center>
                            <Sign />
                        </center><br>
                        <v-text-field filled label="ลงชื่อ"></v-text-field>
                        <v-text-field filled label="ตำแหน่ง"></v-text-field>
                        <v-text-field filled label="วันที่" type="date"></v-text-field>
                    </div>

                </v-card-text>
                <v-card-actions>
                    <v-btn class="w-full" color="success">ยืนยัน</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Core } from '../../store/core'
import Sign from './Draw.vue'
import RMPlanTable from './RMPlanTable.vue'
@Component({
    components: { Sign, RMPlanTable },
})
export default class RMPlan extends Vue {
    private response: boolean = false;
    private YEARS: any = null
    private CURRENT_AGENCY: any = null
    private MISSION: any = null
    private STRATEGIC: any = null
    private STRATEGY: any = null
    private currentYear: number | null = null
    private dialogSign: boolean = false
    private async created() {
        await this.getChoices()
        await this.getCurrentAgency();
        this.response = true;

    }

    private async getCurrentAgency() {
        this.CURRENT_AGENCY = await Core.getHttp(`/api/default/agency/${this.$route.query.agency}/`)

    }

    private async getChoices() {
        this.YEARS = await Core.getHttp(`/api/default/year/`)
        this.MISSION = await Core.getHttp(`/api/default/mission/`)
        this.STRATEGIC = await Core.getHttp(`/api/default/strategic/`)
        this.STRATEGY = await Core.getHttp(`/api/default/strategy/`)
    }

}
</script>
