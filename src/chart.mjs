import asciichart from "asciichart";

export const render = (values, config = {}) => {
  console.log(
    asciichart.plot(values, {
      height: 8,
      min: 0,
      ...config,
    })
  );
};
