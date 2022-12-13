import { ModelController } from "../../../../core/ModelController.js";

export function BuilderModelController() {
  return new ModelController({
    child: {
      data: {
        pages: [],
        activePage: null,
      },
    },
    onChange: {
      pages: {
        addToArray: "newPageInModel",
      },
    },
    listen: {
      addPlus() {
        this.change({
          pages: {
            addToArray: { name: "new page" },
          },
        });
      },
      makePageActive(data) {
        console.log(data);
      },
    },
  });
}
