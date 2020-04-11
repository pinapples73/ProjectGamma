import React, {Component, Fragment} from 'react';
import Paragraph from "../component/Paragraph";
import storyContent from "../inkfiles/story";
import Choices from "../component/Choices";
import SpeechSynth from "../component/SpeechSynth";


const Story = require('inkjs').Story;


class StoryContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      storyRefresh: false,
      choiceIndex: -1
    }
    this.continueStory = this.continueStory.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
  }

  componentDidMount(){
    this.story = new Story(storyContent);
    this.setState({storyRefresh: !this.state.storyRefresh});
  }

  handleChoice(choiceIndex){
    choiceIndex = parseInt(choiceIndex);
    this.setState({choiceIndex: choiceIndex})
    this.story.ChooseChoiceIndex(choiceIndex);
    this.continueStory();
  }

  generatePTextForSpeech() {
    let paragraphText = '';

    while (this.story.canContinue) {
      paragraphText = this.story.Continue();
    }
    return paragraphText;
  }

  generateCTextForSpeech(){
    let choiceText = 'select, ';

    this.story.currentChoices.map((choice, index) => choiceText += ", " + (index + 1) + ", " + choice.text + ", ")

    return choiceText;
  }

  handleSpeechEnd(){
    console.log('you have made it to the handle speech end method')
  }


  // handleVoiceInput(voiceCommand){
  //   const choices = this.story.currentChoices.filter((choice,index))
  //
  // }


  continueStory(){
    this.setState({storyRefresh: !this.state.storyRefresh});
  }

    render() {
      if(!this.story){
        return null
      }

      const paragraphText = this.generatePTextForSpeech();
      const choicesText = this.generateCTextForSpeech();
      const fullText = paragraphText + choicesText;

      return(
        <Fragment>
          <Paragraph>{paragraphText}</Paragraph>
          <Choices onClick={this.handleChoice}>{this.story}</Choices>
          <SpeechSynth dictation={fullText}/>
        </Fragment>
      )
    }

  }

  export default StoryContainer;
