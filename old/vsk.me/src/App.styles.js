import styled from "styled-components";

export const Page = styled.div`
  max-width: 1024px;
  margin: 3rem auto;
  line-height: 1.3;
  display: flex;

  @media (max-width: 516px) {
    margin-top: 1rem;
    padding: 0 1rem;
  }
`;
