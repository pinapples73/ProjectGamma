import React, {Component} from 'react';


const SpeechSynthesis = window.SpeechSynthesis;
const recognition = new SpeechSynthesis();

let voices = [];


class SpeechSynth extends Component {

  constructor() {
    super()
    this.state = {
      words: "Hi There you dancing bear."
    }
  }

  speak(){
    if (SpeechSynthesis.speaking) {
      console.error('speechSynthesis.speaking');
      return;
    }
    if (this.state.words !== '') {
      let utterThis = new SpeechSynthesisUtterance(this.state.words);
      utterThis.onend = function (event) {
      console.log('SpeechSynthesisUtterance.onend');
      }
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');

    }
    SpeechSynthesis.speak(utterThis);
  }


  render() {

    return(
      <p>I am speaking</p>
    )
  }

  componentDidMount(){
    speak();
  }

export default SpeechSynth;
