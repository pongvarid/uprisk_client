<template>
<div>
    <v-card outlined class="m-6  p-6">
        <h2 class="text-xl font-bold text-red-400">*สาเหตุของความเสี่ยงที่เกิดขึ้นใหม่</h2>
        <h2>มีสาเหตุที่ส่งผลกระทบต่อความเสี่ยงนอกเหนือจาก ที่ระบุไว้ใน RM-Plan</h2>
        <div class="flex mt-4 ml-4">
            <div class="w-1/2">
                <v-combobox chips v-model="risk.internal_cause" multiple :items="internal" outlined label="ปัจจัยภายใน"></v-combobox>
                <v-combobox chips v-model="risk.external_cause" multiple :items="external" outlined label="ปัจจัยภายนอก"></v-combobox>

                <h2 class="font-semibold">การควบคุม</h2><br>
                <v-text-field v-model="risk.existing_control" outlined dense label="การควบคุมที่มีอยู่ในปัจจุบัน"></v-text-field>
            </div>
            <div class="w-1/2 flex flex-col justify-center  items-center h-auto">
                <img class="h-60" src="/rm6/result2.png" alt="">
            </div>
        </div>
    </v-card>

    <v-card outlined class="m-6 p-6">
        <h2 class="text-xl font-bold text-red-400">*ผลกระทบและมาตรการจัดการความเสี่ยง</h2>
        <h2>ผลกระทบและมาตรการจัดการจากสาเหตุใหม่</h2>
        <div class="flex mt-2 ml-4">
            <div class="w-1/2">
                <form @submit.prevent="addRisks()" class="flex">
                    <v-text-field required outlined   class="m-1" dense v-model="form.result"  label="ผลการทบ" id="id"></v-text-field>
                    <v-text-field required outlined  class="m-1 ml-2" dense v-model="form.manage" label="มาตรกรจัดการความเสี่ยง" id="id"></v-text-field>
                    <v-btn class="m-1" type="submit" small color="success"> + เพิ่ม</v-btn>
                </form>

                <v-timeline dense v-for="res,iex in risks" :key="iex">
                    <v-timeline-item color="purple" small>
                        <h2 class="font-bold">{{res.result}}</h2>
                        <div>
                            <h2>มาตรการ : {{res.manage}} </h2>
                             
                        </div>
                    </v-timeline-item>

                </v-timeline>
            </div>
            <div class="w-1/2 flex flex-col justify-center  items-center h-auto">
                <img class="h-60" src="/rm6/risk2.png" alt="">
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
            results: ['ได้รับการแก้ไขแล้ว', 'ยังไม่ได้ดำเนินการ', 'ยกเลิก'],
            risks: [],
            form: {}
        })
    },
    methods: {
        getArr(arr, index) {
            let result = JSON.parse(arr)
            return result[index]
        },
        async addRisks() {
            this.risks.push(this.form)
            this.form = {}
        }
    }
}
</script>

<style>

</style>
