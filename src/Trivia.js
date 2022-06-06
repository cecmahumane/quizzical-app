import React from "react"
import Buttons from "./Buttons.js"


export default function Trivia(props) {
     
     
       
     
     const buttonResponses = props.answers.map(answer => {
        //  console.log(answer)
         return (
            <Buttons
                parentid={props.id}
                button={answer.answer}
                key={answer.answerId}
                isSelected={ props.selectedAnswer === answer.answer }
                holdChoice={props.holdChoice}
                id={answer.answerId}
                correctAnswer={props.correctAnswer}
                showCorrectAnswer={props.showCorrectAnswers}
                />
            )
        })
   
    return (
        <div>
            <h2 className='trivia-question'>{props.question}</h2>
            <div className='button-container'>
                {buttonResponses}
            </div>
            <hr/>
        </div>
    )
}