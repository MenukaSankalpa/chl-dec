import { useEffect, useState } from 'react'

export default function FestiveAnimation({ show, darkMode, musicOn }) {
  const [audioPlayed, setAudioPlayed] = useState(false)

  // Play music if enabled
  useEffect(() => {
    if (musicOn && !audioPlayed) {
      const audio = new Audio('/music.mp3') // put music.mp3 in /public
      audio.loop = true
      audio.volume = 0.2
      const playAudio = () => {
        audio.play().catch(() => {})
        setAudioPlayed(true)
        document.removeEventListener('click', playAudio)
      }
      document.addEventListener('click', playAudio)
    }
  }, [musicOn, audioPlayed])

  if (!show) return null

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-visible">
      {/* Snow particles */}
      {Array.from({ length: 150 }).map((_, i) => (
        <div
          key={`snow-${i}`}
          className={`absolute w-2 h-2 rounded-full animate-fall ${darkMode ? 'bg-white' : 'bg-purple-600'}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * -100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}

      {/* Optional: You can add blinking lights or other effects here */}
    </div>
  )
}
