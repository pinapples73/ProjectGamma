const SpeechSynth = (props) => {

  const synth = window.speechSynthesis;

  const dictation = new SpeechSynthesisUtterance(props.dictation);



  //selects the voice to use -- use 0 to 21 in voices
  const voices = synth.getVoices();
  dictation.voice = voices[2];

  //speaks the words
  synth.speak(dictation);

  dictation.onstart = function(event){
    console.log('started talking')
  }

  dictation.onend =  function(event) {
    console.log('stopped talking')
  }

  return null;

}

export default SpeechSynth;



