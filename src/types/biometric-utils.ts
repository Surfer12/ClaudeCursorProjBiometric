import { BiometricMeasurement, SessionMarker } from '../types/monitoring';
import _ from 'lodash';

// Calculate RMSSD (Root Mean Square of Successive Differences)
export const calculateRMSSD = (heartRates: number[]): number => {
  if (heartRates.length < 2) return 0;
  
  const differences = [];
  for (let i = 1; i < heartRates.length; i++) {
    differences.push(Math.pow(heartRates[i] - heartRates[i-1], 2));
  }
  return Math.sqrt(_.mean(differences));
};

// Calculate HRV Coherence Score
export const calculateHRVCoherence = (
  measurements: BiometricMeasurement[],
  windowSize: number = 300 // 5-minute window
): number => {
  if (measurements.length < 2) return 0;

  // Group measurements into windows
  const windows = _.chunk(measurements, windowSize);
  
  // Calculate RMSSD for each window
  const windowScores = windows.map(window => {
    const heartRates = window.map(m => m.heartRate);
    return calculateRMSSD(heartRates);
  });

  // Calculate coherence score (normalized)
  const meanScore = _.mean(windowScores);
  const maxScore = 100; // Maximum expected RMSSD
  return Math.min(meanScore / maxScore, 1);
};

// Calculate Autonomic Balance Score
export const calculateAutonomicBalance = (
  marker: SessionMarker,
  baselineHRV: number
): number => {
  const hrvDeviation = Math.abs(marker.metrics.hrv - baselineHRV) / baselineHRV;
  const temperatureStability = marker.metrics.temperature >= 36.5 && 
                             marker.metrics.temperature <= 37.5 ? 1 : 0.5;
  
  return (1 - hrvDeviation) * temperatureStability;
};

// Process Raw Biometric Data
export const processRawData = (
  data: BiometricMeasurement[],
  windowSize: number = 300
): SessionMarker[] => {
  // Group data into time windows
  const windows = _.chunk(data, windowSize);
  
  return windows.map(window => {
    const timestamp = window[0].timestamp;
    const heartRates = window.map(m => m.heartRate);
    
    return {
      timestamp,
      phase: determinePhase(timestamp), // You'll need to implement this based on your session timing
      duration: windowSize,
      metrics: {
        hrv: calculateRMSSD(heartRates),
        bloodOxygen: _.meanBy(window, 'bloodOxygen') || 0,
        temperature: _.meanBy(window, 'temperature') || 0
      },
      medications: [], // To be populated by medication tracker
      effects: {
        autonomicState: calculateHRVCoherence(window),
        cognitiveLoad: 0, // To be implemented based on your metrics
        metabolicState: 0 // To be implemented based on your metrics
      }
    };
  });
};

// Helper function to determine session phase
const determinePhase = (timestamp: number): 'pre' | 'active' | 'integration' | 'post' => {
  // Implement phase determination logic based on your session timing
  return 'active'; // Placeholder
};