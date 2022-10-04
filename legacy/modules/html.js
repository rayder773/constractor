export const htmlModule = {
  component: document.documentElement,
  subscribeTo: {
    appendBuilder(builder) {
      this.change({
        body: {
          content: builder,
        },
        root: {
          style: {
            overflow: "hidden",
          },
        },
      });
    },
  },
};
