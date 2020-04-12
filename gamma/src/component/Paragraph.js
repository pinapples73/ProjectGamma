import React, {Fragment} from 'react';

const Paragraph = (props) => {

    const paragraphText = props.children

    return (
        <Fragment>
            <p>{paragraphText}</p>
        </Fragment>
    )

}

export default Paragraph;


