export default function GreetingCard({ g, darkMode }) {
  const top = Math.random() * 80 + '%'
  const left = Math.random() * 80 + '%'
  const zIndex = Math.floor(Math.random() * 100)

  return (
    <div
      style={{ top, left, zIndex }}
      className={`absolute p-6 rounded-3xl backdrop-blur-xl border border-white/10
        animate-fadeIn animate-cardBlink hover:scale-[1.05] transition-all duration-300
        ${darkMode ? 'bg-white/10 text-white' : 'bg-white/50 text-black'}`}
    >
      <div className="text-lg font-semibold">{g.name}</div>
      {g.designation && <div className="text-sm text-gray-600">{g.designation}</div>}
      <p className="mt-3">{g.message}</p>
    </div>
  )
}
