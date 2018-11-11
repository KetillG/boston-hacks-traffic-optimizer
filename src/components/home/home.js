import React, { Component } from 'react';
import { css } from 'glamor';
import './home.css';

const baseurl = process.env.REACT_APP_SUB_URL;

class Home extends Component {
  render() {
    const home__image__Css = css({
      backgroundImage: `url(${baseurl}/images/traffic-blurred.jpg)`,
    });

    return (
      <div className="home">
        <div {...home__image__Css} className="home__image">
          <div className="home__image--text">PROJECT NAME HERE</div>
        </div>
        <div className="home__detail content-contained">
          <div>
            Optimize your day with *name here*. *name here* gives you overview
            of the estimated traffic and travel time from your place of home to
            your workplace.
          </div>
          <div>
            Sleep longer with *name here*. Sign up for our smart alarm system
            that monitors the traffic and wakes you up as late as possible while
            not being late for work.
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
