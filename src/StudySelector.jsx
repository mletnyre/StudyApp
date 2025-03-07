import React, {useState} from 'react'
import Box from "./Box.jsx"
import StudyTime from "./StudyTime.jsx"

function StudySelector(){
    const [values, setValues] = useState({
        studyBox: 50,
        breakBox: 10,
        amountBox: 2,
        pressed: false,
    })

    const handleInput = (e, box) => {
        const {value} = e.target; //e is the event that happens, there are a lot of things in e that can be accessed
        setValues((prevValues) => ({
            ...prevValues, [box]:value
        }));
    };

    const handleSave = () =>{
        console.log(values) //placeholder
        setValues((prevValues) => ({
            ...prevValues, pressed: true
        }));
    }

    const handleGoBack = () =>{
        setValues((prevValues) => ({
            ...prevValues, pressed: false
        }));
    }
    return(
        values.pressed ? (
            <div>
                <StudyTime className="bigStudySelector" study={values.studyBox} break={values.breakBox} sessions={values.amountBox}/>
                <button className="backButton" onClick={handleGoBack}> Go Back </button>
            </div>
        ) : (    
            <div className="bigStudySelector">
                <div className="studySelector">
                    <Box message ="Study Session Length (mins)" onChange={(e) => handleInput(e, 'studyBox')}/>
                    <Box message ="Break Session Length (mins)" onChange={(e) => handleInput(e, 'breakBox')}/>
                    <Box message ="Number of Sessions (real int)" onChange={(e) => handleInput(e, 'amountBox')}/>
                </div>
                    <button className='button'onClick={handleSave}>Study!</button>
            </div>
        ) 
    )
}

export default StudySelector