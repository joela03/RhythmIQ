import React from 'react';
import DashboardCard from '../components/DashboardCard'
import { Brain, Zap, Target, Lightbulb, TrendingUp } from 'lucide-react';

const AIInsights = () => {
  const insights = [
    {
      title: "Optimal Workout Time",
      insight: "You're 73% more consistent at 7 AM workouts",
      confidence: 87,
      icon: Zap,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: "Habit Stacking",
      insight: "Reading after morning coffee increases completion by 45%",
      confidence: 92,
      icon: Lightbulb,
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: "Weekly Pattern",
      insight: "Mondays and Wednesdays are your strongest days",
      confidence: 78,
      icon: Target,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: "Progress Trend",
      insight: "30% improvement in consistency this month",
      confidence: 95,
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500'
    }
  ];

    return (
        <DashboardCard
        title='AI Insights'
        subtitle={`${insights.length} new insights`}
        headerIcon={Brain}
        headerGradient='from-purple-500 to-violet-600'
        viewAllink="/insights"
        viewAllText="View all"
        insights={insights}
        footerAction={{
            link: "/insights",
            icon: Lightbulb,
            text: "See all reccomendations"
        }}
        />
    );
};

export default AIInsights;