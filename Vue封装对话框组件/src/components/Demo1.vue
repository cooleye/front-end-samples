<template>
  <div id="app">
    <h1>demo1 </h1>
    <ul>
      <li @click="showDialogFn(true, 'info')">提示框弹框</li>
      <li @click="showDialogFn(false, 'info')">提示框弹框(无标题)</li>
      <li @click="showDialogFn(true, 'confirm')">确认框弹框</li>
    </ul>

    <m-dialog :show="showDialog" :show-title="showTitle" :type="type" @confirm="confirmHandler" @cancel="cancelHandler">
      <template #title>
        <h1>确认删除？</h1>
      </template>

      <template #content>
        床前明月光，疑是地上霜
      </template>
    </m-dialog>

  </div>
</template>
  
<script>

import Dialog from '@/components/Dialog.vue';

export default {
  name: 'App',
  data() {
    return {
      showDialog: false,
      showTitle: true,
      type: 'info'
    }
  },
  components: {
    'm-dialog': Dialog
  },
  methods: {

    confirmHandler() {
      this.showDialog = false;
      this.showDialog2 = false;
      this.showDialog3 = false;
      console.log("confirmHandler")
    },
    cancelHandler() {
      this.showDialog = false;
      this.showDialog2 = false;
      this.showDialog3 = false;
      console.log("cancelHandler")
    },
    showDialogFn(showTitle, type) {
      this.showTitle = showTitle;
      this.type = type;
      this.showDialog = true;
    }
  }
}
</script>
  
<style lang="scss"></style>
  