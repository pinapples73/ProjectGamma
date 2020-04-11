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
      story: null,
      choiceIndex: -1
    }
    this.continueStory = this.continueStory.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.generatePTextForSpeech = this.generatePTextForSpeech.bind(this);
    this.generateCTextForSpeech = this.generateCTextForSpeech.bind(this);
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
  //
  // }

  generatePTextForSpeech(){
    let paragraphText = ''

    while(this.story.canContinue) {
      paragraphText = this.story.Continue();
    }
    return paragraphText;
  }

  generateCTextForSpeech(){
    let choicesText = ', Select, '

    this.story.currentChoices.map((choice, index) => {
      choicesText += ", " + (index + 1) + ", " + choice.text + ", "
    })
    return choicesText;
  }

  //loop through story
  continueStory(){
    this.setState({story: this.story});
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
          <Choices paraText={paragraphText} onClick={this.handleChoice}>{this.story}</Choices>
          <SpeechSynth dictation={fullText}/>
        </Fragment>
      )
    }

  }

  export default StoryContainer;
