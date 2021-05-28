<template>
<div class="pt-4">
    <div>

    </div>
    <v-card outlined class="m-6 p-6" v-for="plan,index in plans" :key="index">
        <v-card-text class="flex flex-col">
            <h2 class="text-xl font-bold text-purple-600">{{plan.mission.name}} </h2>
            <h2 class="font-bold float-right" :style="`color:${getRiskColor(Number(plan.risk.li_score))}`">ระดับความเสี่ยง : {{getRiskType(plan.risk.li_score).rate}}</h2>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="$router.push(`r6/edit?plan=${plan.id}&risk=${plan.risk.id}`)" dark color="orange">
                <v-icon>mdi-pen</v-icon> แก้ไขข้อมูล
            </v-btn>
            <v-btn @click="removePlanRisk(plan.id,plan.risk.id)" class="ml-3" dark color="red">
                <v-icon>mdi-delete</v-icon> ลบ
            </v-btn>
        </v-card-actions>
    </v-card>

</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Core } from '@/store/core' 
@Component({
    components: {   },
})
export default class RMPlan extends Vue {
    private response: boolean = false;
    private plans: any = null

    private async created() {
        await this.loadPlan()

    }

    private async loadPlan() {
        this.plans = await Core.getHttp(`/api/default/plan/all/`)
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

    async removePlanRisk(planId: number, riskId: number) {
        let check = confirm('คุณแน่ใจใช่ไหมที่จะลบข้อมูล')
        if (check) {
            await Core.deleteHttp(`/api/default/rmplan/${planId}/`)
            await Core.deleteHttp(`/api/default/riskrm/${riskId}/`)
        }
        await this.loadPlan();
    }

    getRiskType(value: any) {
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
}
</script>
