import styled from "styled-components";
import props from "../../style/props";

export const marginSmall = "1rem";
export const marginLarge = "2rem";

export const Container = styled.div`
  display: flex;
`;

export const MyHistory = styled.div`
  flex: 1 1 auto;
  margin-left: ${marginLarge};
  padding: ${marginLarge};
  background: white;
  border-radius: 2px;
  background-color: white;
`;

export const Section = styled.section`
  margin-bottom: 4rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionH2 = styled.h2`
  font-size: 1.5rem;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  display: flex;
  border-bottom: 1px solid rgba(40, 105, 140, 0.35);
  color: ${props.colorBlueAlt};

  .fa {
    flex: 0 0 auto;
    color: rgba(40, 105, 140, 0.7);
  }
`;

export const SectionHeaderText = styled.span`
  flex: 1 1 auto;
  text-align: right;
`;

export const StickContent = styled.div`
  &.is-sticky {
    max-width: 300px;
    padding-right: 2rem;
  }
`;

export const MyDetails = styled.div`
  border-radius: 2px;
  background: white;
  flex: 0 0 auto;
  width: 300px;
  padding: ${marginSmall};
`;
