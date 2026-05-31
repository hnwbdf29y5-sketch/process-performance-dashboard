import { useEffect, useState } from 'react'
import {
  fallbackTelemetryResult,
  type TelemetryAnalysisResult,
  type TelemetryProfile,
} from '../data/telemetry'
import { experimentMode, isBaselineMode } from '../lib/experimentMode'
import { analyzeTelemetry } from '../lib/telemetryAnalysis'

type AnalysisState = {
  result: TelemetryAnalysisResult
  pending: boolean
  mode: typeof experimentMode
}

type WorkerResponse = {
  profile: TelemetryProfile
  result: TelemetryAnalysisResult
}

export function useTelemetryAnalysis(profile: TelemetryProfile): AnalysisState {
  const [state, setState] = useState<AnalysisState>({
    result: fallbackTelemetryResult,
    pending: true,
    mode: experimentMode,
  })

  useEffect(() => {
    let cancelled = false

    if (isBaselineMode) {
      const timer = window.setTimeout(() => {
        const result = analyzeTelemetry(profile)
        if (!cancelled) {
          setState({ result, pending: false, mode: experimentMode })
        }
      }, 0)

      return () => {
        cancelled = true
        window.clearTimeout(timer)
      }
    }

    const worker = new Worker(new URL('../workers/telemetry.worker.ts', import.meta.url), {
      type: 'module',
    })

    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      if (!cancelled && event.data.profile === profile) {
        setState({ result: event.data.result, pending: false, mode: experimentMode })
      }
      worker.terminate()
    }

    worker.postMessage({ profile })

    return () => {
      cancelled = true
      worker.terminate()
    }
  }, [profile])

  return state
}
