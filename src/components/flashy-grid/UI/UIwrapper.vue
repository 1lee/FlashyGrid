<template>
  <div class="interface">
    <div class="control-toggles">
      <button type="button" class="btn btn-secondary btn-sm" @click="toggleRates()">Rates</button>
      <button type="button" class="btn btn-secondary btn-sm" @click="toggleGaps()">Gaps</button>
      <button type="button" class="btn btn-secondary btn-sm" @click="toggleColor()">Color</button>
      <button type="button" class="btn btn-secondary btn-sm" @click="toggleBorder()">Border</button>
      <button type="button" class="btn btn-secondary btn-sm" @click="toggleShapes()">Shapes</button>
      <button
        type="button"
        class="btn btn-secondary btn-sm"
        @click="togglePerspective()"
      >Perspective</button>
    </div>

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
      <ui-dimensions ref="dimensionsRef" class="dimensions flush-left-column"></ui-dimensions>

      <ui-rates class="rates flush-left-column" v-show="ratesVisible"></ui-rates>

      <ui-gaps class="gaps flush-left-column" v-show="gapsVisible"></ui-gaps>

      <ui-color class="color flush-left-column" v-show="colorVisible"></ui-color>

      <ui-border class="flush-left-column" v-show="borderVisible"></ui-border>

      <ui-shapes class="shapes flush-left-column" v-show="shapesVisible"></ui-shapes>

      <ui-footer class="footer flush-left-column" v-show="perspectiveVisible"></ui-footer>

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
  props: ["gridReset"],
  data() {
    return {
      visible: true,
      ratesVisible: true,
      gapsVisible: true,
      colorVisible: true,
      borderVisible: true,
      shapesVisible: true,
      perspectiveVisible: true
    };
  },
  watch: {
    gridReset: function pushChanges(){
      $refs.dimensionsRef.initializeDimensions();
    }
  },
  methods: {
    UIon() {
      this.visible = true;
    },
    UIoff() {
      this.visible = false;
    },
    toggleRates() {
      this.ratesVisible = !this.ratesVisible;
    },
    toggleGaps() {
      this.gapsVisible = !this.gapsVisible;
    },
    toggleColor() {
      this.colorVisible = !this.colorVisible;
    },
    toggleBorder() {
      this.borderVisible = !this.borderVisible;
    },
    toggleShapes() {
      this.shapesVisible = !this.shapesVisible;
    },
    togglePerspective() {
      this.perspectiveVisible = !this.perspectiveVisible;
    }
  }
};
</script>

<style scoped>
.control-toggles {
  display: none;
}

.show-button {
  position: fixed;
  bottom: 60px;
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
@media (max-width: 768px) {
  .control-toggles {
    display: inline;
  }
}
</style>
