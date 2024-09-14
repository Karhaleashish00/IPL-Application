import './playersDetails.css'
import GooglePieChart from './charts.js'
function PlayersDetails(props){
    return (
        <section style={{backgroundColor : props.bg}} className="container my-container">
            <i onClick={props.back} class="bi bi-arrow-left-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class=" back bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                </svg>
            </i>
            <div className="col-12 col">
                <div className="col-6 my-col-6">
                    <img className="image" src={props.data.image_url}/>
                    <label className='name'>{props.data.name}</label>
                </div>
                <div className="col-6">
                    <table>
                        <tbody>
                            <tr>
                                <th style={{ textAlign: 'center' }}>
                                    <span style={{ fontSize: "25px", fontWeight: "600"}}>{props.data.debut}</span>
                                    <p style={{ fontSize: "15px", fontWeight: "400"}}>IPL Debut</p>
                                </th>
                                <th style={{ textAlign: 'center' }}>
                                    <span style={{ fontSize: "25px", fontWeight: "600"}}>{props.data.specialization}</span>
                                    <p style={{ fontSize: "15px", fontWeight: "400"}}>Specialization</p>
                                </th>
                            </tr>
                            <tr>
                                <th style={{ textAlign: 'center' }}>
                                    <span style={{ fontSize: "25px", fontWeight: "600"}}>{props.data.dob}</span>
                                    <p style={{ fontSize: "15px", fontWeight: "400"}}>Date of Birth</p>
                                </th>
                                <th style={{ textAlign: 'center' }}>                                
                                    <span style={{ fontSize: "25px", fontWeight: "600"}}>{Object.entries(props.data["match history"]).length}</span>
                                    <p style={{ fontSize: "15px", fontWeight: "400"}}>Matches</p>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <GooglePieChart data = {props.data["match history"]}></GooglePieChart>
            </div>
        </section>
    );
}

export default PlayersDetails;