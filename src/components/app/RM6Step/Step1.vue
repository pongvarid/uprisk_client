<template>
    <div>
         <v-card outlined class="p-6">
                <h2 class="text-xl font-bold"> ข้อมูลความเสี่ยง  </h2>
                <h2 class="text-base">ข้อมูลทั่วไปของความเสี่ยง ({{risk.name}})</h2>
                <div class="flex mt-2">
                    <div class="w-1/2">
                        
                        <v-text-field v-model="plan.mission.name" :items="mission" item-text="name" item-value="id" filled placeholder="เลือกข้อมูล" label="การบริหารจัดการความเสี่ยงตามพันธกิจ"></v-text-field>
                        <v-combobox chips v-model="plan.strategic" multiple :items="strategic" filled placeholder="เลือกข้อมูล" label="ยุทธศาสตร์"></v-combobox>
                        <v-text-field v-model="plan.target_value" filled placeholder="ระบุข้อมูล" label="ค่าเป้าหมาย"></v-text-field>
                        <v-combobox chips v-model="plan.strategy" multiple :items="strategy" filled placeholder="เลือกข้อมูล" label="กลยุทธ์"></v-combobox>
                    </div>
                    <div class="w-1/2 flex flex-col justify-between  items-center h-auto">
                        <img class="h-60" src="/gif/01.gif" alt=""> 
                    </div>
                </div>
            </v-card>
    </div>
</template>

<script>
export default {
    props:{
        risk:{
            default:{}
        },
        plan:{
            default:{}
        }
    }
}
</script>

<style>

</style>