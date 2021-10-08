import styled from "styled-components";
import { marginSmall, marginLarge } from "./CV.styles";

export const MyContactRow = styled.div`
  margin-bottom: ${marginSmall};

  a {
    color: black;
  }

  .fa {
    width: 1.35rem;
    font-size: 1.5rem;
    color: #c5c5c5;
    margin-right: ${marginLarge};
    text-align: center;
    vertical-align: middle;
  }
`;
