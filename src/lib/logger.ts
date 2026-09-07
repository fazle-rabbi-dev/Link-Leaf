import chalk from 'chalk';

// Alias console so `compiler.removeConsole` (which strips `console.*` calls)
// does NOT strip logger output — it looks for `console.xxx(...)` shape.
const c = console;
const isBrowser = typeof window !== 'undefined';

// ── config ──────────────────────────────────────────────────────────
type Level = 'info' | 'success' | 'warn' | 'error' | 'debug';

const LEVELS: Record<
   Level,
   {
      label: string;
      symbol: string;
      // chalk style (Node)
      chalk: typeof chalk;
      // CSS for browser (%c)
      css: string;
   }
> = {
   info: {
      label: 'INFO',
      symbol: '◆',
      chalk: chalk.bold.cyan,
      css: 'color:#06b6d4;font-weight:700;background:#ecfeff;padding:2px 8px;border-radius:4px;',
   },
   success: {
      label: 'SUCCESS',
      symbol: '✔',
      chalk: chalk.bold.green,
      css: 'color:#22c55e;font-weight:700;background:#f0fdf4;padding:2px 8px;border-radius:4px;',
   },
   warn: {
      label: 'WARN',
      symbol: '⚠',
      chalk: chalk.bold.yellow,
      css: 'color:#eab308;font-weight:700;background:#fefce8;padding:2px 8px;border-radius:4px;',
   },
   error: {
      label: 'ERROR',
      symbol: '✖',
      chalk: chalk.bold.red,
      css: 'color:#ef4444;font-weight:700;background:#fef2f2;padding:2px 8px;border-radius:4px;',
   },
   debug: {
      label: 'DEBUG',
      symbol: '◈',
      chalk: chalk.bold.magenta,
      css: 'color:#a855f7;font-weight:700;background:#faf5ff;padding:2px 8px;border-radius:4px;',
   },
};

// ── core ────────────────────────────────────────────────────────────
function print(level: Level, ...args: unknown[]) {
   const { label, symbol, chalk: style, css } = LEVELS[level];

   if (isBrowser) {
      const hasObjects = args.some((a) => typeof a === 'object' && a !== null);
      const textArgs = args.filter((a) => typeof a !== 'object' || a === null);
      const objArgs = args.filter((a) => typeof a === 'object' && a !== null);

      // Spacious, colorful, no borders — extra newlines for eye-catch
      const line = `\n%c ${symbol}  ${label} %c ${textArgs.join(' ')}\n`;

      if (hasObjects) {
         c.log(
            line,
            css,
            'color:inherit;font-weight:400;background:transparent;padding:0;',
            ...objArgs,
         );
      } else {
         c.log(
            line,
            css,
            'color:inherit;font-weight:400;background:transparent;padding:0;',
         );
      }
      return;
   }

   // Node / Server: chalk (ANSI) — no borders, just spacious badge + message
   const badge = style(` ${symbol}  ${label} `);
   const formatArg = (a: unknown) => {
      if (typeof a === 'string') return a;
      if (a instanceof Error) return a.stack ?? a.message;
      try {
         if (typeof Bun !== 'undefined' && Bun.inspect)
            return Bun.inspect(a, { colors: true });
      } catch {}
      return JSON.stringify(a, null, 2);
   };
   const msg = args.map(formatArg).join(' ');

   c.log('');
   c.log(`${badge}  ${msg}`);
   c.log('');
}

// ── public API ──────────────────────────────────────────────────────
export const logger = {
   info: (...args: unknown[]) => print('info', ...args),
   success: (...args: unknown[]) => print('success', ...args),
   warn: (...args: unknown[]) => print('warn', ...args),
   error: (...args: unknown[]) => print('error', ...args),
   debug: (...args: unknown[]) => print('debug', ...args),
   /** unstyled but still with spacing */
   log: (...args: unknown[]) => {
      if (isBrowser) {
         c.log('');
         c.log(...args);
         c.log('');
         return;
      }
      c.log('');
      c.log(...args);
      c.log('');
   },
};

export default logger;
