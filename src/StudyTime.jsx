import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

function StudyTime(props){

    const [timeLeft,    setTimeLeft]    = useState(props.study * 60)
    const [breakLeft,   setBreakLeft]   = useState(props.break * 60)
    const [sessionLeft, setSessionLeft] = useState(props.sessions * 1)
    const [study, setStudy]             = useState(true)
    const [done, setDone]               = useState(false)

    const totalTime                     = props.study * props.sessions; //used to display total study time at the end of your session

    const resetTimer = () =>{ setTimeLeft(props.study * 60) }

    const resetBreak = () =>{ setBreakLeft(props.break * 60) }

    const sessionComplete = () =>{ setSessionLeft(prevSessions => prevSessions - 1) }

    //main loop
    useEffect(() => {
        let interval;

        //studying
        if(study && timeLeft > 0 && sessionLeft > 0){
          interval = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
          }, 10);
        }

        //break
        else if(!study && breakLeft > 0){
          interval = setInterval(() => {
            setBreakLeft(prevBreak => prevBreak -1);
          }, 10);
        }
        
        return () => clearInterval(interval);
    }, [timeLeft, breakLeft, sessionLeft, props.study, props.break]);

    //transition useEffect
    useEffect(() => {
      //transition from study to break
      if(timeLeft === 0 && study){
        sessionComplete();
        setStudy(false)
        resetBreak();
      }

      //transition from break to study
      else if(breakLeft === 0 && !study && sessionLeft > 0){
        setStudy(true)
        resetTimer();
      }

      //sets done flag to true for conditional rendering
      else if(sessionLeft === 0){
        setDone(true)
      }
    })


    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const breakMinutes = Math.floor(breakLeft / 60);
    const breakSeconds = breakLeft % 60;

    return(
        <>
            {done ? (
              <p>You just completed {totalTime} minutes of studying!</p>
            ): (
            <>
              {study ? (
                <p>
                  Study Timer: {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
                </p>
              ) : (
                <p>
                  Break Timer: {`${breakMinutes}:${breakSeconds < 10 ? '0' : ''}${breakSeconds}`}
                </p>
              )}
              <p>Sessions Left: {sessionLeft}</p>
            </>
            )}
        </>
    )
}

StudyTime.propTypes = {
    study: PropTypes.number,
    break: PropTypes.number,
    sessions: PropTypes.number,
}

export default StudyTime