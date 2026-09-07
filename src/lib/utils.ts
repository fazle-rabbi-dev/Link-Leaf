import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}
// real random face photo
export const handleSwapAvatar = (
   setAvatar: React.Dispatch<React.SetStateAction<string>>,
) => {
   const seed = crypto.randomUUID();
   setAvatar(`https://i.pravatar.cc/300?u=${seed}`);
};

// random abstract art — DiceBear generates abstract SVGs
export const handleRandomArt = (
   setAvatar: React.Dispatch<React.SetStateAction<string>>,
) => {
   const styles = [
      'shapes',
      'rings',
      'thumbs',
      'icons',
      'identicon',
      'pixel-art',
   ];
   const style = styles[Math.floor(Math.random() * styles.length)];
   const seed = crypto.randomUUID();
   setAvatar(`https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`);
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function copyToClipboard(text: string): Promise<boolean> {
   if (!text) return false;

   // 1) modern async clipboard (secure context)
   try {
      if (navigator.clipboard && window.isSecureContext) {
         await navigator.clipboard.writeText(text);
         return true;
      }
   } catch {}

   // 2) fallback — hidden textarea + execCommand (supports HTTP, old Safari/iOS)
   try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      ta.style.pointerEvents = 'none';
      document.body.appendChild(ta);

      // iOS needs contentEditable + range
      const selection = document.getSelection();
      const prevRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

      ta.select();
      ta.setSelectionRange(0, ta.value.length);

      const ok = document.execCommand('copy');
      document.body.removeChild(ta);

      if (prevRange && selection) {
         selection.removeAllRanges();
         selection.addRange(prevRange);
      }

      if (ok) return true;
   } catch {}

   // 3) last resort — prompt
   try {
      window.prompt('Copy to clipboard: Ctrl+C, Enter', text);
   } catch {}
   return false;
}
