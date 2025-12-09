import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('christmas-greetings');

    if (req.method === 'GET') {
      const greetings = await db.collection('greetings').find({}).sort({ _id: -1 }).toArray();
      return res.status(200).json(greetings);
    }

    if (req.method === 'POST') {
      const { name, designation, message } = req.body;
      if (!name || !message) return res.status(400).json({ error: 'Name and message are required' });

      const result = await db.collection('greetings').insertOne({ name, designation, message });
      return res.status(201).json({ _id: result.insertedId, name, designation, message });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
