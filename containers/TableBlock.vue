<template>
  <el-row>
    <el-col :span="24">
      <edit-localisation/>
    </el-col>
  </el-row>
</template>

<script>
import EditLocalisation from "~/containers/cards/EditLocalisation";
export default {
name: "TableBlock",
  components: {EditLocalisation}
}
</script>

<style scoped>

</style>
