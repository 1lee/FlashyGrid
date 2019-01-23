<template>
  <div>
    <div class="control-panel container">
      <div class="row">
        <div class="col-9">
          <div class="input-group-sm mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">Shapes</label>
            </div>
            <select
              class="custom-select"
              id="inputGroupSelect01"
              v-model="shape"
              @change="addShape(shape)"
            >
              <option selected value="unset">None</option>
              <option value="triangle">Triangle</option>
              <option value="trapezoid">Trapezoid</option>
              <option value="parallellogram">Parallellogram</option>
              <option value="rhombus">Rhombus</option>
              <option value="pentagon">Pentagon</option>
              <option value="hexagon">Hexagon</option>
              <option value="heptagon">Heptagon</option>
              <option value="octagon">Octagon</option>
              <option value="nonagon">Nonagon</option>
              <option value="decagon">Decagon</option>
              <option value="bevel">Bevel</option>
              <option value="rabbet">Rabbet</option>
              <option value="left arrow">Left Arrow</option>
              <option value="right arrow">Right Arrow</option>
              <option value="left point">Left Point</option>
              <option value="right point">Right Point</option>
              <option value="left chevron">Left Chevron</option>
              <option value="right chevron">Right Chevron</option>
              <option value="star">Star</option>
              <option value="cross">Cross</option>
              <option value="message">Message</option>
              <option value="X">X</option>
              <option value="frame">Frame</option>
              <option value="circle">Circle</option>
              <option value="ellipse">Ellipse</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <ul class="shape-list">
            <li
              class="badge badge-pill badge-light"
              v-for="(shape, index) in displayNames"
              :key="index"
              @click="removeShape(shape)"
            >{{ shape }}</li>
          </ul>
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
      shape: "unset",
      availableShapes: [],
      displayNames: [],
      inputShape: "",
      shapes: {
        unset: "",
        triangle: "polygon(50% 0%, 0% 100%, 100% 100%)",
        trapezoid: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
        parallellogram: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
        rhombus: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        pentagon: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
        hexagon:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        heptagon:
          "polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)",
        octagon:
          "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        nonagon:
          "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
        decagon:
          "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)",
        bevel:
          "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
        rabbet:
          "polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)",
        "left arrow":
          "polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)",
        "right arrow":
          "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)",
        "left point": "polygon(25% 0%, 100% 1%, 100% 100%, 25% 100%, 0% 50%)",
        "right point": "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
        "left chevron":
          "polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)",
        "right chevron":
          "polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)",
        star:
          "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        cross:
          "polygon(10% 25%, 35% 25%, 35% 0%, 65% 0%, 65% 25%, 90% 25%, 90% 50%, 65% 50%, 65% 100%, 35% 100%, 35% 50%, 10% 50%)",
        message:
          "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
        X:
          "polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)",
        frame:
          "polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)",
        circle: "circle(50% at 50% 50%)",
        ellipse: "ellipse(25% 40% at 50% 50%)"
      }
    };
  },
  methods: {
    addShape(inputShape) {
      this.displayNames.push(inputShape);
      let newShape = this.shapes[inputShape];
      this.availableShapes.push(newShape);
      console.log(this.availableShapes.length);

      this.changeShape();
    },
    removeShape(shape) {
      let shapeIndex = this.displayNames.indexOf(shape);
      this.displayNames.splice(shapeIndex, 1);
      let clipPathToRemove = this.shapes[shape];
      let indexToRemove = this.availableShapes.indexOf(clipPathToRemove);
      this.availableShapes.splice(indexToRemove, 1);
      console.log(this.availableShapes.length);
    },
    changeShape() {
      eventBus.$emit("shapeWasChanged", {
        availableShapes: this.availableShapes
      });
    }
  },
  watch: {
    availableShapes: function reset() {
      if (this.availableShapes.length == 0) {
        this.availableShapes.push("unset");
        this.changeShape();
      } else if (
        this.availableShapes.length > 1 &&
        this.availableShapes.includes("unset")
      ) {
        let unsetIndex = this.availableShapes.indexOf("unset");
        this.availableShapes.splice(unsetIndex, 1);
        this.changeShape();
      }
    }
  }
};
</script>

<style scoped>
.control-panel {
  padding: 7px 10px 7px 10px;
  /*box-shadow: 0 0.2px 0.2px 0.2px white;*/
  background-color: rgba(36, 25, 25, 0.7);
}
.shape-list {
  list-style-type: none;
}
.shape-list li {
  cursor: pointer;
  display: inline;
}
</style>
