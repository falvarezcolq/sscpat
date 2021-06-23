import React from 'react'

const Spinner = (props) => {
    const size = props.size ? props.size: "xl";
    return (
        <div className={`preloader pl-size-${size}`}>
            <div className="spinner-layer pl-light-blue">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
            </div>
        </div>
    )
}

export default Spinner
