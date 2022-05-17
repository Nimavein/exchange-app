import dayjs from "dayjs";
import { SectionWrapper } from "../../../components/sectionWrapper/SectionWrapper";
import { amountConverter } from "../../../helpers/amountConverter";
import { useAppSelector } from "../../../redux/hooks";
import * as S from "./BiggestTransaction.styled";

export const BiggestTransaction = () => {
  const transactions = useAppSelector((state) => state.transactions);
  const { exchangeRate } = useAppSelector((state) => state.currencies);
  const biggestTransaction =
    transactions.length > 0
      ? transactions.reduce((prev, current) =>
          prev.amount > current.amount ? prev : current
        )
      : undefined;

  return (
    <SectionWrapper title="Highest Transaction">
      {biggestTransaction ? (
        <S.TransactionDetails>
          <S.TransactionDetail>
            <S.DetailName>Name: </S.DetailName>
            <S.DetailAmount>{biggestTransaction.name}</S.DetailAmount>
          </S.TransactionDetail>
          <S.TransactionDetail>
            <S.DetailName>EUR: </S.DetailName>
            <S.DetailAmount>{biggestTransaction.amount}</S.DetailAmount>
          </S.TransactionDetail>
          <S.TransactionDetail>
            <S.DetailName>PLN: </S.DetailName>
            <S.DetailAmount>
              {amountConverter(biggestTransaction.amount * exchangeRate)}
            </S.DetailAmount>
          </S.TransactionDetail>
          <S.TransactionDetail>
            <S.DetailName>Created at: </S.DetailName>
            <S.DetailAmount>
              {dayjs
                .unix(biggestTransaction.createdAt)
                .format("DD/MM/YYYY H:mm A ")}
            </S.DetailAmount>
          </S.TransactionDetail>
        </S.TransactionDetails>
      ) : (
        "There are no added transactions."
      )}
    </SectionWrapper>
  );
};
