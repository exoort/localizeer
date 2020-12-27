<template>
  <el-row :gutter="30" type="flex" class="row-bg" justify="space-between">
    <el-col :span="12">
      <upload-localisation :show-new-json-button="false" :key="key1" :block-key="key1"/>
    </el-col>
    <el-col :span="12">
      <upload-localisation :key="key2" :block-key="key2"/>
    </el-col>
  </el-row>
</template>

<script>
import UploadLocalisation from "~/containers/cards/UploadLocalisation";
import get from "lodash/get";

export default {
  name: "UploadBlock",
  components: {UploadLocalisation},
  data() {
    return {
      key1: 'locale1',
      key2: 'locale2',
      locale1: null,
      locale2: null
    }
  },
  mounted() {
    this.$eventBus.$on(`uploaded_${this.key1}`, (data) => {
      this.locale1 = data
      this.notify()
      this.compareTableData()
    })
    this.$eventBus.$on(`uploaded_${this.key2}`, (data) => {
      this.locale2 = data
      this.notify()
      this.compareTableData()
    })
  },
  methods: {
    notify() {
      this.$message.success('Данные были загружены!')
    },
    compareTableData() {
      if (this.locale1 && this.locale2) {
        this.$eventBus.$emit('appLoading', true)
        let tableData = []
        const arr = [...new Set([...this.locale1.keys, ...this.locale2.keys])]
        if (arr.length) {
          for (let i = 0; i < arr.length; i++) {
            tableData.push({
              key: arr[i],
              leftValue: get(this.locale1.data, arr[i]),
              rightValue: get(this.locale2.data, arr[i]),
            })
          }
        }
        this.$eventBus.$emit('setTableData', tableData)
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>
