<template>
  <div>
    <div class="export-button">
      <div class="row button-placement" v-if="!codeBoxVisible">
        <div class="col-4">
          <button class="btn btn-primary btn-light btn-xl" @click="exportCode()">Code</button>
        </div>
      </div>

      <div class="row button-placement bring-to-front" v-if="codeBoxVisible">
        <div class="col-4">
          <button class="btn btn-primary btn-light btn-xl" @click="exportCode()">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../../main.js";

export default {
  data() {
    return {
      codeBoxVisible: false
    };
  },
  methods: {
    exportCode() {
      this.codeBoxVisible = !this.codeBoxVisible;

      eventBus.$emit("exportRequested", {
        codeBoxVisible: this.codeBoxVisible
      });
    }
  }
};
</script>

<style scoped>
.button-placement {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.bring-to-front {
  z-index: 10;
}
</style>
