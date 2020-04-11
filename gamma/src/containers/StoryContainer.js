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
    this.handleChoice = this.handleChoice.bind(this);
  }

  componentDidMount(){
    this.story = new Story(storyContent);
    this.setState({story: this.story});
  }

  handleChoice(choiceIndex){
    choiceIndex = parseInt(choiceIndex);
    this.setState({choiceIndex: choiceIndex})
    this.story.ChooseChoiceIndex(choiceIndex);
    this.continueStory();
  }

  // handleVoiceInput(voiceCommand){
  //   const choices = this.story.currentChoices.filter((choice,index))
  //
  // }

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
          <Paragraph>{paragraphText}</Paragraph>
          <Choices className="choice-text" onClick={this.handleChoice}>{this.story}</Choices>
        </Fragment>
      )
    }

  }

  export default StoryContainer;
