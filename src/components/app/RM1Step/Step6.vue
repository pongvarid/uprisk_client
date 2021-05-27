<template>
<div>

    <v-card outlined class="m-6 p-6">
        <h2 class="text-xl font-bold">การลงนาม</h2>
        <h2>ยืนยันการบันทึก RM-R6 ({{risk.name}}) เมื่อข้อมูลครบถ้วนแล้ว</h2>
        <div class="flex mt-2 ml-4">
            <div class="w-1/2"><br>
                <Draw />
                <br>
                <v-text-field :disabled="plan.signature" v-model="plan.sign" outlined dense label="ชื่อ-นามสกุล"></v-text-field>
                <v-text-field :disabled="plan.signature" v-model="plan.position" outlined dense label="ตำแหน่ง"></v-text-field>
                <v-text-field :disabled="plan.signature" v-model="plan.date" type="date" outlined dense label="วันที่"></v-text-field>
            </div>
            <div class="w-1/2 flex flex-col justify-center  items-center h-auto">
                <img class="h-70" src="/rm6/w2.gif" alt="">

            </div>
        </div>
    </v-card>

</div>
</template>

<script>
import Draw from '@/components/app/Draw.vue'

export default {
    components: { Draw },
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

        })
    },
    methods: {

    }
}
</script>

<style>

</style>
