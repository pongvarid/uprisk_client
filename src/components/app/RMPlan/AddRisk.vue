<template>
<div>

    <v-btn @click="dialog=true" color="success">เพิ่มข้อมูล</v-btn>
    <v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title primary-title >
              <h2 class="font-semibold">เพิ่มข้อมูล (RM Plan)</h2>   <v-spacer></v-spacer>
                <v-btn fab small text @click="dialog=false" ><v-icon>mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-card-text>
                <form action="" class="mt-2">
                    <v-select :items="[]" outlined placeholder="เลือกข้อมูล" label="การบริหารจัดการความเสี่ยงตามพันธกิจ"></v-select>
                    <v-combobox :items="[]" outlined placeholder="เลือกข้อมูล" label="การบริหารจัดการความเสี่ยงตามพันธกิจ"></v-combobox>
                    <v-text-field outlined placeholder="ระบุข้อมูล" label="ค่าเป้าหมาย"></v-text-field>
                    <v-combobox :items="[]" outlined placeholder="เลือกข้อมูล" label="การบริหารจัดการความเสี่ยงตามพันธกิจ"></v-combobox> 
                    <v-btn class="float-right" color="primary">บันทึกข้อมูล</v-btn>
                </form>
            </v-card-text>
        </v-card>
    </v-dialog>

</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Core } from '../../../store/core'
import Sign from '../Draw.vue' 
@Component({
    components: { Sign,   },
})
export default class RMPlan extends Vue {
    private response: boolean = false;
    private dialog: boolean = false;

    private async created() {

        this.response = true;

    }

}
</script>
