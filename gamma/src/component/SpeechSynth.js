const SpeechSynth = (props) => {

  const synth = window.speechSynthesis;

  const dictation = new SpeechSynthesisUtterance(props.dictation);

  //selects the voice to use -- use 0 to 21 in voices
  const voices = synth.getVoices();
  console.log(voices);
  dictation.voice = voices[2];

  //speaks the words
  synth.speak(dictation);

  return null;

}

export default SpeechSynth;



