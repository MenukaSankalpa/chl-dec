'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Greeting {
  _id: string;
  name: string;
  designation: string;
  message: string;
  createdAt: string;
}

export default function Home() {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [message, setMessage] = useState('');
  const [greetings, setGreetings] = useState<Greeting[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGreetings();
  }, []);

  const fetchGreetings = async () => {
    try {
      const response = await fetch('/api/greetings');
      if (response.ok) {
        const data = await response.json();
        setGreetings(data.greetings);
      }
    } catch (err) {
      console.error('Failed to fetch greetings:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/greetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, designation, message }),
      });

      if (response.ok) {
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        // Reset form
        setName('');
        setDesignation('');
        setMessage('');

        // Refresh greetings
        fetchGreetings();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to submit greeting');
      }
    } catch (err) {
      setError('Failed to submit greeting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-4">
            🎄 Christmas Greetings
          </h1>
          <p className="text-xl text-gray-600">
            Share your holiday wishes with everyone!
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12 border-2 border-red-100"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Send Your Greeting
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={100}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                htmlFor="designation"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Designation
              </label>
              <input
                type="text"
                id="designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
                maxLength={100}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                placeholder="Enter your designation"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Greeting Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                maxLength={500}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
                placeholder="Write your Christmas greeting..."
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-green-500 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-green-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Sending...' : '🎅 Send Greeting'}
            </button>
          </form>
        </motion.div>

        {/* Greetings List */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Recent Greetings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {greetings.map((greeting, index) => (
                <motion.div
                  key={greeting._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {greeting.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {greeting.designation}
                      </p>
                    </div>
                    <span className="text-2xl">🎄</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {greeting.message}
                  </p>
                  <div className="mt-4 text-xs text-gray-400">
                    {new Date(greeting.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {greetings.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 py-12"
            >
              <p className="text-xl">No greetings yet. Be the first to share!</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
