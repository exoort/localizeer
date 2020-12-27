<template>
  <card type="tasks">
    <div class="table-full-width table-responsive">
      <localisation-table/>
    </div>
  </card>
</template>

<script>
import LocalisationTable from "~/containers/tables/LocalisationTable";
export default {
  name: "EditLocalisation",
  components: {LocalisationTable}
}
</script>

<style scoped>

</style>
