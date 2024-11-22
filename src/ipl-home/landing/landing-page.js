import './landing-page.css'
import Home from '../home/home'
import { useState } from 'react';

function LandingPage() {
    const [isclick, setclick] = useState(false)
    return (
        <>
        {isclick && <div className="div1">
        <video autoPlay loop muted className="background-video">
            <source src="/intro3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className='div2'>
            <button className='overlay-text btn btn-outline-light '
            onClick={setclick((prev)=>!prev)}
            > click me..</button>
        </div>
    </div>}
    {!isclick && <Home/>

    }
    </>

    );
}

export default LandingPage