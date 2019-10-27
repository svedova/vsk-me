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
    display: flex;

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
    color: #a1a1a1;
    margin-top: 0.5rem;
    margin-bottom: 2rem;
  }
`;

export const Content = styled.div`
  line-height: 1.5;

  img {
    display: block;
    width: 100%;
  }

  p,
  h2,
  code {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: none;
    }
  }

  code {
    font-family: Monospace;
    padding: 0.5rem;
    background-color: black;
    border-radius: 2px;
    width: 100%;
    color: white;
    display: block;
  }

  ul,
  ol {
    padding-left: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  ul li {
    list-style-type: ;
  }

  ol li {
    list-style-type: decimal;
  }

  li {
    margin-left: 1rem;
  }

  .hljs-string {
    color: #7ec699;
  }

  .hljs-keyword {
    color: #cc99cd;
  }

  .hljs-attr {
    color: #f08d49;
  }

  .hljs-tag {
    color: greenyellow;
  }
`;

export const ContinueReading = styled.div`
  margin-top: 2rem;
  text-align: right;

  a {
    display: inline-block;
    margin-right: 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;
