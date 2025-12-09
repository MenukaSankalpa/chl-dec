const usedPositions = []

export default function GreetingCard({ g, darkMode, index }) {
  // Generate random non-overlapping positions
  let top, left
  let attempts = 0
  do {
    top = Math.random() * 70
    left = Math.random() * 70
    attempts++
  } while (usedPositions.some(p => Math.abs(p.top - top) < 12 && Math.abs(p.left - left) < 12) && attempts < 100)
  usedPositions.push({ top, left })

  // Random color
  const colors = ['bg-red-500/30', 'bg-green-500/30', 'bg-white/30']
  const borderColors = ['border-red-400', 'border-green-400', 'border-white/40']
  const idx = index % 3

  return (
    <div
      style={{ top: `${top}%`, left: `${left}%`, zIndex: index + 10 }}
      className={`absolute p-6 rounded-3xl backdrop-blur-xl border ${borderColors[idx]} animate-fadeIn hover:scale-[1.05] transition
        ${colors[idx]} text-white w-72 shadow-xl`}
    >
      <div className="text-lg font-semibold">{g.name}</div>
      {g.designation && <div className="text-sm">{g.designation}</div>}
      <p className="mt-3">{g.message}</p>
    </div>
  )
}
