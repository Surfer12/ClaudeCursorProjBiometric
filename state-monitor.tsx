import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Activity, Brain, BarChart } from 'lucide-react';

const CognitiveStateMonitor = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [currentState, setCurrentState] = useState('initialization');

  useEffect(() => {
    // Simulate state transitions aligned with flow state progression
    const generatePerformanceData = () => {
      const states = ['initialization', 'flow_entry', 'deep_flow', 'integration'];
      return states.map((state, index) => ({
        state,
        neuralStability: 40 + (index * 20) + Math.random() * 10,
        metabolicState: 30 + (index * 25) + Math.random() * 10,
        adaptationRate: 20 + (index * 15) + Math.random() * 10,
      }));
    };

    setPerformanceData(generatePerformanceData());
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Neural-Metabolic Integration Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Neural Stability</h3>
              </div>
              <p className="text-lg">
                {performanceData.length > 0 ? 
                  `${performanceData[performanceData.length - 1].neuralStability.toFixed(1)}%` : 
                  'Initializing...'}
              </p>
            </div>
            
            {/* Additional metrics */}
          </div>

          <div className="h-96">
            <ResponsiveContainer>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="neuralStability" stroke="#2196F3" name="Neural Stability" />
                <Line type="monotone" dataKey="metabolicState" stroke="#4CAF50" name="Metabolic State" />
                <Line type="monotone" dataKey="adaptationRate" stroke="#9C27B0" name="Adaptation Rate" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CognitiveStateMonitor;