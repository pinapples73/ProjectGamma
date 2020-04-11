import React, {Fragment} from 'react';
import SpeechSynth from '../containers/SpeechSynth';

const Paragraph = (props) => {

    const paragraphText = props.children;

    return (
        <Fragment>
            <SpeechSynth dictation={paragraphText}/>
            <p>{paragraphText}</p>
        </Fragment>
    )

}

export default Paragraph;
