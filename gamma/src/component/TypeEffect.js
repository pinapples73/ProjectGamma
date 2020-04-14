import React, {useState, useEffect} from 'react';

const TypeEffect = (props) => {

    const [{stringToRender, index}, setStringToRender] = useState('')

    useEffect(() => {
        if(!this.props.string) return
        if(index === this.props.string.length) return
                setStringToRender({stringToRender:stringToRender + this.props.string[index], index: index+1})
        }, [stringToRender])

        return <span>{stringToRender}<span>*</span></span>
}

export default TypeEffect;