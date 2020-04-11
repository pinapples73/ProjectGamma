import React, {Component, Fragment} from 'react';
import Paragraph from "../component/Paragraph";
import storyContent from "../inkfiles/story";
import Choices from "../component/Choices";

const Story = require('inkjs').Story;


class StoryContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      storyRefresh: false,
      choiceIndex: -1,
      gammaSpeaking: false
    }
    this.story = new Story(storyContent);
    this.synth = window.speechSynthesis;

    this.continueStory = this.continueStory.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.generateCTextForSpeech = this.generateCTextForSpeech.bind(this)
    this.generatePTextForSpeech = this.generatePTextForSpeech.bind(this)
  }

  componentDidMount(){
    this.moveStoryToNextBranch();

    this.continueStory();
  }

  handleChoice(choiceIndex){
    this.synth.cancel();

    choiceIndex = parseInt(choiceIndex);
    this.story.ChooseChoiceIndex(choiceIndex);

    this.moveStoryToNextBranch();

    this.continueStory();
  }

  moveStoryToNextBranch(){
    this.paragraphText = this.generatePTextForSpeech();
    const choicesText = this.generateCTextForSpeech();
    this.fullText = this.paragraphText + choicesText;

    //console.log(fullText)
    this.handleSpeaking(this.fullText);
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

  handleSpeaking(stringToSpeak){

    console.log(stringToSpeak);
    const utterance = new SpeechSynthesisUtterance(stringToSpeak);

    this.voices = this.synth.getVoices();
    utterance.voice = this.voices[2];

    this.synth.speak(utterance);
    this.setState({gammaSpeaking: true});
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

      // const paragraphText = this.generatePTextForSpeech();
      // const choicesText = this.generateCTextForSpeech();
      // const fullText = paragraphText + choicesText;
      //
      // //console.log(fullText)
      // this.handleSpeaking(fullText);

      return(
        <Fragment>
          <Paragraph>{this.paragraphText}</Paragraph>
          <Choices onClick={this.handleChoice}>{this.story}</Choices>
        </Fragment>
      )
    }

  }

  export default StoryContainer;
