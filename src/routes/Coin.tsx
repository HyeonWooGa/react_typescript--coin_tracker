import styled from "styled-components";
import {
  Switch,
  Route,
  useParams,
  useLocation,
  useRouteMatch,
} from "react-router";
import Price from "./Price";
import Chart from "./Chart";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;

const Loader = styled.span`
  display: block;
`;

export const Overview = styled.div`
  margin-top: 30px;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
`;
export const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span:first-child {
    font-size: 14px;
    margin-bottom: 5px;
  }
`;

export const Divide = styled.div`
  display: flex;
  flex-direction: column;
  span {
    margin: -1.5px;
    opacity: 0.2;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Taps = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tap = styled.span<{ isActive: boolean }>`
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  text-align: center;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  a {
    display: block;
  }
`;

const BackBtn = styled(Tap)`
  border-radius: 0px;
  padding: 7px 7px;
  background-color: transparent;
  color: ${(props) => props.theme.textColor};
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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

interface ICoinProps {}

function Coin({}: ICoinProps) {
  const { coinId } = useParams<RouteParams>(); // hook
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price"); //hook
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersdata } = useQuery<PriceData>(
    ["tickers", coinId], // key
    () => fetchCoinTickers(coinId), // fetcher ??????
    {
      refetchInterval: 10000,
    } // option object
  );
  /* const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InforData>();
  const [price, setPrice] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPrice(priceData);
      setLoading(false);
    })();
  }, [coinId]); */
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <BackBtn isActive={false}>
          <Link to={"/"}>Back</Link>
        </BackBtn>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>RANK:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <Divide>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </Divide>
            <OverviewItem>
              <span>SYMBOL:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <Divide>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </Divide>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersdata?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>TOTAL SUPPLY:</span>
              <span>{tickersdata?.total_supply}</span>
            </OverviewItem>
            <Divide>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </Divide>
            <OverviewItem>
              <span>MAX SUPPLY:</span>
              <span>{tickersdata?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Taps>
            <Tap isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tap>
            <Tap isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tap>
          </Taps>
          <Switch>
            <Route path={`/:coinId/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;

// ???????????? ???????????? temp1, temp2 ??? ??? API ???????????? Object.keys(temp1).join(), Object.values(temp1).map(v => typeof v).join() ?????? ?????? ???????????? ??????????????? ????????????
// Nested Router : Router ?????? ?????? Router
// ?????????????????? ????????? ????????? ??? ??????, ??? ???????????? ?????? ??? ????????? ??????
// ??? 1) ????????? ?????? ??? 2) ?????? or ?????????
// State ?????? ????????? ?????? ??? ????????? URL ??? ????????? ??????
// ???????????? ??? ?????? ??????????????? ????????? ??? ?????? ??????
// URL ?????? ?????? react.js ??? State ????????? ????????? ?????? ???????????????
// ????????? ???????????? URL ??? ??????????????? ???????????? ?????????
// re-render ??? ??? ??? ????????? ??? ?????? ?????? ??? ??????
// react=query is awesome, makes us NO LOADING but it can be get too many queries later
