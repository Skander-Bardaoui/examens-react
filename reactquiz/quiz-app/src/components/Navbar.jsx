import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/home">Home</Link> |{' '}
      <Link to="/question/add">Manage questions</Link> |{' '}
      <Link to="/quizz">Take a quiz</Link>
    </nav>
  )
}

export default Navbar