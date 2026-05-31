import { analyzeTelemetry } from '../lib/telemetryAnalysis'
import type { TelemetryAnalysisResult, TelemetryProfile } from '../data/telemetry'

type WorkerRequest = {
  profile: TelemetryProfile
}

type WorkerResponse = {
  profile: TelemetryProfile
  result: TelemetryAnalysisResult
}

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const result = analyzeTelemetry(event.data.profile)
  self.postMessage({ profile: event.data.profile, result } satisfies WorkerResponse)
}
