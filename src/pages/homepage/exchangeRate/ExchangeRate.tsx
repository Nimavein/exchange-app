import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { SectionWrapper } from "../../../components/sectionWrapper/SectionWrapper";
import * as S from "../../../components/formElements/FormElements.styled";
import * as SC from "./ExchangeRate.styled";
import { toast } from "react-toastify";
import { amountConverter } from "../../../helpers/amountConverter";
import { currenciesSlice } from "../../../redux/features/currencies/currenciesSlice";
import { Button, Spin } from "antd";

type ExchangeCurrencyFormDataType = {
  rate: string;
};

export const ExchangeRate = () => {
  const { exchangeRate, isLoading } = useAppSelector(
    (state) => state.currencies
  );

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExchangeCurrencyFormDataType>();
  const onSubmit = (data: ExchangeCurrencyFormDataType) => {
    dispatch(
      currenciesSlice.actions.changeExchangeRate(
        amountConverter(parseFloat(data.rate))
      )
    );
    toast.success(
      `You have successfully set exchange rate to ${amountConverter(
        parseFloat(data.rate)
      )}.`
    );
    reset();
  };

  return (
    <SectionWrapper title="Exchange rate">
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <SC.CurrentExchangeRate>
          <>
            Current exchange rate:{" "}
            {isLoading ? (
              <Spin />
            ) : (
              <>1 EUR = {amountConverter(exchangeRate)} PLN</>
            )}
          </>
        </SC.CurrentExchangeRate>
        <S.Label>
          <S.LabelText>Exchange rate</S.LabelText>
          <S.Input
            type="number"
            step={0.01}
            min={0}
            {...register("rate", {
              required: "Exchange rate is required.",
              validate: {
                isPositive: (value) =>
                  amountConverter(parseFloat(value)) > 0 ||
                  `The amount must be greater than 0.`,
              },
            })}
            name="rate"
            placeholder="Enter exchange rate"
          />
          <S.InputErrorWrapper>
            {errors.rate && (
              <S.InputErrorText>{errors.rate.message}</S.InputErrorText>
            )}
          </S.InputErrorWrapper>
        </S.Label>
        <Button block type="primary" htmlType="submit">
          Set
        </Button>
      </S.Form>
    </SectionWrapper>
  );
};
