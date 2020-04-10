import React, {Component} from 'react';


const SpeechSynthesis = window.SpeechSynthesis;
const recognition = new SpeechRecognition();

let voices = [];


class SpeechSynth extends Component {

  constructor() {
    super()
    this.state = {
      speak: "Hi There you dancing bear."
    }
  }

  function speak(){
    if (SpeechSynthesis.speaking) {
      console.error('speechSynthesis.speaking');
      return;
    }
    if (speak !== '') {
      let utterThis = new SpeechSynthesisUtterance(speak);
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
    speak();
    return(
      <p>I am speaking</p>
    )
  }

}

export default SpeechSynth;
