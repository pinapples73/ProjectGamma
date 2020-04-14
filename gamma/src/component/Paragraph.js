import React, {Fragment} from 'react';
import TypeEffect from './TypeEffect';

const Paragraph = (props) => {

    const paragraphText = props.children

    return (
        <TypeEffect string={paragraphText}/>

    )

}

export default Paragraph;


