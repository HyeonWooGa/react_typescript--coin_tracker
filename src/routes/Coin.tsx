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
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.span`
  display: block;
`;

const Overview = styled.div`
  margin-top: 30px;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span:first-child {
    font-size: 14px;
    margin-bottom: 5px;
  }
`;

const Divide = styled.div`
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

function Coin() {
  const { coinId } = useParams<RouteParams>(); // hook
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price"); //hook
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersdata } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
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
      <Header>
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
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <Divide>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </Divide>
            <OverviewItem>
              <span>OPEN SOURCE:</span>
              <span>{infoData?.open_source ? "YES" : "NO"}</span>
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
              <Price />
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

// 브라우저 콘솔에서 temp1, temp2 로 각 API 넘겨준뒤 Object.keys(temp1).join(), Object.values(temp1).map(v => typeof v).join() 으로 정보 받아와서 인터페이스 작성해줌
// Nested Router : Router 안에 있는 Router
// 웹사이트에서 텝들을 사용할 때 사용, 이 페이지의 경우 탭 두가지 사용
// 탭 1) 가격의 정보 탭 2) 차트 or 그래픽
// State 에서 컨트롤 하는 게 아니라 URL 로 컨트롤 하고
// 유저들이 각 탭에 다이렉트로 접속할 수 있게 해줌
// URL 변화 없이 react.js 의 State 만으로 구현할 수도 있었겠지만
// 링크를 사용해서 URL 을 바꿈으로써 트리거가 되어서
// re-render 를 할 수 있다는 게 정말 멋진 것 같아
// react=query is awesome, makes us NO LOADING but it can be get too many queries later
