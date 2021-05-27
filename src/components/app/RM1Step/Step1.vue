<template>
<div>
    <v-card outlined class="p-6">
        <h2 class="text-xl font-bold"> ข้อมูลความเสี่ยง </h2>
        <h2 class="text-base">ข้อมูลทั่วไปของความเสี่ยง</h2>
        <div class="flex mt-2">
            <div class="w-1/2">
            <br>

                <v-text-field v-model="risk.name" outlined dense label="ความเสี่ยง"></v-text-field>
               <v-text-field v-model="plan.mission.name" :items="mission" item-text="name" item-value="id" outlined placeholder="เลือกข้อมูล" label="การบริหารจัดการความเสี่ยงตามพันธกิจ"></v-text-field>
                <v-combobox chips v-model="plan.strategic" multiple :items="strategic" outlined placeholder="เลือกข้อมูล" label="ยุทธศาสตร์"></v-combobox>
            
              
            </div>
            <div class="w-1/2 flex flex-col justify-between  items-center h-auto">
                <img class="h-60" src="/gif/01.gif" alt="">
            </div>
        </div>
    </v-card>
    <br>
    <v-card outlined class="p-6">
        <h2 class="text-xl font-bold"> ประเภทความเสี่ยง </h2>
        <h2 class="text-base">ข้อมูลประเภท / กลยุทธ์ </h2>
        <div class="flex mt-2">
            <div class="w-1/2">  <br>
              <v-combobox chips v-model="risk.sofceg" multiple :items="type" outlined label="ประเภทความเสี่ยง (S-O-F-C-E-G)" autocomplete></v-combobox>
           
                <v-text-field v-model="plan.target_value" outlined placeholder="ระบุข้อมูล" label="ค่าเป้าหมาย"></v-text-field>
                <v-combobox chips v-model="plan.strategy" multiple :items="strategy" outlined placeholder="เลือกข้อมูล" label="กลยุทธ์"></v-combobox>

            </div>
            <div class="w-1/2 flex flex-col justify-between  items-center h-auto">
                <img class="h-60" src="/rm6/00.png" alt="">
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
    }
}
</script>

<style>

</style>
