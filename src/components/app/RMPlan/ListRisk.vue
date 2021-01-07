<template>
<div class="pt-4">
    <EditRisk />
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Core } from '../../../store/core'
import EditRisk from './EditRemoveRisk.vue'  
@Component({
    components: { EditRisk  },
})
export default class RMPlan extends Vue {
    private response: boolean = false;
 
    private async created() {
   
    }
 
    private async checkPlan() {

    }

}
</script>
