import React from 'react';
import { Hash, Zap, Shield, CheckCircle2 } from 'lucide-react';

const AlgorithmEducation = () => {
  const algorithms = [
    {
      name: 'SHA-256',
      icon: Zap,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/20',
      outputSize: '256 bits',
      speed: '⚡⚡⚡⚡',
      speedText: 'Very Fast',
      security: '🔒🔒🔒',
      securityText: 'High',
      usedBy: ['Bitcoin', 'Git', 'SSL Certificates'],
      bestFor: 'General purpose & blockchain',
      description: 'The most widely used hash algorithm. Perfect balance of speed and security for everyday use.'
    },
    {
      name: 'SHA-384',
      icon: Hash,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/20',
      outputSize: '384 bits',
      speed: '⚡⚡⚡',
      speedText: 'Fast',
      security: '🔒🔒🔒🔒',
      securityText: 'Very High',
      usedBy: ['Banking', 'SSL/TLS', 'Government'],
      bestFor: 'Financial & compliance',
      description: 'Balanced approach offering enhanced security while maintaining good performance.'
    },
    {
      name: 'SHA-512',
      icon: Shield,
      color: 'red',
      gradient: 'from-red-500 to-pink-500',
      borderColor: 'border-red-500/20',
      outputSize: '512 bits',
      speed: '⚡⚡',
      speedText: 'Moderate',
      security: '🔒🔒🔒🔒🔒',
      securityText: 'Maximum',
      usedBy: ['Military', 'NSA', 'Top Secret'],
      bestFor: 'Maximum security needs',
      description: 'Highest level of security. Ideal for sensitive data and long-term protection.'
    }
  ];

  const comparisonData = [
    { feature: 'Output Size', sha256: '256 bits (32 bytes)', sha384: '384 bits (48 bytes)', sha512: '512 bits (64 bytes)' },
    { feature: 'Processing Speed', sha256: 'Fastest', sha384: 'Fast', sha512: 'Moderate' },
    { feature: 'Security Level', sha256: 'High', sha384: 'Very High', sha512: 'Maximum' },
    { feature: 'Collision Resistance', sha256: '2^128', sha384: '2^192', sha512: '2^256' },
    { feature: 'Best Use Case', sha256: 'General Purpose', sha384: 'Compliance', sha512: 'Top Security' }
  ];

  const useCases = [
    {
      icon: '💼',
      title: 'Business Documents',
      algorithm: 'SHA-256',
      reason: 'Fast, reliable, and widely supported'
    },
    {
      icon: '🏦',
      title: 'Financial Records',
      algorithm: 'SHA-384',
      reason: 'Meets regulatory compliance standards'
    },
    {
      icon: '🔐',
      title: 'Sensitive Data',
      algorithm: 'SHA-512',
      reason: 'Maximum security for critical information'
    },
    {
      icon: '⚡',
      title: 'Large Files (>100MB)',
      algorithm: 'SHA-256',
      reason: 'Best performance for big files'
    }
  ];

  return (
    <div className="relative w-full bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4
                [contain:layout_paint]
                [will-change:transform]">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div 
          className="h-full w-full" 
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            willChange: 'transform'
          }}
        />
      </div>

     <div className="relative z-10 max-w-7xl mx-auto select-text">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose the Right Algorithm
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Compare SHA-256, SHA-384, and SHA-512 to find the perfect hash algorithm for your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {algorithms.map((algo, index) => {
            const IconComponent = algo.icon;
            return (
              <div
                key={index}
                className={`
                  relative
                  bg-gray-900/60 border ${algo.borderColor}
                  rounded-2xl p-5
                  hover:border-opacity-100
                  transition-[border-color] duration-200
                `}
              >
                <div className="text-center mb-5">
                  <div className={`
                    inline-flex items-center justify-center w-14 h-14 mb-3
                    bg-gradient-to-br ${algo.gradient} rounded-2xl
                  `}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {algo.name}
                  </h3>
                  <p className="text-sm text-gray-400">{algo.outputSize}</p>
                </div>

                <p className="text-gray-300 text-sm mb-5 leading-relaxed">
                  {algo.description}
                </p>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Speed:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{algo.speed}</span>
                      <span className="text-xs text-gray-500">{algo.speedText}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Security:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{algo.security}</span>
                      <span className="text-xs text-gray-500">{algo.securityText}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-3">
                  <p className="text-xs text-gray-500 mb-2">Used by:</p>
                  <div className="flex flex-wrap gap-2">
                    {algo.usedBy.map((user, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded"
                      >
                        {user}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className={`
                    inline-block px-3 py-1 text-xs font-semibold
                    bg-gradient-to-r ${algo.gradient} text-white rounded-full
                  `}>
                    {algo.bestFor}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white text-center mb-6">
            Side-by-Side Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-900/60 border border-gray-700 rounded-xl overflow-hidden">
              <thead className="bg-gray-800/80">
                <tr>
                  <th className="text-left p-3 text-gray-400 font-semibold text-sm">Feature</th>
                  <th className="text-center p-3 text-blue-400 font-semibold text-sm">SHA-256</th>
                  <th className="text-center p-3 text-purple-400 font-semibold text-sm">SHA-384</th>
                  <th className="text-center p-3 text-red-400 font-semibold text-sm">SHA-512</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-700 hover:bg-gray-800/20 transition-[background-color] duration-150"
                  >
                    <td className="p-3 text-gray-300 font-medium text-sm">{row.feature}</td>
                    <td className="p-3 text-center text-gray-200 text-sm">{row.sha256}</td>
                    <td className="p-3 text-center text-gray-200 text-sm">{row.sha384}</td>
                    <td className="p-3 text-center text-gray-200 text-sm">{row.sha512}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white text-center mb-6">
            Which One Should You Use?
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="
                  bg-gray-900/60 border border-gray-700
                  rounded-xl p-5
                  hover:border-purple-500/40
                  transition-colors duration-200
                "
              >
                
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{useCase.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2">
                      {useCase.title}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-semibold text-sm">
                        {/* ADDED: text-sm */}
                        {useCase.algorithm}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {useCase.reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmEducation;