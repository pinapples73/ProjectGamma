import React, {useState, useEffect} from 'react';

const TypeEffect = (props) => {

    function timer(){
        var string = "Hello World"
        var array = string.split("")
        for (let i=0; i<array.length; i++) {
            setTimeout( function timer(){
                console.log(array[i]);
            }, i*200 );
        }
    }

}

export default TypeEffect;