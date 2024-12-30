import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Brain, Activity } from 'lucide-react';

const CognitiveFramework = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [currentState, setCurrentState] = useState('initialization');

  useEffect(() => {
    // Simulate performance data
    const generatePerformanceData = () => {
      const states = ['initialization', 'integration', 'optimization', 'mastery'];
      return states.map((state, index) => ({
        state,
        networkStability: 40 + (index * 20) + Math.random() * 10,
        cognitiveLoad: 30 + (index * 15) + Math.random() * 10,
        adaptationRate: 20 + (index * 25) + Math.random() * 10,
      }));
    };

    setPerformanceData(generatePerformanceData());
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Cognitive State Integration Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* State Indicators */}
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Current State</h3>
              </div>
              <p className="text-lg capitalize">{currentState}</p>
            </div>
            
            <div className="p-4 border rounded-lg bg-green-50">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold">Network Stability</h3>
              </div>
              <p className="text-lg">
                {performanceData.length > 0 ? 
                  `${performanceData[performanceData.length - 1].networkStability.toFixed(1)}%` : 
                  'Loading...'}
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-purple-50">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold">Adaptation Rate</h3>
              </div>
              <p className="text-lg">
                {performanceData.length > 0 ? 
                  `${performanceData[performanceData.length - 1].adaptationRate.toFixed(1)}%` : 
                  'Loading...'}
              </p>
            </div>
          </div>

          {/* Performance Metrics Chart */}
          <div className="h-96 w-full">
            <ResponsiveContainer>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="networkStability" 
                  stroke="#2196F3" 
                  name="Network Stability"
                />
                <Line 
                  type="monotone" 
                  dataKey="cognitiveLoad" 
                  stroke="#4CAF50" 
                  name="Cognitive Load"
                />
                <Line 
                  type="monotone" 
                  dataKey="adaptationRate" 
                  stroke="#9C27B0" 
                  name="Adaptation Rate"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CognitiveFramework;