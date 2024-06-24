import React, { useState } from 'react'
import interview from './Interview.module.css'
import InterviewSchedule from './InterviewSchedule'
import InterviewWithAI from './InterviewWithAI'

export default function Interviews() {
  const [toggle, setToggle] = useState(true)

  const handleToggle = () => {
    setToggle(!toggle)
  }

  return (
    <div className={interview.__interviewSchedule_Page}>
      <section className={interview.__Cont}>
        <div className={interview.__toogleContainer}>
          <button className={`${interview.__btn_toggle} ${toggle ? interview.active : ''}`} onClick={handleToggle}>Interview</button>
          <button className={`${interview.__btn_toggle} ${!toggle ? interview.active : ''}`} onClick={handleToggle}>Interviews with AI</button>
        </div>
        {toggle ? <InterviewSchedule /> : <InterviewWithAI />}
      </section>
    </div>
  );
}
