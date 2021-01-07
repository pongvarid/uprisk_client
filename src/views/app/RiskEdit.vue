<template>
<div>

    <v-dialog v-model="dialog" scrollable persistent fullscreen transition="dialog-transition">
        <form @submit.prevent="updatePlanRisk()" class="mt-2">
        <v-card>
            <v-card-title primary-title>
                <h2 class="font-semibold">จัดการข้อมูล (RM Plan)</h2>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialog=false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text v-if="response">
                
                    <v-tabs v-model="tabs" color="primary" slider-color="primary">
                        <v-tab>
                            ข้อมูลทั่วไป
                        </v-tab>
                        <v-tab-item>

                            <v-select   v-model="plan.mission" :items="mission" item-text="name" item-value="id" outlined placeholder="เลือกข้อมูล" label="การบริหารจัดการความเสี่ยงตามพันธกิจ"></v-select>
                            <v-combobox v-model="plan.strategic" multiple :items="strategic" outlined placeholder="เลือกข้อมูล" label="ยุทธศาสตร์"></v-combobox>
                            <v-text-field   v-model="plan.target_value" outlined placeholder="ระบุข้อมูล" label="ค่าเป้าหมาย"></v-text-field>
                            <v-combobox v-model="plan.strategy" multiple :items="strategy" outlined placeholder="เลือกข้อมูล" label="กลยุทธ์"></v-combobox>
                        </v-tab-item>
                        <v-tab>
                            ข้อมูลความเสี่ยง
                        </v-tab>
                        <v-tab-item>

                            <div class="flex flex-row flex-wrap">
                                <v-text-field v-model="risk.name" class="w-1/2" outlined dense label="ความเสี่ยง"></v-text-field>
                                <v-combobox v-model="risk.sofceg" multiple :items="type" class="w-1/2" outlined dense label="ประเภทความเสี่ยง (S-O-F-C-E-G)" autocomplete></v-combobox>
                            </div>

                            <h2>สาเหตุ/ปัจจัยเสี่ยง</h2>
                            <v-combobox v-model="risk.internal_cause" multiple :items="internal" outlined dense label="ปัจจัยภายใน"></v-combobox>
                            <v-combobox v-model="risk.external_cause" multiple :items="external" outlined dense label="ปัจจัยภายนอก"></v-combobox>
                            <v-text-field v-model="risk.effect_risk" outlined dense label="ผลกระทบของความเสี่ยง" autocomplete></v-text-field>

                            <v-text-field v-model="risk.existing_control" outlined dense label="การควบคุมที่มีอยู่ในปัจจุบัน"></v-text-field>

                        </v-tab-item>
                        <v-tab>
                            ระดับความเสี่ยงปัจจุบัน
                        </v-tab>
                        <v-tab-item>
                            <h2>ระดับความเสี่ยงปัจจุบัน</h2>
                            <div class="flex flex-row flex-wrap">
                                <v-text-field v-model="risk.l" class="w-5/12" outlined dense label="โอกาส"></v-text-field>
                                <h2 class="w-2/12">
                                    <center>X</center>
                                </h2>
                                <v-text-field v-model="risk.i" class="w-5/12" outlined dense label="ผลกระทบ" autocomplete></v-text-field>
                            </div>
                            <div class="flex flex-row flex-wrap">
                                <v-text-field v-model="risk.li_score" readonly label="คะแนน" id="id"></v-text-field>
                                <v-text-field v-model="risk.li_result" readonly label="ผล" id="id"></v-text-field>
                            </div>
                            <div class="flex flex-row flex-wrap">
                                <h2 class="w-4/12">ระดับคะแนน</h2>
                                <h2 class="w-4/12">โอกาส(L)</h2>
                                <h2 class="w-4/12">ผลกระทบ(I)</h2>

                                <v-text-field disabled class="w-3/12" outlined dense label="5"></v-text-field>
                                <v-text-field v-model="risk.l5" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>
                                <v-text-field v-model="risk.i5" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>

                                <v-text-field disabled class="w-3/12" outlined dense label="4"></v-text-field>
                                <v-text-field v-model="risk.l4" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>
                                <v-text-field v-model="risk.i4" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>

                                <v-text-field disabled class="w-3/12" outlined dense label="3"></v-text-field>
                                <v-text-field v-model="risk.l3" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>
                                <v-text-field v-model="risk.i3" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>

                                <v-text-field disabled class="w-3/12" outlined dense label="2"></v-text-field>
                                <v-text-field v-model="risk.l2" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>
                                <v-text-field v-model="risk.i2" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>

                                <v-text-field disabled class="w-3/12" outlined dense label="1"></v-text-field>
                                <v-text-field v-model="risk.l1" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>
                                <v-text-field v-model="risk.i1" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>

                            </div>
                        </v-tab-item>
                        <v-tab>
                            มาตรการ
                        </v-tab>
                        <v-tab-item>
                            <v-combobox v-model="risk.risk_management_measures" multiple :items="manage" outlined dense label="วิธีการ/มาตรการจัดการความเสี่ยง"></v-combobox>
                            <v-combobox v-model="risk.kri" multiple :items="kri" outlined dense label="ดัชนีชี้วัดความเสี่ยง(KRI)"></v-combobox>
                            <v-text-field v-model="risk.response_date" type="date" outlined dense label="กําหนดเสร็จ"></v-text-field>
                            <v-text-field v-model="risk.responsible" outlined dense label="ผู้รับผิดชอบ"></v-text-field>
                        </v-tab-item>
                        <v-tab>
                            การลงนาม
                        </v-tab>
                        <v-tab-item>
                            <Draw />
                        </v-tab-item>
                    </v-tabs>
              
            </v-card-text>
            <v-card-actions>
                <div class="flex justify-end">
                    <v-btn type="submit" class="float-right" color="primary">บันทึกข้อมูล</v-btn>
                </div>

            </v-card-actions>
        </v-card>   </form>
    </v-dialog>

</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Core } from '../../store/core'
import Draw from '../../components/app/Draw.vue'
@Component({
    components: { Draw },
})
export default class RMPlan extends Vue {
    private response: boolean = false;
    private plan: any = {};
    private risk: any = {};
    private dialog: boolean = true;
    private panel: any = [0, 1]
    private tabs: any = 1

    private mission: any = null
    private strategic: any = null
    private strategy: any = null
    private type: any = null
    private result: any = null
    private manage: any = null
    private kri: any = null
    private internal: any = null
    private external: any = null

    private async created() {
        await this.loadChoice()
        await this.loadAll();
        this.response = true;

    }

    private async loadAll(){
        await this.loadPlan();
         await this.loadRisk();
    }

    private async loadChoice() {
        this.mission = await Core.getHttp(`/api/default/mission/`)
        this.strategic = await Core.getChoiceValue('ยุทธศาสตร์')
        this.strategy = await Core.getChoiceValue('กลยุทธ์')
        this.type = await Core.getChoiceValue('ประเภทความเสี่ยง')
        this.result = await Core.getChoiceValue('ผลกระทบความเสี่ยง')
        this.manage = await Core.getChoiceValue('มาตรการจัดการความเสี่ยง')
        this.kri = await Core.getChoiceValue('ดัชนีวัดความเสี่ยง')
        this.internal = await Core.getChoiceValue('ปัจจัยภายใน')
        this.external = await Core.getChoiceValue('ปัจจัยภายนอก')
    }

    //    ('กลยุทธ์', 'กลยุทธ์'),
    //         ('ประเภทความเสี่ยง', 'ประเภทความเสี่ยง'),
    //         ('ผลกระทบความเสี่ยง', 'ผลกระทบความเสี่ยง'),
    //         ('มาตรการจัดการความเสี่ยง', 'มาตรการจัดการความเสี่ยง'),
    //         ('ดัชนีวัดความเสี่ยง', 'ดัชนีวัดความเสี่ยง'),
    //         ('ปัจจัยภายใน', 'ปัจจัยภายใน'),
    //         ('ปัจจัยภายนอก', 'ปัจจัยภายนอก'),

    private async loadPlan() {
        this.plan = await Core.getHttp(`api/default/rmplan/${this.$route.query.plan}`)
        this.plan.strategic = JSON.parse(this.plan.strategic)
        this.plan.strategy = JSON.parse(this.plan.strategy)
    }

    private async loadRisk() {
        this.risk = await Core.getHttp(`api/default/riskrm/${this.$route.query.risk}`)
        this.risk.sofceg = JSON.parse(this.risk.sofceg)
        this.risk.internal_cause = JSON.parse(this.risk.internal_cause)
        this.risk.external_cause = JSON.parse(this.risk.external_cause)
        this.risk.risk_management_measures = JSON.parse(this.risk.risk_management_measures)
        this.risk.kri = JSON.parse(this.risk.kri)
    }

    private async updatePlanRisk() {
        this.plan.strategic = JSON.stringify(this.plan.strategic)
        this.plan.strategy = JSON.stringify(this.plan.strategy)
        await Core.putHttp(`api/default/rmplan/${this.plan.id}/`, this.plan)

        this.risk.sofceg = JSON.stringify(this.risk.sofceg)
        this.risk.internal_cause = JSON.stringify(this.risk.internal_cause)
        this.risk.external_cause = JSON.stringify(this.risk.external_cause)
        this.risk.risk_management_measures = JSON.stringify(this.risk.risk_management_measures)
        this.risk.kri = JSON.stringify(this.risk.kri)
        await Core.putHttp(`/api/default/riskrm/${this.risk.id}/`, this.risk)
        await this.loadAll();
    }

}
</script>
