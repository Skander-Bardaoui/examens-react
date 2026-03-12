import { useEffect } from 'react'
import useQuizStore from '../store/quizStore'

function Quiz() {
  const {
    questions, currentIndex, score, selectedAnswer,
    finished, ratings,
    setQuestions, selectAnswer, nextQuestion, retake, rateQuestion, getRatingAverage
  } = useQuizStore()

  useEffect(() => {
    fetch('http://localhost:3001/questions')
      .then(res => res.json())
      .then(data => setQuestions(data))
  }, [])

  if (questions.length === 0) return <p>Loading...</p>

  // ---- SCORE SCREEN ----
  if (finished) {
    const avg = getRatingAverage()
    return (
      <div style={{ padding: '20px' }}>
        <h1>Quiz completed!</h1>
        <p>Score : {score} / {questions.length}</p>
        <p>Rating Average: {avg} / 5</p>
        {score < questions.length && (
          <button onClick={retake}>Retake</button>
        )}
      </div>
    )
  }

  // ---- QUESTION SCREEN ----
  const current = questions[currentIndex]

  const getColor = (index) => {
    if (selectedAnswer === null) return 'white'
    if (index === current.correctAnswer) return 'green'
    if (index === selectedAnswer) return 'red'
    return 'white'
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Take the Quiz</h2>
      <p><strong>Question {currentIndex + 1} / {questions.length}</strong></p>
      <p>{current.question}</p>

      {current.options.map((option, index) => (
        <div
          key={index}
          onClick={() => selectedAnswer === null && selectAnswer(index)}
          style={{
            backgroundColor: getColor(index),
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '8px',
            cursor: selectedAnswer === null ? 'pointer' : 'default',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          {option}
        </div>
      ))}

      {/* RATING */}
      <div style={{ marginTop: '15px' }}>
        <span>Rate question : </span>
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            onClick={() => rateQuestion(current.id, star)}
            style={{
              cursor: 'pointer',
              fontSize: '20px',
              color: ratings[current.id] >= star ? 'gold' : 'gray',
              marginRight: '4px'
            }}
          >
            ★
          </span>
        ))}
        {ratings[current.id] && (
          <span>({ratings[current.id]}/5)</span>
        )}
      </div>

      {/* NEXT BUTTON */}
      {selectedAnswer !== null && (
        <button onClick={nextQuestion} style={{ marginTop: '15px' }}>
          Next
        </button>
      )}
    </div>
  )
}

export default Quiz