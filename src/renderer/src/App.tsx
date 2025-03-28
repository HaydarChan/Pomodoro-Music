import { useEffect, useState } from "react";
import Background from "./assets/background.png";

const modeOption = [
  {
    name: "Pomodoro",
    time: 25 * 60 
  },
  {
    name: "Long Break",
    time: 15 * 60 
  },
  {
    name: "Short Break",
    time: 5 * 60 
  }
]

function App(): JSX.Element {
  const [mode, setMode] = useState("Pomodoro")

  const [timeLeft, setTimeLeft] = useState(modeOption[0].time);

  useEffect(() => {
    // Reset timer when mode changes
    const selectedMode = modeOption.find((item) => item.name === mode);
    if (selectedMode) setTimeLeft(selectedMode.time);
  }, [mode]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-[625px] h-[400px] relative overflow-hidden flex flex-col items-center justify-center gap-y-4">
      <img 
        className="w-full h-full object-cover brightness-110 absolute -z-20"
        src={Background}
        alt="Background"
      />
      <div className="absolute inset-0 bg-black/30 mix-blend-overlay -z-10" />
      <h1 className="font-preahvihear text-white text-3xl">Pomodoro Music</h1>
      <div className="flex items-center justify-between gap-x-[20px]">
        {modeOption.map((item) => {
          return (
            <button 
              className={`cursor-pointer rounded-full px-4 py-[2px] font-jakarta text-sm border-white border-2
                ${ mode === item.name ? "bg-white text-[#DC7395]" : "text-white"}
              `}
              onClick={() => setMode(item.name)}
            >
              {item.name}
            </button>
          )
        })}
      </div>
      <div>
        <p className="text-white font-preahvihear text-[100px]">{formatTime(timeLeft)}</p>
      </div>
    </div>
  );
}

export default App;
