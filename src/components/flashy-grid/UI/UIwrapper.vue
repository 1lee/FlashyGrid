<template>
  <div>
    <div class="export-button">
      <div class="row show-button" v-show="visible">
        <div class="col-4">
          <button class="btn btn-primary btn-light btn-xl" @click="UIoff()">Hide</button>
        </div>
      </div>

      <div class="row show-button" v-show="!visible">
        <div class="col-4">
          <button class="btn btn-primary btn-light btn-xl" @click="UIon()">Show</button>
        </div>
      </div>
    </div>

    <div class="theUi" v-show="visible">
      <ui-dimensions class="dimensions flush-left-column"></ui-dimensions>

      <ui-rates class="rates flush-left-column"></ui-rates>

      <ui-gaps class="gaps flush-left-column"></ui-gaps>

      <ui-color class="color flush-left-column"></ui-color>

      <ui-border class="flush-left-column"></ui-border>

      <ui-shapes class="shapes flush-left-column"></ui-shapes>

      <ui-footer class="footer flush-left-column"></ui-footer>

      <ui-export-button class="ui-export-button flush-left-column"></ui-export-button>
    </div>
  </div>
</template>

<script>
import UIdimensions from "./UIdimensions";
import UIrates from "./UIrates";
import UIgaps from "./UIgaps";
import UIcolor from "./UIcolor";
import UIborder from "./UIborder";
import UIshapes from "./UIshapes";
import UIfooter from "./UIfooter";
import UIExportButton from "./UIexportButton";

export default {
  components: {
    "ui-dimensions": UIdimensions,
    "ui-rates": UIrates,
    "ui-gaps": UIgaps,
    "ui-color": UIcolor,
    "ui-border": UIborder,
    "ui-shapes": UIshapes,
    "ui-footer": UIfooter,
    "ui-export-button": UIExportButton
  },
  data() {
    return {
      visible: true
    };
  },
  methods: {
    UIon() {
      this.visible = true;
    },
    UIoff() {
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.show-button {
  position: fixed;
  top: 20px;
  right: 20px;
}

.theUi {
  margin-top: 0px;
  padding-top: 20px;
  display: grid;
  grid-template-columns: 20px [leftMargin] auto [uiEnd] 0.8fr;
  grid-template-rows: 70px [topMargin] auto [dimension-rate-line] auto [rate-gap-line] auto [gap-skew-line] auto;
}
.flush-left-column {
  grid-column: 2 / uiEnd;
}
.dimensions {
  grid-row: topMargin / 1;
}
.rates {
  grid-row: dimension-rate-line / 2;
}
</style>
