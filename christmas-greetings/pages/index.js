import { useEffect, useState, useRef } from 'react'
import GreetingForm from '../components/GreetingForm'
import GreetingCard from '../components/GreetingCard'
import FestiveAnimation from '../components/FestiveAnimation'
import Background from '../components/Background'

export default function Home() {
  const [list, setList] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  // ✅ Audio refs
  const formAudioRef = useRef(null)
  const submitAudioRef = useRef(null)

  // Load greetings
  const load = async () => {
    const r = await fetch('/api/greetings')
    setList(await r.json())
  }
  useEffect(() => { load() }, [])

  // Set dark/light mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  // Play track01 on form load
  useEffect(() => {
    if (!submitted && formAudioRef.current) {
      formAudioRef.current.play().catch(() => {})
    }
  }, [submitted])

  const handleFormDone = () => {
    // Stop form music
    if (formAudioRef.current) formAudioRef.current.pause()

    // Play music after submission
    if (submitAudioRef.current) {
      submitAudioRef.current.play().catch(() => {})
    }

    setSubmitted(true)
  }

  return (
    <div className="relative min-h-screen px-4 py-10 overflow-hidden">
      
      {/* Audio Elements */}
      <audio ref={formAudioRef} src="/track01.mp3" loop preload="auto" />
      <audio ref={submitAudioRef} src="/music.mp3" loop preload="auto" />

      {/* Background */}
      <Background darkMode={darkMode} showSnow={!submitted} />

      {/* Snow + flying icons */}
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

      {/* Form or Cards */}
      {!submitted ? (
        <GreetingForm onDone={handleFormDone} darkMode={darkMode} />
      ) : (
        <div className="relative w-full h-[90vh]">
          {list.map((g, idx) => (
            <GreetingCard key={g._id || idx} g={g} darkMode={darkMode} index={idx} />
          ))}
        </div>
      )}
    </div>
  )
}
