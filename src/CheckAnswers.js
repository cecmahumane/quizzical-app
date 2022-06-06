import React from 'react'

export default function CheckAnswers(props) {
    
    // const buttonText = () => {
    //     props.showCorrectAnswers && props.gameStart ? 'New Game' : 'Check Answers'
    // }
    
    return (
        <div className="check-answers-block">
            {props.showCorrectAnswers && props.gameStart === false && <p className='answer-score'>You scored {props.storeAnswers}/5 correct answers</p>}
            <button className='check-answer-button' onClick={props.checkAnswers}>{props.showCorrectAnswers && props.gameStart === false ? 'Play Again' : 'Check Answers'}</button>
        </div>
    )
}