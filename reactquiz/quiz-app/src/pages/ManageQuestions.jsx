import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// ---- ZOD SCHEMA ----
const schema = z.object({
  question: z.string().min(1, 'Question is required'),
  option1: z.string().min(1, 'Option 1 is required'),
  option2: z.string().min(1, 'Option 2 is required'),
  option3: z.string().min(1, 'Option 3 is required'),
  correctAnswer: z.coerce
    .number()
    .min(0, 'Min value is 0')
    .max(2, 'Max value is 2'),
  subject: z.string().min(1, 'Please select a subject'),
})

function ManageQuestions() {
  const [questions, setQuestions] = useState([])
  const [subjects, setSubjects] = useState([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { correctAnswer: 0 },
  })

  // Fetch questions on mount
  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = () => {
    fetch('http://localhost:3001/questions')
      .then(res => res.json())
      .then(data => {
        setQuestions(data)
        // Extract unique subjects
        const unique = [...new Set(data.map(q => q.subject))]
        setSubjects(unique)
      })
  }

  // Submit form
  const onSubmit = (data) => {
    const newQuestion = {
      question: data.question,
      options: [data.option1, data.option2, data.option3],
      correctAnswer: data.correctAnswer,
      subject: data.subject,
    }

    fetch('http://localhost:3001/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuestion),
    })
      .then(res => res.json())
      .then(() => {
        reset()
        fetchQuestions()
      })
  }

  // Delete question
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/questions/${id}`, {
      method: 'DELETE',
    }).then(() => fetchQuestions())
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Manage Questions</h1>

      {/* ---- FORM ---- */}
      <div style={{
        maxWidth: '400px',
        margin: '0 auto',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <h2 style={{ textAlign: 'center' }}>Add a new question</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Question */}
          <div style={{ marginBottom: '12px' }}>
            <label>Question :</label>
            <input
              {...register('question')}
              style={{ display: 'block', width: '100%', padding: '6px' }}
            />
            {errors.question && (
              <p style={{ color: 'red' }}>{errors.question.message}</p>
            )}
          </div>

          {/* Options */}
          <div style={{ marginBottom: '12px' }}>
            <label>Options:</label>
            {['option1', 'option2', 'option3'].map((opt, i) => (
              <div key={opt}>
                <input
                  {...register(opt)}
                  placeholder={`Option ${i + 1}`}
                  style={{ display: 'block', width: '100%', padding: '6px', marginTop: '6px' }}
                />
                {errors[opt] && (
                  <p style={{ color: 'red' }}>{errors[opt].message}</p>
                )}
              </div>
            ))}
          </div>

          {/* Correct Answer */}
          <div style={{ marginBottom: '12px' }}>
            <label>Correct Answer (index from 0 to 2) :</label>
            <input
              type="number"
              {...register('correctAnswer')}
              style={{ display: 'block', width: '80px', padding: '6px', marginTop: '6px' }}
            />
            {errors.correctAnswer && (
              <p style={{ color: 'red' }}>{errors.correctAnswer.message}</p>
            )}
          </div>

          {/* Subject dropdown */}
          <div style={{ marginBottom: '12px' }}>
            <label>Subject:</label>
            <select
              {...register('subject')}
              style={{ display: 'block', width: '100%', padding: '6px', marginTop: '6px' }}
            >
              <option value="">--Select Subject--</option>
              {subjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
            {errors.subject && (
              <p style={{ color: 'red' }}>{errors.subject.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add question
          </button>

        </form>
      </div>

      {/* ---- QUESTIONS LIST ---- */}
      <div style={{ maxWidth: '600px', margin: '30px auto' }}>
        <h2>Existing Questions</h2>
        {questions.map(q => (
          <div key={q.id} style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '6px'
          }}>
            <p><strong>{q.question}</strong></p>
            <p>Subject: {q.subject}</p>
            <p>Options: {q.options.join(' | ')}</p>
            <p>Correct Answer: option {q.correctAnswer + 1}</p>
            <button
              onClick={() => handleDelete(q.id)}
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}
export default ManageQuestions