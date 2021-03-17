<template>
  <div>

    <v-dialog v-model="dialog" scrollable persistent fullscreen transition="dialog-transition">
      <v-card v-if="dialog">
        <v-card-title class="title-bg">
          <h2 class="text-white">จัดการข้อมูล : {{currentMission.name}}</h2>
          <v-spacer></v-spacer>
          <v-btn dark fab small text @click="$router.go(-1)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">
                ทั่วไป
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">
                ข้อมูลความเสี่ยง
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">
                ระดับความเสี่ยงปัจจุบันในรอบ 6 เดือน
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="4">
                มาตรการ
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="5">
                การลงนาม
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <div class="mt-2">
                  <v-alert v-if="plan.mission && plan.strategic && plan.target_value && plan.strategy" dense border="left" type="success">
                    ท่านได้กรอกข้อมูลครบแล้ว กด <b>ถัดไป</b> เพื่อดำเนินการขั้นตอนต่อไป
                  </v-alert>
                  <v-alert v-else dense border="left" type="warning">
                    กรุณาระบุช้อมูลให้ครบถ้วน
                  </v-alert>

                  <v-select v-model="plan.mission" :items="mission" item-text="name" item-value="id" outlined placeholder="เลือกข้อมูล" label="การบริหารจัดการความเสี่ยงตามพันธกิจ"></v-select>
                  <v-combobox chips  v-model="plan.strategic" multiple :items="strategic" outlined placeholder="เลือกข้อมูล" label="ยุทธศาสตร์"></v-combobox>
                  <v-text-field v-model="plan.target_value" outlined placeholder="ระบุข้อมูล" label="ค่าเป้าหมาย"></v-text-field>
                  <v-combobox chips  v-model="plan.strategy" multiple :items="strategy" outlined placeholder="เลือกข้อมูล" label="กลยุทธ์"></v-combobox>
                </div>

                <div class="float-right" v-if="plan.mission && plan.strategic && plan.target_value && plan.strategy">
                  <v-btn color="primary" @click="e1=2">
                    ถัดไป <v-icon>mdi-arrow-right-thick</v-icon>
                  </v-btn>
                </div>

              </v-stepper-content>

              <v-stepper-content step="2">

                <div class="mt-2">

                  <v-alert v-if="risk.name && risk.sofceg && risk.internal_cause && risk.external_cause && risk.effect_risk" dense border="left" type="success">
                    ท่านได้กรอกข้อมูลครบแล้ว กด <b>ถัดไป</b> เพื่อดำเนินการขั้นตอนต่อไป
                  </v-alert>
                  <v-alert v-else dense border="left" type="warning">
                    กรุณาระบุช้อมูลให้ครบถ้วน
                  </v-alert>

                  <v-text-field v-model="risk.name" outlined dense label="ความเสี่ยง"></v-text-field>
                  <h2 class="font-semibold">ความเสี่ยงเดิม</h2><br>
                  <Risk :plan="plan" ></Risk>


                  <br>
                  <v-textarea  outlined dense label="การแก้ไขปัญหา"></v-textarea>
                </div>

                <div class="float-right">
                  <v-btn text color="primary" @click="e1=1">
                    <v-icon>mdi-arrow-left-thick</v-icon> ก่อนหน้า
                  </v-btn>
                  <v-btn color="primary" @click="e1=3" v-if="risk.name && risk.sofceg && risk.internal_cause && risk.external_cause && risk.effect_risk">
                    ถัดไป <v-icon>mdi-arrow-right-thick</v-icon>
                  </v-btn>
                </div>
              </v-stepper-content>

              <v-stepper-content step="3">
                <div class="mt-2">
                  <v-alert v-if="(Number(this.risk.li_score) <= 25) && risk.l5 && risk.l4 && risk.l3 && risk.l2 && risk.l1 && risk.i5 && risk.i4 && risk.i3 && risk.i2 && risk.i1 " dense border="left" type="success">
                    ท่านได้กรอกข้อมูลครบแล้ว กด <b>ถัดไป</b> เพื่อดำเนินการขั้นตอนต่อไป
                  </v-alert>
                  <v-alert v-else dense border="left" type="warning">
                    กรุณาระบุช้อมูลให้ครบถ้วน
                  </v-alert>
                  <h2 class="font-semibold">ระดับความเสี่ยงปัจจุบัน</h2>

                  <div class="flex flex-wrap">
                    <div class="w-full">
                      <v-alert v-if="Number(this.risk.li_score) > 25" dense border="left" type="error">
                        ผลลัพธ์ห้ามเกิน <b>25</b>
                      </v-alert>
                    </div>
                    <div class="w-1/2 flex flex-row flex-wrap mt-3 p-3">

                      <v-text-field type="number" @input="calculateRate" v-model="risk.l" class="w-5/12" outlined dense label="โอกาส"></v-text-field>
                      <h2 class="w-2/12">
                        <center>X</center>
                      </h2>

                      <v-text-field type="number" @input="calculateRate" v-model="risk.i" class="w-5/12" outlined dense label="ผลกระทบ" autocomplete></v-text-field>
                    </div>
                    <div class="w-1/2 flex flex-col  justify-center item-center mt-2">
                      <h2 class="font-bold" :style="`color:${getRiskColor(Number(this.risk.li_score))}`">{{this.risk.li_rate}}</h2>
                      <h2 class="text-4xl">{{this.risk.li_score}}<span class="text-base text-gray-500">(โอกาส {{this.risk.l}} x ผลกระทบ {{this.risk.i}})</span></h2>
                      <v-progress-linear style="width:100%;" striped height="20" :buffer-value="100" :value="getRiskPercent(Number(this.risk.li_score))" :color="getRiskColor(Number(this.risk.li_score))"></v-progress-linear>
                      <h2 :style="`color:${getRiskColor(Number(this.risk.li_score))}`">{{this.risk.li_result}}</h2>
                    </div>
                  </div>
                  <br>
                  <div class="mt-3" v-if="risk.l && risk.i && (Number(this.risk.li_score) <= 25)" :style="`background-color:${getRiskColorBG(Number(this.risk.li_score))}`">
                    <h2 class="font-semibold">หลักเกณฑ์การประเมินระดับความเสี่ยง (โอกาสxผลกระทบ)</h2> <br>
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
                  </div>

                </div>
                <div class="float-right">
                  <v-btn text color="primary" @click="e1=2">
                    <v-icon>mdi-arrow-left-thick</v-icon> ก่อนหน้า
                  </v-btn>
                  <v-btn color="primary" v-if="(Number(this.risk.li_score) <= 25) && risk.l5 && risk.l4 && risk.l3 && risk.l2 && risk.l1 && risk.i5 && risk.i4 && risk.i3 && risk.i2 && risk.i1 " @click="e1=4">
                    ถัดไป <v-icon>mdi-arrow-right-thick</v-icon>
                  </v-btn>
                </div>
              </v-stepper-content>

              <v-stepper-content step="4">
                <div class="mt-2">

                  <br>
                  <v-combobox chips  v-model="risk.manager" multiple :items="kri" outlined   label="ดำเนินงานในรอบ 6 เดือน "></v-combobox>
                  <v-combobox chips  v-model="risk.result" multiple :items="kri" outlined   label="ผลการดำเนินงานในรอบ 6 เดือน"></v-combobox>
                  <v-text-field v-model="risk.responsible" outlined dense label="ผู้รับผิดชอบ"></v-text-field>
                  <v-text-field v-model="risk.response_date" type="date" outlined dense label="กําหนดเสร็จ"></v-text-field>
                </div>
                <div class="float-right">
                  <v-btn text color="primary" @click="e1=3">
                    <v-icon>mdi-arrow-left-thick</v-icon> ก่อนหน้า
                  </v-btn>
                  <v-btn color="primary" @click="e1=5" v-if="risk.risk_management_measures && risk.kri && risk.response_date && risk.responsible">
                    ถัดไป <v-icon>mdi-arrow-right-thick</v-icon>
                  </v-btn>
                </div>
              </v-stepper-content>

              <v-stepper-content step="5">
                <div class="mt-2">
                  <v-alert   v-if="plan.signature" dense border="left" type="success">
                    ลงนามความเสี่ยงนี้แล้ว
                  </v-alert>
                  <v-alert v-else dense border="left" type="warning">
                    ยังไม่มีผู้ลงนาม
                  </v-alert>
                  <div class="flex flex-row flex-wrap p-2">
                    <div class="w-1/2">

<!--                      <center> <h2 class="font-semibold">ลายมือชื่อ / ลายเซ็น</h2>-->
<!--                        <Draw v-if="!plan.signature" />-->
<!--                        <img class="mt-2" v-else :src="plan.signature" alt="">-->
<!--                      </center>-->
                    </div>
                    <div class="w-1/2 pt-3">

                      <v-text-field :disabled="plan.signature" v-model="plan.sign" outlined dense label="ชื่อ-นามสกุล"></v-text-field>
                      <v-text-field :disabled="plan.signature" v-model="plan.position" outlined dense label="ตำแหน่ง"></v-text-field>
                      <v-text-field :disabled="plan.signature" v-model="plan.date" type="date"  outlined dense label="วันที่"></v-text-field>
                    </div>
                  </div>
                </div>

                <div class="float-right">
                  <div class="float-right">
                    <v-btn text color="primary" @click="e1=4">
                      <v-icon>mdi-arrow-left-thick</v-icon> ก่อนหน้า
                    </v-btn>
                    <v-btn @click="updatePlanRisk()" color="success" x-large>
                      <v-icon>mdi-floppy</v-icon> บันทึกข้อมูล
                    </v-btn>
                  </div>
                </div>
              </v-stepper-content>

            </v-stepper-items>
          </v-stepper>
        </v-card-text>
      </v-card>

    </v-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Core } from '../../store/core'
import Risk from '@/components/app/RMR6/Risk.vue'
import Draw from '../../components/app/Draw.vue'
@Component({
  components: { Draw, Risk },
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
  private effect_risk_value:any = []
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
    if(check){
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
      if(xplan.id && xrisk.id){
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
#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__text > div > div.v-stepper__items > div:nth-child(4) > div > div.mt-2 > div.flex.flex-col.md\:flex-row > div:nth-child(2) > div > div > div.v-input__slot > div.v-select__slot > div.v-select__selections{
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: flex-start!important;
  align-items: start;


}
</style>