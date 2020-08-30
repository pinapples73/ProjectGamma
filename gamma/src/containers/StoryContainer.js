import React, {Component} from 'react';
import Paragraph from "../components/Paragraph";
import storyContent from "../inkfiles/story";
import Choices from "../components/Choices";
import SpeechRecogniser from "../components/SpeechRecogniser";
import NavBar from "../components/NavBar";
import VoiceSelect from "../components/VoiceSelect";
import WeatherContainer from "./WeatherContainer";

const Story = require('inkjs').Story;


class StoryContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      storyRefresh: false,
      gammaSpeaking: false,
      vocalString: "listening",
      allSpeech: true,
      speechCommand: '',
      selectedVoice: 1

    }
    this.story = new Story(storyContent);
    this.synth = window.speechSynthesis;

    // this.selectedVoice = 1;
    this.firstLoad = false;

    this.continueStory = this.continueStory.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.generateCTextForSpeech = this.generateCTextForSpeech.bind(this)
    this.generatePTextForSpeech = this.generatePTextForSpeech.bind(this)
    this.generateStoryDetails = this.generateStoryDetails.bind(this)
    this.handleSpeaking = this.handleSpeaking.bind(this)
    this.changeVoice = this.changeVoice.bind(this)
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
    this.story.currentChoices.map((choice) => {
      choiceArray.push({choiceCommand: choice.text, choiceIndex: choice.index})
      return null
    });
    console.log(choiceArray)
    return choiceArray;
  }

  handleSpeaking(stringToSpeak){

    if(this.state.allSpeech) {

      this.voices = this.synth.getVoices();
      console.log(this.voices)
      const utterance = new SpeechSynthesisUtterance(stringToSpeak);

      utterance.voice = this.voices[this.state.selectedVoice];


      utterance.onstart = () => {
        this.setState({gammaSpeaking: true})
        this.setState({vocalString:"speaking"})
      }
      utterance.onend = () => {
        this.setState({gammaSpeaking: false})
        this.setState({vocalString:"listening"})
      }
      this.synth.speak(utterance);
    }
  }

  changeVoice(voiceIndex) {
    this.setState({selectedVoice: voiceIndex})
  }

  continueStory(){
    this.setState({storyRefresh: !this.state.storyRefresh});
  }

    render() {

      return(
          <div className="grid-layout">
            <div className="item-weather">
              <WeatherContainer />
            </div>
            <div className="item-nav">
              <NavBar/>
            </div>
            <div className="item-menu">
              <VoiceSelect voiceArray={this.voices} currentVoice={this.state.selectedVoice} onClick={this.changeVoice}/>
            </div>
            <div className="item-paragraph">
              <Paragraph >{this.paragraphText}</Paragraph>
            </div>
            <div className="item-choice">
              <p >------------------------------------------</p>
              <Choices className="item-choice" onClick={this.handleChoice}>{this.story}</Choices>
            </div>
            <div className="item-vocal">
              {this.state.vocalString}
              <SpeechRecogniser handleChoice={this.handleChoice} isSpeaking={this.state.gammaSpeaking} speechCommand={this.choicesArray}/>
            </div>
          </div>
      )
    }

  }

  export default StoryContainer;
