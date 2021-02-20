import React, { useState } from "react";
import { useHistory } from "react-router";
import Cards from "../../Components/Card";


const Readlater = () => {
  const history = useHistory();
  let stored = JSON.parse(localStorage.getItem("readlater"));
  console.log('stored ', stored)
  stored = stored ? stored : [];
 
  return (
    <div className="wrapper">
      <div className="card">
        <div className="container">
          <div>
          <h2>Saved later Items</h2>
          </div>
          
          <div className="newslist">
            {stored.map((article) => (
              <Cards {...article} />
            ))}
          </div>
          
         
          
        </div>
      </div>
    </div>
  );
};

export default Readlater;
