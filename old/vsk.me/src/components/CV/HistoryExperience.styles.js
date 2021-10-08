import styled from "styled-components";
import props from "../../style/props";

export const Experience = styled.div`
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const Title = styled.h3`
  font-size: 1.25rem;
`;

export const Period = styled.div`
  color: ${props.colorGray};
`;

export const Body = styled.div`
  margin-top: 0.5rem;
`;
