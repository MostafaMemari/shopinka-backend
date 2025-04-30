import Chart from "../../base-components/Chart";
import { ChartData, ChartOptions } from "chart.js/auto";
import { getColor } from "../../utils/colors";
import { selectDarkMode } from "../../stores/darkModeSlice";
import { useAppSelector } from "../../stores/hooks";
import { useMemo } from "react";
import { randomNumbers } from "../../utils/helper";

interface MainProps extends React.ComponentPropsWithoutRef<"canvas"> {
  width: number;
  height: number;
}

function Main(props: MainProps) {
  const darkMode = useAppSelector(selectDarkMode);

  const data: ChartData = useMemo(() => {
    return {
      labels: [...Array(16).keys()],
      datasets: [
        {
          label: "Html Template",
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          backgroundColor: getColor("primary", 0.8),
          data: randomNumbers(-100, 100, 16),
        },
        {
          label: "VueJs Template",
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          backgroundColor: darkMode
            ? getColor("darkmode.200")
            : getColor("slate.300"),
          data: randomNumbers(-100, 100, 16),
        },
      ],
    };
  }, []);

  const options: ChartOptions = useMemo(() => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            font: {
              size: 12,
            },
            color: getColor("slate.500", 0.8),
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          stacked: true,
          ticks: {
            font: {
              size: 12,
            },
            color: getColor("slate.500", 0.8),
            callback: function (value) {
              return "$" + value;
            },
          },
          grid: {
            color: darkMode
              ? getColor("slate.500", 0.3)
              : getColor("slate.300"),
            borderDash: [2, 2],
            drawBorder: false,
          },
        },
      },
    };
  }, []);

  return (
    <Chart
      type="bar"
      width={props.width}
      height={props.height}
      data={data}
      options={options}
      className={props.className}
    />
  );
}

Main.defaultProps = {
  width: "auto",
  height: "auto",
  className: "",
};

export default Main;
