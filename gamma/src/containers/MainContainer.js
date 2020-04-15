import React, {Component, Fragment} from 'react';
import StoryContainer from "./StoryContainer";
import Intro from "../component/IntroScreen"


class MainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstLoad: true
    }
  }

  continue(){
    this.setState({firstLoad: false})
  }

  render(){
    if(!this.state) return null

    if(this.state.firstLoad === false) {
      return (
          <Fragment>
            <Intro/>
            <button className="button" onClick={this.continue}>LAUNCH GAMMA SYSTEMS</button>
          </Fragment>

      )
    }

    return(
        <Fragment>
          <StoryContainer />
        </Fragment>
    )
  }


}

export default MainContainer;
