import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    circulating_supply: 19063775,
    total_supply: 19063781,
    max_supply: 21000000,
    beta_value: 0.944663,
    first_data_at: "2010-07-17T00:00:00Z",
    last_updated: "2022-06-10T13:15:02Z",
    quotes: {
      USD: {
        price: 29716.60413856088,
        volume_24h: 28097465000.67331,
        volume_24h_change_24h: 19.32,
        market_cap: 566510655062,
        market_cap_change_24h: -1.42,
        percent_change_15m: -0.1,
        percent_change_30m: -0.26,
        percent_change_1h: -1.15,
        percent_change_6h: -1.24,
        percent_change_12h: -0.72,
        percent_change_24h: -1.43,
        percent_change_7d: 0.1,
        percent_change_30d: 4.89,
        percent_change_1y: -20.37,
        ath_price: 68692.137036932,
        ath_date: "2021-11-10T16:51:15Z",
        percent_from_price_ath: -56.74,
      },
    },
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    circulating_supply: 121119993,
    total_supply: 121120032,
    max_supply: 0,
    beta_value: 1.12459,
    first_data_at: "2015-08-07T00:00:00Z",
    last_updated: "2022-06-10T13:15:02Z",
    quotes: {
      USD: {
        price: 1735.5530892689335,
        volume_24h: 14699204696.518105,
        volume_24h_change_24h: 7.29,
        market_cap: 210210178023,
        market_cap_change_24h: -3.18,
        percent_change_15m: -0.05,
        percent_change_30m: -0.77,
        percent_change_1h: -2.26,
        percent_change_6h: -3.03,
        percent_change_12h: -2.52,
        percent_change_24h: -3.19,
        percent_change_7d: -1.9,
        percent_change_30d: -10.95,
        percent_change_1y: -29.49,
        ath_price: 4864.1131966142,
        ath_date: "2021-11-10T16:06:16Z",
        percent_from_price_ath: -64.32,
      },
    },
  },
  {
    id: "usdt-tether",
    name: "Tether",
    symbol: "USDT",
    rank: 3,
    circulating_supply: 72497481449,
    total_supply: 72497481449,
    max_supply: 0,
    beta_value: -0.00128943,
    first_data_at: "2015-02-25T00:00:00Z",
    last_updated: "2022-06-10T13:15:02Z",
    quotes: {
      USD: {
        price: 1.00277389651113,
        volume_24h: 46143698528.05993,
        volume_24h_change_24h: 12.96,
        market_cap: 72698581960,
        market_cap_change_24h: 0.27,
        percent_change_15m: 0.03,
        percent_change_30m: 0.13,
        percent_change_1h: 0.32,
        percent_change_6h: 0.21,
        percent_change_12h: 0.21,
        percent_change_24h: 0.18,
        percent_change_7d: 0.19,
        percent_change_30d: 0.76,
        percent_change_1y: 0.07,
        ath_price: 1.21549,
        ath_date: "2015-02-25T17:04:00Z",
        percent_from_price_ath: -17.5,
      },
    },
  },
];

function Coins() {
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      <CoinsList>
        {coins.map((coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
          </Coin>
        ))}
      </CoinsList>
    </Container>
  );
}

export default Coins;

// a 태그를 사용하면 페이지가 새로고침 되기 때문에 Link 컴포넌트 사용
// but CSS 에서 Link 컴포넌트를 a 로 명칭한 이유는 Link 가 결국 a 로 바뀌고
// react-router-dom 이 우리 대신에 설정을 도와줄 특별한 event listner 들이 있기 때문
