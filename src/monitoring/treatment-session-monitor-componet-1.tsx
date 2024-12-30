import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Activity, Heart, Brain } from 'lucide-react';
import _ from 'lodash';

interface Medication {
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

interface SessionMarker {
  timestamp: number;
  phase: 'pre' | 'active' | 'integration' | 'post';
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

const TreatmentSessionMonitor = () => {
  const [sessionData, setSessionData] = useState<SessionMarker[]>([]);
  const [analysisConfig, setAnalysisConfig] = useState({
    windows: {
      pre: 15 * 60, // 15 minutes pre-session
      active: 40 * 60, // 40 minutes active phase
      integration: 20 * 60, // 20 minutes integration
      post: 30 * 60 // 30 minutes post-session monitoring
    },
    thresholds: {
      hrvBaseline: 80, // ms RMSSD
      bloodOxygenMin: 95, // %
      temperatureRange: [36.5, 37.5] // °C
    },
    analysis: {
      windowSize: 300, // 5-minute rolling windows
      overlapSize: 60 // 1-minute overlap
    }
  });

  // Calculate autonomic coherence score
  const calculateCoherence = (data: SessionMarker[]) => {
    return data.map(marker => {
      const hrvVariability = calculateHRVVariability(marker.metrics.hrv);
      const oxygenStability = calculateOxygenStability(marker.metrics.bloodOxygen);
      const temperatureRegulation = calculateTempRegulation(marker.metrics.temperature);
      
      return {
        timestamp: marker.timestamp,
        coherence: (hrvVariability + oxygenStability + temperatureRegulation) / 3,
        phase: marker.phase
      };
    });
  };

  // HRV Variability Analysis
  const calculateHRVVariability = (hrv: number) => {
    const baseline = analysisConfig.thresholds.hrvBaseline;
    return Math.min(hrv / baseline, 1.5); // Normalized score
  };

  // Blood Oxygen Stability
  const calculateOxygenStability = (oxygen: number) => {
    return (oxygen - analysisConfig.thresholds.bloodOxygenMin) / 
           (100 - analysisConfig.thresholds.bloodOxygenMin);
  };

  // Temperature Regulation Score
  const calculateTempRegulation = (temp: number) => {
    const [min, max] = analysisConfig.thresholds.temperatureRange;
    return temp >= min && temp <= max ? 1 : 
           1 - Math.min(Math.abs(temp - (min + max) / 2), 1);
  };

  // Phase-specific analysis
  const analyzePhase = (phase: string, data: SessionMarker[]) => {
    const phaseData = data.filter(marker => marker.phase === phase);
    
    return {
      avgHRV: _.meanBy(phaseData, 'metrics.hrv'),
      hrvVariability: _.std(phaseData.map(d => d.metrics.hrv)),
      coherenceScore: _.meanBy(calculateCoherence(phaseData), 'coherence'),
      duration: phaseData.length > 0 ? 
        phaseData[phaseData.length - 1].timestamp - phaseData[0].timestamp : 0
    };
  };

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Treatment Session Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Real-time Coherence Monitor */}
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Autonomic Coherence</h3>
              </div>
              <p className="text-lg">
                {sessionData.length > 0 ? 
                  `${(_.last(calculateCoherence(sessionData))?.coherence * 100).toFixed(1)}%` : 
                  'Awaiting Session Data...'}
              </p>
            </div>

            {/* Phase Progress */}
            <div className="p-4 border rounded-lg bg-purple-50">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold">Session Phase</h3>
              </div>
              <p className="text-lg">
                {sessionData.length > 0 ? 
                  _.last(sessionData)?.phase.toUpperCase() : 
                  'Not Started'}
              </p>
            </div>
          </div>

          <div className="h-96">
            <ResponsiveContainer>
              <LineChart data={calculateCoherence(sessionData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(ts) => new Date(ts).toLocaleTimeString()}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="coherence" 
                  stroke="#2196F3" 
                  name="Autonomic Coherence"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreatmentSessionMonitor;