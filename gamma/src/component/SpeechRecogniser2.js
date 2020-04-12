import React, { Fragment } from "react"

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;


const SpeechRecogniser = (props) => {

  let speechResult = [];
  let speechCommand = props.speechCommand;
  let outputMessage = '';
  let chosenChoiceIndex = -1;

  const standardPhrases = ['stop voice']

  const recogniser = new SpeechRecognition()

  recogniser.continuous = true
  recogniser.interimResults = false
  recogniser.lang = 'en-Uk'

  //check if Gamma is current speaking
  if(props.isSpeaking){
    //if yes stop Gamma from listening and log out details - then return out of function
    console.log('Gamma is speaking', props.isSpeaking)
    recogniser.stop()
    console.log('Gamma has stopped listening')
    return null
  } else {
    console.log('Gamma is speaking', props.isSpeaking)

    //start listening for voice commands
    recogniser.start()
    console.log('Gamma has started listening')

    //check for speech results
    recogniser.onresult = function(event){
      console.log('Gamma has produced a result')

      speechResult = event.results[0][0].transcript.toLowerCase()
      console.log(event.results)
      if(speechResult === standardPhrases[0]){
        recogniser.stop()
        console.log('You terminated voice commands')
      }

      //loop over choices array and check if command matches an option

      chosenChoiceIndex = speechCommand.map((choice, index) => {

        console.log('comparing:' + speechResult + ' with ' + choice.choiceCommand + " or " + index + 1 )

        //check if result is equal to the index number of choice or the choice text
        if(speechResult === choice.choiceCommand.toLowerCase() || speechResult === (index + 1).toString()) {
          console.log('matched speech result with choice text', index + 1, choice.choiceCommand)
          console.log('selected choice index is:' , choice.choiceIndex)
          recogniser.stop()
          console.log('Gamma has stopped listening')
          return choice.choiceIndex
        }

        //no match made
        // todo ----------> deal with restarting recogniser when no match made
        console.log('no match made')
        return -1
      })

      outputMessage = "User input detected:" + speechResult
      console.log(outputMessage)
      return outputMessage

    }

    //check if Gamma gets bored waiting
    recogniser.onend = function(event){
      console.log('Gamma has stopped listening due to inactivity')
    }

    return null

  }

}

export default SpeechRecogniser

