import React from 'react'

export default function StartScreen(props) {
    return (
        <div className="start-screen">
            <h1 className="title">Quizzical</h1>
            <button className="start-quiz-button" onClick={props.start}>Start Quiz</button>
        </div>
    )
}