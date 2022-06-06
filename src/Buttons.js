import React from "react"

export default function Buttons(props) {
    
    let buttonStyle = () => {
        let styles = {}
        if (props.isSelected) {
            if (props.showCorrectAnswer && props.isSelected) {
                if (props.button === props.correctAnswer) {
                    // Green --> Correct Answer
                    styles = {backgroundColor: '#94D7A2', border: "none"}
                } else {
                    // Red --> Incorrect Answer
                    styles = {backgroundColor: '#F8BCBC', border: "none"}
                }
            } else {
                // Blue --> Button Selected
                styles = {backgroundColor: "#D6DBF5", border: "none"}
            }
        } else {
            // White --> Button Unselected
            styles = {backgroundColor: "white"}
            if (props.button === props.correctAnswer && props.showCorrectAnswer) {
                styles = {backgroundColor: '#94D7A2', border: "none"}
            }
        }
        return styles
    }
    
    return (
            <div>
                <button className="answer-button"
                    onClick={() => props.holdChoice(props.button, props.parentid)} // i.e. parentid, answer(id) 
                    style={buttonStyle()}
                    >{props.button}</button>
            </div>
    )
}