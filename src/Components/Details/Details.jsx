import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imge from "../Images/songg.jpg";
import Loding from "../Loding/Loding";
export default function Details() {
  const [itemDetails, setItemDetails] = useState(null);
  let prams = useParams();
  useEffect(() => {
    getApiDetails();
  }, [null]);

  let getApiDetails = async () => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${prams.mediaType}/${prams.id}?api_key=f2afc7f6ffe3b10c3847bde15c6e4db3&language=en-US`
    );

    setItemDetails(data);
  };

  return (
    <>
      {itemDetails ? (
        <div className="row mt-3 p-5">
          <div className="col-md-4 ">
            <div className=" ">
              {prams.mediaType === "person" ? (
                <img
                  className="w-100"
                  src={`https://image.tmdb.org/t/p/original${itemDetails.profile_path}`}
                  alt=""
                />
              ) : (
                <img
                  className="w-100"
                  src={`https://image.tmdb.org/t/p/original${itemDetails.poster_path}`}
                  alt=""
                />
              )}
              {itemDetails.profile_path || itemDetails.poster_path  ? 
                ''
               :<img className="w-100" src={imge} alt="" /> 
              
              }

              
              
              {/* <img className="w-100" src={imge} alt="" /> */}
            </div>
          </div>
          <div className="col-md-8">
            <div className="">
              <h2>
                {itemDetails.title}
                {itemDetails.name}
              </h2>
              {itemDetails.overview ? (
                <p className="text-muted ">{itemDetails.overview}</p>
              ) : (
                <p className="text-muted ">
                  {itemDetails.biography.slice(0, 1000)}
                </p>
              )}
              {itemDetails.known_for_department ? (
                <p className="fw-bold ">{itemDetails.known_for_department}</p>
              ) : (
                ""
              )}
              {itemDetails.biography == "" ? (
                <p>
                  Irene Cara Escalera (March 18, 1959 - November 25, 2022) was
                  an American singer, songwriter and actress. Cara sang and
                  co-wrote the song Flashdance... What a Feeling from the film
                  Flashdance. She won an Oscar for Best Original Song as a co
                  writer. Cara rose to fame as Coco Hernandez in the 1980 film
                  Fame, and the hit song "Fame" spawned from the movie.
                </p>
              ) : (
                ""
              )}
              {itemDetails.place_of_birth == null ? (
                <p className="fw-bold ">
                  The Bronx, New York City, New York, USA
                </p>
              ) : (
                ""
              )}
              {itemDetails.place_of_birth ? (
                <p className="fw-bold ">{itemDetails.place_of_birth}</p>
              ) : (
                ""
              )}

              {itemDetails.genres
                ? itemDetails.genres.map((value, index) => (
                    <span key={index} className="btn btn-info my-2 ms-0 mx-2 gendes">
                      {value.name}
                    </span>
                  ))
                : ""}

              {itemDetails.vote_average ? (
                <p className=" fw-bolder mt-2 ">
                  Vote: {itemDetails.vote_average.toFixed(1)}
                </p>
              ) : (
                ""
              )}
              {itemDetails.vote_count ? (
                <p className=" fw-bolder mt-2 ">
                  Vote count: {itemDetails.vote_count}
                </p>
              ) : (
                ""
              )}
              {itemDetails.popularity ? (
                <p className=" fw-bolder mt-2 ">
                  popularity: {itemDetails.popularity.toFixed(1)}
                </p>
              ) : (
                ""
              )}
              {itemDetails.release_date != null ? (
                <p className="fw-bolder mt-2">
                  release_date: {itemDetails.release_date}
                </p>) : ("")}
              <a target='_blnek' className="btn btn-info mt-2 p-2" href={itemDetails.homepage}>Watch Now</a>
             
            </div>
          </div>
        </div>
      ) : (
        <Loding />
      )}
    </>
  );
}
