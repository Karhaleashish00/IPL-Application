import { useState,useEffect } from 'react';
import './comparisionHome.css';
import axios from 'axios';
import PlayerSelection from './PlayerSelection';
import { Chart } from 'react-google-charts';

function ComparisionHome(){
    const [ispl1SlectionCalled,setpl1Selection] = useState(false);
    const [ispl2SlectionCalled,setpl2Selection] = useState(false);
    const [team1, setTeam1] = useState("")
    const [player1,setPlayer1] = useState("Player One")
    const [pl1Data,setpl1Data] = useState({image_url:""})
    const [team2, setTeam2] = useState("")
    const [player2,setPlayer2] = useState("Player Two")
    const [pl2Data,setpl2Data] = useState({image_url:""})
    const [pl1wickets, setpl1wickets] = useState(0)
    const [pl2wickets, setpl2wickets] = useState(0)

    function pl1selectioncalled(){
        setpl1Selection(true)
    }
    function onCancel(){
        setpl1Selection(false)
        setpl2Selection(false)
    }

    function pl2selectioncalled(){
        setpl2Selection(true)
    }
    function onplayer1Select(team, player,ok){
        setTeam1(team)
        setPlayer1(player)
        setpl1Selection(!ok)
    }
    function onplayer2Select(team, player,ok){
        setTeam2(team)
        setPlayer2(player)        
        setpl2Selection(!ok)
    }
    useEffect(() => {
        let postdata = { "player_name": player1,"team":team1 };

        axios
            .post("/get-players-details", postdata)
            .then((res) => {
                let wicketCount = 0
                Object.entries(res.data.wicket_taker).forEach(([key, value]) => {
                    wicketCount += value                
                });    
                setpl1wickets(wicketCount)            
                setpl1Data(res.data); // Update state with fetched player details
            })
            .catch((err) => {
                console.error("Error fetching player details", err);
            });
    }, [player1]);
    useEffect(() => {
        let postdata = { "player_name": player2,"team":team2 };

        axios
            .post("/get-players-details", postdata)
            .then((res) => {
                let wicketCount = 0
                Object.entries(res.data.wicket_taker).forEach(([key, value]) => {
                    wicketCount += value                
                });    
                setpl2wickets(wicketCount) 
                setpl2Data(res.data); // Update state with fetched player details
            })
            .catch((err) => {
                console.error("Error fetching player details", err);
            });
    }, [player2]);

    const pl1inningsPercent = (pl1Data.matches/(pl1Data.matches+pl2Data.matches)*100).toFixed(2);
    const pl2inningsPercent = (pl2Data.matches/(pl1Data.matches+pl2Data.matches)*100).toFixed(2);
    const pl1ballsPercent = (pl1Data.balls_faced_in_match/(pl1Data.balls_faced_in_match+pl2Data.balls_faced_in_match)*100).toFixed(2);
    const pl2ballsPercent = (pl2Data.balls_faced_in_match/(pl1Data.balls_faced_in_match+pl2Data.balls_faced_in_match)*100).toFixed(2);
    const pl1runPercent = (pl1Data.runs_in_match/(pl1Data.runs_in_match+pl2Data.runs_in_match)*100).toFixed(2);
    const pl2runPercent = (pl2Data.runs_in_match/(pl1Data.runs_in_match+pl2Data.runs_in_match)*100).toFixed(2);
    const pl1foursPercent = (pl1Data.fours_in_match/(pl1Data.fours_in_match+pl2Data.fours_in_match)*100).toFixed(2);
    const pl2foursPercent = (pl2Data.fours_in_match/(pl1Data.fours_in_match+pl2Data.fours_in_match)*100).toFixed(2);
    const pl1sixPercent = (pl1Data.sixes_in_match/(pl1Data.sixes_in_match+pl2Data.sixes_in_match)*100).toFixed(2);
    const pl2sixPercent = (pl2Data.sixes_in_match/(pl1Data.sixes_in_match+pl2Data.sixes_in_match)*100).toFixed(2);
    const pl1SRPercent = ((pl1Data.runs_in_match/(pl1Data.balls_faced_in_match)*100)/((pl1Data.runs_in_match/(pl1Data.balls_faced_in_match)*100)+(pl2Data.runs_in_match/(pl2Data.balls_faced_in_match)*100))*100).toFixed(2);
    const pl2SRPercent =  ((pl2Data.runs_in_match/(pl2Data.balls_faced_in_match)*100)/((pl1Data.runs_in_match/(pl1Data.balls_faced_in_match)*100)+(pl2Data.runs_in_match/(pl2Data.balls_faced_in_match)*100))*100).toFixed(2);
    let pl1Avg = 0
    let pl2Avg = 0
    if((pl1wickets == 0) && (pl1Data.runs_in_match>1)){pl1Avg = (pl1Data.runs_in_match)}else{pl1Avg = pl1Data.runs_in_match/pl1wickets}
    if((pl2wickets == 0) && (pl2Data.runs_in_match>1)){pl2Avg = (pl1Data.runs_in_match)}else{pl2Avg = pl2Data.runs_in_match/pl2wickets}
    const pl1AvgPercent = (pl1Avg/(pl1Avg+pl2Avg)*100).toFixed(2);
    const pl2AvgPercent = (pl2Avg/(pl1Avg+pl2Avg)*100).toFixed(2);

    let pl1runconcededPercent = 0 
    let pl2runconcededPercent = 0 

    if(pl1Data.total_runs_conceded != 0){pl1runconcededPercent = ((pl1Data.total_runs_conceded/(pl1Data.total_runs_conceded + pl2Data.total_runs_conceded))*100).toFixed(2)}
    else{
        if(pl2Data.total_runs_conceded != 0){pl1runconcededPercent = 0}else{pl1runconcededPercent = 50}
    }   
    
    if(pl2Data.total_runs_conceded != 0){pl2runconcededPercent = ((pl2Data.total_runs_conceded/(pl1Data.total_runs_conceded + pl2Data.total_runs_conceded))*100).toFixed(2)}
    else{
        if(pl1Data.total_runs_conceded != 0){pl2runconcededPercent = 0}else{pl2runconcededPercent = 50}
    }


    let pl1ballBowledPercent = 0 
    let pl2ballBowledPercent = 0 
    if(pl1Data.total_balls_bowled != 0){pl1ballBowledPercent = ((pl1Data.total_balls_bowled/(pl1Data.total_balls_bowled + pl2Data.total_balls_bowled))*100).toFixed(2)}
    else{if(pl2Data.total_balls_bowled != 0){pl1ballBowledPercent = 0}else{pl1ballBowledPercent = 50}}
   
    if(pl2Data.total_balls_bowled != 0){pl2ballBowledPercent = ((pl2Data.total_balls_bowled/(pl1Data.total_balls_bowled + pl2Data.total_balls_bowled))*100).toFixed(2)}
    else{if(pl1Data.total_balls_bowled != 0){pl2ballBowledPercent = 0}else{pl2ballBowledPercent = 50}}


    let pl1wickettakenPercent = 0 
    let pl2wickettakenPercent = 0 
    if(pl1Data.total_runs_conceded != 0){pl1wickettakenPercent = ((pl1Data.wickets_taken/(pl1Data.wickets_taken + pl2Data.wickets_taken))*100).toFixed(2)}
    else{if(pl2Data.wickets_taken != 0){pl1wickettakenPercent = 0}else{pl1wickettakenPercent = 50}}

    if(pl2Data.total_runs_conceded != 0){pl2wickettakenPercent = ((pl2Data.wickets_taken/(pl1Data.wickets_taken + pl2Data.wickets_taken))*100).toFixed(2)}
    else{if(pl1Data.wickets_taken != 0){pl2wickettakenPercent = 0}else{pl2wickettakenPercent = 50}}

    let pl1eco = 0
    let pl1ecoPercent = 0
    let pl2eco = 0
    let pl2ecoPercent = 0
    if(pl1Data.total_runs_conceded != 0){
        pl1eco = (pl1Data.total_runs_conceded/(pl1Data.total_balls_bowled/6)).toFixed(2)
    }else{pl1eco = 0}
    if(pl2Data.total_runs_conceded != 0){
        pl2eco = (pl2Data.total_runs_conceded/(pl2Data.total_balls_bowled/6)).toFixed(2)
    }else{pl2eco = 0}
    if(pl1eco != 0){pl1ecoPercent = ((parseFloat(pl1eco)/(parseFloat(pl1eco) + parseFloat(pl2eco)))*100)}else{pl1ecoPercent = 0}
    if(pl2eco != 0){pl2ecoPercent = ((parseFloat(pl2eco)/(parseFloat(pl1eco) + parseFloat(pl2eco)))*100)}else{pl2ecoPercent = 0}
    if(pl1eco == 0 && pl2eco == 0){pl1ecoPercent = 50;pl2ecoPercent = 50}


    let pl1bowlAvg = 0
    let pl1bowlAvgPercent = 0
    let pl2bowlAvg = 0
    let pl2bowlAvgPercent = 0
    if(pl1Data.total_runs_conceded != 0){pl1bowlAvg = (pl1Data.total_runs_conceded/pl1Data.wickets_taken).toFixed(2)}else{pl1bowlAvg = 0}
    if(pl2Data.total_runs_conceded != 0){pl2bowlAvg = (pl2Data.total_runs_conceded/pl2Data.wickets_taken).toFixed(2)}else{pl2bowlAvg = 0}
    if(pl1Data.total_runs_conceded != 0 && pl1Data.wickets_taken == 0){pl1bowlAvg = parseFloat(pl1Data.total_runs_conceded)}
    if(pl2Data.total_runs_conceded != 0 && pl2Data.wickets_taken == 0){pl2bowlAvg = parseFloat(pl1Data.total_runs_conceded)}

    if(pl1bowlAvg != 0){pl1bowlAvgPercent = ((pl1bowlAvg/(pl1bowlAvg + parseFloat(pl2bowlAvg)))*100).toFixed(2)}else{pl1bowlAvgPercent = 0};
    if(pl2bowlAvg != 0){pl2bowlAvgPercent = ((pl2bowlAvg/(pl1bowlAvg + parseFloat(pl2bowlAvg)))*100).toFixed(2)}else{pl2bowlAvgPercent = 0}
   
    if(pl1bowlAvg == 0 && pl2bowlAvg == 0){pl1bowlAvgPercent = 50; pl2bowlAvgPercent = 50}


    

    return (        
    <div id='main'>
        <div id='body'className='container'>
            <span id='heading'><h3>This is Comparision Home</h3></span>      
            <div id='outerdiv' className='col-12'>
                <div className='col-4'>                    
                    {!pl1Data.image_url &&
                        <span id='player1'  onClick={pl1selectioncalled} style={{cursor:'pointer'}}><img src={`${process.env.PUBLIC_URL}/images/player1.jpg`} alt='player One'></img></span>
                    }
                    {pl1Data.image_url &&
                        <span id='playeroriginal' onClick={pl1selectioncalled} style={{cursor:'pointer'}}><img style={{height:'250px',width:'250px'}} src={pl1Data.image_url} alt='player One'></img></span>
                    }             
                    <h3>{player1}</h3>                              
                    {ispl1SlectionCalled &&
                        <PlayerSelection data="Player One" onplayerSelect={onplayer1Select} onCancel={onCancel}></PlayerSelection>
                    }
                    {pl1Data.image_url && 
                        <div style={{marginTop:'90px'}}>
                            <label>Innings </label><p>{pl1Data.matches}</p>                      
                            <label>Runs </label><p>{pl1Data.runs_in_match}</p>                      
                            <label>Balls </label><p>{pl1Data.balls_faced_in_match}</p>                      
                            <label>Sixes </label><p>{pl1Data.sixes_in_match}</p>                      
                            <label>Fours </label><p>{pl1Data.fours_in_match}</p> 
                            <label>Strike Rate</label><p>{((pl1Data.runs_in_match/pl1Data.balls_faced_in_match)*100).toFixed(2)}</p>
                            <label>Average</label><p>{(pl1Avg).toFixed(2)}</p>
                            <span>
                                <label style={{marginTop:'150px'}}>runs_conceded</label><p>{pl1Data.total_runs_conceded}</p>                      
                                <label>balls_bowled </label><p>{pl1Data.total_balls_bowled}</p> 
                                <label>wickets_taken </label><p>{pl1Data.wickets_taken}</p> 
                                <label>economy</label><p>{pl1eco}</p>
                                <label>Average</label><p>{pl1bowlAvg}</p>
                            </span>
                        </div>                        
                    }                     
                </div>  
                <div className='col-4'>
                    {pl1Data.image_url && pl2Data.image_url &&
                       <div>
                            <span id='player1'><img src={`${process.env.PUBLIC_URL}/images/player-comparision.png`} alt='player One'></img></span>                
                            <h4 style={{display:'flex', marginTop:'80px',justifyContent:'center'}}>Batting</h4>
                            <div class="progress" style={{marginTop:'50px'}}>                                
                                <div class="progress-bar" style={{width:`${pl1inningsPercent}%`,backgroundColor:"yellow"}} role="progressbar" aria-valuenow={pl1Data.matches} aria-valuemin="0" aria-valuemax={pl1Data.matches + pl2Data.matches}></div>
                                <div class="progress-bar" style={{width:`${pl2inningsPercent}%`}} role="progressbar" aria-valuenow={pl2Data.matches} aria-valuemin="0" aria-valuemax= {pl1Data.matches + pl2Data.matches}></div>
                            </div>
                            <div class="progress" style={{marginTop:'50px'}}>
                                <div class="progress-bar" style={{width:`${pl1runPercent}%`,backgroundColor:"yellow"}} role="progressbar" aria-valuenow={pl1Data.matches} aria-valuemin="0" aria-valuemax={pl1Data.matches + pl2Data.matches}></div>
                                <div class="progress-bar" style={{width:`${pl2runPercent}%`}} role="progressbar" aria-valuenow={pl2Data.matches} aria-valuemin="0" aria-valuemax= {pl1Data.matches + pl2Data.matches}></div>
                            </div>
                            <div class="progress" style={{marginTop:'50px'}}>
                                <div class="progress-bar" style={{width:`${pl1ballsPercent}%`,backgroundColor:"yellow"}} role="progressbar" aria-valuenow={pl1Data.matches} aria-valuemin="0" aria-valuemax={pl1Data.matches + pl2Data.matches}></div>
                                <div class="progress-bar" style={{width:`${pl2ballsPercent}%`}} role="progressbar" aria-valuenow={pl2Data.matches} aria-valuemin="0" aria-valuemax= {pl1Data.matches + pl2Data.matches}></div>
                            </div>
                            <div class="progress" style={{marginTop:'50px'}}>
                                <div class="progress-bar" style={{width:`${pl1sixPercent}%`,backgroundColor:"yellow"}} role="progressbar" aria-valuenow={pl1Data.matches} aria-valuemin="0" aria-valuemax={pl1Data.matches + pl2Data.matches}></div>
                                <div class="progress-bar" style={{width:`${pl2sixPercent}%`}} role="progressbar" aria-valuenow={pl2Data.matches} aria-valuemin="0" aria-valuemax= {pl1Data.matches + pl2Data.matches}></div>
                            </div>
                            <div class="progress" style={{marginTop:'50px'}}>
                                <div class="progress-bar" style={{width:`${pl1foursPercent}%`,backgroundColor:"yellow"}} role="progressbar" aria-valuenow={pl1Data.matches} aria-valuemin="0" aria-valuemax={pl1Data.matches + pl2Data.matches}></div>
                                <div class="progress-bar" style={{width:`${pl2foursPercent}%`}} role="progressbar" aria-valuenow={pl2Data.matches} aria-valuemin="0" aria-valuemax= {pl1Data.matches + pl2Data.matches}></div>
                            </div> 
                            <div class="progress" style={{marginTop:'50px'}}>
                                <div class="progress-bar" style={{width:`${pl1SRPercent}%`,backgroundColor:"yellow"}} role="progressbar" aria-valuenow={pl1Data.matches} aria-valuemin="0" aria-valuemax={pl1Data.matches + pl2Data.matches}></div>
                                <div class="progress-bar" style={{width:`${pl2SRPercent}%`}} role="progressbar" aria-valuenow={pl2Data.matches} aria-valuemin="0" aria-valuemax= {pl1Data.matches + pl2Data.matches}></div>
                            </div>
                            <div class="progress" style={{marginTop:'50px'}}>
                                <div class="progress-bar" style={{width:`${pl1AvgPercent}%`,backgroundColor:"yellow"}} role="progressbar" aria-valuenow={pl1Data.matches} aria-valuemin="0" aria-valuemax={pl1Data.matches + pl2Data.matches}></div>
                                <div class="progress-bar" style={{width:`${pl2AvgPercent}%`}} role="progressbar" aria-valuenow={pl2Data.matches} aria-valuemin="0" aria-valuemax= {pl1Data.matches + pl2Data.matches}></div>
                            </div> 
                            <h4 style={{display:'flex', marginTop:'80px',justifyContent:'center'}}>Bowling</h4>                            
                            <div class="progress" style={{marginTop:'50px'}}>
                                <div class="progress-bar" style={{width:`${pl1runconcededPercent}%`,backgroundColor:"yellow"}} role="progressbar" aria-valuenow={pl1Data.matches} aria-valuemin="0" aria-valuemax={pl1Data.matches + pl2Data.matches}></div>
                                <div class="progress-bar" style={{width:`${pl2runconcededPercent}%`}} role="progressbar" aria-valuenow={pl2Data.matches} aria-valuemin="0" aria-valuemax= {pl1Data.matches + pl2Data.matches}></div>
                            </div> 
                            <div class="progress" style={{marginTop:'50px'}}>
                                <div class="progress-bar" style={{width:`${pl1ballBowledPercent}%`,backgroundColor:"yellow"}} role="progressbar" aria-valuenow={pl1Data.matches} aria-valuemin="0" aria-valuemax={pl1Data.matches + pl2Data.matches}></div>
                                <div class="progress-bar" style={{width:`${pl2ballBowledPercent}%`}} role="progressbar" aria-valuenow={pl2Data.matches} aria-valuemin="0" aria-valuemax= {pl1Data.matches + pl2Data.matches}></div>
                            </div>
                            <div class="progress" style={{marginTop:'50px'}}>
                                <div class="progress-bar" style={{width:`${pl1wickettakenPercent}%`,backgroundColor:"yellow"}} role="progressbar" aria-valuenow={pl1Data.matches} aria-valuemin="0" aria-valuemax={pl1Data.matches + pl2Data.matches}></div>
                                <div class="progress-bar" style={{width:`${pl2wickettakenPercent}%`}} role="progressbar" aria-valuenow={pl2Data.matches} aria-valuemin="0" aria-valuemax= {pl1Data.matches + pl2Data.matches}></div>
                            </div> 
                            <div class="progress" style={{marginTop:'50px'}}>
                                <div class="progress-bar" style={{width:`${pl1ecoPercent}%`,backgroundColor:"yellow"}} role="progressbar" aria-valuenow={pl1Data.matches} aria-valuemin="0" aria-valuemax={pl1Data.matches + pl2Data.matches}></div>
                                <div class="progress-bar" style={{width:`${pl2ecoPercent}%`}} role="progressbar" aria-valuenow={pl2Data.matches} aria-valuemin="0" aria-valuemax= {pl1Data.matches + pl2Data.matches}></div>
                            </div> 
                            <div class="progress" style={{marginTop:'50px'}}>
                                <div class="progress-bar" style={{width:`${pl1bowlAvgPercent}%`,backgroundColor:"yellow"}} role="progressbar" aria-valuenow={pl1Data.matches} aria-valuemin="0" aria-valuemax={pl1Data.matches + pl2Data.matches}></div>
                                <div class="progress-bar" style={{width:`${pl2bowlAvgPercent}%`}} role="progressbar" aria-valuenow={pl2Data.matches} aria-valuemin="0" aria-valuemax= {pl1Data.matches + pl2Data.matches}></div>
                            </div>
                       </div>
                    }
                   
                    {!pl2Data.image_url && !pl1Data.image_url &&
                        <div style={{margin:'100px 20px'}}>
                            <h4>Click On Images to Add Players</h4>
                        </div>
                    } 
                </div>                     
                <div className='col-4'>
                    {!pl2Data.image_url &&
                        <span id='player1'  onClick={pl2selectioncalled} style={{cursor:'pointer'}}><img src={`${process.env.PUBLIC_URL}/images/player2.jpg`} alt='player Two'></img></span>
                    }
                    {pl2Data.image_url &&
                        <span id='playeroriginal' onClick={pl2selectioncalled} style={{cursor:'pointer'}}><img style={{height:'250px',width:'250px'}} src={pl2Data.image_url} alt='player Two'></img></span>
                    }             
                    <h3>{player2}</h3>                              
                    {ispl2SlectionCalled &&
                        <PlayerSelection data="Player Two" onplayerSelect={onplayer2Select} onCancel={onCancel}></PlayerSelection>
                    }  
                     {pl2Data.image_url && 
                        <div style={{marginTop:'90px'}}>
                            <label>Innings </label><p>{pl2Data.matches}</p>                      
                            <label>Runs </label><p>{pl2Data.runs_in_match}</p>                      
                            <label>Balls </label><p>{pl2Data.balls_faced_in_match}</p>                      
                            <label>Sixes </label><p>{pl2Data.sixes_in_match}</p>                      
                            <label>Fours </label><p>{pl2Data.fours_in_match}</p> 
                            <label>Strike Rate</label><p>{((pl2Data.runs_in_match/pl2Data.balls_faced_in_match)*100).toFixed(2)}</p>
                            <label>Average</label><p>{(pl2Avg).toFixed(2)}</p>
                            <span>
                                <label style={{marginTop:'150px'}}>runs_conceded</label><p>{pl2Data.total_runs_conceded}</p>                      
                                <label>balls_bowled </label><p>{pl2Data.total_balls_bowled}</p> 
                                <label>wickets_taken </label><p>{pl2Data.wickets_taken}</p> 
                                <label>economy</label><p>{pl2eco}</p>
                                <label>Average</label><p>{pl2bowlAvg}</p>
                            </span>
                        </div>
                    }      
                </div> 
            </div>    
        </div>       
    </div>);
}

export default ComparisionHome;