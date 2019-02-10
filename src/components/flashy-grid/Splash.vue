<template>
  <div class="splash">
    <div class="window mx-auto">
      <div class="x-out">
        <p class="float-right x-out-text" @click="closeModal()">X</p>
      </div>
        <div class="row">
          <p class="col-12 heading text-center text-white"><b>Flashy Grid</b>
          </p>
                      <p class="col 12 sub-heading text-center text-white"><b>CSS background element generator</b></p>

        </div>
<hr style="background-color: #fff">
          <div class="row content-area">
            <div class="col-md-6 col-sm-12 demo-video">
              <p><strong>Directions: </strong>Increase the dimensions property to start.</p>

              <p><strong>Default colors: </strong>Red, Purple, Black, White, Magenta, Orange. Colors will reset to none upon edit.</p>

              <p>Experiment or see the video for descriptions of the properties.</p>

              <p><strong style="color: red;">Note: </strong>This has not been performance tested, and may have a different appearance depending on the browser (Chrome, Firefox, and Edge seem consistent).</p>
            </div>
            <div class="col-md-6 col-sm-12 demo-video">
              <video class="float-right" width="95%" height="auto" controls>
                <source src="../../assets/flashygriddemo.mp4" type="video/mp4">Your browser does not support the video tag.
              </video>
            </div>
          </div>
        
      
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../main.js";

export default {
  props: ["splashLoadedAlready"],
  data(){
    return {
      modalOpen: true
   }
  },
  methods: {
    closeModal(){
      this.modalOpen = !this.modalOpen;
this.modalIsClosed();
    },
        modalIsClosed() {
      eventBus.$emit("modalClosed", {
        modalOpen: this.modalOpen
      });
  }
}
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Libre+Barcode+39+Text");
@import url("https://fonts.googleapis.com/css?family=Jura|Libre+Barcode+39+Text");

.splash {
  position: fixed;
  height: 100vh;
  width: 100vw;
    z-index: 1000;

}
.window {

  position:static;
  padding: 20px;
  max-height: 90%;
  max-width: 75%;
  margin-top: 35px;
  width: auto;
  border: solid 4px #fff;
  background-color:rgba(183, 179, 170, 0.97);
  border-radius: 1%;
    overflow: hidden;

  }
.x-out {
  position: sticky;
  top: 0;
    font-size: 14px;
  font-family: "Jura", sans-serif;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}
.x-out-text {
    border: solid 3px #fff;
    padding: 0px 7px;
}
.heading {
  margin: 0px;
  font-size: 76px;
  font-family: "Libre Barcode 39 Text", cursive;
}
.sub-heading {
  font-size: 22px;
  font-family: "Jura", sans-serif;
}
.content-area {
  padding: 20px;
  background-color: rgba(226, 226, 226, 0.9);
  border-radius: 1%;
}
.demo-video {
  overflow: hidden;
}
video {
  cursor: pointer;
}
@media (max-width: 800px) { 
.window {
  overflow-y: scroll;
}
 }

</style>
