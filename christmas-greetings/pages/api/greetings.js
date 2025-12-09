import clientPromise from '../../lib/mongodb'


export default async function handler(req, res) {
const client = await clientPromise
const db = client.db('christmas_greetings')
const collection = db.collection('messages')


if (req.method === 'GET') {
const data = await collection.find({}).sort({ createdAt: -1 }).toArray()
res.json(data)
}


if (req.method === 'POST') {
const { name, designation, message } = req.body
if (!name || !message) return res.status(400).json({ error: 'Missing fields' })


await collection.insertOne({
name,
designation,
message,
createdAt: new Date()
})


res.status(201).json({ ok: true })
}
}