<template>
<div>

    <div class="w-full flex flex-col justify-center  items-center h-auto">
        <div class="flex flex-wrap">
            <div class="w-full">
                <v-alert v-if="Number(this.risk.li_score) > 25" dense border="left" type="error">
                    ผลลัพธ์ห้ามเกิน <b>25</b>
                </v-alert>
            </div>
            <div class="w-full flex flex-row flex-wrap mt-3 p-3">

                <v-text-field type="number" @input="calculateRate" v-model="risk.l" class="w-5/12" outlined dense label="โอกาส"></v-text-field>
                <h2 class="w-2/12">
                    <center>X</center>
                </h2>

                <v-text-field type="number" @input="calculateRate" v-model="risk.i" class="w-5/12" outlined dense label="ผลกระทบ" autocomplete></v-text-field>
            </div>
            <div class="w-full flex flex-col  justify-center item-center ">
                <h2 class="font-bold" :style="`color:${getRiskColor(Number(this.risk.li_score))}`">{{this.risk.li_rate}}</h2>
                <h2 class="text-4xl">{{this.risk.li_score}}<span class="text-base text-gray-500">(โอกาส {{this.risk.l}} x ผลกระทบ {{this.risk.i}})</span></h2>
                <v-progress-linear style="width:100%;" striped height="20" :buffer-value="100" :value="getRiskPercent(Number(this.risk.li_score))" :color="getRiskColor(Number(this.risk.li_score))"></v-progress-linear>
                <h2 :style="`color:${getRiskColor(Number(this.risk.li_score))}`">{{this.risk.li_result}}</h2>
            </div>
        </div>
        <div class="mt-3" v-if="risk.l && risk.i && (Number(this.risk.li_score) <= 25)" :style="`background-color:${getRiskColorBG(Number(this.risk.li_score))}`">
            <h2 class="font-semibold">หลักเกณฑ์การประเมินระดับความเสี่ยง (โอกาสxผลกระทบ)</h2> <br>
            <div class="flex flex-row flex-wrap">
                <h2 class="w-4/12">ระดับคะแนน</h2>
                <h2 class="w-4/12">โอกาส(L)</h2>
                <h2 class="w-4/12">ผลกระทบ(I)</h2>

                <v-text-field disabled class="w-3/12" outlined dense label="5"></v-text-field>
                <v-text-field v-model="risk.l5" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>
                <v-text-field v-model="risk.i5" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>

                <v-text-field disabled class="w-3/12" outlined dense label="4"></v-text-field>
                <v-text-field v-model="risk.l4" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>
                <v-text-field v-model="risk.i4" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>

                <v-text-field disabled class="w-3/12" outlined dense label="3"></v-text-field>
                <v-text-field v-model="risk.l3" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>
                <v-text-field v-model="risk.i3" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>

                <v-text-field disabled class="w-3/12" outlined dense label="2"></v-text-field>
                <v-text-field v-model="risk.l2" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>
                <v-text-field v-model="risk.i2" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>

                <v-text-field disabled class="w-3/12" outlined dense label="1"></v-text-field>
                <v-text-field v-model="risk.l1" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>
                <v-text-field v-model="risk.i1" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>

            </div>
        </div>

    </div>
</div>
</template>

<script>
export default {
    props: {
        risk: {
            default: {
                l:1,
                i:1
            }
        },
        plan: {
            default: {}
        }
    },
    data: () => {
        return ({

        })
    },
    created(){
        this.calculateRate();
    },
    methods: {
        getRiskColorBG(value) {
            if (value >= 0 && value <= 2) {
                return '#ccffcc'
            } else if (value >= 3 && value <= 6) {
                return '#ffffcc'
            } else if (value >= 7 && value <= 12) {
                return '#ffc299'
            } else if (value >= 13 && value <= 25) {
                return '#ffcccc'
            } else {
                return '#b3ecff'
            }
        },
        getRiskColor(value) {
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
        },
        getRiskPercent(value) {
            return (value / 25) * 100
        },
        async calculateRate() {
            this.risk.li_score = this.risk.i * this.risk.l
            let data = this.getRiskType(this.risk.li_score)
            this.risk.li_result = data.detail
            this.risk.li_rate = data.rate

        },

        getRiskType(value) {
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
}
</script>

<style>

</style>
