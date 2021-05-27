<template>
<div>

    <v-card outlined class="m-6 p-6">
        <h2 class="text-xl font-bold">ดัชนีชี้วัดความเสี่ยง (KRI)</h2>
        <h2>อ้างอิง (KRI) จาก RM-Plan ก่อนหน้า</h2>
        <div class="flex mt-2 ml-4">
            <div class="w-1/2">
              <form @submit.prevent="addRisks()" class="flex">
                    <v-text-field required outlined   class="m-1" dense v-model="form.head"  label="ตัวชี้วัด" id="id"></v-text-field>
                    <v-text-field required outlined  class="m-1 ml-2" dense v-model="form.text" label="เป้าหมาย" id="id"></v-text-field>
                    <v-btn class="m-1" type="submit" small color="success"> + เพิ่ม</v-btn>
                </form>
                <v-timeline dense v-for="kri,iex in kris" :key="iex">
                    <v-timeline-item color="purple" small>
                        <h2 class="font-bold">ตัวชี้วัด : {{kri.head}}</h2>
                        <div>
                            <h2>เป้าหมาย : {{kri.text}} </h2><br> 
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
            row: null,
         
            form: {},
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
        },
         async addRisks() {
            this.kris.push(this.form)
            this.form = {}
        }
    }
}
</script>

<style>

</style>
