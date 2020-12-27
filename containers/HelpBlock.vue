<template>
  <el-row :gutter="30" type="flex" class="row-bg" justify="space-between">
    <el-col :span="12">
      <card class="mh">
        <el-row :gutter="30" class="row-bg text-center">
          <h4>Для начала работы загрузите файл локализации в блоке слева. Это может занять некоторое время!</h4>
        </el-row>
      </card>
    </el-col>
    <el-col :span="12">
      <card class="mh">
        <el-row :gutter="30" class="row-bg text-center">
          <h4>Для сравнения двух файлов загрузите второй файл в блоке справа. Это может занять некоторое время!</h4>
          <h4>
            <strong>
              Если вы хотите создать новый файл локализации - нажмите кнопку "Создать новый файл".
            </strong>
          </h4>
        </el-row>
      </card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "HelpBlock"
}
</script>

<style scoped>
 .mh {
   min-height: 120px;
 }
</style>
