import styled from "styled-components";
import props from "../../style/props";

export const SkillBar = styled.div`
  border-radius: 1rem;
  border: 1px solid ${props.colorBlueAlt};
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

export const SkillBarBG = styled.div`
  padding: 0.2rem 1rem;
  background-color: ${props.colorBlueAlt};
  font-size: 0.9rem;
  color: white;
  width: ${p => p.width};
`;
