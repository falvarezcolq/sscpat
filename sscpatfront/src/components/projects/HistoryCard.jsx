import React from 'react'
import { connect } from 'react-redux'

const HistoryCard = (props) => {  
    return (
        <div className="card">
                  <div className="header">
                    
                    {/* <h3>
                      Ultima entrega <strong>5 Marzo</strong> 
                      <br/>
                      <small>Observación del tutor</small>
                    
                    </h3> */}

                    {/* <ul className="header-dropdown m-r--5">
                      <li className="dropdown m-l-10">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="material-icons">more_vert</i>
                        </a>
                        <ul className="dropdown-menu pull-right">
                          <li>
                            <a href="#" className=" waves-effect waves-block">
                              Action
                            </a>
                          </li>
                          <li>
                            <a href="#" className=" waves-effect waves-block">
                              Another action
                            </a>
                          </li>
                          <li>
                            <a href="#" className=" waves-effect waves-block">
                              Something else here
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul> */}
                  </div>
                  <div className="body">
                    lorem Lorem Ipsum es simplemente el texto de relleno de las imprentas 
                    y archivos de texto. Lorem Ipsum  ..
                    {/* <a href="#">Ver</a> */}
                  </div>
    </div>
   
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryCard)
