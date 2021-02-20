import React from "react";
import Header from "./Header/Header";
import Layout from "./Layout/Layout";
import "./Home.scss";

const Home = () => {
  return (
    <div className="homewrapper">
      <Header />
      <Layout />
    </div>
  );
};

export default Home;
