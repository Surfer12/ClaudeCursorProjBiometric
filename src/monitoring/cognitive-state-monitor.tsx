import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Brain, Activity, BarChart } from 'lucide-react';

const CognitiveStateMonitor = () => {
  const [stateData, setStateData] = useState([]);
  const [currentPhase, setCurrentPhase] = useState('networkReset');

  useEffect(() => {
    // Simulate real-time data collection
    const generateStateData = () => {
      const phases = ['networkReset', 'patternStability', 'recoveryProtocol'];
      return phases.map((phase, index) => ({
        phase,
        hrvCoherence: 60 + (index * 15) + Math.random() * 10,
        neuralStability: 50 + (index * 20) + Math.random() * 10,
        metabolicState: 40 + (index * 25) + Math.random() * 10,
      }));
    };

    setStateData(generateStateData());
  }, []);

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Neural-Metabolic Integration Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">HRV Coherence</h3>
              </div>
              <p className="text-lg">
                {stateData.length > 0 ? 
                  `${stateData[stateData.length - 1].hrvCoherence.toFixed(1)}ms` : 
                  'Initializing...'}
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-purple-50">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold">Neural Stability</h3>
              </div>
              <p className="text-lg">
                {stateData.length > 0 ? 
                  `${stateData[stateData.length - 1].neuralStability.toFixed(1)}%` : 
                  'Initializing...'}
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-green-50">
              <div className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold">Metabolic State</h3>
              </div>
              <p className="text-lg">
                {stateData.length > 0 ? 
                  `${stateData[stateData.length - 1].metabolicState.toFixed(1)}%` : 
                  'Initializing...'}
              </p>
            </div>
          </div>

          <div className="h-96">
            <ResponsiveContainer>
              <LineChart data={stateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="phase" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="hrvCoherence" 
                  stroke="#2196F3" 
                  name="HRV Coherence"
                />
                <Line 
                  type="monotone" 
                  dataKey="neuralStability" 
                  stroke="#9C27B0" 
                  name="Neural Stability"
                />
                <Line 
                  type="monotone" 
                  dataKey="metabolicState" 
                  stroke="#4CAF50" 
                  name="Metabolic State"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CognitiveStateMonitor;