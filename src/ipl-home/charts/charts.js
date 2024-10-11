import React from 'react';
import { Chart } from 'react-google-charts';
import './charts.module.css';

const GooglePieChart = (props) => {
    let spincount = 0;
    let pacecount = 0;
    let totalruns = 0;
    let totalbowls = 0;
    let totalFours = 0;
    let totalsixes = 0;
    let total50 = 0;
    let total100 = 0;
    let highestScore = 0;
    let groundCount = {};
    let outby = {};
    console.log("props : ",props)
    // Loop through the player's match data
    // Object.entries(props.data).forEach(([matchId, matchDetails]) => {
    //     const match = matchDetails.match_details;

    //     // Accumulate statistics
    //     totalruns += parseInt(match.runs, 10);
    //     totalbowls += parseInt(match.balls, 10);
    //     totalFours += parseInt(match.fours, 10);
    //     totalsixes += parseInt(match.sixes, 10);

    //     // Track 50s and 100s
    //     if (parseInt(match.runs, 10) >= 50) {
    //         if (parseInt(match.runs, 10) >= 100) {
    //             total100 += 1;
    //         } else {
    //             total50 += 1;
    //         }
    //     }

    //     // Highest score logic
    //     if (highestScore < parseInt(match.runs, 10)) {
    //         highestScore = parseInt(match.runs, 10);
    //     }

    //     // Handling dismissals
    //     if (match.dismissed === "Yes") {
    //         const bowler = match.wicket_taker;
    //         if (outby[bowler]) {
    //             outby[bowler] += 1;
    //         } else {
    //             outby[bowler] = 1;
    //         }

    //         // Count based on bowling type (spin or pace)
    //         if (match.bowling.balls > 0) {
    //             if (match.bowlingType === "Spin") {
    //                 spincount += 1;
    //             } else if (match.bowlingType === "Pace") {
    //                 pacecount += 1;
    //             }
    //         }
    //     }

    //     // Accumulate runs by venue
    //     const ground = match.venue;
    //     if (groundCount[ground]) {
    //         groundCount[ground] += parseInt(match.runs, 10);
    //     } else {
    //         groundCount[ground] = parseInt(match.runs, 10);
    //     }
    // });

    // Pie chart data
    const battingAgainstBowling = [['Task', 'Wicket Loss Against'], ['Pace', pacecount], ['Spin', spincount]];
    const groundData = [['Ground', 'Runs']];
    Object.entries(props.data.ground_performance).forEach(([ground, runs]) => groundData.push([ground, runs['runs']]));

    const dismissalData = [['Bowler', 'Out Count'], ['Other', 0]];
    Object.entries(props.data.wicket_taker).forEach(([bowler, count]) => {
        if (count > 1) {
            dismissalData.push([bowler, count]);
        } else {
            dismissalData[1][1] += 1; // Aggregate smaller dismissals under "Other"
        }
    });

    // Options for charts
    const bowlingOptions = { title: 'Wickets Loss Against Bowlers' };
    const groundOptions = { title: 'Runs Scored at Grounds' };
    const dismissalOptions = { title: 'Dismissals by Bowler' };

    return (
        <div>
            <h2 style={{margin:"30px 5px"}}>Career Stats</h2>
            <div style={{display:'flex'}}>           
                <div style={{width:'50%'}}>
                    <h4>Batting Stats</h4>
                    <table>
                        <tbody>
                            <tr>
                                <th>Innings</th>
                                <td>{props.data.matches}</td>
                            </tr>
                            <tr>
                                <th>Runs</th>
                                <td>{props.data.runs_in_match}</td>
                            </tr>
                            <tr>
                                <th>Balls Faced</th>
                                <td>{props.data.balls_faced_in_match}</td>
                            </tr>
                            <tr>
                                <th>Strike Rate</th>
                                <td>{((props.data.runs_in_match / props.data.balls_faced_in_match) * 100).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th>sixes</th>
                                <td>{props.data.sixes_in_match}</td>
                            </tr>
                            <tr>
                                <th>fours</th>
                                <td>{props.data.fours_in_match}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{width:'50%'}}>
                <h4>Bowling Stats</h4>
                <table>
                        <tbody>
                            {/* <tr>
                                <th>Innings</th>
                                <td>{props.data.matches}</td>
                            </tr> */}
                            <tr>
                                <th>Runs</th>
                                <td>{props.data.total_runs_conceded}</td>
                            </tr>
                            <tr>
                                <th>Balls</th>
                                <td>{props.data.total_balls_bowled}</td>
                            </tr>
                            <tr>
                                <th>wicktes</th>
                                <td>{props.data.wickets_taken}</td>
                            </tr>
                            <tr>
                                <th>average</th>
                                <td>{((props.data.total_runs_conceded / props.data.wickets_taken)).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th>economy</th>
                                <td>{((props.data.total_runs_conceded)/(props.data.total_balls_bowled/6)).toFixed(2)}</td>
                            </tr>                            
                        </tbody>
                    </table>
                </div>

            </div>
            <h2 style={{margin:"30px 5px"}}>Performance Analysis</h2>
            <div style={{ display: 'flex' }}>
                <Chart chartType="PieChart" data={dismissalData} options={bowlingOptions} width="400px" height="300px" />
                <Chart chartType="PieChart" data={groundData} options={groundOptions} width="400px" height="300px" />
                {/* <Chart chartType="PieChart" data={props.data.dismissed_type} options={dismissalOptions} width="400px" height="300px" /> */}
            </div>
        </div>
    );
};

export default GooglePieChart;
