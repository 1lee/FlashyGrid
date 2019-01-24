<template>
  <div>
    <div class="control-panel mx-auto">
      <h6 class="instructions">PLACE IN BETWEEN &lt;head&gt; TAGS:</h6>&lt;script src="https://cdn.jsdelivr.net/npm/vue@2.5.22/dist/vue.js"&gt;&lt;/script&gt;
      <br>
      <br>
      <h6 class="instructions">PLACE IN THE FOLLOWING IN BETWEEN THE &lt;body&gt; TAGS:</h6>&lt;div id="flashyGrid">&lt;/div>
      <br>
      <br>
      <h6 class="instructions">AND...</h6>
      &lt;style type="text/css"&gt;
      #thegrid { {{ gridCss }}}
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
      &lt;/style&gt;
      <br>
      <br>
      <h6 class="instructions">THEN PLACE &lt;script&gt; TAG AT END THE OF &lt;body&gt; TAG:</h6>
      &lt;script&gt;
      new Vue({
      el: '#thegrid',
      data: { gridSize: {{ gridData.gridSize }},
      height: {{ gridData.height }},
      width: {{ gridData.width }},
      blocks: {{ blocks }},
      isOn: true,
      availableColors: {{ gridData.availableColors}},
      availableBorderColors: {{ gridData.availableBorderColors}},
      availableShapes: {{ gridData.availableShapes}},
      updatedSpeed: {{ updatedSpeed }},
      columns: "{{ gridData.columns }}",
      rows: "{{ gridData.rows }}",
      matrix: {{ gridData.matrix }},
      borderSize: {{ gridData.borderSize }},
      borderStyle: "{{ gridData.borderStyle }}",
      transitionRate: {{ transitionRate }},
      stopAll: {{ gridData.stopAll }},
      xGap: {{ gridData.xGap }},
      yGap: {{ gridData.yGap }},
      radius: {{ gridData.radius }},
      perspectiveValue: {{ gridData.perspectiveValue }},
      yRotation: {{ gridData.yRotation }},
      xRotation: {{ gridData.xRotation }},
      zRotation: {{ gridData.zRotation }},
      opacitySetting: {{ gridData.opacitySetting || 1 }},
      template: ` &lt;ul id="thegrid" class="grid-container"> &lt;li class="item trans" v-for="block in blocks" :key="blocks.indexOf(block)" v-if="blocks.length > 1" :style="[{borderSize: borderSize}, {borderStyle: borderStyle}, {borderRadius: radius + '%'}, {'transition': transitionRate + 's'}, {'transform': 'skew(' + matrix.skewX + 'deg, ' + matrix.skewY + 'deg)'}]" >
      &lt;svg width="0" height="0">
      &lt;defs>
      &lt;clipPath id="myClip">&lt;/clipPath>
      &lt;/defs>
      &lt;/svg>
      &lt;/li> &lt;/ul> `
      },
      methods: {
      getDivs() {
      return document.querySelectorAll(".grid-container > li");
      },
      cycleElements(speed, arrayOfDomElements) {
      for (let i = 0; i &lt; arrayOfDomElements.length; i++) {
      if (speed == this.updatedSpeed) {
      this.colorRandomizer(arrayOfDomElements[i]);
      } else {
      return;
      }
      }
      },
      colorRandomizer(domElement) {
      if (this.isOn) {
      let randomColor = Math.floor(
      Math.random() * this.availableColors.length
      );
      let randomBorderColor = Math.floor(
      Math.random() * this.availableBorderColors.length
      );
      let randomShapes = Math.floor(
      Math.random() * this.availableShapes.length
      );
      domElement.style.backgroundColor = this.availableColors[
      randomColor
      ];
      domElement.style.borderColor = this.availableBorderColors[
      randomBorderColor
      ];
      domElement.style.clipPath = this.availableShapes[randomShapes];
      }
      },
      timer(speed) {
      this.stopAll = false;
      let blinker = setInterval(() => {
      this.cycleElements(speed, this.getDivs());
      }, this.updatedSpeed);
      },
      renderHTML(){
      let renderTarget = document.getElementById("flashyGrid");
      if(renderTarget){
      renderTarget.innerHTML = this.template;
      }
      }
      },
      created(){
      this.renderHTML();
      this.isOn = true;
      this.stopAll = false;
      this.timer(this.updatedSpeed);
      }
      });
      &lt;/script&gt;
      <br>
      <br>
      <h6 class="instructions">DONE!</h6>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../../main.js";
export default {
  props: ["gridCss", "gridData", "blocks", "updatedSpeed", "transitionRate"],

  filters: {
    orReturnNumberOne(value) {
      if (value.isNaN()) {
        return 1;
      }
      return;
    }
  }
};
</script>

<style scoped>
.instructions {
  color: red;
}
.control-panel {
  display: block;
  position: absolute;
  color: white;
  background-color: black;
  padding: 5%;
  font-size: 12px;
  top: 0;
  margin-top: 67px;
  height: 85%;
  width: auto;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>


