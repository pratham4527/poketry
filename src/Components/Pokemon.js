import React, { useState } from "react";
import StatBar from "./StatBar";

export default function Pokemon(props) {
  const [showStatsOverlay, setShowStatsOverlay] = useState(false);

  const handleStatClick = () => {
    setShowStatsOverlay(true);
  };

  const closeStatsOverlay = () => {
    setShowStatsOverlay(false);
  };

  return (
    <div>
      <div
        className="card my-3"
        style={{
          width: "18rem",
          position: "relative",
          backgroundColor: "#8c8a8a5e",
        }}
      >
        <img src={props.imgUrl} className="card-img-top" alt="loading" />
        <div className="card-body" style={{ margin: "10px" }}>
          <h5
            className="card-title"
            style={{ color: "white", display: "inline" }}
          >
            {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
          </h5>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleStatClick}
            style={{ position: "absolute", right: "17px", bottom: "17px" }}
          >
            See Stats
          </button>
        </div>
      </div>
      {showStatsOverlay && (
        <div
          className="modal show"
          tabIndex="-1"
          style={{
            display: "flex",

            alignItems: "center",
            // display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            position: "fixed",
          }}
        >
          {/* <div className="modal show" tabIndex="-1" style={overlayStyle}> */}
          {/* Content to display in the overlay */}
          <div className="modal-dialog modal-lg">
            <div className="modal-content" style={{ width: "650px" }}>
              <div
                className="modal-body"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1fr",
                  gap: "5px",
                }}
              >
                {/* Add your stats information here */}

                <div>
                  <StatBar label="HP" value={props.hp} />
                  <StatBar label="Attack" value={props.atk} />
                  <StatBar label="Defense" value={props.def} />
                  <StatBar label="Special Attack" value={props.spa} />
                  <StatBar label="Special Defense" value={props.spdef} />
                  <StatBar label="Speed" value={props.spd} />

                  <div className="container bold">
                    {" "}
                    <h5>Type : {props.tp}</h5>{" "}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <img
                    src={props.imgUrl}
                    className="card-img-top img-fluid"
                    style={{ width: "200px" }}
                    alt="loading"
                  />

                  <h3 className="card-title text-center">
                    {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
                  </h3>
                  <br />
                  {/* <button type="button" className="btn btn-secondary" onClick={closeStatsOverlay}> Close </button> */}
                  <div className="text-center">
                    <button
                      class="btn btn-primary"
                      type="button"
                      onClick={closeStatsOverlay}
                    >
                      {" "}
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
