import React from "react";
import LoaderStyle from "./LoaderComp.module.css";
function Loader() {
  return (
    <div className={LoaderStyle.postLoaderContainer}>
      <div className={LoaderStyle.PostLoader}>
        <div className={LoaderStyle.PostLoader__item}></div>
        <div className={LoaderStyle.PostLoader__item}></div>
        <div className={LoaderStyle.PostLoader__item}></div>
        <div className={LoaderStyle.PostLoader__item}></div>
        <div className={LoaderStyle.PostLoader__item}></div>
        <div className={LoaderStyle.PostLoader__item}></div>
        <div className={LoaderStyle.PostLoader__item}></div>
        <div className={LoaderStyle.PostLoader__item}></div>
        <div className={LoaderStyle.PostLoader__item}></div>
        <div className={LoaderStyle.PostLoader__item}></div>
        <div className={LoaderStyle.PostLoader__item}></div>
        <div className={LoaderStyle.PostLoader__item}></div>
      </div>
    </div>
  );
}

export default Loader;
