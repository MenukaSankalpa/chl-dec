import { useState } from 'react'
import confetti from 'canvas-confetti'


export default function GreetingForm({ refresh }) {
const [name, setName] = useState('')
const [designation, setDesignation] = useState('')
const [message, setMessage] = useState('')


async function submit(e) {
e.preventDefault()


await fetch('/api/greetings', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ name, designation, message })
})


confetti({ particleCount: 120, spread: 80 })


setName(''); setDesignation(''); setMessage('')
refresh()
}


return (
<form onSubmit={submit} className="bg-white/10 backdrop-blur p-6 rounded-2xl space-y-4">
<h2 className="text-2xl font-bold">🎄 Send a Christmas Wish</h2>


<input className="w-full p-3 rounded bg-black/30" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
<input className="w-full p-3 rounded bg-black/30" placeholder="Designation (optional)" value={designation} onChange={e=>setDesignation(e.target.value)} />
<textarea className="w-full p-3 rounded bg-black/30" rows="4" placeholder="Your greeting message..." value={message} onChange={e=>setMessage(e.target.value)} />


<button className="w-full bg-christmasRed hover:opacity-90 py-3 rounded-xl font-semibold">
Send Greeting
</button>
</form>
)
}