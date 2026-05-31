export type ExperimentMode = 'baseline' | 'optimized'

const rawMode = import.meta.env.VITE_EXPERIMENT_MODE

export const experimentMode: ExperimentMode = rawMode === 'baseline' ? 'baseline' : 'optimized'

export const isBaselineMode = experimentMode === 'baseline'
