<template>
  <div class="fixed-plugin" v-click-outside="closeDropDown">
    <div class="dropdown show-dropdown" :class="{ show: isOpen }">
      <a data-toggle="dropdown" class="settings-icon">
        <i class="fa fa-cog fa-2x" @click="toggleDropDown"> </i>
      </a>
      <ul class="dropdown-menu" :class="{ show: isOpen }">
        <li class="adjustments-line">
          <div class="togglebutton switch-change-color mt-3">
            <span class="label-switch">Светлая тема</span>
            <base-switch v-model="darkMode" @input="toggleMode"></base-switch>
            <span class="label-switch label-right">Темная тема</span>
          </div>
        </li>

        <li class="button-container mt-4">
          <a
            href="#"
            class="btn btn-success btn-block"
            @click.prevent="showDonateModal"
          >
            Donate
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { BaseSwitch } from '@/components';

  export default {
    name: 'sidebar-share',
    components: {
      BaseSwitch
    },
    props: {
      backgroundColor: String
    },
    data() {
      return {
        sidebarMini: true,
        darkMode: true,
        isOpen: false,
        sidebarColors: [
          { color: 'primary', active: false, value: 'primary' },
          { color: 'vue', active: true, value: 'vue' },
          { color: 'info', active: false, value: 'blue' },
          { color: 'success', active: false, value: 'green' }
        ]
      };
    },
    methods: {
      showDonateModal() {
        this.$eventBus.$emit('donateModalVisibility')
      },
      toggleDropDown() {
        this.isOpen = !this.isOpen;
      },
      closeDropDown() {
        this.isOpen = false;
      },
      toggleList(list, itemToActivate) {
        list.forEach(listItem => {
          listItem.active = false;
        });
        itemToActivate.active = true;
      },
      changeSidebarBackground(item) {
        this.$emit('update:backgroundColor', item.value);
        this.toggleList(this.sidebarColors, item);
      },
      toggleMode(type) {
        let docClasses = document.body.classList;
        if (type) {
          docClasses.remove('white-content');
        } else {
          docClasses.add('white-content');
        }
      },
      minimizeSidebar() {
        this.$sidebar.toggleMinimize();
      }
    }
  };
</script>
<style scoped lang="scss">
  @import '~@/assets/sass/dashboard/custom/variables';

  .settings-icon {
    cursor: pointer;
  }

  .badge-vue {
    background-color: $vue;
  }
</style>
