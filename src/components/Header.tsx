import * as React from "react";
import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  children: ReactNode;
};
const Header: FC<Props> = (props: Props) => {
  const { title, children } = props;
  return (
    <HeaderWrapper>
      <HeaderTitle>{title}</HeaderTitle>
      <HeaderControl>{children}</HeaderControl>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  /* position: fixed; */
  align-items: center;
  height: 2rem;
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: space-between;
  line-height: 2rem;
  padding: 0.5rem 1rem;
`;

const HeaderTitle = styled.div`
  font-size: 1.5rem;
`;

const HeaderControl = styled.div`
  align-content: center;
  display: flex;
  height: 2rem;
  justify-content: center;
  & > * {
    margin-left: 0.5rem;
  }
`;

export default Header;
