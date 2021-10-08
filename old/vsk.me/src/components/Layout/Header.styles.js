import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  height: 3.5rem;
  padding: 0 1rem;
  color: white;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 1024px;

  a {
    display: inline-block;
    font-size: 1.5rem;
    color: #f9f9f9;
    opacity: 0.4;
    transition: all 0.25s ease-in;

    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }

    &.fa.fa-times {
      margin: 0;
    }

    &.active {
      font-weight: bold;
      color: white;
      opacity: 0.8;
    }

    @media (max-width: 516px) {
      font-size: 1rem;
      margin: 0;
    }
  }

  .variant-2 & a {
    color: black;
  }

  @media (max-width: 516px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  @media print {
    & {
      display: none;
    }
  }
`;
