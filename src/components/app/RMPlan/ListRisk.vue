<template>
<div class="pt-4"> 
    <pre>{{plans}}</pre>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Core } from '../../../store/core'
import EditRisk from './EditRemoveRisk.vue'
@Component({
    components: { EditRisk },
})
export default class RMPlan extends Vue {
    private response: boolean = false;
    private plans: any = null

    private async created() {
        await this.loadPlan()

    }

    private async loadPlan() {
        this.plans = await Core.getHttp(`/api/default/rmplan/`)
    }

}
</script>
