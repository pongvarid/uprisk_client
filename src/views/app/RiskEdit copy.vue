<template>
<div>

    <v-dialog v-model="dialog" scrollable persistent fullscreen transition="dialog-transition">
        <form @submit.prevent="updatePlanRisk()" class="mt-2">
            <v-card>
                <v-card-title primary-title>
                    <h2 class="font-semibold">จัดการข้อมูล (RM Plan)</h2>
                    <v-spacer></v-spacer>
                    <v-btn fab small text @click="$router.go(-1)">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text v-if="response">

                    <v-tabs v-model="tabs" color="primary" slider-color="primary">
                        <v-tab>
                            ข้อมูลทั่วไป
                        </v-tab>
                        <v-tab-item>

                            <v-select v-model="plan.mission" :items="mission" item-text="name" item-value="id" outlined placeholder="เลือกข้อมูล" label="การบริหารจัดการความเสี่ยงตามพันธกิจ"></v-select>
                            <v-combobox v-model="plan.strategic" multiple :items="strategic" outlined placeholder="เลือกข้อมูล" label="ยุทธศาสตร์"></v-combobox>
                            <v-text-field v-model="plan.target_value" outlined placeholder="ระบุข้อมูล" label="ค่าเป้าหมาย"></v-text-field>
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
                            <v-combobox  v-model="risk.effect_risk" multiple :items="effect_risk" outlined dense label="ผลกระทบของความเสี่ยง"></v-combobox> 

                            <v-text-field v-model="risk.existing_control" outlined dense label="การควบคุมที่มีอยู่ในปัจจุบัน"></v-text-field>

                        </v-tab-item>
                        <v-tab>
                            ระดับความเสี่ยงปัจจุบัน
                        </v-tab>
                        <v-tab-item>
                            <h2>ระดับความเสี่ยงปัจจุบัน</h2>
                            <div class="w-full flex flex-col  justify-center item-center mt-2">
                                <h2 class="font-bold" :style="`color:${getRiskColor(Number(this.risk.li_score))}`">{{this.risk.li_rate}}</h2>
                                <h2 class="text-4xl">{{this.risk.li_score}}<span class="text-base text-gray-500">(โอกาส {{this.risk.l}} x ผลกระทบ {{this.risk.i}})</span></h2>
                                <v-progress-linear style="width:100%;" striped height="20" :buffer-value="100" :value="getRiskPercent(Number(this.risk.li_score))" :color="getRiskColor(Number(this.risk.li_score))"></v-progress-linear>
                                <h2 :style="`color:${getRiskColor(Number(this.risk.li_score))}`">{{this.risk.li_result}}</h2>
                            </div>
                            <div class="flex flex-row flex-wrap mt-3">
                                <v-text-field type="number" @input="calculateRate" v-model="risk.l" class="w-5/12" outlined dense label="โอกาส"></v-text-field>
                                <h2 class="w-2/12">
                                    <center>X</center>
                                </h2>

                                <v-text-field type="number" @input="calculateRate" v-model="risk.i" class="w-5/12" outlined dense label="ผลกระทบ" autocomplete></v-text-field>
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
                            <div class="flex flex-row flex-wrap p-2">
                                <div class="w-1/2">
                                   
                                   <center> <h2 class="font-semibold">ลายมือชื่อ / ลายเซ็น</h2>
                                       <Draw v-if="!plan.signature" /> 
                                       <img class="mt-2" v-else :src="plan.signature" alt="">
                                       </center> 
                                </div>
                                <div class="w-1/2 pt-3">
                                   
                                    <v-text-field v-model="plan.sign" outlined dense label="ชื่อ-นามสกุล"></v-text-field>
                                     <v-text-field v-model="plan.position" outlined dense label="ตำแหน่ง"></v-text-field>
                                    <v-text-field v-model="plan.date" type="date"  outlined dense label="วันที่"></v-text-field>
                                </div>

                            </div>

                        </v-tab-item>
                    </v-tabs>

                </v-card-text>
                <v-card-actions>
                    <div class="flex justify-end">
                        <v-btn type="submit" class="float-right" color="primary">บันทึกข้อมูล</v-btn>
                    </div>

                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>

</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
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
    private effect_risk:any =null
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
        this.risk.effect_risk = JSON.parse(this.risk.effect_risk)
    }


    private async updatePlanRisk() {
        if(!this.plan.signature){
            await this.convertSignToImage();
        }
        
        this.plan.strategic = JSON.stringify(this.plan.strategic)
        this.plan.strategy = JSON.stringify(this.plan.strategy)
        await Core.putHttp(`api/default/rmplan/${this.plan.id}/`, this.plan)

        this.risk.sofceg = JSON.stringify(this.risk.sofceg)
        this.risk.internal_cause = JSON.stringify(this.risk.internal_cause)
        this.risk.external_cause = JSON.stringify(this.risk.external_cause)
        this.risk.risk_management_measures = JSON.stringify(this.risk.risk_management_measures)
        this.risk.kri = JSON.stringify(this.risk.kri)
        this.risk.effect_risk = JSON.stringify(this.risk.effect_risk)
        await Core.putHttp(`/api/default/riskrm/${this.risk.id}/`, this.risk)
        await this.loadAll();
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
    getRiskColor(value: number) {
        if (value >= 0 && value <= 2) {
            return 'green'
        } else if (value >= 3 && value <= 6) {
            return 'yellow'
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
     
    async convertSignToImage(){
        let data:any = document.getElementById('myCanvas')
        var dataURL = data.toDataURL();
        this.plan.signature = dataURL 
    }
    
 

}
</script>
