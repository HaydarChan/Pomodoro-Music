// Library Import
import { useEffect, useRef, useState } from "react";
// Background Asset Import
import Background from "./assets/background/background.png";
import Gif1 from "./assets/background/gif2 (2).gif"
import Gif2 from "./assets/background/gif2 (3).gif"
import Gif5 from "./assets/background/gif5.gif"
import Gif6 from "./assets/background/gif6.gif"
import Gif7 from "./assets/background/gif7.gif"
// Icon Asset Import
import BackIcon from "./assets/icons/Group 35.svg"
import PauseIcon from "./assets/icons/Group 36.svg"
import RestartIcon from "./assets/icons/Group 38.svg"
import Gallery from "./assets/icons/gallery.svg";
import PlayWhiteIcon from "./assets/icons/playwhite.svg"
import PauseSlate from "./assets/icons/pauseslate.svg"
import PlaySlate from "./assets/icons/playslate.svg"
// Song Asset Import
import Marilag from "./assets/covers/marilag.jpeg"
import Blue from "./assets/covers/blue.jpeg"
import SweatShirt from "./assets/covers/sweatshirt.jpeg"
import MarilagSong from "./assets/songs/Dionela - Marilag (Official Lyric Video).mp3"
import BlueSong from "./assets/songs/yung kai - blue (Official Audio).mp3"
import SweatShirtSong from "./assets/songs/Patrick Hizon & EJEAN - Sweatshirt (Lyric Video).mp3"

const backgroundData = [
  { 
    id: 1,
    background: Background 
  },
  { 
    id: 2,
    background: Gif7 
  },
  { 
    id: 3,
    background: Gif2 
  },
  { 
    id: 6,
    background: Gif5
  },
  { 
    id: 7,
    background: Gif6
  }
]

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

const musicData = [
  {
    id: 1,
    name: "Blue - Yung Kai",
    song: BlueSong,
    thumbnail: Blue
  },
  {
    id: 2,
    name: "Marilag - Dionela",
    song: MarilagSong,
    thumbnail: Marilag
  },
  {
    id: 3,
    name: "Sweatshirt",
    song: SweatShirtSong,
    thumbnail: SweatShirt
  }
]

function App(): JSX.Element {
  const [mode, setMode] = useState("Pomodoro")
  const [isPlayed, setIsPlayed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(modeOption[0].time);
  const [backgroundImg, setBackgroundImg] = useState(Gif1)
  const [bgIndex, setBgIndex] = useState(0);
  const [isSongPlayed, setIsSongPlayed] = useState(false)
  const [playedSong, setPlayedSong] = useState(musicData[0])

  const changeBackground = () => {
    setBgIndex((prev) => (prev + 1) % backgroundData.length);
    setBackgroundImg(backgroundData[bgIndex].background);
  };

  useEffect(() => {
    const selectedMode = modeOption.find((item) => item.name === mode);
    if (selectedMode) setTimeLeft(selectedMode.time);
  }, [mode]);

  useEffect(() => {
    if (!isPlayed || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlayed, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isSongPlayed) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsSongPlayed(!isSongPlayed);
  };

  const changeSong = (direction: "prev" | "next") => {
    const currentIndex = musicData.findIndex((song) => song.id === playedSong.id);
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % musicData.length
        : (currentIndex - 1 + musicData.length) % musicData.length;

    setPlayedSong(musicData[newIndex]);
    setIsSongPlayed(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [playedSong]);

  return (
    <div className="w-[625px] h-[450px] relative overflow-hidden flex flex-col items-center justify-center gap-y-6">
      <div 
        className="bg-white/10 rounded-md absolute top-4 right-4 p-2 cursor-pointer"
        onClick={changeBackground}
      >
        <img src={Gallery} className="w-4 h-4 text-white" />
      </div>
      
      <img 
        className="w-full h-full object-cover brightness-100 absolute -z-20"
        src={backgroundImg}
        alt="Background"
      />
      <div className="absolute inset-0 backdrop-brightness-80 -z-10" />

      <h1 className="font-preahvihear text-white text-3xl">Pomodoro Music</h1>

      <div className="flex flex-col items-center w-full justify-center -gap-y-6">
        <div className="flex items-center justify-between gap-x-[12px] z-20">
          {modeOption.map((item) => {
            return (
              <button 
                className={`cursor-pointer rounded-full px-4 py-[2px] font-jakarta text-sm border-white border-2
                  ${ mode === item.name ? "bg-white text-slate-600" : "text-white"}
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
        <div className="flex items-center justify-between gap-x-[12px]">
          <button
            className="flex items-center gap-x-2 cursor-pointer rounded-full px-4 py-[2px] font-jakarta text-sm border-white border-2 bg-white text-slate-600 font-jakarta"
            onClick={() => setIsPlayed(!isPlayed)}
          >
            <img src={isPlayed ? PauseSlate : PlaySlate} className="w-4 h-4" />
            {isPlayed ? "Pause" : "Start"}
          </button>
          <button
            className="flex items-center gap-x-2 cursor-pointer rounded-full px-4 py-[2px] font-jakarta text-sm border-white border-2 text-white font-jakarta"
            onClick={() => {
              const selectedMode = modeOption.find((item) => item.name === mode);
              if (selectedMode) {
                setTimeLeft(selectedMode.time);
                setIsPlayed(false);
              }
            }}
          >
            <img src={RestartIcon} className="w-4 h-4" />
            Restart
          </button>
        </div>
      </div>
  
      <div className="rounded-[16px] bg-white/10 p-[12px] pr-[20px] flex items-start justify-start gap-x-4">
          <img src={playedSong.thumbnail} className="rounded-[12px] h-22 w-22" />
          <div className="flex items-start flex-col">
            <p className="font-preahvihear text-xs text-white">Now Playing</p>
            <p className="text-3xl font-reenie text-white">{playedSong.name}</p>
            <div className="mt-2 w-full flex items-center justify-center gap-x-8">
              <img 
                src={BackIcon}
                className="w-4 h-4 cursor-pointer"
                onClick={() => changeSong("prev")}
              />
              <div className="bg-white/10 rounded-full p-2" onClick={togglePlayPause}>
                <img src={isSongPlayed ? PauseIcon : PlayWhiteIcon} className="w-4 h-4 cursor-pointer" />
                </div>
              <img 
                src={BackIcon}
                className="w-4 h-4 rotate-180 cursor-pointer"
                onClick={() => changeSong("next")}
              />
            </div>
          </div>
      </div>

      <audio ref={audioRef} src={playedSong.song} />
    </div>
  );
}

export default App;
