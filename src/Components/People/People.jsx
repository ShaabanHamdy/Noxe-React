import React, { useContext } from "react";
import imge from "../Images/songg.jpg";
import style from "./People.module.scss";

import { Link } from "react-router-dom";
import { MediaContext } from "../Context/MediaStore";
import Loding from "../Loding/Loding";
export default function People() {
  let { trenedPeople } = useContext(MediaContext);

  return (
    <>
      {trenedPeople.length > 0 ? (
        <div className="row gy-5 mt-5">
          <div className="col-md-4">
            <div className={`${style.brdr} w-25 mb-3`}></div>
            <h3>Trending</h3>
            <h3>People</h3>
            <h3>To watch now</h3>
            <span className="text-muted">most wached People by day</span>
            <div className={`${style.brdr} w-100 mt-1`}></div>
          </div>
          {trenedPeople.map((iteam, index) => (
            <div key={index} className="col-md-2 colMd4">
              <Link
                className="nav-link"
                to={`/Details/${iteam.id}/${iteam.media_type}`}
              >
                <div className="item position-relative">
                  {iteam.profile_path ? (
                    <img
                      className="w-100"
                      src={`https://image.tmdb.org/t/p/original${iteam.profile_path}`}
                      alt=""
                    />
                  ) : (
                    <img className="w-100" src={imge} alt="" />
                  )}

                  <h2 className="h5">
                    {iteam.title},{iteam.name}
                  </h2>
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
