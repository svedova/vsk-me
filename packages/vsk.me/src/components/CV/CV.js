import React, { Fragment, useRef, useEffect } from "react";
import { sticky, unsticky } from "../../helpers/sticky";
import Helmet from "react-helmet";
import MyProfile from "./MyProfile";
import MyContact from "./MyContact";
import HistoryAbout from "./HistoryAbout";
import HistoryExperiences from "./HistoryExperiences";
import HistoryEducation from "./HistoryEducation";
import HistorySkills from "./HistorySkills";
import HistoryLanguages from "./HistoryLanguages";
import * as styles from "./CV.styles";

const { Container, MyDetails, MyHistory, StickContent } = styles;

const CV = () => {
  const stickyRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 516) {
      return;
    }

    sticky(stickyRef.current);
    return () => unsticky(stickyRef.current);
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Curriculum Vitae | Savas Vedova</title>
        <meta
          name={"description"}
          content={"The curriculum vitae of Savas Vedova"}
        />
      </Helmet>
      <Container>
        <MyDetails>
          <StickContent ref={stickyRef}>
            <MyProfile />
            <MyContact />
          </StickContent>
        </MyDetails>
        <MyHistory>
          <HistoryAbout />
          <HistoryExperiences />
          <HistoryEducation />
          <HistorySkills />
          <HistoryLanguages />
        </MyHistory>
      </Container>
    </Fragment>
  );
};

export default CV;
