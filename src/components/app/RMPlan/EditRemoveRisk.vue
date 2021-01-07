<template>
<div>

    <v-dialog v-model="dialog" scrollable persistent max-width="600" transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                <h2 class="font-semibold">จัดการข้อมูล (RM Plan)</h2>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialog=false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <form action="" class="mt-2">
                    <v-tabs v-model="tabs" color="primary" slider-color="primary">
                        <v-tab>
                            ข้อมูลทั่วไป
                        </v-tab>
                        <v-tab-item>

                            <form action="" class="mt-2">
                                <v-select dense :items="[]" outlined placeholder="เลือกข้อมูล" label="การบริหารจัดการความเสี่ยงตามพันธกิจ"></v-select>
                                <v-combobox dense :items="[]" outlined placeholder="เลือกข้อมูล" label="การบริหารจัดการความเสี่ยงตามพันธกิจ"></v-combobox>
                                <v-text-field dense outlined placeholder="ระบุข้อมูล" label="ค่าเป้าหมาย"></v-text-field>
                                <v-combobox dense :items="[]" outlined placeholder="เลือกข้อมูล" label="การบริหารจัดการความเสี่ยงตามพันธกิจ"></v-combobox>
                                <v-btn class="float-right" color="primary">บันทึกข้อมูล</v-btn>
                            </form>
                        </v-tab-item>
                        <v-tab>
                            ข้อมูลความเสี่ยง
                        </v-tab>
                        <v-tab-item>

                            <div class="flex flex-row flex-wrap">
                                <v-text-field class="w-1/2" outlined dense label="ความเสี่ยง"></v-text-field>
                                <v-combobox class="w-1/2" outlined dense label="ประเภทความเสี่ยง (S-O-F-C-E-G)" autocomplete></v-combobox>
                            </div>

                            <h2>สาเหตุ/ปัจจัยเสี่ยง</h2>
                            <v-combobox outlined dense label="ปัจจัยภายใน"></v-combobox>
                            <v-combobox outlined dense label="ปัจจัยภายนอก"></v-combobox>
                            <v-text-field outlined dense label="ผลกระทบของความเสี่ยง" autocomplete></v-text-field>

                            <v-text-field outlined dense label="การควบคุมที่มีอยู่ในปัจจุบัน"></v-text-field>

                        </v-tab-item>
                        <v-tab>
                            ระดับความเสี่ยงปัจจุบัน
                        </v-tab>
                        <v-tab-item>
                            <h2>ระดับความเสี่ยงปัจจุบัน</h2>
                            <div class="flex flex-row flex-wrap">
                                <v-text-field class="w-5/12" outlined dense label="โอกาส"></v-text-field>
                                <h2 class="w-2/12">
                                    <center>X</center>
                                </h2>
                                <v-text-field class="w-5/12" outlined dense label="ผลกระทบ" autocomplete></v-text-field>
                            </div>
                            <div class="flex flex-row flex-wrap">หลักเกณฑ์การประเมินระดับความเสี่ยง
                                <v-text-field class="w-5/12" outlined dense label="โอกาส"></v-text-field>
                                <h2 class="w-2/12">
                                    <center>X</center>
                                </h2>
                                <v-text-field class="w-5/12" outlined dense label="ผลกระทบ" autocomplete></v-text-field>
                            </div>
                        </v-tab-item>
                        <v-tab>
                            มาตรการ
                        </v-tab>
                        <v-tab-item>
                            <v-combobox outlined dense label="วิธีการ/มาตรการจัดการความเสี่ยง"></v-combobox>
                            <v-combobox outlined dense label="ดัชนีชี้วัดความเสี่ยง(KRI)"></v-combobox>
                            <v-text-field outlined dense label="กําหนดเสร็จ/ผู้รับผิดชอบ"></v-text-field>
                        </v-tab-item>
                        <v-tab>
                            การลงนาม
                        </v-tab>
                        <v-tab-item>
                            <Draw />
                        </v-tab-item>
                    </v-tabs>
                </form>
            </v-card-text>
            <v-card-actions>
                <v-btn class="float-right" color="primary">บันทึกข้อมูล</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Core } from '../../../store/core'
import Draw from '../Draw.vue'
@Component({
    components: { Draw },
})
export default class RMPlan extends Vue {
    private response: boolean = false;
    private dialog: boolean = true;
    private panel: any = [0, 1]
    private tabs: any = 1
    private async created() {

        this.response = true;

    }

}
</script>
