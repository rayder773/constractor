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
          style: {
            height: "100%",
          },
          append: [
            {
              div: {
                name: "pageTabs",
              },
            },
            {
              div: {
                name: "pages",
                style: {
                  height: "100%",
                },
              },
            },
          ],
        },
      },
    },
    userEvents: {
      pages: {
        click(e) {
          // const uid = e.target.uid;
          // console.log(11);
        }
      }
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
        changeActivePage(data) {
          this.change({
            pages: {
              contentModel: data.model.pages[data.newValue].gridView,
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
      pageList: {
        click(e) {
          const index = Array.from(e.currentTarget.children).indexOf(e.target);
          this.ring({
            builderPages: [{ setNewActivePage: index }],
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
          this.change({
            pageList: {
              append: {
                li: {
                  style: {
                    border: "1px solid",
                  },
                  append: [
                    {
                      button: {
                        style: {
                          pointerEvents: "none",
                        },
                        text: data.newElement.name,
                      },
                    },
                  ],
                },
              },
            },
          });
        },
        changeActivePage(data) {
          this.change({
            pageList: {
              childByIndex: {
                [data.oldValue]: {
                  style: {
                    borderColor: "black",
                  },
                },
                [data.newValue]: {
                  style: {
                    borderColor: "red",
                  },
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
        activePageIndex: -1,
      },
    },
    systemEvents: {
      builderPages: {
        newPage() {
          this.child.change({
            pages: {
              addToArray: {
                name: "new page",
                gridView: {
                  div: {
                    style: {
                      height: "100%",
                      border: "1px dashed",
                    },
                  },
                },
                gridModels: [
                  {
                    rows: 0,
                    cols: 0,
                  },
                ],
              },
            },
            activePageIndex: {
              set: this.child.data.pages.length,
            },
          });
        },
        setNewActivePage(data) {
          this.change({
            activePageIndex: {
              set: data,
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
      activePageIndex: {
        set(data) {
          this.ring({
            builderPages: [{ changeActivePage: data }],
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
