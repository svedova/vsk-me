import { createGlobalStyle } from "styled-components";
import reset from "./reset";
import bg from "../images/bg-alt.jpg";
import props from "./props";

export default createGlobalStyle`
  ${reset};

  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
  }

  html, body {
    font-family: 'Quicksand', sans-serif;
    font-weight: 400;
    font-size: 15px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 300
  }

  h1 {
    font-size: 3rem;
  }

  a {
    text-decoration: none;
    color: ${props.colorBlueAlt};
  }

  i, em {
    font-style: italic;
  }

  strong, b, .bold {
    font-weight: bold;
  }

  ul {
    padding-left: 40px;
    margin-top: 20px;
    margin-bottom: 20px;

    li {
      display: list-item;
      list-style: disc;
      margin-bottom: 5px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    li {
      li {
        list-style: square;
      }
    }
  }

  body {
    &:before {
      z-index: -1;
      content: '';
      filter: blur(4px);
      // background: url('https://newevolutiondesigns.com/images/freebies/city-wallpaper-18.jpg') no-repeat center center fixed;
      background: url(${bg}) no-repeat center center fixed;
      background-size: cover;
      display: block;
      left: -5px;
      right: -5px;
      top: -5px;
      bottom: -5px;
      position: fixed;
      transform: scale(1.1);
    }
  }

  @media print {
    body:before {
      background: white;
    }
  }
`;
