import React, {Fragment} from 'react';
import TypeEffect from './TypeEffect';

const Paragraph = (props) => {

    const paragraphText = props.children

    return (
        <Fragment>
            <p>{paragraphText}</p>
        </Fragment>

    )

}

export default Paragraph;


