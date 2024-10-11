import React, { useEffect, useState } from 'react';
import './home.css';
import Nav from '../nav/Nav'
import Players from '../players/players'
import PlayersDetails from '../playersDetails/playersDetails';
import ComparisionHome from '../player-comparision/comparisionHome';

function Home() {
    const [home, setHome] = useState(false);
    const [teamId , setTeamId] = useState("home")
    const [content, setContent] = useState("");
    const [background, setBackground] = useState("#ffffff");
    const [trophyContent, setTrophyContent] = useState("");
    const [isdetailsCalled , setPlaersCalledBool] = useState(false);
    const [bgteam , setbg] = useState("white");
    const [isComparisionCalled,setCompBool] = useState(false)

    function comparisionCalled(){
        setCompBool(true)
    }
    function isplayerCalled(player){
        console.log(player)
        if(player){
            setPlaersCalledBool(player)
        }
        if(player.team === "csk"){setbg("#ffcb05")}
        if(player.team === "rr"){setbg("#eb83b5")}
        if(player.team === "dc"){setbg("#ffffff")}
        if(player.team === "gt"){setbg("#4ecef5")}
        if(player.team === "kkr"){setbg("#7c1878")}
        if(player.team === "mi"){setbg("#ffffff")}
        if(player.team === "srh"){setbg("#fd7e14")}
        if(player.team === "pbks"){setbg("#f51c32")}
        if(player.team === "rcb"){setbg("#9a0f1d")}
        if(player.team === "lsg"){setbg("#3678f4")}
    }

    function backToPlayers(){
        setPlaersCalledBool(false)
    }

    function GoToAddDataSection(){

    }
    useEffect(() => {
        const ul = document.getElementById("nav-ul");
        const lists = Array.from(ul.children);

        lists.forEach((l) => {
            l.addEventListener("click", () => {
                if (!home) {
                    setHome(true);
                }

                switch (l.id) {
                    case "home":
                        setHome(false);
                        setContent("");
                        setBackground("#ffffff");
                        setTrophyContent("");
                        setTeamId("home")
                        setPlaersCalledBool("")
                        setCompBool(false)
                        break;
                    case "csk":
                        setBackground("#ffcb05");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/CSK/logos/Logooutline/CSKoutline.png" alt="CSK Logo"/>');
                        setTrophyContent("<img src='https://www.iplt20.com/assets/images/team-trophy.png' alt=''><span id='winners' class='badge bg-success'>2010, 2011, 2018, 2021, 2023</span>");
                        setTeamId("csk")
                        setPlaersCalledBool("")
                        setCompBool(false)
                        break;
                    case "rr":
                        setBackground("#eb83b5");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/RR/Logos/Logooutline/RRoutline.png" alt="RR Logo"/>');
                        setTrophyContent("<img src='https://www.iplt20.com/assets/images/team-trophy.png' alt=''><span id='winners' class='badge bg-success'>2008</span>");
                        setTeamId("rr")
                        setPlaersCalledBool("")
                        setCompBool(false)
                        break;
                    case "mi":
                        setBackground("#ffffff");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/MI/Logos/Logooutline/MIoutline.png" alt="MI Logo"/>');
                        setTrophyContent("<img src='https://www.iplt20.com/assets/images/team-trophy.png' alt=''><span id='winners' class='badge bg-success'>2013, 2015, 2017, 2019, 2020</span>");
                        setTeamId("mi")
                        setPlaersCalledBool("")
                        setCompBool(false)
                        break;
                    case "gt":
                        setBackground("#4ecef5");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/GT/Logos/Logooutline/GToutline.png" alt="GT Logo"/>');
                        setTrophyContent("<img src='https://www.iplt20.com/assets/images/team-trophy.png' alt=''><span id='winners' class='badge bg-success'>2022</span>");
                        setTeamId("gt")
                        setPlaersCalledBool("")
                        setCompBool(false)
                        break;
                    case "rcb":
                        setBackground("#9a0f1d");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/RCB/Logos/Logooutline/RCBoutline.png" alt="RCB Logo"/>');
                        setTrophyContent("");
                        setTeamId("rcb")
                        setPlaersCalledBool("")
                        setCompBool(false)
                        break;
                    case "kkr":
                        setBackground("#7c1878");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/KKR/Logos/Logooutline/KKRoutline.png" alt="KKR Logo"/>');
                        setTrophyContent("<img src='https://www.iplt20.com/assets/images/team-trophy.png' alt=''><span id='winners' class='badge bg-success'>2012, 2014, 2024</span>");
                        setTeamId("kkr")
                        setPlaersCalledBool("")
                        setCompBool(false)
                        break;
                    case "pbks":
                        setBackground("#f51c32");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/PBKS/Logos/Logooutline/PBKSoutline.png" alt="PBKS Logo"/>');
                        setTrophyContent("");
                        setTeamId("pbks")
                        setPlaersCalledBool("")
                        setCompBool(false)
                        break;
                    case "lsg":
                        setBackground("#3678f4");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/LSG/Logos/Logooutline/LSGoutline.png" alt="LSG Logo"/>');
                        setTrophyContent("");
                        setTeamId("lsg")
                        setPlaersCalledBool("")
                        setCompBool(false)
                        break;
                    case "dc":
                        setBackground("#ffffff");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/DC/Logos/LogoOutline/DCoutline.png" alt="DC Logo"/>');
                        setTrophyContent("");
                        setTeamId("dc")
                        setPlaersCalledBool("")
                        setCompBool(false)
                        break;
                    case "srh":
                        setBackground("#fd7e14");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/SRH/Logos/Logooutline/SRHoutline.png" alt="SRH Logo"/>');
                        setTrophyContent("<img src='https://www.iplt20.com/assets/images/team-trophy.png' alt=''><span id='winners' class='badge bg-success'>2016</span>");
                        setTeamId("srh")
                        setPlaersCalledBool("")
                        setCompBool(false)
                        break;
                    default:
                        setBackground("#083475");
                        setContent("<h1>Welcome to the IPL</h1>");
                        setTrophyContent("");
                        setCompBool(false)
                }
            });
        });
    }, [home]);

    return (
        <div id="main-div">
            <header>
                <nav>
                    <Nav />
                </nav>
            </header>     
            {isComparisionCalled && 
                <section id='comp'>
                    <ComparisionHome></ComparisionHome>
                </section>
            }   
            {isdetailsCalled && 
                <section id='player-details'>
                    <PlayersDetails data = {isdetailsCalled}  back={backToPlayers} bg={bgteam}/>
                </section>
            }
            {!isdetailsCalled && 
                <section id='activity-section'>
                {/* {teamId === "home" &&
                     <div id="main-section" className="container" style={{ backgroundColor: background }}>
                        <a href="http://localhost:4000/" target="" rel="noopener noreferrer">
                            <button className='badge' style={{color:"black",background:"white"}} onClick={GoToAddDataSection}>Add data</button>
                        </a>
                        <span id="main-section-content"></span>
                        <span id="team-trophy" className="text-center" dangerouslySetInnerHTML={{ __html: trophyContent }} />
                    </div>
                } */}
               {teamId === "home" && !isComparisionCalled &&
                    <div id="main-section" className="container" style={{ backgroundColor: background,display:'flex',flexDirection:'row'}}>                        
                        <div className='card' style={{margin:'0px 20px',width:'400px',height:'400px',padding:'50px',cursor:'pointer'}} onClick={comparisionCalled}>
                            <img src={`${process.env.PUBLIC_URL}/images/player-comparision.png`}></img>
                            <h2 className='card-title'>Player Comparision</h2>
                        </div>
                        <div className='card' style={{margin:'0px 20px',width:'400px',height:'400px',padding:'50px',cursor:'pointer'}}>
                            <img src={`${process.env.PUBLIC_URL}/images/prediction.png`}></img>
                            <h2 className='card-title'>fantacy Prediction</h2>
                        </div>                    
                    </div>
               }
               {teamId !== "home" && 
                    <div id="main-section" className="container" style={{ backgroundColor: background }}>
                        <span id="main-section-content" dangerouslySetInnerHTML={{ __html: content }} />
                        <span id="team-trophy" className="text-center" dangerouslySetInnerHTML={{ __html: trophyContent }} />
                    </div>  
               }
                
                {teamId === 'csk' && !isdetailsCalled && <Players id="csk" setCalled ={isplayerCalled}/>}
                {teamId === 'dc' && !isdetailsCalled && <Players id="dc" setCalled ={isplayerCalled}/>}
                {teamId === 'gt' && !isdetailsCalled && <Players id="gt" setCalled ={isplayerCalled}/>}
                {teamId === 'kkr' && !isdetailsCalled && <Players id="kkr" setCalled ={isplayerCalled}/>}
                {teamId === 'lsg' && !isdetailsCalled && <Players id="lsg" setCalled ={isplayerCalled}/>}
                {teamId === 'mi' && !isdetailsCalled && <Players id="mi" setCalled ={isplayerCalled}/>}
                {teamId === 'pbks' && !isdetailsCalled && <Players id="pbks" setCalled ={isplayerCalled}/>}
                {teamId === 'rr' && !isdetailsCalled && <Players id="rr" setCalled ={isplayerCalled}/>}
                {teamId === 'rcb' && !isdetailsCalled && <Players id="rcb" setCalled ={isplayerCalled}/>}
                {teamId === 'srh' && !isdetailsCalled && <Players id="srh" setCalled ={isplayerCalled}/>}
                </section>   
            }         
        </div>
    );
}

export default Home;
