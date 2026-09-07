import Link from "next/link"

const Footer = () => {
  return (
    <footer className="mt-20 border-t">
      <div className="max-body py-10">
        <div className="flex flex-col items-center justify-between gap-4 xsm:flex-row">
          <div className="flex-center gap-2">
            <span className="text-sm font-semibold">Link-Leaf</span>
            <span className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()}
            </span>
          </div>

          <nav className="flex-center gap-4">
            <Link
              href="/auth"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
