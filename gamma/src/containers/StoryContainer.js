import React, {Component, Fragment} from 'react';
import Paragraph from "../component/Paragraph";
import storyContent from "../inkfiles/story";
import Choices from "../component/Choices";
import SpeechRecogniser from "../component/SpeechRecogniser";
import NavBar from "../component/NavBar";

const Story = require('inkjs').Story;


class StoryContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      storyRefresh: false,
      gammaSpeaking: false,
      paragraphSpeech: true,
      choiceSpeech: true,
      allSpeech: true,
      speechCommand: ''
    }
    this.story = new Story(storyContent);
    this.synth = window.speechSynthesis;

    this.continueStory = this.continueStory.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.generateCTextForSpeech = this.generateCTextForSpeech.bind(this)
    this.generatePTextForSpeech = this.generatePTextForSpeech.bind(this)
    this.generateStoryDetails = this.generateStoryDetails.bind(this)
    this.handleSpeaking = this.handleSpeaking.bind(this)
  }

  componentDidMount(){
    this.generateStoryDetails();
    this.continueStory();
  }

  handleChoice(choiceIndex){
    this.synth.cancel();

    choiceIndex = parseInt(choiceIndex);
    this.story.ChooseChoiceIndex(choiceIndex);

    this.generateStoryDetails();
    this.continueStory();
  }

  generateStoryDetails(){
    this.paragraphText = this.generatePTextForSpeech();
    const choicesText = this.generateCTextForSpeech();
    this.fullText = this.paragraphText + choicesText;

    this.choicesArray = this.generateChoiceArrayForSpeechRecognition();

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

  generateChoiceArrayForSpeechRecognition(){
    let choiceArray = [];
    this.story.currentChoices.map((choice, index) => {
      choiceArray.push({choiceCommand: choice.text, choiceIndex: choice.index})
      return null
    });
    console.log(choiceArray)
    return choiceArray;
  }

  handleSpeaking(stringToSpeak){

    if(this.state.allSpeech) {
      const utterance = new SpeechSynthesisUtterance(stringToSpeak);
      utterance.onstart = () => {
        this.setState({gammaSpeaking: true})
      }
      utterance.onend = () => {
        this.setState({gammaSpeaking: false})
      }

      this.voices = this.synth.getVoices();
      console.log(this.voices)
      utterance.voice = this.voices[2];

      this.synth.speak(utterance);
    }
  }

  handleVoiceInput(voiceCommand){


  }



  continueStory(){
    this.setState({storyRefresh: !this.state.storyRefresh});
  }

    render() {
      // if(!this.story){
      //   return null
      // }

      return(
        <Fragment>
          <NavBar/>
          <Paragraph>{this.paragraphText}</Paragraph>
          <Choices onClick={this.handleChoice}>{this.story}</Choices>
          <SpeechRecogniser handleChoice={this.handleChoice} isSpeaking={this.state.gammaSpeaking} speechCommand={this.choicesArray}/>
        </Fragment>
      )
    }

  }

  export default StoryContainer;
