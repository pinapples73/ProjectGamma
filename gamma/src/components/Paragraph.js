import React from 'react';

const Paragraph = (props) => {

    const paragraphText = props.children

    return (
            <p>{paragraphText}</p>

    )

}

export default Paragraph;


