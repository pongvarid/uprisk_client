<template>
<div>
  <v-toolbar color="transparent" flat>
    <h2 class="text-xl">แผนบริหารจัดการความเสี่ยงและควบคุมภายใน (RM-R12) </h2>
    <v-spacer></v-spacer>
    <AddRisk />


  </v-toolbar>
  <ListRisk />
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Core } from '../../store/core'

import AddRisk from './RMR6/AddRisk.vue'
import ListRisk from './RMR6/ListRisk.vue'

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
