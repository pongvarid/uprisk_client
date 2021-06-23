<template>
<div>

    <v-tabs color="primary" dark slider-color="primary">
        <v-tab>
            RM1
        </v-tab>
        <v-tab-item>
            <v-dialog v-model="dialog" scrollable fullscreen persistent :overlay="false" max-width="500px" transition="dialog-transition">
                <v-card>
                    <div class="p-6">
                        <center>
                            <h2 class="ff text-xl  font-bold">แผนการจัดการความเสี่ยงและควบคุมภายใน (RM-Plan) ประจำปีงบประมาณ 2564</h2>
                        </center><br>
                        <center>
                            <h2 class="ff text-base "><span class="ff font-bold">ชื่อหน่วยงาน </span> กองแผนงาน</h2>
                        </center><br><br>
                        <div class="flex justify-center items-center">
                            <span class="ff font-bold">การบริหารจัดการความเสี่ยงตามพันธกิจ</span>
                            <v-combobox class="ml-2 ff text-base " v-model="plan.mission" multiple :items="mission" item-text="name" item-value="id"></v-combobox>
                        </div>
                 
                        <div class="flex justify-center items-center">
                            <span class="ff font-bold">ยุทธศาสตร์</span>
                            <v-combobox class="ml-2 ff text-base " v-model="plan.strategic" multiple :items="strategic" item-text="name" item-value="id"></v-combobox>
                        </div>
                        <div class="flex justify-center items-center">
                            <span class="ff font-bold">ค่าเป้าหมาย</span>
                            <v-text-field class="ml-2 ff text-base " v-model="plan.target_value" item-text="name" item-value="id"></v-text-field>
                        </div>
                        <div class="flex justify-center items-center">
                            <span class="ff font-bold">กลยุทธ์</span>
                            <v-combobox class="ml-2 ff text-base " v-model="plan.strategy" multiple :items="strategy"></v-combobox>
                        </div>

                        <table class="w-full">
                            <tbody class="w-full">
                                <tr class="w-full">
                                    <td>ลำดับ</td>
                                    <td>ความเสี่ยง</td>
                                    <td>ประเภทความเสี่ยง</td>
                                    <td>สาเหตุ</td>
                                    <td>ผลกระทบของความเสี่ยง</td>
                                    <td>การควบคุมที่มีอยู่ในปัจจุบัน</td>
                                    <td>ระดับความเสี่ยงปัจจุบัน</td>
                                    <td>วิธีการ/มาตรการจัดการความเสี่ยง</td>
                                    <td>ดัชนีชี้วัดความเสี่ยง(KRI)</td>
                                    <td>ผู้รับผิดชอบ</td>
                                </tr>
                                <tr class="w-full">
                                    <td>
                                        1
                                    </td>
                                    <td> {{risk.name}} </td>
                                    <td> <span class="ff" v-for="d,i in risk.sofceg" :key="i">{{d}}</span> </td>
                                    <td style="width:20%;">
                                        ภายใน <span class="ff" v-for="d,i in risk.internal_cause" :key="i"><br>- {{d}} <br></span><br><br>
                                        ภายนอก <span class="ff" v-for="d,i in risk.external_cause" :key="i"><br>- {{d}} <br></span>
                                    </td>
                                    <td> <span class="ff" v-for="d,i in risk.effect_risk" :key="i">{{d}}</span> </td>
                                    <td> {{risk.existing_control }} </td>
                                    <td>{{risk.l}} x {{risk.i}} = {{risk.li_score}} </td>
                                    <td><span class="ff" v-for="d,i in risk.risk_management_measures" :key="i">{{d}}</span> </td>
                                    <td> <span class="ff" v-for="d,i in risk.kri" :key="i">{{d}}</span> </td>
                                    <td style="width:10%;"> นายพงษ์วริษฐ์ มณีวรรณ์</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex flex-row">
                            <div class="w-3/4"></div>
                            <div class="w-1/4"><br><br>
                                <h2 class="ff">ลายมือชื่อ...................................</h2>
                                <h2 class="ff">(..........................................)</h2>
                                <h2 class="ff">ตำแหน่ง...................................</h2>
                                <h2 class="ff">วัน.........เดือน.............ปี..........</h2>
                            </div>
                        </div>
                        <v-btn @click="print" color="success">Print</v-btn>

                    </div>
                </v-card>
            </v-dialog>
        </v-tab-item>
        <v-tab>
            RM6
        </v-tab>
        <v-tab-item>

        </v-tab-item>
        <v-tab>
            RM12
        </v-tab>
        <v-tab-item>

        </v-tab-item>
    </v-tabs>
</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Core } from '../../store/core'
import Risk from '@/components/app/RMR6/Risk.vue'
import Draw from '../../components/app/Draw.vue'
import Step1 from '@/components/app/RM12Step/Step1.vue'
import Step2 from '@/components/app/RM12Step/Step2.vue'
import Step3 from '@/components/app/RM12Step/Step3.vue'
import Step4 from '@/components/app/RM12Step/Step4.vue'
import Step5 from '@/components/app/RM12Step/Step5.vue'
import Step6 from '@/components/app/RM12Step/Step6.vue'
@Component({
    components: { Draw, Risk, Step1, Step2, Step3, Step4, Step5, Step6 },
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
        this.plan.mission = [this.plan.mission]
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

    async print() { 
        window.print();

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

#inspire>div>main>div>div>div>div.v-window.v-item-group.theme--light.v-tabs-items>div>div>div>div:nth-child(6)>div>div>div.v-input__slot>div.v-select__slot>input[type=hidden]:nth-child(3) {
    font-family: 'Niramit', sans-serif !important;
}
 #inspire > div.v-dialog__content.v-dialog__content--active > div > div > div > div:nth-child(6) > div > div > div.v-input__slot > div.v-select__slot > input[type=hidden]:nth-child(3){
       font-family: 'Niramit', sans-serif !important;
 }
.v-select__selection .v-select__selection--comma{
font-family: 'Niramit', sans-serif !important;
}

#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div > div > div > div > div.v-input__slot > div.v-select__slot > div.v-select__selections > div {
    font-family: 'Niramit', sans-serif !important;
}
table,
th,
td {
    border: 1px solid black;
    border-collapse: collapse;
    font-family: 'Niramit', sans-serif !important;
    font-weight: bold;
    font-size: 12px !important;
}

th,
td {
    padding: 15px;
    text-align: left;
    font-family: 'Niramit', sans-serif !important;
    font-size: 12px !important;
}
</style>
