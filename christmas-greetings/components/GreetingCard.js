export default function GreetingCard({ g }) {
return (
<div className="bg-white/10 p-4 rounded-xl">
<div className="font-bold">{g.name}</div>
<div className="text-sm text-gray-300">{g.designation}</div>
<p className="mt-2">{g.message}</p>
</div>
)
}