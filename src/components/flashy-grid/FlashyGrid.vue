<template>
  <div id="element">
    <div class="splash" v-if="modalOpen">
      <splash v-if="!splashLoadedAlready"></splash>
      
    </div>
    <div class="canvas"></div>
    <ul
      id="thegrid"
      class="grid-container"
      :style="[heightWidth, gridTemplateRow, gridTemplateColumns, gridGap, opacity, {'transform': 'perspective(' + gridData.perspectiveValue + 'px) rotateY(' + gridData.yRotation + 'deg) rotateX(' + gridData.xRotation + 'deg) rotateZ(' + gridData.zRotation + 'deg)'}]"
    >
      <li
        class="item"
        v-for="unit in blocks"
        :key="blocks.indexOf(unit)"
        v-if="blocks.length > 1"
        :style="[{'transition': transitionRate + 's'}, blockBorderRadius, {'transform': 'skew(' + gridData.matrix.skewX + 'deg, ' + gridData.matrix.skewY + 'deg)'}, border]"
      >
        <svg width="0" height="0">
          <defs>
            <clipPath id="myClip"></clipPath>
          </defs>
        </svg>
      </li>
      <!-- END block-->
    </ul>

    <ps-u-i :key="componentResetKey"></ps-u-i>
    <!---------------------------------------------------------------------------------------------------------->
          <div class="row reset-button">
        <div class="col-4">
          <button class="btn btn-danger btn-xl" @click="resetGrid()">Reset</button>
        </div>
      </div>
    
    <div v-if="codeBoxVisible">
      <export-template
        :gridCss="gridCss"
        :gridData="gridData"
        :blocks="blocks"
        :updatedSpeed="updatedSpeed"
        :transitionRate="transitionRate"
      ></export-template>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../main.js";
import { dataBus } from "./busMethods.js";
import { initialData } from "../initialData.js";

import Splash from './Splash.vue';

import psUI from "./UI/UIwrapper";

import UIExportTemplate from "./UI/UIExportTemplate";

export default {
  components: {
    Splash,
    psUI,
    exportTemplate: UIExportTemplate
  },
  data() {
    return {
      gridData: {
        gridSize: 1,
        height: 100,
        width: 100,
        columns: "repeat(10, 1fr)",
        rows: "repeat(10, 1fr)",
        isOn: false,
        availableColors: [
          "red",
          "purple",
          "black",
          "white",
          "magenta",
          "orange"
        ],
        inputBorderColor: "",
        availableBorderColors: ["white"],
        availableShapes: [],
        borderSize: 0,
        borderColor: "",
        borderStyle: "none",
        stopAll: false,
        xGap: 0,
        yGap: 0,
        radius: 0,
        opacitySetting: 1,
        perspectiveValue: 0,
        xRotation: 0,
        yRotation: 0,
        zRotation: 0,
        matrix: {
          scaleX: 0,
          skewX: 0,
          skewY: 0,
          scaleY: 0,
          translateX: 0,
          translateY: 0
        },
        
      },
      initialData: {
        gridSize: 1,
        height: 100,
        width: 100,
        columns: "repeat(10, 1fr)",
        rows: "repeat(10, 1fr)",
        isOn: false,
        availableColors: [
          "red",
          "purple",
          "black",
          "white",
          "magenta",
          "orange"
        ],
        inputBorderColor: "",
        availableBorderColors: ["white"],
        availableShapes: [],
        borderSize: 0,
        borderColor: "",
        borderStyle: "none",
        stopAll: false,
        xGap: 0,
        yGap: 0,
        radius: 0,
        opacitySetting: 1,
        perspectiveValue: 0,
        xRotation: 0,
        yRotation: 0,
        zRotation: 0,
        matrix: {
          scaleX: 0,
          skewX: 0,
          skewY: 0,
          scaleY: 0,
          translateX: 0,
          translateY: 0
        },
        
      },
      modalOpen: true,
      splashLoadedAlready: false,
      blocks: ["block"],
      updatedSpeed: 1000,
      transitionRate: 0.5,
      gridCss: "",
      codeBoxVisible: false,
      initializedData: {},
      componentResetKey: 0

    };
  },
  filters: {
    returnAsString(value) {
      return value.toString();
    }
  },
  computed: {
    heightWidth() {
      return {
        height: this.gridData.height + "vh",
        width: this.gridData.width + "vw"
      };
    },
    gridTemplateRow() {
      return {
        gridTemplateRows: this.gridData.rows
      };
    },
    gridTemplateColumns() {
      return {
        gridTemplateColumns: this.gridData.columns
      };
    },
    gridGap() {
      return {
        gridGap: this.gridData.xGap + "%" + " " + this.gridData.yGap + "%"
      };
    },
    blockBorderRadius() {
      return {
        borderRadius: this.gridData.radius + "%"
      };
    },
    blockTransform() {
      return {
        transform: "skewX(" + this.gridData.matrix.skewX + "deg);"
      };
    },
    border() {
      return {
        border:
          this.gridData.borderSize +
          "px " +
          this.gridData.borderStyle +
          " " +
          this.gridData.inputBorderColor
      };
    },
    opacity() {
      return {
        opacity: this.gridData.opacitySetting
      };
    }
  },
  watch: {
    componentResetKey: function resetData() {

        location.reload();
    },
    timer: function resetTimer() {
      this.timer(0);
    },
    "gridData.stopAll": function reset() {
      this.gridData.stopAll = true;
    },
    updatedSpeed: function newSpeed() {
      this.timer(this.updatedSpeed);
    },
    "gridData.gridSize": function newGridSize() {
      this.gridSizer(this.gridData.gridSize);
      this.blocks = [];
      for (
        let i = 0;
        i < this.gridData.gridSize * this.gridData.gridSize;
        i++
      ) {
        this.blocks.push("block");
      }
    },
    //transitionRate: function newTransitionRate() {
    // this.timer(this.updatedSpeed);
    // },
    codeBoxVisible: function exportCss() {
      let dynamicCss = document.getElementById("thegrid").style.cssText;
      this.gridCss = dynamicCss;
    }
  },
  methods: {
    turnOff() {
      this.isOn = false;
      this.gridData.stopAll = true;
    },
       resetGrid(){
      this.componentResetKey += 1; 
       },
    getDivs() {
      return document.querySelectorAll(".grid-container > li");
    },
    cycleElements(speed, arrayOfDomElements) {
      for (let i = 0; i < arrayOfDomElements.length; i++) {
        if (speed == this.updatedSpeed) {
          this.colorRandomizer(arrayOfDomElements[i]);
        } else {
          return; //if the speed changes the loop breaks
        }
      }
    },
    colorRandomizer(domElement) {
      if (this.isOn) {
        let randomColor = Math.floor(
          Math.random() * this.gridData.availableColors.length
        );
        let randomBorderColor = Math.floor(
          Math.random() * this.gridData.availableBorderColors.length
        );
        let randomShapes = Math.floor(
          Math.random() * this.gridData.availableShapes.length
        );
        domElement.style.backgroundColor = this.gridData.availableColors[
          randomColor
        ];
        domElement.style.borderColor = this.gridData.availableBorderColors[
          randomBorderColor
        ];
        domElement.style.clipPath = this.gridData.availableShapes[randomShapes];
      }
    },
    timer(speed) {
      this.gridData.stopAll = false;
      let blinker = setInterval(() => {
        this.cycleElements(speed, this.getDivs());
      }, this.updatedSpeed);
    },
    gridSizer(size) {
      this.gridData.columns = "repeat(" + size + ", 1fr)";
      this.gridData.rows = "repeat(" + size + ", 1fr)";
    }
  },
  created() {
    this.initializedData = initialData;


eventBus.$on("modalClosed", data => {
  this.modalOpen = data.modalOpen;
});
    eventBus.$on("dimensionsWereChanged", data => {
      this.gridData.gridSize = data.gridSize;
      this.gridData.height = data.height;
      this.gridData.width = data.width;
    });
    eventBus.$on("ratesWereChanged", data => {
      this.updatedSpeed = data.blinkRate;
      this.transitionRate = data.transitionRate;
    });

    eventBus.$on("gapsWereChanged", data => {
      this.gridData.xGap = data.xGap;
      this.gridData.yGap = data.yGap;
    });

    eventBus.$on("skewWasChanged", data => {
      this.gridData.matrix.skewX = data.skewX;
      this.gridData.matrix.skewY = data.skewY;
    });

    eventBus.$on("colorsWereChanged", data => {
      this.gridData.availableColors = data.availableColors;
    });

    eventBus.$on("borderWasChanged", data => {
      this.gridData.borderStyle = data.borderStyle;
      this.gridData.borderSize = data.borderSize;
      this.gridData.availableBorderColors = data.availableBorderColors;
      this.gridData.radius = data.radius;
    });

    eventBus.$on("shapeWasChanged", data => {
      this.gridData.availableShapes = data.availableShapes;
    });

    eventBus.$on("opacityOrPerspectiveChanged", data => {
      this.gridData.opacitySetting = data.opacitySetting;
      this.gridData.perspectiveValue = data.perspectiveValue;
      this.gridData.xRotation = data.xRotation;
      this.gridData.yRotation = data.yRotation;
      this.gridData.zRotation = data.zRotation;
    });

    eventBus.$on("exportRequested", data => {
      this.codeBoxVisible = data.codeBoxVisible;
      this.dataRefreshed = true;
    });

  },
  beforeMount() {
    this.isOn = true;
    this.stopAll = false;
    this.timer(this.updatedSpeed);

  }
};
</script>

<style>
#element {
  min-height: 100vh;
}
.canvas {
  position: absolute;
  background-color: black;
  z-index: -2000;
  min-height: 100vh;
  min-width: 100vw;
}
.grid-container {
  position: absolute;
  height: 100%;
  width: 100%;
  display: grid;
  list-style-type: none;
  padding-left: 0;
  margin-left: 0;
  z-index: -50;
}
.item {
  background-color: rgba(255, 255, 255, 0.4);
}
.reset-button {
    position: fixed;
  top: 20px;
  right: 20px;
}
</style>
