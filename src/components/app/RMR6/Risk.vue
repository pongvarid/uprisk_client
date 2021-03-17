<template>
  <div >

    <div class="flex flex-row flex-wrap mt-4" v-if="plan.risk">
      <div class="w-full">
        <h2 class="font-semibold text-xl">ความเสี่ยง : <span class="font-light">{{plan.risk.name}}</span></h2>
      </div>
      <div class="w-1/3 pt-4">
        <h2 class="font-semibold">ระดับความเสี่ยงปัจจุบัน</h2>
        <div class="w-full flex flex-col  justify-center item-center mt-2">
          <h2 class="font-bold" :style="`color:${getRiskColor(Number(plan.risk.li_score))}`">{{plan.risk.li_rate}}</h2>
          <h2 class="text-4xl">{{plan.risk.li_score}}<span class="text-base text-gray-500">(โอกาส {{plan.risk.l}} x ผลกระทบ {{plan.risk.i}})</span></h2>
          <v-progress-linear style="width:100%;" striped height="20" :buffer-value="100" :value="getRiskPercent(Number(plan.risk.li_score))" :color="getRiskColor(Number(plan.risk.li_score))"></v-progress-linear>
          <h2 :style="`color:${getRiskColor(Number(plan.risk.li_score))}`">{{plan.risk.li_result}}</h2>
        </div>
      </div>
      <div class="w-1/3">
        <h2 class="font-semibold">ประเภทความเสี่ยง</h2>
        <v-timeline dense v-for="strategic,i in JSON.parse(plan.risk.sofceg)" :key="i">
          <v-timeline-item color="purple" small>{{strategic}}</v-timeline-item>
        </v-timeline>
      </div>

      <div class="w-1/3">
        <h2 class="font-semibold">สาเหตุ</h2>
        <div class="flex flex-wrap">
          <div class="w-1/2">
            <h2>ปัจจัยภายใน</h2>
            <v-timeline dense v-for="internal_cause,iix in JSON.parse(plan.risk.internal_cause)" :key="iix">
              <v-timeline-item color="purple" small>{{internal_cause}}</v-timeline-item>
            </v-timeline>
          </div>
          <div class="w-1/2">
            <h2>ปัจจัยภายนอก</h2>
            <v-timeline dense v-for="external_cause,iex in JSON.parse(plan.risk.external_cause)" :key="iex">
              <v-timeline-item color="purple" small>{{external_cause}}</v-timeline-item>
            </v-timeline>
          </div>
        </div>
      </div>
      <div class="w-1/3 " >
        <h2 class="font-semibold">ผลกระทบของความเสี่ยง</h2>
        <v-timeline dense v-for="effect_risk,iex in JSON.parse(plan.risk.effect_risk)" :key="iex">
          <v-timeline-item color="purple" small>{{effect_risk}}</v-timeline-item>
        </v-timeline>
      </div>
      <div class="w-1/3" >
        <h2 class="font-semibold">วิธีการ/มาตรการจัดการความเสี่ยง</h2>
        <v-timeline dense v-for="effect_risk,iex in JSON.parse(plan.risk.risk_management_measures)" :key="iex">
          <v-timeline-item color="purple" small>{{effect_risk}}</v-timeline-item>
        </v-timeline>
      </div>
      <div class="w-1/3 p-2 mb-4 bg-blue-200" >
        <h2 class="font-semibold">การควบคุมที่มีอยู่ในปัจจุบัน</h2>
        <p>{{plan.risk.existing_control}}</p>
      </div>

      <div class="w-1/2" >
        <h2 class="font-semibold">ดัชนีชี้วัดความเสี่ยง(KRI)</h2>
        <v-timeline dense v-for="effect_risk,iex in JSON.parse(plan.risk.kri)" :key="iex">
          <v-timeline-item color="purple" small>{{effect_risk}}</v-timeline-item>
        </v-timeline>
      </div>
      <div class="w-full p-2 mb-4 bg-green-200" >
        <h2 class="font-semibold">ผู้รับผิดชอบ : <span class="font-light">{{plan.risk.responsible}}</span></h2>
        <h2 class="font-semibold">กําหนดเสร็จ : <span class="font-light">{{plan.risk.response_date}}</span></h2>
      </div>
    </div>

  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Core } from '@/store/core'
@Component({
  components: {   },
})
export default class Risk extends Vue {
  private response: boolean = false;
  private plans: any = null

  @Prop({default:null})
  plan!:any

  private async created() {



  }



  getRiskPercent(value: number) {
    return (value / 25) * 100
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



  // async removePlanRisk(planId:number,riskId:number){
  //   let check = confirm('คุณแน่ใจใช่ไหมที่จะลบข้อมูล')
  //   if(check){
  //     await Core.deleteHttp(`/api/default/rmplan/${planId}/`)
  //     await Core.deleteHttp(`/api/default/riskrm/${riskId}/`)
  //   }
  //   await this.loadPlan();
  // }

}
</script>
