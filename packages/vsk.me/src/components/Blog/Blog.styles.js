import styled from "styled-components";

export const Container = styled.div`
  border-radius: 2px;
  width: 100%;
  margin: 0 auto;
  display: flex;

  h1 {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1rem;
    font-weight: bold;
  }
`;

export const Left = styled.div`
  border-radius: 2px;
  background: white;
  flex: 0 0 auto;
  width: 300px;
  padding: 1rem;
  background: white;

  h3 {
    font-weight: bold;
    margin-bottom: 1rem;
  }

  a {
    margin-left: 0.5rem;
    display: inline-block;

    &:hover {
      text-decoration: underline;
    }
  }

  ul,
  li {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  li {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(40, 105, 140, 0.35);

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const Right = styled.div`
  flex: 1 1 auto;
  margin-left: 2rem;
  background: white;
  padding: 1rem;

  h2 {
    font-size: 1.5rem;
  }

  /* The date object */
  h3 {
    font-style: italic;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;

export const ContinueReading = styled.div`
  text-align: right;

  a {
    display: inline-block;
    margin-right: 0.5rem;
  }
`;
