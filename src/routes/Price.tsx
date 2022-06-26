import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import Chart from "./Chart";
import { Overview, OverviewItem, Divide } from "./Coin";

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price({ coinId }: PriceProps) {
  const { isLoading: tickersLoading, data: tickersdata } = useQuery<PriceData>(
    ["tickersUsingPriceTab", coinId], // key
    () => fetchCoinTickers(coinId), // fetcher 함수
    {
      refetchInterval: 10000,
    } // option object
  );
  return (
    <>
      <Overview>
        <OverviewItem>
          <span>최고가:</span>
          <span>${tickersdata?.quotes.USD.ath_price.toFixed(3)}</span>
        </OverviewItem>
        <Divide>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </Divide>
        <OverviewItem>
          <span>등락율:</span>
          <span>{tickersdata?.quotes.USD.percent_from_price_ath}%</span>
        </OverviewItem>
        <Divide>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </Divide>
        <OverviewItem>
          <span>마켓캡:</span>
          <span>${tickersdata?.quotes.USD.market_cap.toFixed(0)}</span>
        </OverviewItem>
      </Overview>
    </>
  );
}

export default Price;
