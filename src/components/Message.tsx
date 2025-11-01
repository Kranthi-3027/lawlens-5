
import React, { useState } from 'react';
import type { Message } from '../types';
import { LogoIcon, SpeakerIcon } from './icons';
import { convertTextToSpeech } from '../services/tts';

interface MessageBubbleProps {
    message: Message;
    isLoading?: boolean;
}

const LoadingDots: React.FC = () => (
    <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
    </div>
);

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLoading = false }) => {
    const isUser = message.role === 'user';
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    const textContent = message.parts.map(p => p.text).filter(Boolean).join('\n');

    const handlePlayAudio = async () => {
        if (isPlaying && audio) {
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(false);
            return;
        }

        try {
            const audioContent = await convertTextToSpeech(textContent);
            const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
            setAudio(audio);
            audio.play();
            setIsPlaying(true);
            audio.onended = () => {
                setIsPlaying(false);
            };
        } catch (error) {
            console.error('Failed to play audio:', error);
        }
    };

    if (isUser) {
        return (
            <div className="flex justify-end items-start gap-3">
                <div className="bg-brand-accent text-white rounded-2xl rounded-br-none px-4 py-3 max-w-xl shadow-md">
                    <p className="text-sm whitespace-pre-wrap">{textContent}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-start items-start gap-3">
            <div className="w-8 h-8 flex-shrink-0 bg-gray-200 dark:bg-brand-dark flex items-center justify-center rounded-full mt-1">
                <LogoIcon size={16} />
            </div>
            <div className="relative bg-gray-100 dark:bg-brand-dark text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-none px-4 py-3 max-w-xl shadow-sm">
                {isLoading ? <LoadingDots /> : <p className="text-sm whitespace-pre-wrap">{textContent}</p>}
                {!isLoading && textContent && (
                    <button onClick={handlePlayAudio} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <SpeakerIcon size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default MessageBubble;
