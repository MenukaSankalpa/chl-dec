import { useEffect, useState, useRef } from 'react';
import GreetingForm from '../components/GreetingForm';
import GreetingCard from '../components/GreetingCard';
import Background from '../components/Background';
import FestiveAnimation from '../components/FestiveAnimation';

export default function Home() {
  const [list, setList] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const trackAudioRef = useRef(null); // track01.mp3
  const submitAudioRef = useRef(null); // music.mp3

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Load greetings from API
  const loadGreetings = async () => {
    try {
      const res = await fetch('/api/greetings');
      if (!res.ok) throw new Error('Failed to fetch greetings');
      const data = await res.json();
      setList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadGreetings();
  }, []);

  // Play track01 when form loads
  useEffect(() => {
    if (!trackAudioRef.current) {
      trackAudioRef.current = new Audio('/track01.mp3');
      trackAudioRef.current.loop = true;
      trackAudioRef.current.volume = 0.2;
      trackAudioRef.current.play().catch(() => {});
    }
  }, []);

  const handleFormDone = () => {
    // Stop track01 and play music.mp3
    if (trackAudioRef.current) trackAudioRef.current.pause();

    if (!submitAudioRef.current) {
      submitAudioRef.current = new Audio('/music.mp3');
      submitAudioRef.current.loop = true;
      submitAudioRef.current.volume = 0.2;
    }
    submitAudioRef.current.play().catch(() => {});

    setSubmitted(true);
    loadGreetings(); // reload saved greetings
  };

  return (
    <div className="relative min-h-screen px-4 py-10 overflow-hidden">
      {/* Background */}
      <Background darkMode={darkMode} showSnow={!submitted} />

      {/* Snow + flying effects */}
      <FestiveAnimation show={!submitted} darkMode={darkMode} />

      {/* Dark/Light toggle */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded bg-white/20 dark:bg-black/20 text-white"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Form or greetings */}
      {!submitted ? (
        <GreetingForm onDone={handleFormDone} darkMode={darkMode} />
      ) : (
        <div className="relative w-full h-[90vh]">
          {list.map((g, idx) => (
            <GreetingCard key={g._id} g={g} darkMode={darkMode} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
