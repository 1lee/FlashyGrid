export const initialData = {
    returnDefaults(){
        
        return this.data;
    },
    data: {
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
        }
    }
};