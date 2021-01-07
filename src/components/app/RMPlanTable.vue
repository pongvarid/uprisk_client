<template>
<div>
    <v-toolbar color="transparent" flat>
        <v-toolbar-title>ตารางรายระเอียดความเสี่ยง</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = true" color="success">เพิ่มข้อมูล</v-btn>
    </v-toolbar>
    <div>
        <v-simple-table class="shadow-xl">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left"> ลำดับ </th>
                        <th class="text-left"> ความเสี่ยง </th>
                        <th class="text-left"> ประเภทความเสี่ยง (S-O-F-C-E-G) </th>
                        <th class="text-left"> สาเหตุ/ปัจจัยเสี่ยง </th>
                        <th class="text-left"> ผลกระทบของความเสี่ยง </th>
                        <th class="text-left"> การควบคุมที่มีอยู่ในปัจจุบัน </th>
                        <th class="text-left"> ระดับความเสี่ยงปัจจุบัน(โอกาสxผลกระทบ) </th>
                        <th class="text-left"> วิธีการ/มาตรการจัดการความเสี่ยง</th>
                        <th class="text-left"> ดัชนีชี้วัดความเสี่ยง(KRI) </th>
                        <th class="text-left"> กําหนดเสร็จ/ผู้รับผิดชอบ </th>
                        <th class="text-left"> จัดการ </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-left"> </td>
                        <td class="text-left"> </td>
                        <td class="text-left"> </td>
                        <td class="text-left"> </td>
                        <td class="text-left"> </td>
                        <td class="text-left"> </td>
                        <td class="text-left"> </td>
                        <td class="text-left"> </td>
                        <td class="text-left"> </td>
                        <td class="text-left"> </td>
                        <td class="text-left">
                            <div class="flex">
                                <v-btn small icon fab color="#eb8f05">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn small icon fab color="#ff2d2d">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
    <v-dialog v-model="dialog" scrollable fullscreen persistent :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                จัดการข้อมูล <v-spacer></v-spacer>
                <v-btn text fab @click="dialog = false" color="red">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <form>
                    <v-text-field filled label="ความเสี่ยง"></v-text-field>
                    <v-autocomplete filled label="ประเภทความเสี่ยง (S-O-F-C-E-G)" autocomplete></v-autocomplete>
                    <v-text-field filled label="อื่นๆ"></v-text-field>
                    <h2>สาเหตุ/ปัจจัยเสี่ยง</h2>
                    <v-text-field filled label="ปัจจัยภายใน"></v-text-field>
                    <v-text-field filled label="ปัจจัยภายนอก"></v-text-field>
                    <v-autocomplete filled label="ผลกระทบของความเสี่ยง" autocomplete></v-autocomplete>
                    <v-text-field filled label="อื่นๆ"></v-text-field>

                    <v-text-field filled label="การควบคุมที่มีอยู่ในปัจจุบัน"></v-text-field>
                    <v-text-field filled label="วิธีการ/มาตรการจัดการความเสี่ยง"></v-text-field>
                    <v-text-field filled label="ดัชนีชี้วัดความเสี่ยง(KRI)"></v-text-field>
                    <v-text-field filled label="กําหนดเสร็จ/ผู้รับผิดชอบ"></v-text-field>
                </form>
            </v-card-text>
        </v-card>
    </v-dialog>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Core } from '../../store/core'

@Component({
    components: {},
})
export default class RMPlanTable extends Vue {
    private response: boolean = false;
    dialog: boolean = false;
    private async created() {

        this.response = true;

    }

}
</script>
