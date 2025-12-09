export default function GreetingCard({ g, index }) {
  const bgColors = [
    'bg-red-500/30',
    'bg-green-500/30',
    'bg-white/30',
    'bg-gradient-to-br from-red-400/30 via-white/20 to-green-400/30',
    'bg-gradient-to-br from-green-400/30 via-white/20 to-red-400/30'
  ];
  const borderColors = [
    'border-red-400',
    'border-green-400',
    'border-white/40',
    'border-red-300',
    'border-green-300'
  ];
  const colorIdx = index % bgColors.length;

  return (
    <div
      className={`p-6 rounded-3xl backdrop-blur-xl border ${borderColors[colorIdx]} animate-fadeIn
        hover:scale-[1.05] transition w-full shadow-xl ${bgColors[colorIdx]} text-white`}
    >
      <div className="text-lg font-bold">{g.name}</div>
      {g.designation && <div className="text-sm italic mt-1">{g.designation}</div>}
      <p className="mt-3 line-clamp-3">{g.message}</p>
    </div>
  );
}
