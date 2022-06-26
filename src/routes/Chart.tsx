import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import Price from "./Price";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const priceOhlcv = data?.map((ohlcv) => ({
    x: new Date(ohlcv.time_open * 1000),
    y: [ohlcv.open, ohlcv.high, ohlcv.low, ohlcv.close],
  }));
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[{ name: Price, data: priceOhlcv }] as unknown as number[]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            yaxis: {
              show: true,
              labels: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: true },
              type: "datetime",
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },
            colors: ["red"],
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(3)} $`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
