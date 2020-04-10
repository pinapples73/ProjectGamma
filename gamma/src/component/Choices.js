import React, {Fragment} from 'react';

const Choices = (props) => {

    const story = props.children

    function handleClick(event) {
        props.onClick(event.target.value)
    }

    const choices = story.currentChoices.map((choice, index) => {
        return <button key={index} value={choice.index} onClick={handleClick}>{choice.text}</button>
    })

    return (
        <Fragment>
            <p>{choices}</p>
        </Fragment>
    )

}

export default Choices;