import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  position: fixed;
  top: 10rem;
  left: 50%;
  margin-left: 20rem;
  width: 40rem;
  border-radius: 1rem;
`;

export const HireMe = styled.h1`
  position: fixed;
  bottom: 3rem;
  left: 50%;
  transition: all 0.5s ease-out 0.5s;
  transform: translate(-50%, calc(100% + 3rem));

  &.trans {
    transform: translate(-50%, 0);
  }
`;

export const HireMeLink = styled(Link)`
  display: block;
  padding: 1rem 4rem;
  border-bottom: 1px solid white;
  border-radius: 1px;
  line-height: 1;
  width: 30rem;
  text-align: center;
  color: white;
  opacity: 0.4;
  transition: all 0.25s ease-in;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;
