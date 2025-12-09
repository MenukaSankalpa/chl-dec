import { useEffect } from 'react'

export default function Background({ showSnow, musicOn, darkMode }) {
  useEffect(() => {
    if (musicOn) {
      const audio = new Audio('/music.mp3') // add your music in public folder
      audio.loop = true
      audio.volume = 0.2
      const playAudio = () => { audio.play().catch(() => {}); document.removeEventListener('click', playAudio) }
      document.addEventListener('click', playAudio)
    }
  }, [musicOn])

  return (
    <div className="fixed inset-0 -z-20">
      {/* Snow */}
      {showSnow && Array.from({ length: 200 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 rounded-full animate-fall ${darkMode ? 'bg-white' : 'bg-purple-600'}`}
          style={{
            left: `${Math.random()*100}%`,
            top: `${Math.random()*-100}%`,
            animationDelay: `${Math.random()*10}s`,
            animationDuration: `${5 + Math.random()*10}s`
          }}
        />
      ))}

      {/* Random blinking lights */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-3 h-3 rounded-full animate-blink ${darkMode ? 'bg-yellow-400' : 'bg-red-500'}`}
          style={{
            left: `${Math.random()*100}%`,
            top: `${Math.random()*100}%`,
            animationDelay: `${Math.random()*2}s`
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className={`absolute inset-0 ${darkMode ? 'bg-black/20' : 'bg-purple-50/20'}`}></div>
    </div>
  )
}
