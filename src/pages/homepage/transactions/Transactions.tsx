import { Button, Table } from "antd";
import * as S from "./Transactions.styled";
import { SectionWrapper } from "../../../components/sectionWrapper/SectionWrapper";
import { amountConverter } from "../../../helpers/amountConverter";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import dayjs from "dayjs";
import {
  transactionsSlice,
  TransactionType,
} from "../../../redux/features/transactions/transactionsSlice";

export const Transactions = () => {
  const transactions = useAppSelector((state) => state.transactions);
  const { exchangeRate } = useAppSelector((state) => state.currencies);
  const dispatch = useAppDispatch();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: TransactionType, b: TransactionType) =>
        a.name.localeCompare(b.name),
    },
    {
      title: "EUR amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a: TransactionType, b: TransactionType) => a.amount - b.amount,
    },
    {
      title: "PLN amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a: TransactionType, b: TransactionType) => a.amount - b.amount,
      render: (amount: number) => amountConverter(amount * exchangeRate),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a: TransactionType, b: TransactionType) =>
        a.createdAt - b.createdAt,
      render: (createdAt: number) =>
        dayjs.unix(createdAt).format("DD/MM/YYYY H:mm A "),
    },
    {
      title: "Action",
      key: "action",
      render: (record: TransactionType) => (
        <Button
          type="primary"
          block
          danger
          onClick={() =>
            dispatch(transactionsSlice.actions.deleteTransaction(record.id))
          }
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <SectionWrapper title="Operations">
      <Table
        style={{ overflowX: "auto" }}
        bordered
        pagination={{ pageSize: 5, hideOnSinglePage: true }}
        columns={columns}
        dataSource={transactions}
        size="middle"
        rowKey="id"
        footer={() => (
          <S.TableFooter>
            Total: {transactions.reduce((a, b) => a + b.amount, 0)} EUR
          </S.TableFooter>
        )}
      />
    </SectionWrapper>
  );
};
