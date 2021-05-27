<template>
<div>

    <v-card outlined class="m-6 p-6">
        <h2 class="text-xl font-bold">ผู้รับผิดชอบ</h2>
        <h2>ผู้รับผิดชอบการบันทึกข้อมูล RM-Plan นี้</h2>
        <div class="flex mt-2 ml-4">
            <div class="w-1/2"><br>
                <v-text-field v-model="risk.responsible" outlined dense label="ผู้รับผิดชอบ"></v-text-field>
                <v-text-field v-model="risk.response_date" type="date" outlined dense label="กําหนดเสร็จ"></v-text-field>
            </div>
            <div class="w-1/2 flex flex-col justify-center  items-center h-auto">
                <img class="h-60" src="/rm6/user.png" alt="">

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
