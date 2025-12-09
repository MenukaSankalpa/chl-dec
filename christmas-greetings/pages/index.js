import { useEffect, useState, useRef } from 'react'
import GreetingForm from '../components/GreetingForm'
import GreetingCard from '../components/GreetingCard'
import FestiveAnimation from '../components/FestiveAnimation'
import Background from '../components/Background'

export default function Home() {
  const [list, setList] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  // ✅ SINGLE audio instance for whole app
  const audioRef = useRef(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const load = async () => {
    const r = await fetch('/api/greetings')
    setList(await r.json())
  }
  useEffect(() => { load() }, [])

  // ✅ plays music after SUBMIT (user gesture)
  const handleFormDone = async () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('/track01.mp3') // ✅ correct path
        audioRef.current.loop = true
        audioRef.current.volume = 0.3
      }
      await audioRef.current.play()
    } catch (e) {
      console.error('Audio failed:', e)
    }

    setSubmitted(true)
  }

  return (
    <div className="relative min-h-screen px-4 py-10 overflow-hidden">
      <Background darkMode={darkMode} showSnow={!submitted} />
      <FestiveAnimation show={!submitted} darkMode={darkMode} />

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
          {list.map(g => (
            <GreetingCard key={g._id} g={g} darkMode={darkMode} />
          ))}
        </div>
      )}
    </div>
  )
}
