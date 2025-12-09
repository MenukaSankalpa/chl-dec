import { useEffect, useState, useRef } from 'react'
import GreetingForm from '../components/GreetingForm'
import GreetingCard from '../components/GreetingCard'
import FestiveAnimation from '../components/FestiveAnimation'
import Background from '../components/Background'

export default function Home() {
  const [list, setList] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const audioRef = useRef(null) // audio instance

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const load = async () => {
    const r = await fetch('/api/greetings')
    setList(await r.json())
  }
  useEffect(() => { load() }, [])

  const handleFormDone = () => {
    // Play music after form submission
    if (!audioRef.current) {
      audioRef.current = new Audio('/track1.mp3') // put your track1.mp3 in public folder
      audioRef.current.loop = true
      audioRef.current.volume = 0.2
    }
    audioRef.current.play().catch(() => {})
    setSubmitted(true)
  }

  return (
    <div className="relative min-h-screen px-4 py-10 overflow-hidden">
      {/* Background */}
      <Background darkMode={darkMode} className="-z-20 fixed inset-0" showSnow={!submitted} />

      {/* Snow + Flying Icons */}
      <FestiveAnimation show={!submitted} darkMode={darkMode} />

      {/* Dark/Light toggle */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded bg-white/20 dark:bg-black/20 text-white"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {!submitted ? (
        <GreetingForm onDone={handleFormDone} darkMode={darkMode} />
      ) : (
        <div className="relative w-full h-[90vh] overflow-hidden">
          {list.map(g => <GreetingCard key={g._id} g={g} darkMode={darkMode} />)}
        </div>
      )}
    </div>
  )
}
