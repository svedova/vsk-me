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

export const Hello = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 1rem;
  line-height: 1.5;
  font-size: 1.5rem;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;

  a {
    color: #ff3a83;
  }

  @media (max-width: 516px) {
    font-size: 1.25rem;
    left: 1rem;
    right: 1rem;
    transform: translateY(-50%);
    margin-top: -3rem;
  }
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
