import React from "react";
// import { Link } from "react-router-dom";

const NavPagination = ({ context , loadList}) => {

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li key="previous"
          className={context.previous_url ? "page-item" : "page-item disabled"}
        >
          {context.previous_url ? (
            <span className="page-link" onClick={loadList.bind(this,context.previous_url,null)}>
              Anterior
            </span>
          ) : (
            <span className="page-link">Anterior</span>
          )}
        </li>

        {context.page_links.map((link,index) => (
          <li key={index} className={link[2] ? "page-item active" : "page-item"}>
            {!link[3] ? (
              link[2] ? (
                <span className="page-link" onClick={loadList.bind(this,link[0],null)}>
                  {link[1]}
                  <span className="sr-only">(current)</span>
                </span>
              ) : (
                <span className="page-link" onClick={loadList.bind(this,link[0],null)}>
                  {link[1]}
                </span>
              )
            ) : (
              <span className="page-link">...</span>
            )}
          </li>
        ))}
       
        <li
            key="next"
          className={context.next_url ? "page-item" : "page-item disabled"}
        >
          {context.next_url ? (
            <span className="page-link" onClick={loadList.bind(this,context.next_url,null)}>
              siguiente
            </span>
          ) : (
            <span className="page-link">Siguiente</span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavPagination;
