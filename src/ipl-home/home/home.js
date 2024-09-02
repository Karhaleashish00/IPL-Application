import React, { useEffect, useState } from 'react';
import './home.css';
import Nav from '../nav/Nav'
import Players from '../players/players'

function Home() {
    const [home, setHome] = useState(false);
    const [teamId , setTeamId] = useState(home)
    const [content, setContent] = useState("<h1>Welcome to the IPL</h1>");
    const [background, setBackground] = useState("#052a60");
    const [trophyContent, setTrophyContent] = useState("");

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
                        setContent("<h1>Welcome to the IPL</h1>");
                        setBackground("#052a60");
                        setTrophyContent("");
                        setTeamId("home")
                        break;
                    case "csk":
                        setBackground("#ffcb05");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/CSK/logos/Logooutline/CSKoutline.png" alt="CSK Logo"/>');
                        setTrophyContent("<img src='https://www.iplt20.com/assets/images/team-trophy.png' alt=''><span id='winners' class='badge bg-success'>2010, 2011, 2018, 2021, 2023</span>");
                        setTeamId("csk")
                        break;
                    case "rr":
                        setBackground("#eb83b5");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/RR/Logos/Logooutline/RRoutline.png" alt="RR Logo"/>');
                        setTrophyContent("<img src='https://www.iplt20.com/assets/images/team-trophy.png' alt=''><span id='winners' class='badge bg-success'>2008</span>");
                        setTeamId("rr")
                        break;
                    case "mi":
                        setBackground("#ffffff");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/MI/Logos/Logooutline/MIoutline.png" alt="MI Logo"/>');
                        setTrophyContent("<img src='https://www.iplt20.com/assets/images/team-trophy.png' alt=''><span id='winners' class='badge bg-success'>2013, 2015, 2017, 2019, 2020</span>");
                        setTeamId("mi")
                        break;
                    case "gt":
                        setBackground("#4ecef5");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/GT/Logos/Logooutline/GToutline.png" alt="GT Logo"/>');
                        setTrophyContent("<img src='https://www.iplt20.com/assets/images/team-trophy.png' alt=''><span id='winners' class='badge bg-success'>2022</span>");
                        setTeamId("gt")
                        break;
                    case "rcb":
                        setBackground("#9a0f1d");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/RCB/Logos/Logooutline/RCBoutline.png" alt="RCB Logo"/>');
                        setTrophyContent("");
                        setTeamId("rcb")
                        break;
                    case "kkr":
                        setBackground("#7c1878");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/KKR/Logos/Logooutline/KKRoutline.png" alt="KKR Logo"/>');
                        setTrophyContent("<img src='https://www.iplt20.com/assets/images/team-trophy.png' alt=''><span id='winners' class='badge bg-success'>2012, 2014, 2024</span>");
                        setTeamId("kkr")
                        break;
                    case "pbks":
                        setBackground("#f51c32");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/PBKS/Logos/Logooutline/PBKSoutline.png" alt="PBKS Logo"/>');
                        setTrophyContent("");
                        setTeamId("pbks")
                        break;
                    case "lsg":
                        setBackground("#3678f4");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/LSG/Logos/Logooutline/LSGoutline.png" alt="LSG Logo"/>');
                        setTrophyContent("");
                        setTeamId("lsg")
                        break;
                    case "dc":
                        setBackground("#ffffff");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/DC/Logos/LogoOutline/DCoutline.png" alt="DC Logo"/>');
                        setTrophyContent("");
                        setTeamId("dc")
                        break;
                    case "srh":
                        setBackground("#fd7e14");
                        setContent('<img class="sec-logo burn-image" src="https://documents.iplt20.com/ipl/SRH/Logos/Logooutline/SRHoutline.png" alt="SRH Logo"/>');
                        setTrophyContent("<img src='https://www.iplt20.com/assets/images/team-trophy.png' alt=''><span id='winners' class='badge bg-success'>2016</span>");
                        setTeamId("srh")
                        break;
                    default:
                        setBackground("#083475");
                        setContent("<h1>Welcome to the IPL</h1>");
                        setTrophyContent("");
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
            <section id='activity-section'>
                <div id="main-section" className="container" style={{ backgroundColor: background }}>
                        <span id="main-section-content" dangerouslySetInnerHTML={{ __html: content }} />
                        <span id="team-trophy" className="text-center" dangerouslySetInnerHTML={{ __html: trophyContent }} />
                </div>
                
                {teamId === 'csk' && <Players id="csk"/>}
                {teamId === 'dc' && <Players id="dc"/>}
                {teamId === 'gt' && <Players id="gt"/>}
                {teamId === 'kkr' && <Players id="kkr"/>}
                {teamId === 'lsg' && <Players id="lsg"/>}
                {teamId === 'mi' && <Players id="mi"/>}
                {teamId === 'pbks' && <Players id="pbks"/>}
                {teamId === 'rr' && <Players id="rr"/>}
                {teamId === 'rcb' && <Players id="rcb"/>}
                {teamId === 'srh' && <Players id="srh"/>}
            </section>            
        </div>
    );
}

export default Home;
