const SpeechSynth = (props) => {

  const synth = window.speechSynthesis;

  if(props.paraText.search('\n')) {

  }

  const paragraphDictation = new SpeechSynthesisUtterance(props.paraText);

  synth.speak(paragraphDictation);

  return null;

}

export default SpeechSynth;
