<template>
  <div>
    <div class="control-panel container">
      <div class="row">
        <div class="col-6">
          <div class="input-group-sm mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">Border style</label>
            </div>
            <select
              class="custom-select"
              id="inputGroupSelect01"
              v-model="borderStyle"
              @change="changeBorder"
            >
              <option selected value="none">None</option>
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="double">Double</option>
              <option value="groove">Groove</option>
              <option value="ridge">Ridge</option>
              <option value="inset">Inset</option>
              <option value="outset">Outset</option>
            </select>
          </div>
        </div>

        <div class="col-3">
          <h6 class="text-white">Border Size</h6>
          <input
            type="number"
            name="borderSize"
            step="1"
            min="1"
            max="20"
            v-model="borderSize"
            @input="changeBorder"
          >
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="input-group-sm mb-3">
            <input
              type="text"
              class="form-control jscolor"
              v-model="inputBorderColor"
              placeholder="Select Border Color"
              aria-label="Select color"
              aria-describedby="button-addon4"
              @keydown.enter="addColors(availableBorderColors, $event)"
              @keyup.enter="inputBorderColor = ''"
              @input="changeBorder"
              onkeypress="return false;"
            >
          </div>
        </div>
        <div class="col-3">
          <h6 class="text-white">Border radius</h6>
          <input
            type="number"
            name="border-radius"
            step="1"
            min="0"
            max="50"
            v-model="radius"
            @input="changeBorder"
          >
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <ul class="color-list">
            <li
              class="badge badge-pill badge-light"
              v-for="(color, index) in availableBorderColors"
              :key="index"
              :style="{backgroundColor: color}"
              @click="removeColor(availableBorderColors, index)"
            >{{ color }}</li>
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
      borderStyle: "none",
      borderSize: 0,
      availableBorderColors: [],
      inputBorderColor: "",
      radius: 0
    };
  },
  methods: {
    addColors(list, event) {
      this.inputBorderColor = "#" + event.target.value;
      list.push(this.inputBorderColor);

      this.changeBorder();
    },
    removeColor(list, index) {
      list.splice(index, 1);
    },
    changeBorder() {
      eventBus.$emit("borderWasChanged", {
        borderStyle: this.borderStyle,
        borderSize: this.borderSize,
        availableBorderColors: this.availableBorderColors,
        radius: this.radius
      });
    }
  }
};
</script>

<style>
.control-panel {
  padding: 7px 10px 7px 10px;
  /*box-shadow: 0 0.2px 0.2px 0.2px white;*/
  background-color: rgba(36, 25, 25, 0.7);
}
.color-list {
  list-style-type: none;
}
.color-list li {
  cursor: pointer;
  display: inline;
}
</style>
