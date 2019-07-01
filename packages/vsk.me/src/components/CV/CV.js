import React, { Fragment } from "react";
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
          <StickContent>
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
