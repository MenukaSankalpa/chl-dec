export default function FestiveAnimation({ show, darkMode }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-visible">
      {Array.from({ length: 150 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 rounded-full animate-fall ${darkMode ? 'bg-white' : 'bg-purple-600'}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * -100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  )
}
