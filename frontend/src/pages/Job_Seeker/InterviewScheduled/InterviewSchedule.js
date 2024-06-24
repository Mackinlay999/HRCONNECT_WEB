import React from 'react'
import interview from './Interview.module.css'
import no_interview from '../../../Assets/no_interview.png'

export default function InterviewSchedule() {
    return (
        <div className={interview.__interview_Page}>
            <h2 style={{ color: "grey" }}>No Interviews scheduled yet</h2>
            <img className={no_interview} src={no_interview} alt="" />
        </div>
    )
}
