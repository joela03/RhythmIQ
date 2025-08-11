
import React from 'react';
import { ChevronRight } from 'lucide-react';

const DashboardCard = ({ 
  title,
  subtitle,
  headerIcon,
  headerGradient = 'from-purple-500 to-violet-600',
  viewAllLink,
  viewAllText = 'View all',
  footerAction,
  insights = []
}) => {

    const HeaderIcon = headerIcon;

  return (
    <div className="w-90 bg-white rounded-xl border border-gray-200 shadow-xs hover:shadow-sm transition-all duration-200">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 bg-gradient-to-r ${headerGradient} rounded-lg`}>
              {HeaderIcon && <HeaderIcon className="text-white" size={18} />}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <p className="text-xs text-gray-500">{subtitle}</p>
            </div>
          </div>
          {viewAllLink && (
            <a href={viewAllLink} className="text-xs font-medium text-purple-600 flex items-center hover:text-purple-800 transition-colors">
              {viewAllText} <ChevronRight size={16} />
            </a>
          )}
        </div>
      </div>

      {insights.length > 0 && (
        <div className="p-4">
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {insights.slice(0, 3).map((insight, index) => (
              <div 
                key={index}
                className={`p-3 bg-gradient-to-r ${insight.color} rounded-lg text-white`}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-1.5 bg-white/20 rounded-md flex-shrink-0">
                    <insight.icon className="text-white" size={16}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium mb-1">{insight.title}</h4>
                    <p className="text-xs opacity-90 break-words">{insight.insight}</p>
                  </div>
                </div>
                {insight.confidence && (
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-medium opacity-90">
                      Confidence: {insight.confidence}%
                    </span>
                    <div className="w-16 bg-white/30 rounded-full h-1.5">
                      <div 
                        className="bg-white h-1.5 rounded-full transition-all duration-300" 
                        style={{ width: `${insight.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {footerAction && (
        <div className="p-4 pt-0">
          <a 
            href={footerAction.link} 
            className="inline-flex items-center text-xs font-medium text-purple-600 hover:text-purple-800 transition-colors"
          >
            <footerAction.icon size={14} className="mr-1.5"/>
            {footerAction.text}
          </a>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;