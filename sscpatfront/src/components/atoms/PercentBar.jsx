import React from 'react'

const PercentBar = (total, peding_review)  => {
    if (total === 0) {
        return ( 
          <span>sin pendientes</span>
        );
      }
      let percentage = ((total - peding_review) / total) * 100;
      percentage = percentage > 15 ? percentage:15; 
  
      return (
          <div
            className="progress"
            style={{ margin: "0", width: "100%", display: "inline-block" }}
          >
            <div
              className={
          
                percentage < 30
                  ? "progress-bar bg-red"
                  : percentage < 60
                  ? "progress-bar bg-orange"
                  : "progress-bar bg-green"
                  
              }
              style={{ width: percentage + "%"}}
            >
               {total - peding_review}/{total}
              
            </div>
          </div>
      );
}

export default PercentBar


