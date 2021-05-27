<template>
<div>

    <v-card outlined class="m-6 p-6">
        <h2 class="text-xl font-bold">ระดับความเสี่ยง</h2>
        <h2>ระดับความเสี่ยงปัจจุบันเทียบกับระดับความเสี่ยงคงเหลือ</h2>
        <div class="flex mt-2 ml-4">
              <div class="w-1/2 flex flex-col justify-center  items-center h-auto p-4">
                <h2 class="font-semibold">ระดับความเสี่ยงปัจจุบัน</h2>
                <Blog  id='ww' :risk="risk" :plan="plan"  />
            
            </div>
            <div class="w-1/2 flex flex-col justify-center  items-center h-auto p-4">
                <h2 class="font-semibold">ระดับความเสี่ยงที่คงเหลือ หลังจากจัดการความเสี่ยง 6 เดือน</h2>
                <Blog6 id='ss'   />
            
            </div>
        </div>
    </v-card>

</div>
</template>

<script>
import Blog from './Blog.vue'
import Blog6 from './Blog6.vue'
export default {
    components:{Blog , Blog6},
    props: {
        risk: {
            default: {}
        },
        plan: {
            default: {}
        }
    },
    created(){ 
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
