import { Card } from "antd";
import { HTMLAttributes } from "react";
import * as S from "./SectionWrapper.styled";

type SectionWrapperProps = {
  title: string;
};

export const SectionWrapper = ({
  title,
  children,
}: SectionWrapperProps & HTMLAttributes<HTMLDivElement>) => (
  <Card>
    <S.Title>{title}</S.Title>
    {children}
  </Card>
);
