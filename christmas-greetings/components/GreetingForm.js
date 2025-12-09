import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Package, Coffee } from 'lucide-react';

export default function GreetingForm({ onDone, darkMode }) {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !message.trim()) {
      setError('Please enter your name and message');
      return;
    }

    try {
      setLoading(true);
      await fetch('/api/greetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, designation, message }),
      });

      confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 } });
      onDone();
    } catch (err) {
      setError('Something went wrong. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className={`max-w-xl mx-auto p-8 rounded-3xl backdrop-blur-xl border border-white/10 shadow-[0_0_80px_rgba(124,58,237,0.35)] space-y-5 animate-fadeIn
        ${darkMode ? 'bg-white/10 text-white' : 'bg-white/50 text-black'}`}
    >
      <div className="flex items-center justify-center space-x-3 text-center">
        <Sparkles size={36} className={darkMode ? 'text-yellow-400 animate-pulse' : 'text-pink-500 animate-pulse'} />
        <h1 className="text-4xl font-bold tracking-wide">Share Your Wish</h1>
        <Heart size={36} className={darkMode ? 'text-red-400 animate-pulse' : 'text-green-500 animate-pulse'} />
      </div>

      {error && <div className="text-red-400 text-center">{error}</div>}

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`w-full p-3 rounded-xl border outline-none focus:ring-2
          ${darkMode ? 'bg-black/40 border-white/10 text-white focus:ring-purple-600' : 'bg-white/50 border-purple-300 text-black focus:ring-purple-800'}`}
      />

      <input
        type="text"
        placeholder="Role / Title (optional)"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
        className={`w-full p-3 rounded-xl border outline-none focus:ring-2
          ${darkMode ? 'bg-black/40 border-white/10 text-white focus:ring-purple-600' : 'bg-white/50 border-purple-300 text-black focus:ring-purple-800'}`}
      />

      <textarea
        rows="4"
        placeholder="Write something beautiful..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`w-full p-3 rounded-xl border outline-none focus:ring-2 resize-none
          ${darkMode ? 'bg-black/40 border-white/10 text-white focus:ring-purple-600' : 'bg-white/50 border-purple-300 text-black focus:ring-purple-800'}`}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 font-semibold text-white tracking-wide hover:scale-[1.03] transition disabled:opacity-50 flex items-center justify-center space-x-2"
      >
        {loading ? 'Sending...' : (
          <>
            <Package size={22} className="animate-bounce text-white/80" />
            <span>Send Your Wish</span>
            <Coffee size={22} className="animate-bounce text-white/80" />
          </>
        )}
      </button>
    </form>
  );
}
