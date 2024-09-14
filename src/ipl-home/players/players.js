import React, { useState, useEffect } from "react";

function Players(props) {
  const [data, setData] = useState({});
    console.log(props.id);
    
  useEffect(() => {
    switch(props.id){
        case "csk":
            fetch("/pla-csk")
            .then((res) => res.json())
            .then((data) => {
              setData(data);
              console.log(data);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
            break;
        case "dc":
            fetch("/pla-dc")
            .then((res) => res.json())
            .then((data) => {
              setData(data);
              console.log(data);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
            break;
        case "gt":
            fetch("/pla-gt")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
            break;
        case "kkr":
            fetch("/pla-kkr")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
            break;
        case "lsg":
            fetch("/pla-lsg")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
            break;
        case "mi":
            fetch("/pla-mi")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
            break;
        case "pbks":
            fetch("/pla-pbks")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
            break;
        case "rr":
            fetch("/pla-rr")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
            break;
        case "rcb":
            fetch("/pla-rcb")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
            break;
        case "srh":
            fetch("/pla-srh")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
            break;
        default:
            break;
    }
  }, []);
  return (
    <div id="players">
      {data.Batters && data.Batters.length > 0 && (
        <div className="row col-12">
          {data.Batters.map((batter, index) => (
            <div className="col-3" key={index}>
              <img
                id="csk"
                className="pl-img nav-item"
                src={batter.image_url}
                alt={`${batter.name} Logo`}
                onClick={()=>props.setCalled(batter)}
              />
              <label className="pl-name">{batter.name}</label>
              <label className="pl-skill">Batting</label>
            </div>
          ))}
        </div>
      )}

      {data["All Rounders"] && data["All Rounders"].length > 0 && (
        <div className="row col-12">
          {data["All Rounders"].map((allRounder, index) => (
            <div className="col-3" key={index}>
              <img
                id="csk"
                className="pl-img nav-item"
                src={allRounder.image_url}
                alt={`${allRounder.name} Logo`}
                onClick={()=>props.setCalled(allRounder)}
              />
              <label className="pl-name">{allRounder.name}</label>
              <label className="pl-skill">All Rounder</label>
            </div>
          ))}
        </div>
      )}

      {data["Bowlers"] && data["Bowlers"].length > 0 && (
        <div className="row col-12">
          {data["Bowlers"].map((Bowlers, index) => (
            <div className="col-3" key={index}>
              <img
                id="csk"
                className="pl-img nav-item"
                src={Bowlers.image_url}
                alt={`${Bowlers.name} Logo`}
                onClick={()=>props.setCalled(Bowlers)}
              />
              <label className="pl-name">{Bowlers.name}</label>
              <label className="pl-skill">Bowlers</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Players;
