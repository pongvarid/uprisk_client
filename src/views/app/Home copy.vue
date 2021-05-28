<template>
<div>
    <svg class="absolute  " style="z-index:1;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#c1c1ff" fill-opacity="1" d="M0,192L34.3,208C68.6,224,137,256,206,224C274.3,192,343,96,411,58.7C480,21,549,43,617,58.7C685.7,75,754,85,823,90.7C891.4,96,960,96,1029,117.3C1097.1,139,1166,181,1234,202.7C1302.9,224,1371,224,1406,224L1440,224L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path>
        </svg>
    <div style="z-index:1;" class="relative container mx-auto px-4" id="content">

        <section data-section-id="3" data-category="call-to-action" data-component-id="bf2f_18_01_awz" data-custom-component-id="33915" class="py-8 px-4">
            <div class="flex flex-wrap items-center -mx-4">

                <div class="w-full lg:w-4/6 px-4 mb-8 lg:mb-0  float-left">
                    <h2 class="text-xl font-semibold font-heading">ยินดีต้อนรับ</h2>
                    <h2 class="text-3xl font-semibold font-heading">Pongvarid</h2>
                    <span>หน่วยงาน กองแผนงาน</span>

                </div>
                <div class="w-full lg:w-2/6 px-4 text-center">

                    <v-btn @click="$router.push('/')" color="primary">ออกจากระบบ</v-btn>
                </div>
            </div>
        </section>

        <section data-section-id="1" data-category="admin" data-component-id="bf2f_15_02_awz" class="py-8 px-4">
            <div class="flex flex-col md:flex-row flex-wrap">
                <div class="w-full">
                    <h2 class="text-2xl"><b>ปีงบประมาณปัจจุบัน</b> : 2563</h2>
                </div>
                <div class="w-full md:w-1/2 ">
                
                   <apexchart type="radar" height="500" :options="chartOptions" :series="series"></apexchart>
                
                   
                </div>
                <div class="w-full md:w-1/2">
                    <div class="m-2   shadow border" v-for="m,i in MISSION" :key="i">
                        <v-toolbar dark dense flat class="bg-nav text-white">{{m.name}}</v-toolbar>
                        <div class="p-4 flex">
                            <h2  class="text-3xl w-1/3">{{mapRisk[i]}} <span class="text-base"> {{(getRiskType(mapRisk[i]).rate)}}</span></h2>

                            <v-progress-linear class="w-2/3" style="width:100%;" striped height="20" :buffer-value="100" :value="getRiskPercent(mapRisk[i])" :color="getRiskColor(mapRisk[i])"></v-progress-linear>
 
                        </div>

                    </div>
                </div>
            </div>
        </section>

    </div>

</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Core } from '../../store/core'
@Component({
    components: {

    },
})
export default class RiskMain extends Vue {

    private MISSION: any = null
    private xmission: any = []
    private mapRisk: any = [4, 8, 15, 25, 2]
    private series: any = [{
        name: 'Series 1',
        data: [4, 8, 15, 25, 2],
    }]

    private chartOptions: any = {
        chart: {
            height: 350,
            type: 'radar',
        },
        title: {
            text: 'การบริหารจัดการความเสี่ยงตามพันธกิจ'
        },
        xaxis: {
            categories: ["ผลิตคนไทยศตวรรษที่ 21", "วิจัยและนวัตกรรม", "บริการวิชาการ", "ทำนุบํารุงศิลปะ", "บริหารงานทันสมัย"]
        }
    }

    private async created() {
        await this.getMission();
    }

    private async getMission() {
        this.MISSION = await Core.getHttp(`/api/default/mission/`)
        for (let index = 0; index < this.MISSION.length; index++) {
            this.xmission.push(this.MISSION[index].name);
            console.log(JSON.stringify(this.xmission))

        }
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

}
</script>
