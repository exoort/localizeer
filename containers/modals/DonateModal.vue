<template>
  <el-dialog
      :visible.sync="modalVisibility"
      center
      width="30%">
    <span>
      Вы можете отблагодарить разработчика отослав BTC на этот кошелёк <strong>12ytYtNvVJLsykVXKpK4MVEQHvQLJeZJNq</strong>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "DonateModal",
  data() {
    return {
      modalVisibility: false,
    }
  },
  mounted() {
    this.$eventBus.$on('donateModalVisibility', (data) => {
      this.modalVisibility = true
    })
  },
}
</script>

<style scoped>

</style>
