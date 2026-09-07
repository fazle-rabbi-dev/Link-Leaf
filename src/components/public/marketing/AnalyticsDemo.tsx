"use client"

import { ANALYTICS } from "@/constants/marketing"

const AnalyticsDemo = () => {
  return (
    <div className="px-4 py-2">
      <p className="text-xs uppercase">Simulated traffic</p>

      <div className="mt-4 flex gap-2">
        <div className="flex-center flex-1 flex-col rounded-lg border bg-background py-3">
          <span className="text-xs uppercase">views</span>
          <span className="text-lg font-bold">{ANALYTICS.views}</span>
        </div>
        <div className="flex-center flex-1 flex-col rounded-lg border bg-background py-3">
          <span className="text-xs uppercase">clicks</span>
          <span className="text-lg font-bold text-primary">
            {ANALYTICS.clicks}
          </span>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-primary/80 bg-primary/10 py-2">
        <p className="text-center font-medium">
          <span className="text-primary">Click-Through Rate:</span>{" "}
          {ANALYTICS.clickRate}%
        </p>
      </div>
    </div>
  )
}

export default AnalyticsDemo
