import React, {Fragment} from 'react';

const Choices = (props) => {

    const story = props.children

    function handleClick(event) {
        props.onClick(event.target.value)
    }

    const choices = story.currentChoices.map((choice, index) => {
        return <button className="button" key={index}  value={choice.index} onClick={handleClick}>&lt;&nbsp;{index + 1}.&nbsp;{choice.text}&nbsp;&gt;</button>
    })

    return (
        <Fragment>
            <p>{choices}</p>
        </Fragment>
    )

}

export default Choices;

