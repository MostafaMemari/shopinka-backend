import { createRef, useEffect, useRef } from "react";
import ChartJs, { ChartConfiguration } from "chart.js/auto";

export interface ChartElement extends HTMLCanvasElement {
  instance: ChartJs;
}

export interface ChartProps
  extends React.ComponentPropsWithoutRef<"canvas">,
    ChartConfiguration {
  width: number;
  height: number;
  getRef: (el: ChartElement | null) => void;
}

const init = (el: ChartElement, props: ChartProps) => {
  const canvas = el?.getContext("2d");
  if (canvas) {
    const chart = new ChartJs(canvas, {
      type: props.type,
      data: props.data,
      options: props.options,
    });

    // Attach ChartJs instance
    el.instance = chart;
  }
};

function Chart(props: ChartProps) {
  const initialRender = useRef(true);
  const chartRef = createRef<ChartElement>();

  useEffect(() => {
    if (initialRender.current) {
      props.getRef(chartRef.current);
      chartRef.current && init(chartRef.current, props);
      initialRender.current = false;
    } else {
      if (chartRef.current) {
        chartRef.current.instance.data = props.data;
        if (props.options) {
          chartRef.current.instance.options = props.options;
        }
        chartRef.current.instance.update();
      }
    }
  }, [props.data, props.options]);

  const { type, data, options, width, height, getRef, ...computedProps } =
    props;
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <canvas {...computedProps} ref={chartRef}></canvas>
    </div>
  );
}

Chart.defaultProps = {
  type: "line",
  data: {},
  options: {},
  width: "auto",
  height: "auto",
  getRef: () => {},
  className: "",
};

export default Chart;
