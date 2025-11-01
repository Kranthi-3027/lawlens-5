
import React, { useState, useRef, useEffect } from 'react';
import { MoreVerticalIcon, EditIcon, TrashIcon } from './icons';

interface ChatContextMenuProps {
    chatId: string;
    onDelete: (chatId: string) => void;
    onRename: (chatId: string, newTitle: string) => void;
}

const ChatContextMenu: React.FC<ChatContextMenuProps> = ({ chatId, onDelete, onRename }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [title, setTitle] = useState('');
    const menuRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleToggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this chat?')) {
            onDelete(chatId);
        }
        setIsOpen(false);
    };

    const handleRename = () => {
        onRename(chatId, title);
        setIsRenaming(false);
        setIsOpen(false);
    };

    const handleStartRenaming = () => {
        setIsRenaming(true);
        setIsOpen(false); // Close menu when starting rename
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Focus input when rename starts
    useEffect(() => {
        if (isRenaming) {
            inputRef.current?.focus();
        }
    }, [isRenaming]);

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={handleToggleMenu} className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                <MoreVerticalIcon size={18} />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-brand-dark-secondary rounded-md shadow-lg z-10">
                    <button 
                        onClick={handleStartRenaming}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                        <EditIcon size={16} className="mr-2" />
                        Rename
                    </button>
                    <button 
                        onClick={handleDelete}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                        <TrashIcon size={16} className="mr-2" />
                        Delete
                    </button>
                </div>
            )}
            {isRenaming && (
                 <div className="absolute inset-0 bg-brand-light dark:bg-brand-dark flex items-center p-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleRename}
                        onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                        className="bg-transparent border-b border-brand-accent w-full focus:outline-none"
                    />
                </div>
            )}
        </div>
    );
};

export default ChatContextMenu;
