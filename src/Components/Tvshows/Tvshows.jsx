import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MediaContext } from "../Context/MediaStore";
import Loding from "../Loding/Loding";
import style from "./Tvshows.module.scss";

export default function Tvshows() {
  let { trenedITvShow } = useContext(MediaContext);

  return (
    <>
      {trenedITvShow.length > 0 ? (
        <div className="row gy-5 mt-5">
          <div className="col-md-4">
            <div className={`${style.brdr} w-25 mb-3`}></div>
            <h3>Trending</h3>
            <h3>Tv Show</h3>
            <h3>To watch now</h3>
            <span className="text-muted">most wached Tv Show by day</span>
            <div className={`${style.brdr} w-100 mt-1`}></div>
          </div>
          {trenedITvShow.map((iteam, index) => (
            <div key={index} className="col-md-2 colMd4">
              <Link
                className="nav-link"
                to={`/Details/${iteam.id}/${iteam.media_type}`}
              >
                <div className="item position-relative">
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/original${iteam.poster_path}`}
                    alt=""
                  />
                  <h2 className="h5 mt-2">
                    {iteam.title},{iteam.name}
                  </h2>
                  <span className="position-absolute top-0 end-0 p-2 bg-info">
                    {iteam.vote_average.toFixed(1)}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <Loding />
      )}
    </>
  );
}
