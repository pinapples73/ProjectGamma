import React, {Component} from 'react';
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
      vocalString: "listening",
      paragraphSpeech: true,
      choiceSpeech: true,
      allSpeech: true,
      speechCommand: '',
      paragraphArray: '',
      typedParagraphText: []
    }
    this.story = new Story(storyContent);
    this.synth = window.speechSynthesis;

    this.continueStory = this.continueStory.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.generateCTextForSpeech = this.generateCTextForSpeech.bind(this)
    this.generatePTextForSpeech = this.generatePTextForSpeech.bind(this)
    this.generateStoryDetails = this.generateStoryDetails.bind(this)
    this.handleSpeaking = this.handleSpeaking.bind(this)
    this.typingTimer = this.typingTimer.bind(this)
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

  typingTimer(){
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

      const utterance = new SpeechSynthesisUtterance(stringToSpeak);

      utterance.voice = this.voices[2];


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

  continueStory(){
    this.setState({storyRefresh: !this.state.storyRefresh});
  }

    render() {

      return(
          <div className="grid-layout">
            <p className="item-nav">
              <NavBar/>
            </p>
            <p className="item-paragraph">
                <Paragraph >{this.paragraphText}</Paragraph>
            </p>
              <p className="item-choice">------------------------------------------</p>
              <p className="item-choice">
              <Choices className="item-choice" onClick={this.handleChoice}>{this.story}</Choices>
            </p>
            <p className="item-vocal">
              {this.state.vocalString}
              <SpeechRecogniser handleChoice={this.handleChoice} isSpeaking={this.state.gammaSpeaking} speechCommand={this.choicesArray}/>
            </p>
          </div>
      )
    }

  }

  export default StoryContainer;
