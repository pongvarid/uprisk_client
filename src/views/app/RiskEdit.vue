<template>
<div class="p-6 mt-2">
    <center>
        <h2 class="text-2xl font-bold">{{risk.name}} (RM-Plan )</h2>
        <h2>รายงานผลการดำาเนินงานตามแผนบริหารจัดการความเสี่ยงและควบคุมภายใน</h2>

    </center>
    <br> <br>

    <v-tabs vertical>
        <v-tab>
            ข้อมูลความเสี่ยง
        </v-tab>
        <v-tab-item>
            <Step1 :risk="risk" :plan="plan" />
        </v-tab-item>
        <v-tab>
            การดำเนินการ
        </v-tab>
        <v-tab-item>
            <Step2 :risk="risk" :plan="plan" />
        </v-tab-item> 
        <v-tab>
            ดัชนีชี้วัดความเสี่ยง
        </v-tab>
        <v-tab-item>
            <Step4 :risk="risk" :plan="plan" />
        </v-tab-item>
         <v-tab>
            ระดับความเสี่ยง
        </v-tab>
        <v-tab-item>
            <Step5 :risk="risk" :plan="plan" />
        </v-tab-item>
          <v-tab>
            ผู้รับผิดชอบ
        </v-tab>
        <v-tab-item>
            <Step3 :risk="risk" :plan="plan" />
        </v-tab-item>
          <v-tab>
            การลงนาม
        </v-tab>
        <v-tab-item>
            <Step6 :risk="risk" :plan="plan" />
        </v-tab-item>
    </v-tabs>

    <!-- <pre>{{plan}}</pre> -->

</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Core } from '../../store/core'
import Risk from '@/components/app/RMR6/Risk.vue'
import Draw from '../../components/app/Draw.vue'
import Step1 from '@/components/app/RM1Step/Step1.vue'
import Step2 from '@/components/app/RM1Step/Step2.vue'
import Step3 from '@/components/app/RM1Step/Step3.vue'
import Step4 from '@/components/app/RM1Step/Step4.vue'
import Step5 from '@/components/app/RM1Step/Step5.vue'
import Step6 from '@/components/app/RM1Step/Step6.vue'
@Component({
    components: { Draw, Risk, Step1, Step2, Step3, Step4, Step5 ,Step6},
})
export default class RMPlan extends Vue {
    private e1: number = 1
    private response: boolean = false;
    private plan: any = {};
    private risk: any = {};
    private dialog: boolean = true;
    private panel: any = [0, 1]
    private tabs: any = 1
    private currentMission: any = null

    private mission: any = null
    private strategic: any = null
    private strategy: any = null
    private type: any = null
    private result: any = null
    private manage: any = null
    private kri: any = null
    private internal: any = null
    private external: any = null
    private effect_risk: any = null
    private effect_risk_value: any = []
    private async created() {
        await this.loadChoice()
        await this.loadAll();
        this.response = true;

    }

    private async loadAll() {
        await this.loadPlan();
        await this.loadRisk();
        await this.calculateRate();
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
        this.effect_risk = await Core.getChoiceValue('ผลกระทบความเสี่ยง')
    }

    //    ('กลยุทธ์', 'กลยุทธ์'),
    //         ('ประเภทความเสี่ยง', 'ประเภทความเสี่ยง'),
    //         ('ผลกระทบความเสี่ยง', 'ผลกระทบความเสี่ยง'),
    //         ('มาตรการจัดการความเสี่ยง', 'มาตรการจัดการความเสี่ยง'),
    //         ('ดัชนีวัดความเสี่ยง', 'ดัชนีวัดความเสี่ยง'),
    //         ('ปัจจัยภายใน', 'ปัจจัยภายใน'),
    //         ('ปัจจัยภายนอก', 'ปัจจัยภายนอก'),

    private async loadPlan() {
        this.plan = await Core.getHttp(`/api/default/plan/all/${this.$route.query.plan}`)
        this.plan.strategic = JSON.parse(this.plan.strategic)
        this.plan.strategy = JSON.parse(this.plan.strategy)
        this.currentMission = await Core.getHttp(`api/default/mission/${this.plan.mission}`)

    }

    private async loadRisk() {
        this.risk = await Core.getHttp(`api/default/riskrm/${this.$route.query.risk}`)
        this.risk.sofceg = JSON.parse(this.risk.sofceg)
        this.risk.internal_cause = JSON.parse(this.risk.internal_cause)
        this.risk.external_cause = JSON.parse(this.risk.external_cause)
        this.risk.risk_management_measures = JSON.parse(this.risk.risk_management_measures)
        this.risk.kri = JSON.parse(this.risk.kri)
        this.risk.effect_risk = JSON.parse(this.risk.effect_risk)
    }

    private async updatePlanRisk() {
        let check = confirm('คุณแน่ใจใช่ไหมที่จะบันทึกข้อมูล โปรดตรวจสอบข้อมูลให้ระเอียดครบถ้วนก่อนบันทึกข้อมูล')
        if (check) {
            if (!this.plan.signature) {
                await this.convertSignToImage();
            }

            this.plan.strategic = JSON.stringify(this.plan.strategic)
            this.plan.strategy = JSON.stringify(this.plan.strategy)
            let xplan = await Core.putHttp(`api/default/rmplan/${this.plan.id}/`, this.plan)

            this.risk.sofceg = JSON.stringify(this.risk.sofceg)
            this.risk.internal_cause = JSON.stringify(this.risk.internal_cause)
            this.risk.external_cause = JSON.stringify(this.risk.external_cause)
            this.risk.risk_management_measures = JSON.stringify(this.risk.risk_management_measures)
            this.risk.kri = JSON.stringify(this.risk.kri)
            this.risk.effect_risk = JSON.stringify(this.risk.effect_risk)
            let xrisk = await Core.putHttp(`/api/default/riskrm/${this.risk.id}/`, this.risk)
            if (xplan.id && xrisk.id) {
                alert('บันทึกข้อมูลสำเร็จแล้ว')
                await this.$router.go(-1)
            }

            await this.loadAll();
        }

    }

    async calculateRate() {
        this.risk.li_score = this.risk.i * this.risk.l
        let data = this.getRiskType(this.risk.li_score)
        this.risk.li_result = data.detail
        this.risk.li_rate = data.rate

    }

    getRiskType(value: number) {
        if (value >= 0 && value <= 2) {
            return {
                "rate": "น้อย",
                "detail": "ระดับความเสี่ยงที่หน่วยงานยอมรับได้ ซึ่งอาจด าเนินการควบคุมภายในตามแผนงานที่มีอยู่เพื่อควบคุมหรือลดระดับความเสี่ยงให้หมดไป และป้องกันไม่ให้กลับเพิ่มสูงขึ้น"
            }
        } else if (value >= 3 && value <= 6) {
            return {
                "rate": "ปานกลาง",
                "detail": "ระดับความเสี่ยงที่หน่วยงานสามารถยอมรับได้ แต่ต้องด าเนินการควบคุมภายในตามแผนงาน ที่มีอยู่อย่างต่อเนื่อง เพื่อให้ระดับความเสี่ยงลดน้อยลงและไม่กลับเพิ่มสูงขึ้น"
            }
        } else if (value >= 7 && value <= 12) {
            return {
                "rate": "สูง",
                "detail": "ระดับความเสี่ยงที่หน่วยงานไม่สามารถยอมรับได้ ซึ่งต้องจัดหามาตรการในการป้องกันหรือ ลดความเสี่ยงโดยเร็ว เพื่อให้ระดับความเสี่ยงลดลงอยู่ในระดับที่ยอมรับได้และไม่กลับเพิ่มสูงขึ้น"
            }
        } else if (value >= 13 && value <= 25) {
            return {
                "rate": "สูงมาก",
                "detail": "ระดับความเสี่ยงที่หน่วยงานไม่สามารถยอมรับได้ ซึ่งต้องจัดหามาตรการในการป้องกันหรือ ลดความเสี่ยงอย่างเร่งด่วน เพื่อให้ระดับความเสี่ยงลดลงอยู่ในระดับที่ยอมรับได้และไม่กลับเพิ่มสูงขึ้น"
            }
        } else {
            return {
                "rate": "ไม่ระบุ",
                "detail": ""
            }
        }
    }

    getRiskColorBG(value: number) {
        if (value >= 0 && value <= 2) {
            return '#ccffcc'
        } else if (value >= 3 && value <= 6) {
            return '#ffffcc'
        } else if (value >= 7 && value <= 12) {
            return '#ffc299'
        } else if (value >= 13 && value <= 25) {
            return '#ffcccc'
        } else {
            return '#b3ecff'
        }
    }

    getRiskColor(value: number) {
        if (value >= 0 && value <= 2) {
            return 'green'
        } else if (value >= 3 && value <= 6) {
            return '#c0b812'
        } else if (value >= 7 && value <= 12) {
            return 'orange'
        } else if (value >= 13 && value <= 25) {
            return 'red'
        } else {
            return 'blue'
        }
    }
    getRiskPercent(value: number) {
        return (value / 25) * 100
    }

    async convertSignToImage() {
        let data: any = document.getElementById('myCanvas')
        var dataURL = data.toDataURL();
        this.plan.signature = dataURL
    }

}
</script>

<style>
#inspire>div.v-dialog__content.v-dialog__content--active>div>div>div.v-card__text>div>div.v-stepper__items>div:nth-child(4)>div>div.mt-2>div.flex.flex-col.md\:flex-row>div:nth-child(2)>div>div>div.v-input__slot>div.v-select__slot>div.v-select__selections {
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: flex-start !important;
    align-items: start;

}
</style>
