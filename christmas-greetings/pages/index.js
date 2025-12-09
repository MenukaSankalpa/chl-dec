import { useEffect, useState, useRef } from 'react';
import GreetingForm from '../components/GreetingForm';
import GreetingCard from '../components/GreetingCard';
import Background from '../components/Background';
import FestiveAnimation from '../components/FestiveAnimation';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const trackAudioRef = useRef(null);
  const submitAudioRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const loadMessages = async () => {
    try {
      const res = await fetch('/api/greetings');
      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error('Failed to load messages', err);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    if (!trackAudioRef.current) {
      trackAudioRef.current = new Audio('/track01.mp3');
      trackAudioRef.current.loop = true;
      trackAudioRef.current.volume = 0.2;
      trackAudioRef.current.play().catch(() => {});
    }
  }, []);

  const handleFormDone = () => {
    if (trackAudioRef.current) trackAudioRef.current.pause();
    if (!submitAudioRef.current) {
      submitAudioRef.current = new Audio('/music.mp3');
      submitAudioRef.current.loop = true;
      submitAudioRef.current.volume = 0.2;
    }
    submitAudioRef.current.play().catch(() => {});
    setSubmitted(true);
    loadMessages();
  };

  return (
    <div className="relative min-h-screen px-4 py-10">
      <Background darkMode={darkMode} showSnow={!submitted} />
      <FestiveAnimation show={!submitted} darkMode={darkMode} />

      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded bg-white/20 dark:bg-black/20 text-white hover:scale-105 transition"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {!submitted ? (
        <GreetingForm onDone={handleFormDone} darkMode={darkMode} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {messages.map((msg, idx) => (
            <GreetingCard key={msg._id} g={msg} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
