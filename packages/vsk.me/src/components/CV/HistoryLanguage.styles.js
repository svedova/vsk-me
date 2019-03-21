import styled from "styled-components";
import props from "../../style/props";

export const Lang = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;

  &:last-child {
    margin-bottom: 0;
  }

  .fa {
    color: ${props.colorBlueAlt};
    opacity: 0.5;

    &.fa-star,
    &.fa-star-half-full {
      opacity: 1;
    }
  }
`;

export const Name = styled.div`
  flex: 1 1 auto;
`;

export const Stars = styled.div`
  flex: 0 0 auto;
`;
