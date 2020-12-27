<template>
  <nav class="navbar navbar-expand-lg navbar-dark navbar-absolute top-navbar d-lg-flex align-items-center">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div>
      <a class="navbar-brand" href="#" @click.prevent>
        <img alt="Localizeer" src="~static/logo.png">
      </a>
    </div>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <el-checkbox style="color: #FFF;" @change="onChangeOnlyWithErrors" v-model="onlyWithErrors" border label="Показывать только с ошибкой"></el-checkbox>
        </li>
        <li class="nav-item">
          <button class="btn btn-danger" @click="clear"><i class="el-icon-delete"></i> Очистить</button>
        </li>
        <li class="nav-item">
          <button class="btn btn-primary" @click="download"><i class="el-icon-download"></i> Скачать</button>
        </li>
        <li class="nav-item">
          <button class="btn btn-success" @click="save"><i class="el-icon-check"></i> Сохранить</button>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import {CollapseTransition} from 'vue2-transitions';
import {BaseNav, Modal} from '@/components';

export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal
  },
  computed: {
    routeName() {
      const {path} = this.$route;
      let parts = path.split('/')
      if (parts == ',') {
        return 'Localizer';
      }
      return parts.map(p => this.capitalizeFirstLetter(p)).join(' ');
    },
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  data() {
    return {
      onlyWithErrors: false,
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: ''
    };
  },
  mounted() {
    let onlyWithErrors = localStorage.getItem('onlyWithErrors')
    onlyWithErrors = JSON.parse(onlyWithErrors)
    this.onlyWithErrors = onlyWithErrors ?? false
  },
  methods: {
    onChangeOnlyWithErrors() {
      this.$eventBus.$emit('appLoading', true)
      this.$eventBus.$emit('onChangeOnlyWithErrors', this.onlyWithErrors)
    },
    clear() {
      this.$confirm('Удалить данные?', 'Внимание!', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
        type: 'warning'
      }).then(() => {
        this.$eventBus.$emit('clearData')
      })
    },
    save() {
      this.$eventBus.$emit('saveData')
    },
    download() {
      this.$eventBus.$emit('downloadFileModalVisibility')
    },
    capitalizeFirstLetter(string) {
      if (!string || typeof string !== 'string') {
        return ''
      }
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>
<style scoped>
.top-navbar {
  top: 0px;
}
</style>
