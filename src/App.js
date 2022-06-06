import React from "react"
import Trivia from "./Trivia"
import CheckAnswers from './CheckAnswers.js'
import StartScreen from './StartScreen.js'
import {nanoid} from "nanoid"

export default function App() {
    
    
    const [questions, setQuestions] = React.useState([])
    const [showAnswers, setShowAnswers] = React.useState(false)
    const [showCorrectAnswers, setShowCorrectAnswers] = React.useState(false)
    const [gameStart, setGameStart] = React.useState(true)
    const [restartGame, setRestartGame] = React.useState(false)
    const [storeAnswers, setStoreAnswers] = React.useState(0)
    
    
    const shuffle = (array) => {
                for(let i = array.length - 1; i >= 1; i--) {
                    let j = Math.floor(Math.random() * (i + 1)); // 0 <= j <= i
                    let temp = array[j];
                    array[j] = array[i];
                    array[i] = temp;
                    }
                    return array;
            }
    
    React.useEffect(() => {
        console.log("logged")
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                var remapped_data = data.results.map( (result) => {
                   var answers = result.incorrect_answers;
                   answers.push( result.correct_answer );
                   let shuffledAnswers = shuffle(answers)
                   let decodedAnswers = shuffledAnswers.map((x) => {
                                        return htmlDecode(x)
                                        })
               
                   return { "question": htmlDecode(result.question), 
                            "answers": decodedAnswers.map((x) => {
                                        return {
                                            "answer": x,
                                            "answerId": nanoid()
                                        }
                                    }), 
                            "correct_answer": htmlDecode(result.correct_answer),
                            "selectedAnswer": "",
                            "id": nanoid() 
                            }
                } )
                                
                setQuestions( remapped_data )
                                
            })
    }, [restartGame]) 
    
    React.useEffect(() => {
        const allHeld = questions.every((question) => question.selectedAnswer !== "")
        console.log(allHeld)
        if (allHeld) {
            setShowAnswers(true)
            console.log('Time to check answers')
        } else {
            setShowAnswers(false)
        }
        
    }, [questions])

// console.log(questions)    
    
    function htmlDecode(input) {
        let doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }   
    
    const holdChoice = (answer, parentid) => {
    //    console.log(answer + "\n" + parentid)
       let questionsClone = JSON.parse(JSON.stringify(questions))
    //    console.log(stateClone)
       questionsClone.forEach((questionClone) => {
           if (questionClone.id === parentid && !showCorrectAnswers) {
               if (questionClone.selectedAnswer === answer) {
                   questionClone.selectedAnswer = ""
               } else {
               questionClone.selectedAnswer = answer
               }
           }
       })
       setQuestions(questionsClone)
    }
    
    const startGame = () => {
        setGameStart(false)
    }
    
    const checkAnswers = () => {
        if (gameStart === false) {
            let answerArr = questions.map((question) => {
                if (question.correct_answer === question.selectedAnswer) {
                   return question = 1
                } else {
                   return question = 0
                }
            })
            console.log(answerArr)
            let reducedAnswers = answerArr.reduce((acc, currVal) => acc + currVal)
            if (showCorrectAnswers) {
                setGameStart(true)
                // console.log('Game restarted')
                setShowCorrectAnswers(false)
                setRestartGame(!restartGame)
                
            } else {
                setShowCorrectAnswers(true)
                // console.log("Your answers are showing")
            } 
            console.log(reducedAnswers)
            setStoreAnswers(reducedAnswers)
        }
        
    }

    let triviaQuestions = questions.map(item => {
        // console.log(item)
        return (
            <Trivia 
                key={item.id}
                question={item.question}
                answers={item.answers}
                correctAnswer={item.correct_answer}
                selectedAnswer={ item.selectedAnswer }
                id={item.id}
                holdChoice={holdChoice}
                showCorrectAnswers={showCorrectAnswers}                
            />
        )
    })
    
    
    return (
        <main className='main-container'>
        {
            gameStart 
            ? <StartScreen start={startGame}/> 
            :
            <div className='main-container2'>
                {triviaQuestions}
                { showAnswers && <CheckAnswers checkAnswers={checkAnswers}
                                               gameStart={gameStart}
                                               showCorrectAnswers={showCorrectAnswers}
                                               storeAnswers={storeAnswers}
                                               />}
            </div>
        }
        </main>
    )
}