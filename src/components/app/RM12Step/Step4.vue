<template>
<div>

    <v-card outlined class="m-6 p-6">
        <h2 class="text-xl font-bold">ดัชนีชี้วัดความเสี่ยง (KRI)</h2>
        <h2>อ้างอิง (KRI) จาก RM-Plan ก่อนหน้า</h2>
        <div class="flex mt-2 ml-4">
            <div class="w-1/2">
                <v-timeline dense v-for="kri,iex in kris" :key="iex">
                    <v-timeline-item color="purple" small >
                        <h2 class="font-bold">ตัวชี้วัด : {{kri.head}}</h2>
                        <div  :class="(radioGroup[iex] == '0')?`bg-red-200 p-2`:`bg-green-100 p-2`">
                            <h2>เป้าหมาย : {{kri.text}} </h2><br>
                            <v-combobox chips multiple filled placeholder=" " label="รายงานผล"></v-combobox>
                            <v-radio-group v-model="radioGroup[iex]">
                                <v-radio  label="ความเสี่ยงต่ำ"  value="0"></v-radio>
                                <v-radio  label="ความเสี่ยงสูง"  value="1"></v-radio>
                            </v-radio-group>
                        </div>
                    </v-timeline-item>
                </v-timeline>
            </div>
            <div class="w-1/2 flex flex-col justify-center  items-center h-auto">
                <img class="h-60" src="/rm6/kri.png" alt="">
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
            radioGroup:[],
            row: null,
            kris: [{
                    'head': 'ทดสอบ',
                    'text': 'ทดสอบ',
                },
                {
                    'head': 'ทดสอบ',
                    'text': 'ทดสอบ',
                }

            ]
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
