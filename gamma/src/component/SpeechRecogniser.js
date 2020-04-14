import React from "react"

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const SpeechRecogniser = (props) => {

  let speechResult = [];
  let speechCommand = props.speechCommand;
  let outputMessage = '';
  let chosenChoiceIndex = -1;

  const standardPhrases = ['stop voice']

  const recogniser = new SpeechRecognition()

  recogniser.continuous = true
  recogniser.interimResults = false
  recogniser.lang = 'en-US'

  //------------------------check if Gamma is currently speaking and kick off listening if not -------------------------

  if(props.isSpeaking){
    //if yes stop Gamma from listening and log out details
    console.log('Gamma is speaking', props.isSpeaking)
    recogniser.stop()
    console.log('Gamma has stopped listening')
    return null
  } else {
    console.log('Gamma is speaking', props.isSpeaking)

    //-----------------------------------------start listening for voice commands---------------------------------------
    recogniser.start()
    console.log('Gamma has started listening')

    //-----------------------------------------check for speech results-------------------------------------------------

    recogniser.onresult = function(event){
      console.log('Gamma has produced a result')

      let resultIndex = event.results.length -1



      //----------------------------------assign to speech Results------------------------------------------------
      speechResult = event.results[resultIndex][0].transcript.toLowerCase().trim()

      outputMessage = "User input detected:" + speechResult
      console.log(outputMessage)

      console.log(event.results)

      //--------------------------------------check for standard phrases------------------------------------------------
      if(speechResult === standardPhrases[0]){
        recogniser.stop()
        console.log('You terminated voice commands')
        return null
      }

      //---------------------loop over choices array and check if command matches an option-----------------------------

      speechCommand.map((choice, index) => {

        let checkText = choice.choiceCommand.toLowerCase()
        let checkIndex = (index + 1).toString()
        let checkBoth = checkIndex + checkText

        //check if result is equal to the index number of choice or the choice text
        if(speechResult === checkText || speechResult === checkIndex || speechResult === checkBoth) {
          chosenChoiceIndex = -1
          console.log('comparing:' + speechResult + ' with (' + checkIndex + "/" + checkText +")")
          console.log('matched speech result with choice text', checkIndex, checkText, choice.choiceIndex)
          console.log('selected choice index is:' , choice.choiceIndex)
          recogniser.stop()
          console.log('Gamma has stopped listening')
          chosenChoiceIndex =  choice.choiceIndex
          props.handleChoice(chosenChoiceIndex)
          return null
        }
        console.log('chosenChoiceIndex:', chosenChoiceIndex)
      })

      if(chosenChoiceIndex < 0 ){
        //no match made
        console.log('no match made')
      }
    }

    return null

  }

}

export default SpeechRecogniser

