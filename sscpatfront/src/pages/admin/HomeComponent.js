import React from "react";
import Info from "../../components/home/Info";



class HomeComponent extends React.Component {
  
    render() {

       
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Escritorio</h2>
          </div>
         <Info/>
         </div>
      </section>
      // <h1>hola</h1>
    );
  }
}

export default HomeComponent;
