import { create } from 'zustand'

const useQuizStore = create((set, get) => ({
  questions: [],
  currentIndex: 0,
  score: 0,
  selectedAnswer: null,
  finished: false,
  ratings: {},

  setQuestions: (questions) => set({ questions }),

  selectAnswer: (index) => {
    const { questions, currentIndex, score } = get()
    const current = questions[currentIndex]
    const isCorrect = index === current.correctAnswer
    set({
      selectedAnswer: index,
      score: isCorrect ? score + 1 : score,
    })
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get()
    if (currentIndex + 1 >= questions.length) {
      set({ finished: true })
    } else {
      set({ currentIndex: currentIndex + 1, selectedAnswer: null })
    }
  },

  retake: () => set({
    currentIndex: 0,
    score: 0,
    selectedAnswer: null,
    finished: false,
    ratings: {},
  }),

  rateQuestion: (questionId, rating) => {
    const { ratings } = get()
    set({ ratings: { ...ratings, [questionId]: rating } })
  },

  getRatingAverage: () => {
    const { ratings, questions } = get()
    const rated = questions.filter(q => ratings[q.id] !== undefined)
    if (rated.length === 0) return 0
    const sum = rated.reduce((acc, q) => acc + ratings[q.id], 0)
    return sum / rated.length
  },
}))

export default useQuizStore