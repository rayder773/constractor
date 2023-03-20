import { Model } from "../common/model.js";

const EVENT = {
  NEW: "NEW",
};

export function GridModel() {
  const grids = {};

  const model = Model();

  return Object.freeze({
    ...model,
    addGrid(data) {
      const { id } = data;

      if (typeof id === "undefined") {
        throw new Error("Grid id is required");
      }

      if (grids[id]) {
        throw new Error("Grid with id " + id + " already exists");
      }

      const newGrid = {
        rows: 0,
        cols: 0,
        id,
      };

      grids[id] = newGrid;

      this.notify(EVENT.NEW, newGrid);
    },
    onAddGrid(callback) {
      this.addListener(EVENT.NEW, callback);
    },
  });
}
