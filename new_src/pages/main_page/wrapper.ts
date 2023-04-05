import { ViewModelWrapper } from "../../core/controller_wrapper.js";
import { ViewModel } from "../../core/controller/index.js";

export class MainPageViewModelWrapper extends ViewModelWrapper {
  readonly childrenNames = {
    builder: "builder",
  };

  constructor(params: {
    controller: ViewModel;
    children?: { [key: string]: ViewModelWrapper };
  }) {
    super(params);
  }

  start() {
    super.start();

    const builder = this.getChildByName(this.childrenNames.builder);

    this.controller.appendToViewElement({
      builder: builder.getControllerViewRoot(),
    });
  }
}
