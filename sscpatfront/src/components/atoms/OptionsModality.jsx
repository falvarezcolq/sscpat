import React from 'react'
import { GeneralModality } from '../../models/modalities'

export const OptionsModality = () => {
    const loadOptionsModalities =()=>{
        let options ;
        for( x in GeneralModality){
            options += (<option key={x} values={x}>{GeneralModality[x]}</option>)
        }
        return options
    }
    return (
        <>
        {loadOptionsModalities()}
        </>
    )
}
