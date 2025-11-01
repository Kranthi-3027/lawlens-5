
import React from 'react';
import type { ChatSession } from '../types';
import { PlusIcon, ProjectOutlineIcon } from './icons';
import ChatContextMenu from './ChatContextMenu';

interface ChatHistoryProps {
    chats: ChatSession[];
    activeChatId: string | null;
    onNewChat: () => void;
    onSelectChat: (chatId: string) => void;
    onDeleteChat: (chatId: string) => void;
    onRenameChat: (chatId: string, newTitle: string) => void;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ 
    chats, 
    activeChatId, 
    onNewChat, 
    onSelectChat,
    onDeleteChat,
    onRenameChat
}) => {
    return (
        <div className="p-4">
            <button 
                onClick={onNewChat} 
                className="w-full flex items-center justify-center gap-2 bg-brand-accent text-white rounded-md px-4 py-2 text-sm font-semibold hover:bg-blue-600 transition-colors mb-4"
            >
                <PlusIcon size={16} />
                New Chat
            </button>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Recent</h2>
            <div className="flex flex-col gap-1">
                {chats.map(chat => (
                    <div key={chat.id} className="relative group flex items-center pr-2 rounded-md hover:bg-gray-200/50 dark:hover:bg-brand-dark/50">
                        <button 
                            onClick={() => onSelectChat(chat.id)} 
                            className={`w-full text-left flex items-center gap-2 p-2 rounded-md text-sm transition-colors flex-1 ${
                                activeChatId === chat.id 
                                    ? 'bg-gray-200 dark:bg-brand-dark' 
                                    : 'bg-transparent'
                            }`}
                        >
                            <ProjectOutlineIcon size={16} className="text-gray-500" />
                            <span className="truncate flex-1">{chat.title}</span>
                        </button>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChatContextMenu 
                                chatId={chat.id} 
                                onDelete={onDeleteChat} 
                                onRename={onRenameChat} 
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
