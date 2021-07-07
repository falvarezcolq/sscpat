import React from "react";

class Overlay extends React.Component {
  render() {
    return (
      <div className="overlay" style={{ display: this.props.display ,textAlign:'center',paddingTop:'30%'}}>
        <div className="preloader pl-size-xl ">
          <div className="spinner-layer pl-white">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
        <h2 style={{color:"#fff"}}>Entrando...</h2>
      </div>
    );
  }
}

export default Overlay;
