<template>
  <div>
    <el-pagination
        background
        :current-page.sync="currentPage"
        :page-size="currentPageSize"
        :page-sizes="pageSizes"
        :total="total"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
    </el-pagination>
    <hr>
    <el-table :data="filteredData" style="width: 100%" stripe>

      <el-table-column label="Ключ">
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>

      <el-table-column label="Левый файл">
        <template slot-scope="scope">
          <el-input
              v-model="scope.row.leftValue"
              :class="{'red': !scope.row.leftValue}"
              :rows="2"
              type="textarea">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="Правый файл">
        <template slot-scope="scope">
          <el-input
              v-model="scope.row.rightValue"
              :class="{'red': !scope.row.rightValue}"
              :rows="2"
              type="textarea">
          </el-input>
        </template>
      </el-table-column>
    </el-table>
    <hr>
    <el-pagination
        background
        :current-page.sync="currentPage"
        :page-size="currentPageSize"
        :page-sizes="pageSizes"
        :total="total"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>


import {createFile, createObject, nestDeep} from "~/util/lib";

export default {
  name: 'LocalisationTable',
  data() {
    return {
      autosave: null,
      data: [],
      fData: [],
      loading: false,
      onlyWithErrors: false,
      currentPage: 1,
      currentPageSize: 50,
      pageSizes: [20, 50, 100, 200, 300, 400]
    }
  },
  computed: {
    filteredData() {
      const start = (this.currentPage - 1) * this.currentPageSize
      const end = this.currentPage * this.currentPageSize
      return this.onlyWithErrors ? this.fData.slice(start, end) : this.data.slice(start, end)
    },
    total() {
      return this.onlyWithErrors ? this.fData.length : this.data.length
    }
  },
  mounted() {
    this.$eventBus.$emit('appLoading', true)
    let data = localStorage.getItem('savedData')
    data = JSON.parse(data)

    let fData = localStorage.getItem('savedFData')
    fData = JSON.parse(fData)

    let onlyWithErrors = localStorage.getItem('onlyWithErrors')
    onlyWithErrors = JSON.parse(onlyWithErrors)

    this.data = data ?? []
    this.fData = fData ?? []

    this.onlyWithErrors = onlyWithErrors ?? false

    this.$eventBus.$emit('appLoading', false)

    this.autoSaveData()

    this.$eventBus.$on('dataProcessing', (data) => {
      this.loading = true
    })

    this.$eventBus.$on('setTableData', (data) => {
      this.data = data
      this.fData = []
      this.$eventBus.$emit('appLoading', false)
    })

    this.$eventBus.$on('onChangeOnlyWithErrors', (data) => {
      this.currentPage = 1
      if (!data) {
        this.merge()
      } else {
        this.fData = this.data.filter(item => !item.leftValue || !item.rightValue)
      }
      this.onlyWithErrors = data
      this.$eventBus.$emit('appLoading', false)
    })

    this.$eventBus.$on('saveData', (data) => {
      localStorage.setItem('savedData', JSON.stringify(this.data))
      localStorage.setItem('savedFData', JSON.stringify(this.fData))
      localStorage.setItem('onlyWithErrors', JSON.stringify(this.onlyWithErrors))
      if (!data.withoutMessage) {
        this.$message.success('Сохранено!')
      }
    })

    this.$eventBus.$on('clearData', (data) => {
      this.data = []
      localStorage.removeItem('savedData')
      this.$message.success('Очищено!')
    })

    this.$eventBus.$on('downloadData', (data) => {
      try {
        const filename = data.filename
        const object = this.createFinalObject(data.isLeftFile)
        const json = JSON.stringify(object)
        createFile(filename, json, 'application/json')
      } catch (e) {
        this.$message.error(e.message)
      }
    })
  },
  methods: {
    autoSaveData() {
      if (this.autosave) {
        clearInterval(this.autosave)
      }
      this.autosave = setInterval(() => {
        this.$eventBus.$emit('saveData', {withoutMessage: true})
      }, 15000)
    },
    merge() {
      this.data = [...new Set([...this.data, ...this.fData])]
    },
    handleSizeChange(size) {
      this.currentPageSize = size
    },
    handleCurrentChange(page) {
      this.currentPage = page
    },
    createFinalObject(isLeftFile) {
      this.merge()
      let res = {}
      if (this.data.length) {
        for (let i = 0; i < this.data.length; i++) {
          const key = this.data[i].key
          const value = isLeftFile ? this.data[i].leftValue : this.data[i].rightValue
          if (!value) {
            throw new Error(`Ошибка в переменной: ${this.data[i].key}`)
          }
          const obj = createObject(key, value)
          res = nestDeep(obj, res);
        }
      }
      return res
    }
  }
}
</script>
<style lang="scss">
.red {
  textarea {
    background-color: #c37b7b !important;
  }
}
</style>
