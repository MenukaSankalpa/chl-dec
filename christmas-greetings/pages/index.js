import { useEffect, useState } from 'react'
import GreetingForm from '../components/GreetingForm'
import GreetingCard from '../components/GreetingCard'


export default function Home() {
const [list, setList] = useState([])


const load = async () => {
const r = await fetch('/api/greetings')
setList(await r.json())
}


useEffect(() => { load() }, [])


return (
<div className="min-h-screen p-4 md:p-12 max-w-6xl mx-auto">
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<GreetingForm refresh={load} />


<div className="space-y-4">
<h2 className="text-xl font-semibold">🎁 All Greetings</h2>
{list.map(g => <GreetingCard key={g._id} g={g} />)}
</div>
</div>
</div>
)
}