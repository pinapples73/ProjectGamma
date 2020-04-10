import React, {Fragment} from 'react';
import SpeechSynth from '../containers/SpeechSynth';

const Paragraph = (props) => {

    const paragraphText = props.children;

    return (
        <Fragment>
            <SpeechSynth paraText={paragraphText}/>
            <p>{paragraphText}</p>
        </Fragment>
    )

}

export default Paragraph;
