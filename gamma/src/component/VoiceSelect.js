import React from 'react';

const VoiceSelect = (props) => {

   if(props.voiceArray === undefined) return null;
    // if(props.currentVoice === undefined) return null;

    function handleClick(event) {
        props.onClick(event.target.value)
    }

    const options = props.voiceArray.map((option, index) => {
        console.log(props.currentVoice, index)
        let name = option.name.toLowerCase()
        name = name.replace("microsoft", "")
        name = name.replace("desktop", "")
        name = name.replace("google", "generic")
        name = name.replace("(great britain)", "uk english")
        name = name.replace("(united states)", "us english")
        name = name.replace(" -", "")

        return (
            <button className="button2" key={index} value={index} onClick={handleClick}>{name}</button>
        )
    })

    return (
            <p>{options}</p>
     )
}

export default VoiceSelect;