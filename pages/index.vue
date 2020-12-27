<template>
  <div>
    <help-block/>
    <upload-block/>
    <table-block/>
    <download-file-modal/>
    <donate-modal/>
  </div>
</template>

<script>
import EditLocalisation from "~/containers/cards/EditLocalisation";
import UploadBlock from "~/containers/UploadBlock";
import DownloadFileModal from "~/containers/modals/DownloadFileModal";
import DonateModal from "~/containers/modals/DonateModal";
import HelpBlock from "~/containers/HelpBlock";
import TableBlock from "~/containers/TableBlock";

export default {
  name: "index",
  components: {TableBlock, HelpBlock, DonateModal, DownloadFileModal, UploadBlock, EditLocalisation},
  data() {
    return {
      loading: false
    }
  }
}
</script>

<style scoped>

</style>
