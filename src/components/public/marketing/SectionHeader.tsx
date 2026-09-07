import { cn } from "@/lib/utils"

const SectionHeader = ({
  heading,
  paragraph,
  variant,
}: {
  heading: string
  paragraph: string
  variant?: "default" | "ctabanner"
}) => {
  return (
    <div className="space-y-2 text-center">
      <h2
        className={cn(
          "heading-2 mx-auto",
          variant !== "ctabanner" && "max-w-lg"
        )}
      >
        {heading}
      </h2>
      <p className="mx-auto max-w-3xl">{paragraph}</p>
    </div>
  )
}

export default SectionHeader
