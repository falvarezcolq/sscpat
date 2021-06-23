import React from "react";

const ListNames = (props) => {

    const {list,remove} = props
  return (
    <div>
      {list.length > 0 &&
        list.map((t) => (
          <h4 key={t.id}>
            <span className="label bg-blue" style={{ margin: "0px 5px" }}>
                { 
                  t.abbreviation +
                  " " + t.last_name +
                  " " + t.last_name2 +
                  " " + t.first_name
                }
              <button
                type="button"
                onClick={()=>remove(t.id)}
                className="btn-link"
                title="Borrar"
              >
                <span style={{fontSize:"18x", color:"blue",fontWeight:"bold"}}> x</span>
              </button>
            </span>
          </h4>
        ))}
    </div>
  );
};

export default ListNames;
