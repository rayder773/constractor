// export class TabsComponent extends ViewWithModel {
//   state = {
//     tabs: [],
//   };

//   domEvents = {
//     "click:add-tab": this.addTab,
//   };

//   addTab() {
//     console.log("add tab");
//   }

//   createElement(): HTMLElement {
//     const listElement = document.createElement("ul");
//     listElement.id = "tabs";

//     const buttonElement = document.createElement("button");
//     buttonElement.id = "add-tab";
//     buttonElement.textContent = "Add page";

//     const wrapperElement = document.createElement("div");
//     wrapperElement.id = "tabs-wrapper";

//     wrapperElement.appendChild(buttonElement);
//     wrapperElement.appendChild(listElement);

//     return wrapperElement;
//   }
// }
