import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Activity, Brain, BarChart } from 'lucide-react';

interface StateTransition {
  timestamp: number;
  coherence: number;
  flowProbability: number;
  autonomicBalance: number;
  stateMarkers: {
    attention: number;
    arousal: number;
    integration: number;
  };
}

const StateTransitionMonitor = () => {
  const [transitions, setTransitions] = useState<StateTransition[]>([]);
  const [currentState, setCurrentState] = useState({
    coherence: 0,
    flowProbability: 0,
    autonomicBalance: 0
  });

  useEffect(() => {
    // Simulate state transition data
    const simulateTransitions = () => {
      const baseTime = Date.now();
      const phases = Array.from({ length: 20 }, (_, i) => ({
        timestamp: baseTime + i * 60000,
        coherence: 0.4 + Math.random() * 0.4,
        flowProbability: 0.3 + Math.random() * 0.5,
        autonomicBalance: 0.5 + Math.random() * 0.3,
        stateMarkers: {
          attention: 0.4 + Math.random() * 0.4,
          arousal: 0.3 + Math.random() * 0.4,
          integration: 0.5 + Math.random() * 0.3
        }
      }));
      setTransitions(phases);
      setCurrentState({
        coherence: phases[phases.length - 1].coherence,
        flowProbability: phases[phases.length - 1].flowProbability,
        autonomicBalance: phases[phases.length - 1].autonomicBalance
      });
    };

    simulateTransitions();
  }, []);

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Neural State Integration Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Coherence Monitor */}
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Neural Coherence</h3>
              </div>
              <p className="text-lg">
                {(currentState.coherence * 100).toFixed(1)}%
              </p>
            </div>

            {/* Flow State Probability */}
            <div className="p-4 border rounded-lg bg-purple-50">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold">Flow Probability</h3>
              </div>
              <p className="text-lg">
                {(currentState.flowProbability * 100).toFixed(1)}%
              </p>
            </div>

            {/* Autonomic Balance */}
            <div className="p-4 border rounded-lg bg-green-50">
              <div className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold">Autonomic Balance</h3>
              </div>
              <p className="text-lg">
                {(currentState.autonomicBalance * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="h-96">
            <ResponsiveContainer>
              <LineChart data={transitions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp"
                  tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
                />
                <YAxis domain={[0, 1]} />
                <Tooltip 
                  labelFormatter={(ts) => new Date(ts).toLocaleTimeString()}
                  formatter={(value: number) => [(value * 100).toFixed(1) + '%']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="coherence"
                  stroke="#2196F3" 
                  name="Neural Coherence"
                />
                <Line 
                  type="monotone" 
                  dataKey="flowProbability"
                  stroke="#9C27B0" 
                  name="Flow State Probability"
                />
                <Line 
                  type="monotone" 
                  dataKey="autonomicBalance"
                  stroke="#4CAF50" 
                  name="Autonomic Balance"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StateTransitionMonitor;