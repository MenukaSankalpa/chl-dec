import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('christmas-greetings');
    const greetings = await db
      .collection('greetings')
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({ greetings }, { status: 200 });
  } catch (error) {
    console.error('GET /api/greetings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch greetings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, designation, message } = body;

    // Validation
    if (!name || !designation || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (name.length > 100 || designation.length > 100 || message.length > 500) {
      return NextResponse.json(
        { error: 'Field length exceeded' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('christmas-greetings');

    const greeting = {
      name: name.trim(),
      designation: designation.trim(),
      message: message.trim(),
      createdAt: new Date(),
    };

    const result = await db.collection('greetings').insertOne(greeting);

    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/greetings error:', error);
    return NextResponse.json(
      { error: 'Failed to save greeting' },
      { status: 500 }
    );
  }
}
