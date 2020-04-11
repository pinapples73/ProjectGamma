import React, {Fragment} from 'react';

const Choices = (props) => {

    const story = props.children

    function handleClick(event) {
        props.onClick(event.target.value)
    }

    const choices = story.currentChoices.map((choice, index) => {
        return <button className="button" key={index}  value={choice.index} onClick={handleClick}>{choice.text}</button>
    })

    return (
        <Fragment>
            <p>&lt;{choices}&gt;</p>
        </Fragment>
    )

}

export default Choices;

