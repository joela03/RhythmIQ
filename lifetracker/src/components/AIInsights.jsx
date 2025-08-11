import React from 'react';
import { Brain, Zap, ChevronRight, Lightbulb } from 'lucide-react';

const AIInsightsSummary = () => {
  const insights = [
    {
      title: "Optimal Workout Time",
      insight: "You're 73% more consistent at 7 AM",
      confidence: 87,
      icon: Zap,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: "Habit Stacking",
      insight: "Read after morning coffee",
      confidence: 92,
      icon: Lightbulb,
      color: 'from-purple-500 to-violet-500'
    }
  ];

  const totalInsights = 5; 
  const mostRelevantInsight = insights[0];

  return (
    <div className="w-90 bg-white rounded-xl border border-gray-200 shadow-xs hover:shadow-sm transition-all duration-200">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg">
              <Brain className="text-white" size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Insights</h3>
              <p className="text-xs text-gray-500">{totalInsights} new insights</p>
            </div>
          </div>
          <a href="/insights" className="text-xs font-medium text-purple-600 flex items-center">
            View all <ChevronRight size={16} />
          </a>
        </div>
      </div>

      <div className="p-4">
        <div className={`p-3 bg-gradient-to-r ${mostRelevantInsight.color} rounded-lg text-white`}>
          <div className="flex items-start space-x-3">
            <div className="p-1.5 bg-white/20 rounded-md">
              <mostRelevantInsight.icon className="text-white" size={16} />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">{mostRelevantInsight.title}</h4>
              <p className="text-xs opacity-90">{mostRelevantInsight.insight}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-medium opacity-90">Confidence: {mostRelevantInsight.confidence}%</span>
            <div className="w-16 bg-white/30 rounded-full h-1.5">
              <div 
                className="bg-white h-1.5 rounded-full" 
                style={{ width: `${mostRelevantInsight.confidence}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <a 
          href="/insights" 
          className="inline-flex items-center text-xs font-medium text-purple-600 hover:text-purple-800 transition-colors"
        >
          <Lightbulb size={14} className="mr-1.5" />
          See all recommendations
        </a>
      </div>
    </div>
  );
};

export default AIInsightsSummary;