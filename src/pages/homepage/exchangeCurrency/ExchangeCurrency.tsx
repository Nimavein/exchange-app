import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { SectionWrapper } from "../../../components/sectionWrapper/SectionWrapper";
import * as S from "../../../components/formElements/FormElements.styled";
import * as SC from "./ExchangeCurrency.styled";
import { v4 as uuid } from "uuid";
import { transactionsSlice } from "../../../redux/features/transactions/transactionsSlice";
import { ArrowRightOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { amountConverter } from "../../../helpers/amountConverter";
import { Button } from "antd";

type ExchangeCurrencyFormDataType = {
  name: string;
  amount: string;
};

export const ExchangeCurrency = () => {
  const { exchangeRate } = useAppSelector((state) => state.currencies);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<ExchangeCurrencyFormDataType>();
  const onSubmit = (data: ExchangeCurrencyFormDataType) => {
    dispatch(
      transactionsSlice.actions.addTransaction({
        name: data.name,
        id: uuid(),
        amount: amountConverter(parseFloat(data.amount)),
        createdAt: Date.now() / 1000,
      })
    );
    toast.success(
      `Successfully exchanged ${data.amount} EUR
      to ${amountConverter(parseFloat(data.amount) * exchangeRate)} PLN.`
    );
    reset();
  };
  const watchFields = watch();

  return (
    <SectionWrapper title="Exchange currency">
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Label>
          <S.LabelText>Transaction name</S.LabelText>
          <S.Input
            {...register("name", {
              required: "Transaction name is required.",
            })}
            name="name"
            placeholder="Enter transaction name"
          />
          <S.InputErrorWrapper>
            {errors.name && (
              <S.InputErrorText>{errors.name.message}</S.InputErrorText>
            )}
          </S.InputErrorWrapper>
        </S.Label>
        <S.Label>
          <S.LabelText>Amount</S.LabelText>
          <S.Input
            type="number"
            step={0.01}
            min={0}
            {...register("amount", {
              required: "Amount is required.",
              validate: {
                isPositive: (value) =>
                  amountConverter(parseFloat(value)) > 0 ||
                  `The amount must be greater than 0.`,
              },
            })}
            name="amount"
            placeholder="Enter amount"
          />
          <S.InputErrorWrapper>
            {errors.amount && (
              <S.InputErrorText>{errors.amount.message}</S.InputErrorText>
            )}
          </S.InputErrorWrapper>
        </S.Label>
        <SC.ExchangeInfoWrapper>
          <SC.ExchangeWrapper>
            <SC.ExchangeAmount>
              {amountConverter(parseFloat(watchFields.amount)) || 0}
            </SC.ExchangeAmount>
            <SC.ExchangeCurrency>EUR</SC.ExchangeCurrency>
          </SC.ExchangeWrapper>
          <ArrowRightOutlined />
          <SC.ReceiveWrapper>
            <SC.ReceiveAmount>
              {amountConverter(parseFloat(watchFields.amount) * exchangeRate) ||
                0}
            </SC.ReceiveAmount>
            <SC.ReceiveCurrency>PLN</SC.ReceiveCurrency>
          </SC.ReceiveWrapper>
        </SC.ExchangeInfoWrapper>
        <Button block type="primary" htmlType="submit">
          Exchange
        </Button>
      </S.Form>
    </SectionWrapper>
  );
};
