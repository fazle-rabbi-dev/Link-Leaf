import { ArrowUpDown, BarChart3, Palette } from "lucide-react"

export const FEATURES = [
  {
    name: "appearance",
    icon: Palette,
    title: "Interactive Appearance",
    description:
      "Toggle colors, gradients, and button shapes instantly. Watch the interface fluidly restructure its canvas layouts.",
  },
  {
    name: "layout",
    icon: ArrowUpDown,
    title: "Layout Reordering",
    description:
      "Prioritize your key links by simply shifting items. Reorderings update in less than 150ms on public landing cards.",
  },
  {
    name: "analytics",
    icon: BarChart3,
    title: "Actionable Analytics",
    description:
      "Track view history and item clicks in real-time. Understand how visitors interact with your digital profile.",
  },
]

export const ANALYTICS = {
  views: 3492,
  clicks: 2311,
  clickRate: 66.1,
}

export const PROCESS_STEPS = [
  {
    id: "step-01",
    stepNumber: "01",
    title: "Sign Up / Claim Handle",
    description:
      "Register with your credentials and claim your custom unique username. For this demo, any input will log you in instantly.",
  },
  {
    id: "step-02",
    stepNumber: "02",
    title: "Customize Canvas & Links",
    description:
      "Add your social channels, portfolio items, and bespoke buttons. Choose background gradients, button stylings, and fonts.",
  },
  {
    id: "step-03",
    stepNumber: "03",
    title: "Publish & Share",
    description:
      "Copy your customized URL (leaf.app/username) and place it on your social bios to direct traffic back to your whole web universe.",
  },
]
