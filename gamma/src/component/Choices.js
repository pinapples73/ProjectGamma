import React, {Fragment} from 'react';
import SpeechSynth from "./SpeechSynth";

const Choices = (props) => {

    const story = props.children

    function handleClick(event) {
        props.onClick(event.target.value)
    }

    const choices = story.currentChoices.map((choice, index) => {
        return <button className="button" key={index} voicetext={choice.text} value={choice.index} onClick={handleClick}>{choice.text}</button>
    })

    console.log(choices)


    let dictation = "Select,"

    for(let index = 0; index < choices.length; index ++){
        dictation  += ", " +  (index + 1) + ", " + choices[index]["props"]["voicetext"] + ", "
    }

    return (
        <Fragment>
            <SpeechSynth dictation={dictation}/>
            <p>&lt;{choices}&gt;</p>
        </Fragment>
    )

}

export default Choices;

