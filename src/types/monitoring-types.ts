// Core measurement types
export interface BiometricMeasurement {
  timestamp: number;
  heartRate: number;
  bloodOxygen?: number;
  temperature?: number;
}

// Session phase types
export type SessionPhase = 'pre' | 'active' | 'integration' | 'post';

// Medication tracking
export interface Medication {
  id: string;
  name: string;
  category: 'anxiolytic' | 'antidepressant' | 'esketamine' | 'other';
  timing: {
    administration: number;
    expectedPeak: number;
    duration: number;
  };
  effects: {
    autonomicImpact: number;
    metabolicImpact: number;
  };
}

// Session marker with comprehensive tracking
export interface SessionMarker {
  timestamp: number;
  phase: SessionPhase;
  duration: number;
  metrics: {
    hrv: number;
    bloodOxygen: number;
    temperature: number;
  };
  medications: Medication[];
  effects: {
    autonomicState: number;
    cognitiveLoad: number;
    metabolicState: number;
  };
}

// Analysis configuration
export interface AnalysisConfig {
  windows: {
    pre: number;
    active: number;
    integration: number;
    post: number;
  };
  thresholds: {
    hrvBaseline: number;
    bloodOxygenMin: number;
    temperatureRange: [number, number];
  };
  analysis: {
    windowSize: number;
    overlapSize: number;
  };
}

// Analysis results
export interface PhaseAnalysis {
  avgHRV: number;
  hrvVariability: number;
  coherenceScore: number;
  duration: number;
  medicationEffects: Array<{
    id: string;
    name: string;
    category: string;
    averageEffect: number;
  }>;
}