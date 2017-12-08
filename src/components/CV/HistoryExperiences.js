import React, { PureComponent } from "react"
import SectionHeader from "./SectionHeader"
import SectionText from "./SectionText"
import Experience from "./HistoryExperience"
import classes from "./CV.scss"

export default class HistoryExperiences extends PureComponent {
  renderTutti() {
    return (
      <Experience title="Tutti.ch" period="2017 July">
        <span>
          I am now working full time for <a href="https://tutti.ch">Tutti.ch</a> as a frontend developer.
          The website is one of the most visited websites in Switzerland with more than&nbsp;
          <b>15 millions</b> monthly page views. In only 5 months I've accomplished the following tasks:
          <ul className={classes.sectionList}>
            <li className={classes.sectionListItem}>
              Increased test coverage from 0% to 44%.
            </li>
            <li className={classes.sectionListItem}>
              Rewrote the whole routing of the frontend (migrate from React Router v2 to v4)
            </li>
            <li className={classes.sectionListItem}>
              Migrated the remaining legacy code to React.
            </li>
            <li className={classes.sectionListItem}>
              Led the project to server side render the whole website (it is right now in the process of being
              tested).
            </li>
          </ul>
        </span>
      </Experience>
    )
  }

  renderCorpax() {
    return (
      <Experience title="Corpax" period="2015 October - 2017 June">
        <span>
          Corpax is a single page team collaboration and communication tool of which I am the idea owner.
          During the project, as a co-founder:
        </span>
        <ul className={classes.sectionList}>
          <li className={classes.sectionListItem}>
            I helped to prepare the business plan which in return
            allowed us to get a <br/><b>CHF 300'000</b> grant from CTI.
          </li>
          <li className={classes.sectionListItem}>
            Pitched the project in St. Gallen's Start Summit
          </li>
          <li className={classes.sectionListItem}>
            Developed the whole application using the following technologies:
            <ul className={classes.sectionList}>
              <li className={classes.sectionListItem}>ES6 (Vue.js, Webpack, Babel, Karma, Jasmine)</li>
              <li className={classes.sectionListItem}>Node.js</li>
              <li className={classes.sectionListItem}>Php</li>
              <li className={classes.sectionListItem}>PostgreSQL</li>
              <li className={classes.sectionListItem}>AWS (EC2, RDS, S3)</li>
            </ul>
          </li>
          <li className={classes.sectionListItem}>
            Also collaborated closely with <b>SUPSI</b> using an agile development methodology
            in a team of 5 people, to build a chat bot.
          </li>
        </ul>
      </Experience>
    )
  }

  renderRegioPress() {
    return (
      <Experience title="RegioPress SA" period="2013 September - 2015 October">
        <span>
          During my employment in this company, I developed the official website of&nbsp;
          <a href="http://laregione.ch" target="_blank">laRegione</a>, which is
          one of the <b>most read</b> newspapers in Ticino, Switzerland.
        </span>
        <span>
          I also created several Wordpress and Drupal websites for an
          agency that we used to work together. Some of the websites are:
        </span>
        <ul className={classes.sectionList}>
          <li className={classes.sectionListItem}>
            <a href="https://www.laregione.ch/" target="_blank">laRegione.ch</a>
          </li>
          <li className={classes.sectionListItem}>
            <a href="http://www.casacosima.ch" target="_blank">casacosima.ch</a>
          </li>
          <li className={classes.sectionListItem}>
            <a href="http://www.commercianti-bellinzona.ch/" target="_blank">commercianti-bellinzona.ch</a>
          </li>
          <li className={classes.sectionListItem}>
            <a href="http://masserialabarca.ch/" target="_blank">masserialabarca.ch</a>
          </li>
          <li className={classes.sectionListItem}>
            <a href="http://www.studiocresto.ch/" target="_blank">studiocresto.ch</a>
          </li>
        </ul>
      </Experience>
    )
  }

  renderMarketKeyfi() {
    return (
      <Experience title="Marketkeyfi.com" period="2010 April - 2012 May">
        <span>
          Using C#, me and another developer, developed this tool which is an online platform for
          shopping from the closest grocery stores in your nearby. You could order from more than
          100 groceries in Istanbul. It was my first startup, unfortunately it is no longer online.
          I was still studying at the same time.
        </span>
      </Experience>
    )
  }

  render() {
    return (
      <div className={classes.section}>
        <SectionHeader fa="fa-briefcase">
          Work experiences
        </SectionHeader>
        <SectionText>
          {this.renderTutti()}
          {this.renderCorpax()}
          {this.renderRegioPress()}
          {this.renderMarketKeyfi()}
        </SectionText>
      </div>
    )
  }
}