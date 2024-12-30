import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Activity, Thermometer, Heart } from 'lucide-react';
import _ from 'lodash';

const BiometricStreamProcessor = () => {
  const [rawData, setRawData] = useState([]);
  const [analysisWindows, setAnalysisWindows] = useState({
    hrv: { window: 300, // 5-minute windows for HRV analysis
           threshold: 80 }, // ms RMSSD threshold
    temperature: { 
      baseline: 37,
      exposure: [] // tracking cold exposure duration
    },
    progression: {
      currentPhase: 0,
      durations: [5, 7, 10], // minutes
      completed: []
    }
  });

  // Process incoming raw data stream
  const processRawStream = (newData) => {
    // Group data into analysis windows using lodash
    const timeWindows = _.groupBy(newData, (reading) => 
      Math.floor(reading.timestamp / (analysisWindows.hrv.window * 1000))
    );

    // Calculate HRV metrics for each window
    const hrvAnalysis = _.map(timeWindows, (window) => {
      const rmssd = calculateRMSSD(window.map(reading => reading.heartRate));
      return {
        timestamp: window[0].timestamp,
        rmssd,
        isCoherent: rmssd >= analysisWindows.hrv.threshold
      };
    });

    return hrvAnalysis;
  };

  // Calculate RMSSD (Root Mean Square of Successive Differences)
  const calculateRMSSD = (heartRates) => {
    const differences = [];
    for (let i = 1; i < heartRates.length; i++) {
      differences.push(Math.pow(heartRates[i] - heartRates[i-1], 2));
    }
    return Math.sqrt(_.mean(differences));
  };

  // Track cold exposure progression
  const updateTemperatureProgression = (temp, timestamp) => {
    if (temp < analysisWindows.temperature.baseline - 2) { // 2°C below baseline
      const currentPhase = analysisWindows.progression.currentPhase;
      const targetDuration = analysisWindows.progression.durations[currentPhase] * 60; // convert to seconds
      
      setAnalysisWindows(prev => ({
        ...prev,
        temperature: {
          ...prev.temperature,
          exposure: [...prev.temperature.exposure, { temp, timestamp }]
        }
      }));

      // Check if current phase duration is met
      const exposureDuration = analysisWindows.temperature.exposure.length;
      if (exposureDuration >= targetDuration) {
        setAnalysisWindows(prev => ({
          ...prev,
          progression: {
            ...prev.progression,
            currentPhase: Math.min(currentPhase + 1, prev.progression.durations.length - 1),
            completed: [...prev.progression.completed, currentPhase]
          }
        }));
      }
    }
  };

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Real-time Biometric Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* HRV Coherence Monitor */}
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">HRV Coherence</h3>
              </div>
              <p className="text-lg">
                {rawData.length > 0 ? 
                  `${_.last(processRawStream(rawData))?.rmssd.toFixed(1)} ms` : 
                  'Awaiting Data...'}
              </p>
            </div>

            {/* Temperature Progression */}
            <div className="p-4 border rounded-lg bg-purple-50">
              <div className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold">Cold Exposure Progress</h3>
              </div>
              <p className="text-lg">
                {`Phase ${analysisWindows.progression.currentPhase + 1}: ${
                  analysisWindows.progression.durations[analysisWindows.progression.currentPhase]
                } minutes`}
              </p>
            </div>
          </div>

          <div className="h-96">
            <ResponsiveContainer>
              <LineChart data={processRawStream(rawData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rmssd" 
                  stroke="#2196F3" 
                  name="HRV (RMSSD)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BiometricStreamProcessor;