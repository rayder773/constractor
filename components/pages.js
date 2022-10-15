import { Component } from "../Component.js";
import { ViewController } from "../ViewController.js";

import { pageTabsComponent } from "./pagesTab.js";

export function pagesComponent(params) {
  return new Component({
    controllers: { pagesViewController },
    components: { pageTabsComponent },
    ...params,
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
          const uid = e.target.uid;
          // console.log(11);
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
