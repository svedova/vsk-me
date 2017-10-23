import React, { Component } from "react"
import classes from "./About.scss"
import CloudFlash from "cloudflash.io-client"

export default class About extends Component {
  componentDidMount () {
    CloudFlash.persist()
  }

  render () {
    return (
      <article className={classes.pageContent}>
        <p>
          Hey there.
        </p>
        <p>
          It is tough when it comes to describe yourself. You hit the keystrokes,
          realize that you write crap, and rewrite. Until you are satisfied.
        </p>
        <p>
          Anyways, my name is Savas Vedova. I am from Switzerland. I was born in a small
          town called Bellinzona - which happens to be the capital of Canton Tessin. In the
          middle of mountains, shadowed by three beautiful castles, this place has been home
          for almost 10 years for me. First six years when I was born, and the remaining when I
          returned back from Turkey after I graduated.
        </p>
        <p>
          Speaking about home, I currently live in Zurich. No, it is not the capital of Switzerland.
          But it is the financial capital. A lot happens here for a Swiss city. We have a beautiful lake,
          surrounded by hills, and a beautiful old town. It is a very wealthy city.
        </p>
        <p>
          Before coming back to Switzerland, I lived in Turkey for 17 years. Therefore I consider myself
          bicultural - this also explains why I speak Italian and Turkish very fluently. All my childhood and
          adolescence passed in Izmir which is a very beautiful city. I had to move to Istanbul for the
          university - The Bosphorus University. It has a fantastic view and it is considered one of the
          best universities in Turkey. During my studies, it had around 12 thousand students. Almost as much
          as Bellinzona's population. This wonderful university introduced a wonderful person to me, my
          soulmate, my wife. We knew each other from the university, but I never had the chance to meet her
          personally. Maybe I was too shy. It had to take 4 years after the graduation for me to message her -
          and that is how it started.
        </p>
        <p>
          I am a fullstack developer, although I studied political science and international relations. Programming
          is my passion since I am 12. Currently, I work as a frontend developer at
          <a href="https://www.tutti.ch">tutti.ch</a>. We are in the process of migrating the old legacy code
          to React. I stepped in exactly on the right time, as I love single page applications.
        </p>
        <p>
          I realized that I could talk (write in this case) for hours as apparently I have a lot to tell. Maybe
          that is why I will start a blog under this domain. But for now, I will keep this page as short as possible.
        </p>
        <p>
          If you have any further questions, reach me out from social media channels. I am almost always available -
          except during sleep. Stay tuned.
        </p>
      </article>
    )
  }
}
