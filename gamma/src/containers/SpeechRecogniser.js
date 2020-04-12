import React, { Component, Fragment } from "react"

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recogniser = new SpeechRecognition()

recogniser.continuous = true
recogniser.interimResults = true
recogniser.lang = 'en-US'


//------------------------COMPONENT-----------------------------

class SpeechRecogniser extends Component {

  constructor() {
    super()
    this.state = {
      listening: false
    }

    this.handleListen = this.handleListen.bind(this)
  }

  handleListen() {

    console.log('listening?', this.state.listening)

      if (this.state.listening) {
        recogniser.start()
        recogniser.onend = () => {
          //console.log("...continue listening...")
          recogniser.start()
        }
      } else {
        recogniser.stop()
        recogniser.onend = () => {
          console.log("Stopped listening")
        }
      }
      recogniser.onstart = () => {
        console.log("Listening!")
      }

      let finalTranscript = ''

      recogniser.onresult = event => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalTranscript += transcript + ' ';
        }

        //-------------------------COMMANDS------------------------------------

        const transcriptArr = finalTranscript.split(' ')
        const stopCmd = transcriptArr.slice(-3, -1)
        console.log('stopCmd', stopCmd)

        if (stopCmd[0] === 'within' && stopCmd[1] === 'cells'){
          recogniser.stop()
          recogniser.onend = () => {
            console.log('Stopped listening per command')
            const finalText = transcriptArr.slice(0, -3).join(' ')
            this.setState({spokenWord: finalText})
          }
        }
      }

      //-----------------------------------------------------------------------

      recogniser.onerror = event => {
        console.log("Error occurred in recogniser: " + event.error)
      }
  }

  render() {
    if(this.props.isSpeaking){
      return null
    }

    this.handleListen()

    return (
      <Fragment>
        <p>{this.state.spokenWord}</p>
      </Fragment>
    )
  }

}

export default SpeechRecogniser

