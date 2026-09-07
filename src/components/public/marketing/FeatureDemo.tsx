import AnalyticsDemo from "./AnalyticsDemo"
import AppearanceDemo from "./AppearanceDemo"
import LayoutDemo from "./LayoutDemo"

const FeatureDemo = ({ name }: { name: string }) => {
  switch (name) {
    case "appearance":
      return <AppearanceDemo />
    case "layout":
      return <LayoutDemo />
    case "analytics":
      return <AnalyticsDemo />
  }
}

export default FeatureDemo
