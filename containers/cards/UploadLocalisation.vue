<template>
  <card type="tasks">
    <el-row :gutter="30" class="row-bg" justify="space-around">
      <el-col :xl="12" :md="24" :xs="24">
        <div class="grid-content">
          <el-upload
              ref="upload"
              :on-change="onUpload"
              :limit="2"
              :file-list="filesUpload"
              accept="application/json"
              action="#"
              class="upload-demo"
              drag
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Перетащите файл сюда или <em>нажмите для загрузки</em></div>
            <div slot="tip" class="el-upload__tip">Только файлы в формате json (Например example.json)</div>
          </el-upload>
        </div>
      </el-col>
      <el-col :xl="12" :md="24" :xs="24">
        <div class="grid-content">
          <el-form>
            <el-form-item>
              <el-input
                  v-model="jsonForm.value"
                  :rows="8"
                  placeholder="Или вставьте json код в это поле и нажмите загрузить"
                  type="textarea"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-row type="flex" justify="space-between">
                <button type="button" class="btn btn-success" @click="uploadJsonForm">Загрузить</button>
                <button v-if="showNewJsonButton" type="button" class="btn btn-primary" @click="createNewJson">Создать новый файл</button>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </card>
</template>

<script>

import {nestedObjectToArray} from "~/util/lib";

export default {
  name: "UploadLocalisation",
  props: {
    blockKey: {
      type: String,
      required: true,
      default: 'n1'
    },
    showNewJsonButton: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      filesUpload: [],
      json: null,
      result: {},
      filename: null,
      jsonForm: {
        value: null
      }
    }
  },
  methods: {
    onUpload(file, fileList) {
      if(fileList){
        this.filesUpload = fileList.slice(-1)
      }
      const isJSON = (file.raw.type === 'application/json');

      if (!isJSON) {
        this.$message.error('Только json файлы');
        return false;
      }
      this.json = null
      this.filename = `${file.raw.name}_${file.raw.uid}`
      this.decodeJsonFile(file.raw)
    },
    decodeJsonFile(rawFile) {
      let reader = new FileReader();
      reader.onload = (function (theFile, vm) {
        return function (e) {
          vm.prepareData(e.target.result)
        };
      })(rawFile, this);
      reader.readAsText(rawFile);
    },
    uploadJsonForm() {
      this.prepareData(this.jsonForm.value)
    },
    prepareData(data) {
      try {
        this.json = JSON.parse(data)
        this.result = nestedObjectToArray(this.json)
        this.$eventBus.$emit(`uploaded_${this.blockKey}`, {
          data: this.json,
          keys: this.result,
          fileName: this.filename
        })
      } catch (e) {
        this.$message.error(e.message);
      }
    },
    createNewJson() {
      this.prepareData('{}')
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
