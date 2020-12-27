<template>
  <el-dialog
      :visible.sync="downloadFileModalVisible"
      center
      title="Скачать файл"
      width="30%">
    <span>
      <div>
        <el-radio v-model="isLeftFile" border :label="true">Файл слева</el-radio>
        <el-radio v-model="isLeftFile" border :label="false">Файл справа</el-radio>
      </div>
    </span>
    <span>
      <el-input v-model="filename" placeholder="Введите имя файла">
        <template slot="append">.{{ type }}</template>
      </el-input>
    </span>
    <span slot="footer" class="dialog-footer">
      <button type="button" class="btn btn-success" @click="download"><i class="el-icon-download"></i> Скачать</button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "DownloadFileModal",
  data() {
    return {
      downloadFileModalVisible: false,
      filename: 'default',
      isLeftFile: true,
      type: 'json'
    }
  },
  mounted() {
    this.$eventBus.$on('downloadFileModalVisibility', (data) => {
      this.downloadFileModalVisible = true
    })
  },
  methods: {
    download() {
      const filename = `${this.filename}.${this.type}`
      const isLeftFile = this.isLeftFile
      this.$eventBus.$emit('downloadData', {filename, isLeftFile})
    }
  }
}
</script>

<style scoped>

</style>
