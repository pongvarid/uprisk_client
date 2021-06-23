<template>
  <div>

    <v-btn @click="dialog=true" color="primary"><v-icon>mdi-plus</v-icon>เพิ่มข้อมูล</v-btn>
    <v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title primary-title >
          <h2 class="font-semibold">เพิ่มข้อมูล (RM-R12)</h2>   <v-spacer></v-spacer>
          <v-btn fab small text @click="dialog=false" ><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text v-if="response">
          <form @submit.prevent="storeRMPLAN()" class="mt-2">
            <v-select required v-model="form.mission" :items="mission" item-text="name" item-value="id" outlined placeholder="เลือกข้อมูล" label="การบริหารจัดการความเสี่ยงตามพันธกิจ"></v-select>
            <v-combobox chips   v-model="form.strategic"  multiple :items="strategic" outlined placeholder="เลือกข้อมูล" label="ยุทธศาสตร์"></v-combobox>
            <v-text-field required v-model="form.target_value"  outlined placeholder="ระบุข้อมูล" label="ค่าเป้าหมาย"></v-text-field>
            <v-combobox chips  v-model="form.strategy"  multiple :items="strategy" outlined placeholder="เลือกข้อมูล" label="กลยุทธ์"></v-combobox>
            <v-btn type="submit" class="float-right" color="primary">บันทึกข้อมูล</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Core } from '../../../store/core'
// import Sign from '../Draw.vue'
import {RM} from '../../../models/rm'
@Component({
  components: {    },
})
export default class RMPlan extends Vue {
  private response: boolean = false;
  private dialog: boolean = false;
  private mission:any = null
  private strategic:any = null
  private strategy:any = null
  private form:any = {}
  private plans:any =null

  private async created() {
    await this.getChoices();
    this.plans = await Core.getHttp(`/api/default/plan/all/`)
    this.response = true;

  }

  private async getChoices(){
    this.mission = await Core.getHttp(`/api/default/mission/`)
    this.strategic = await Core.getChoiceValue('ยุทธศาสตร์')
    this.strategy = await Core.getChoiceValue('กลยุทธ์')
  }

  private async storeRMPLAN(){
    this.form.agency = this.$route.query.agency
    this.form.year = this.$route.query.year
    this.form.strategic  = JSON.stringify(this.form.strategic)
    this.form.strategy  = JSON.stringify(this.form.strategy)
    let plan = await Core.postHttp(`/api/default/rmplan/`,this.form)
    if(plan.id){
      this.form = {};
      let risk = await Core.postHttp(`/api/default/riskrm/`,{'rm_plan':plan.id})
      alert('บันทึกข้อมูลสำเร็จ')
      await this.$router.push(`r6/edit?plan=${plan.id}&risk=${risk.id}`)
    }

  }

//    ('กลยุทธ์', 'กลยุทธ์'),
//         ('ประเภทความเสี่ยง', 'ประเภทความเสี่ยง'),
//         ('ผลกระทบความเสี่ยง', 'ผลกระทบความเสี่ยง'),
//         ('มาตรการจัดการความเสี่ยง', 'มาตรการจัดการความเสี่ยง'),
//         ('ดัชนีวัดความเสี่ยง', 'ดัชนีวัดความเสี่ยง'),
//         ('ปัจจัยภายใน', 'ปัจจัยภายใน'),
//         ('ปัจจัยภายนอก', 'ปัจจัยภายนอก'),


}
</script>
