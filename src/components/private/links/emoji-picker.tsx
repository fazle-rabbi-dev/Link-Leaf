'use client';

import { ScrollArea } from '@/components/ui/scroll-area';

const MOCK_EMOJIS = [
   '🔥', '⭐', '❤️', '🎯', '🚀', '💡', '🎨', '🎵',
   '📸', '🎬', '🎮', '📚', '🌍', '💎', '🏆', '🎉',
   '💼', '🔧', '⚡', '🌟', '🔍', '📱', '💻', '🛠️',
   '📣', '🎁', '📌', '🔗', '✨', '🤖', '👾', '🎭',
   '🌈', '☀️', '🌙', '🍀', '🦊', '🐱', '🐶', '🌸',
];

interface EmojiPickerContentProps {
   onSelect: (emoji: string) => void;
}

export function EmojiPickerContent({ onSelect }: EmojiPickerContentProps) {
   return (
      <ScrollArea className="h-[30vh]">
         <div className="grid grid-cols-8 gap-1 p-3">
            {MOCK_EMOJIS.map((emoji) => (
               <button
                  key={emoji}
                  type="button"
                  onClick={() => onSelect(emoji)}
                  className="flex size-9 items-center justify-center rounded-lg text-xl transition-colors hover:bg-muted cursor-pointer"
               >
                  {emoji}
               </button>
            ))}
         </div>
      </ScrollArea>
   );
}
