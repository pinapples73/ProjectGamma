const SpeechSynth = (props) => {

  const synth = window.speechSynthesis;

  const dictation = new SpeechSynthesisUtterance(props.dictation);

  synth.speak(dictation);

  return null;

}

export default SpeechSynth;
