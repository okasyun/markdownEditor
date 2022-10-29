import * as React from "react";
import { ReactNode, FC } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  background-color: dodgerblue;
  border: none;
  border-radius: 15px;
  box-shadow: none;
  color: white;
  font-size: 1rem;
  height: 2rem;
  min-width: 5rem;
  padding: 0 1rem;

  &.cancel {
    background: white;
    border: 1px solid gray;
    color: gray;
  }
`;

type Props = {
  cancel?: boolean;
  children: ReactNode;
  onClick: () => void;
};

const Button: FC<Props> = (props: Props) => {
  const { cancel, children, onClick } = props;

  return (
    //  cancelが存在したらcancelクラスをつける
    <StyledButton onClick={onClick} className={cancel ? "cancel" : ""}>
      {children}
    </StyledButton>
  );
};

export default Button;
