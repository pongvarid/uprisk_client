<template>
<div>
    <v-card outlined class="m-6  p-6">
        <h2 class="text-xl font-bold">สาเหตุของความเสี่ยงที่เกิดขึ้น</h2>
        <h2>อ้างอิงสาเหตุ จาก RM-Plan ก่อนหน้า</h2>
        <div class="flex mt-2 ml-4">
            <div class="w-1/2">
                <div class="flex flex-wrap mt-4">
                    <div class="w-1/2">
                        <h2 class="font-bold">ปัจจัยภายใน</h2>
                        <v-timeline dense v-for="internal_cause,iix in JSON.parse(plan.risk.internal_cause)" :key="iix">
                            <v-timeline-item color="purple" small>{{internal_cause}}</v-timeline-item>
                        </v-timeline>
                    </div>
                    <div class="w-1/2">
                        <h2 class="font-bold">ปัจจัยภายนอก</h2>
                        <v-timeline dense v-for="external_cause,iex in JSON.parse(plan.risk.external_cause)" :key="iex">
                            <v-timeline-item color="purple" small>{{external_cause}}</v-timeline-item>
                        </v-timeline>
                    </div>

                </div><br>
                <h2 class="font-semibold">การควบคุมที่มีอยู่ในปัจจุบัน</h2>
                <p>{{plan.risk.existing_control}}</p>
            </div>
            <div class="w-1/2 flex flex-col justify-center  items-center h-auto">
                <img class="h-40" src="/rm6/course.png" alt="">
            </div>
        </div>
    </v-card>

    <v-card outlined class="m-6 p-6">
        <h2 class="text-xl font-bold">ผลกระทบและมาตรการจัดการความเสี่ยง</h2>
        <h2>อ้างอิงสาเหตุ จาก RM-Plan ก่อนหน้า</h2>
        <div class="flex mt-2 ml-4">
            <div class="w-1/2">
                <v-timeline dense v-for="effect_risk,iex in JSON.parse(plan.risk.effect_risk)" :key="iex">
                    <v-timeline-item color="purple" small>
                        <h2 class="font-bold">{{effect_risk}}</h2>
                        <div>
                            <h2>มาตรการ : {{getArr(plan.risk.risk_management_measures,iex)}} </h2>
                            <v-radio-group v-model="radioGroup" row>
                                <template v-slot:label>
                                    <div class="font-bold" style="font-size:16px;"> การติดตามผล : </div>
                                </template>
                                <v-radio v-for="n in results" :key="n" :label="`${n}`" :value="n"></v-radio>
                            </v-radio-group>
                            <v-file-input label="แนบเอกสาร" truncate-length="15"></v-file-input>
                        </div>
                    </v-timeline-item>

                </v-timeline>
            </div>
            <div class="w-1/2 flex flex-col justify-center  items-center h-auto">
                <img class="h-60" src="/rm6/result3.png" alt="">
            </div>
        </div>
    </v-card>

</div>
</template>

<script>
export default {
    props: {
        risk: {
            default: {}
        },
        plan: {
            default: {}
        }
    },
    data: () => {
        return ({
            row: null,
            results: ['ได้รับการแก้ไขแล้ว', 'ยังไม่ได้ดำเนินการ', 'ยกเลิก']
        })
    },
    methods: {
        getArr(arr, index) {
            let result = JSON.parse(arr)
            return result[index]
        }
    }
}
</script>

<style>

</style>
