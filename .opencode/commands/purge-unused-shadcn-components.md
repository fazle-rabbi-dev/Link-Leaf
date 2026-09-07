List every file in components/ui/. For each one, rg (ripgrep) search the
entire src/ and app/ directory for imports referencing that component's
filename (excluding the file itself). If zero references are found
outside components/ui/, list it as unused. Show me the full list before
deleting anything — don't delete automatically.
