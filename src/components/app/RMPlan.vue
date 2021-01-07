<template>
<div class="pt-4">
   
   <v-toolbar color="transparent" flat>
        <h2 class="text-xl">แผนบริหารจัดการความเสี่ยงและควบคุมภายใน (RM-Plan) </h2> 
        <v-spacer></v-spacer>
        <AddRisk />
        <ListRisk />
   </v-toolbar>
 
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Core } from '../../store/core'
 
import AddRisk from './RMPlan/AddRisk.vue'
import ListRisk from './RMPlan/ListRisk.vue'

@Component({
    components: {   AddRisk,ListRisk },
})
export default class RMPlan extends Vue {
    private response: boolean = false;
 
    private async created() {
    
        this.response = true;

    }

 
 

}
</script>
