import { Component } from "./Component.js";
import { Controller } from "./Controller.js";
import { Model } from "./Model.js";
import { ModelController } from "./ModelController.js";
import { View } from "./View.js";
import { ViewController } from "./ViewController.js";

function documentViewController() {
  return new ViewController({
    child: {
      component: document,
    },
    systemEvents: {
      global: {
        renderBody(data) {
          this.change({
            body: {
              content: data,
            },
          });
        },
      },
    },
  });
}

function documentModelController() {
  return new ModelController({
    child: {
      data: {
        title: 0,
      },
    },
  });
}

function pagesViewController() {
  return new ViewController({
    child: {
      component: {
        div: {
          append: [
            {
              div: {
                name: "pageTabs",
              },
            },
            {
              div: {
                name: "pages",
              },
            },
          ],
        },
      },
    },
    systemEvents: {
      global: {
        renderBuilder() {
          this.ring({
            global: [
              {
                renderPages: this.child.root,
              },
            ],
            builderPages: ["builderPagesWasRendered"],
          });
        },
      },
      builderPages: {
        renderPagesTab(data) {
          this.change({
            pageTabs: {
              content: data,
            },
          });
        },
      },
    },
  });
}

function pageTabsViewController() {
  return new ViewController({
    child: {
      component: {
        div: {
          style: {
            display: "flex",
          },
          append: [
            {
              ul: {
                name: "pageList",
                style: {
                  display: "flex",
                },
              },
            },
            {
              button: {
                style: {
                  width: "40px",
                },
                text: "+",
                name: "addPage",
              },
            },
          ],
        },
      },
    },
    userEvents: {
      addPage: {
        click() {
          this.ring({
            builderPages: ["newPage"],
          });
        },
      },
    },
    systemEvents: {
      builderPages: {
        builderPagesWasRendered() {
          this.ring({
            builderPages: [
              {
                renderPagesTab: this.child.root,
              },
            ],
          });
        },
        newPageWasAdded(data) {
          console.log(data);
          this.change({
            pageList: {
              append: {
                li: {
                  append: [
                    {
                      button: {
                        text: data.newElement.name,
                      },
                    },
                  ],
                },
              },
            },
          });
        },
      },
    },
  });
}

function pageTabsComponent(params) {
  return new Component({
    controllers: { pageTabsViewController },
    ...params,
  });
}

function pagesComponent(params) {
  return new Component({
    controllers: { pagesViewController },
    components: { pageTabsComponent },
    ...params,
  });
}

function builderViewController() {
  return new ViewController({
    child: {
      component: {
        div: {
          style: {
            display: "grid",
            height: "100%",
            gridTemplateColumns: "max-content 1fr max-content",
          },
          append: [
            {
              div: {
                name: "components",
                style: {
                  width: "200px",
                  border: "1px solid",
                },
              },
            },
            {
              div: {
                name: "pages",
                style: {
                  border: "1px solid",
                },
              },
            },
            {
              div: {
                name: "settings",
                style: {
                  width: "200px",
                  border: "1px solid",
                },
              },
            },
          ],
        },
      },
    },
    systemEvents: {
      global: {
        askForPage() {
          this.ring({
            global: [
              {
                renderBody: this.child.root,
              },
              "renderBuilder",
            ],
          });
        },
        renderPages(data) {
          this.change({
            pages: {
              content: data,
            },
          });
        },
      },
    },
  });
}

function builderModelController() {
  return new ModelController({
    child: {
      data: {
        pages: [],
      },
    },
    systemEvents: {
      builderPages: {
        newPage() {
          this.child.change({
            pages: {
              addToArray: {
                name: "new page",
              },
            },
          });
        },
      },
    },
    childChanges: {
      pages: {
        addToArray(data) {
          this.ring({
            builderPages: [{ newPageWasAdded: data }],
          });
        },
      },
    },
  });
}

function builderComponent(params) {
  return new Component({
    controllers: { builderViewController, builderModelController },
    components: { pagesComponent },
    ...params,
  });
}

const documentComponent = new Component({
  controllers: { documentViewController, documentModelController },
  components: { builderComponent },
  hooks: {
    append() {
      this.ring({
        global: ["askForPage"],
      });
    },
  },
});

window.documentComponent = documentComponent;
