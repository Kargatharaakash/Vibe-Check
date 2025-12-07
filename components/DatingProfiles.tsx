
import React, { useState } from 'react';
import { User, Heart, X, MessageCircle } from 'lucide-react';

interface Profile {
    name: string;
    age: number;
    bio: string;
    app: string;
    lookingFor: string;
}

interface Props {
    profiles: Profile[];
}

export const DatingProfiles: React.FC<Props> = ({ profiles }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextProfile = () => setActiveIndex((prev) => (prev + 1) % profiles.length);

    if (!profiles || profiles.length === 0) return null;
    const profile = profiles[activeIndex];

    return (
        <div className="bg-anthro-gray/10 border border-gray-800 p-4">
            <h4 className="text-[10px] font-mono text-gray-500 uppercase mb-4 flex items-center gap-2">
                <Heart className="w-3 h-3 text-signal-orange" /> NEIGHBORHOOD SINGLES (ARCHETYPES)
            </h4>
            
            <div className="bg-black border border-gray-700 relative h-64 overflow-hidden group">
                {/* Profile Card */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent z-10">
                    <div className="mb-1">
                        <span className="text-2xl font-bold text-white">{profile.name}</span>
                        <span className="text-xl text-gray-400 ml-2">{profile.age}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-white/10 text-[9px] font-mono text-white rounded-full border border-white/20 uppercase">{profile.app}</span>
                        <span className="px-2 py-0.5 bg-white/10 text-[9px] font-mono text-white rounded-full border border-white/20 uppercase">{profile.lookingFor}</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-snug">"{profile.bio}"</p>
                </div>

                {/* Mock Image Placeholder using Gradients/Pattern */}
                <div className="absolute inset-0 bg-gray-800 z-0">
                    <div className="w-full h-full opacity-30" style={{ 
                        backgroundImage: `radial-gradient(circle at ${Math.random()*100}% ${Math.random()*100}%, #ff4d00 0%, transparent 50%)`
                    }}></div>
                </div>

                {/* Controls */}
                <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                     <button onClick={nextProfile} className="w-8 h-8 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center hover:bg-red-900/50 hover:border-red-500 transition-colors">
                        <X className="w-4 h-4 text-white" />
                     </button>
                     <button onClick={nextProfile} className="w-8 h-8 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center hover:bg-green-900/50 hover:border-green-500 transition-colors">
                        <Heart className="w-4 h-4 text-white" />
                     </button>
                </div>

                <div className="absolute top-4 right-4 z-20 text-[9px] font-mono text-gray-500">
                    {activeIndex + 1} / {profiles.length}
                </div>
            </div>
        </div>
    );
};
