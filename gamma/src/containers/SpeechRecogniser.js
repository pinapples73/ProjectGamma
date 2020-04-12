import React, { Component, Fragment } from "react"

//------------------------SPEECH RECOGNITION-----------------------------

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continuous = true
recognition.interimResults = true
recognition.lang = 'en-US'


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
        recognition.start()
        recognition.onend = () => {
          //console.log("...continue listening...")
          recognition.start()
        }
      } else {
        recognition.stop()
        recognition.onend = () => {
          console.log("Stopped listening")
        }
      }
      recognition.onstart = () => {
        console.log("Listening!")
      }

      let finalTranscript = ''

      recognition.onresult = event => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalTranscript += transcript + ' ';
        }

        //-------------------------COMMANDS------------------------------------

        const transcriptArr = finalTranscript.split(' ')
        const stopCmd = transcriptArr.slice(-3, -1)
        console.log('stopCmd', stopCmd)

        if (stopCmd[0] === 'within' && stopCmd[1] === 'cells'){
          recognition.stop()
          recognition.onend = () => {
            console.log('Stopped listening per command')
            const finalText = transcriptArr.slice(0, -3).join(' ')
            this.setState({spokenWord: finalText})
          }
        }
      }

      //-----------------------------------------------------------------------

      recognition.onerror = event => {
        console.log("Error occurred in recognition: " + event.error)
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

