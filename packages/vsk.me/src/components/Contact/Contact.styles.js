import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: white;
  margin: 0 auto;
  max-width: 470px;
  padding: 3rem;
  border-radius: 5px;
`;

export const Desc = styled.div`
  margin-bottom: 1rem;
`;

export const Links = styled.div`
  line-height: 3;
  .fa {
    margin-right: 1rem;
    font-size: 2rem;
    vertical-align: middle;
  }

  .linkedIn .fa {
    color: #0077b5;
  }

  .facebook .fa {
    color: #3b5998;
  }

  .instagram .fa {
    color: #c5c5c5;
  }
`;
