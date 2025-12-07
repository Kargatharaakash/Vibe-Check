
import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Waves, Activity } from 'lucide-react';

interface Props {
  metrics: {
    innovation: number;
    walkability: number;
    safety: number;
    community: number;
    affluence: number;
  };
  vibeDescription: string;
}

export const SoundscapePlayer: React.FC<Props> = ({ metrics, vibeDescription }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  // Initialize Audio Context
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContext();
      
      // Master Gain
      masterGainRef.current = audioCtxRef.current.createGain();
      masterGainRef.current.gain.value = volume;
      masterGainRef.current.connect(audioCtxRef.current.destination);

      // Analyser
      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      masterGainRef.current.connect(analyserRef.current);
    }
  };

  // Generate Noise (City Rumble)
  const createNoise = () => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    
    const bufferSize = audioCtxRef.current.sampleRate * 2; // 2 seconds buffer
    const buffer = audioCtxRef.current.createBuffer(1, bufferSize, audioCtxRef.current.sampleRate);
    const data = buffer.getChannelData(0);

    // Brown Noise (Lower frequency, rumbly)
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Compensate for gain
    }

    const noise = audioCtxRef.current.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    
    // Filter the noise based on "Safety" (Safer = less rumble, Gritty = more rumble)
    const filter = audioCtxRef.current.createBiquadFilter();
    filter.type = 'lowpass';
    // Safety 0 = 100Hz (Deep rumble), Safety 100 = 800Hz (Lighter)
    filter.frequency.value = 100 + (metrics.safety * 5); 

    const noiseGain = audioCtxRef.current.createGain();
    // Affluence 100 = Quieter noise, Affluence 0 = Louder street noise
    noiseGain.gain.value = 0.15 - (metrics.affluence / 1000); 

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(masterGainRef.current);
    
    noise.start();
    noiseNodeRef.current = noise;
  };

  // Create Tonal Drone (The "Vibe")
  const createDrone = () => {
    if (!audioCtxRef.current || !masterGainRef.current) return;

    // Base frequency mapping
    // Innovation -> Pitch (High innovation = Higher tech pitch)
    // Community -> Harmony (High community = Major chords, Low = Dissonant)
    
    const baseFreq = 100 + (metrics.innovation * 2); 
    const isMajor = metrics.community > 50;

    const chord = isMajor 
        ? [baseFreq, baseFreq * 1.25, baseFreq * 1.5] // Major Triad
        : [baseFreq, baseFreq * 1.2, baseFreq * 1.5]; // Minor/Diminished feel

    chord.forEach((freq, i) => {
        const osc = audioCtxRef.current!.createOscillator();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.value = freq;
        
        // Slight detune for "Organic" feel
        osc.detune.value = Math.random() * 20 - 10;

        const oscGain = audioCtxRef.current!.createGain();
        oscGain.gain.value = 0.05;

        // LFO for modulation (Breathing effect)
        const lfo = audioCtxRef.current!.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.1 + (Math.random() * 0.2); // Slow breath
        const lfoGain = audioCtxRef.current!.createGain();
        lfoGain.gain.value = 0.02; 
        
        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);
        lfo.start();

        osc.connect(oscGain);
        oscGain.connect(masterGainRef.current!);
        osc.start();
        
        oscillatorsRef.current.push(osc);
        oscillatorsRef.current.push(lfo); // Keep track to stop later
    });
  };

  const drawVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
        animationRef.current = requestAnimationFrame(draw);
        analyserRef.current!.getByteFrequencyData(dataArray);

        ctx.fillStyle = '#1a1a1a'; // Match bg
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 2;

            // Gradient color based on intensity
            const r = barHeight + (25 * (i/bufferLength));
            const g = 250 * (i/bufferLength);
            const b = 50;

            ctx.fillStyle = `rgb(${r},${g},${b})`;
            
            // Mirror effect
            ctx.fillRect(x, canvas.height / 2 - barHeight / 2, barWidth, barHeight);

            x += barWidth + 1;
        }
    };
    draw();
  };

  const togglePlay = () => {
    if (isPlaying) {
        // Stop
        oscillatorsRef.current.forEach(osc => osc.stop());
        oscillatorsRef.current = [];
        if (noiseNodeRef.current) noiseNodeRef.current.stop();
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        setIsPlaying(false);
    } else {
        // Start
        initAudio();
        if (audioCtxRef.current?.state === 'suspended') {
            audioCtxRef.current.resume();
        }
        createNoise();
        createDrone();
        drawVisualizer();
        setIsPlaying(true);
    }
  };

  const toggleMute = () => {
      if (masterGainRef.current) {
          masterGainRef.current.gain.value = isMuted ? volume : 0;
          setIsMuted(!isMuted);
      }
  };

  // Cleanup
  useEffect(() => {
      return () => {
          oscillatorsRef.current.forEach(osc => osc.stop());
          if (noiseNodeRef.current) noiseNodeRef.current.stop();
          if (animationRef.current) cancelAnimationFrame(animationRef.current);
          if (audioCtxRef.current) audioCtxRef.current.close();
      };
  }, []);

  return (
    <div className="bg-anthro-gray/10 border border-gray-800 p-4 relative overflow-hidden group">
      <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase">
              <Waves className="w-3 h-3 text-signal-green" /> 
              GENERATIVE SOUNDSCAPE
          </div>
          {isPlaying && (
              <div className="flex items-center gap-1 text-[9px] font-mono text-signal-green animate-pulse">
                  <Activity className="w-3 h-3" /> SYNTHESIZING
              </div>
          )}
      </div>

      {/* Visualizer Canvas */}
      <div className="relative w-full h-24 bg-black border border-gray-800 mb-4 overflow-hidden">
          <canvas 
            ref={canvasRef} 
            width={300} 
            height={100} 
            className="w-full h-full opacity-60"
          />
          {/* Overlay Vibe Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-white/20 font-bold text-2xl uppercase tracking-widest blur-[1px]">
                  {vibeDescription.split(' ')[0]}
              </span>
          </div>
      </div>

      <div className="flex items-center justify-between relative z-10">
          <button 
            onClick={togglePlay}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold font-mono transition-all uppercase tracking-wide border ${
                isPlaying 
                ? 'bg-signal-green/10 border-signal-green text-signal-green hover:bg-signal-green/20' 
                : 'bg-white text-black border-white hover:bg-gray-200'
            }`}
          >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              {isPlaying ? 'PAUSE AMBIENCE' : 'PLAY SOUNDSCAPE'}
          </button>

          <button onClick={toggleMute} className="p-2 text-gray-400 hover:text-white transition-colors">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
      </div>

      {/* Background Decor */}
      <div className="absolute -bottom-4 -right-4 text-[100px] font-bold text-white/5 pointer-events-none select-none">
          ♫
      </div>
    </div>
  );
};
