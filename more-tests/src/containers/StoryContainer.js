import React, {Component, Fragment} from 'react';
import Paragraph from "../component/Paragraph";
import storyContent from "../inkfiles/story";
import Choices from "../component/Choices";

const Story = require('inkjs').Story;



class StoryContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      story: null,
      choiceIndex: -1
    }
    this.continueStory = this.continueStory.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.story = new Story(storyContent);
    this.setState({story: this.story});
  }

  handleClick(choiceIndex){
    choiceIndex = parseInt(choiceIndex);
    this.setState({choiceIndex: choiceIndex})
    this.story.ChooseChoiceIndex(choiceIndex);
    this.continueStory();
  }

  //loop through story
  continueStory(){
    this.setState({story: this.story});
  }

    render() {
      if(!this.story){
        return null
      }

      let paragraphText = ''

      while(this.story.canContinue) {
        paragraphText = this.story.Continue();
      }

      return(
        <Fragment>
          <Paragraph className="paragraph-text" >{paragraphText}</Paragraph>
          <Choices className="choice-text" onClick={this.handleClick}>{this.story}</Choices>
        </Fragment>
      )
    }

  }

  export default StoryContainer;
