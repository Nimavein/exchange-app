import { ExchangeCurrency } from "./exchangeCurrency/ExchangeCurrency";
import { Transactions } from "./transactions/Transactions";
import * as S from "./Homepage.styled";
import { ExchangeRate } from "./exchangeRate/ExchangeRate";
import { BiggestTransaction } from "./biggestTransaction/BiggestTransaction";

export const Homepage = () => {
  return (
    <S.HomepageWrapper>
      <ExchangeRate />
      <ExchangeCurrency />
      <Transactions />
      <BiggestTransaction />
    </S.HomepageWrapper>
  );
};
