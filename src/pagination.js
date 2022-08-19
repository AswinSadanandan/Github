import React from "react";

const Pagination= ({ name, description }) => {
  return (
    <div className="paginate2">
      <div className="paginate3">
        <h2 className="text">{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Pagination;
