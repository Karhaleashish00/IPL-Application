import React, { useState, useEffect } from "react";

function Players(props) {
    const [data, setData] = useState({});
    
    
  useEffect(() => {
    switch(props.id){
        case "csk":
            fetch("https://ipl-apis-u32y.onrender.com/pla-csk")
            .then((res) => res.json())
            .then((data) => {
              setData(data);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
            break;
        case "dc":
            fetch("https://ipl-apis-u32y.onrender.com/pla-dc")
            .then((res) => res.json())
            .then((data) => {
              setData(data);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
            break;
        case "gt":
            fetch("https://ipl-apis-u32y.onrender.com/pla-gt")
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
            fetch("https://ipl-apis-u32y.onrender.com/pla-kkr")
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
            fetch("https://ipl-apis-u32y.onrender.com/pla-lsg")
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
            fetch("https://ipl-apis-u32y.onrender.com/pla-mi")
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
            fetch("https://ipl-apis-u32y.onrender.com/pla-pbks")
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
            fetch("https://ipl-apis-u32y.onrender.com/pla-rr")
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
            fetch("https://ipl-apis-u32y.onrender.com/pla-rcb")
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
            fetch("https://ipl-apis-u32y.onrender.com/pla-srh")
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
              <label className="pl-skill" style={{'fontWeight':200}}>Batting</label>
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
