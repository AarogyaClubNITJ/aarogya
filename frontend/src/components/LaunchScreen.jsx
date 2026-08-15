import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const LaunchScreen = () => {
  const navigate = useNavigate();
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showPublishButton, setShowPublishButton] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStep, setDeploymentStep] = useState(0);
  const [showRedirect, setShowRedirect] = useState(false);

  // Deployment commands
  const deploymentCommands = useMemo(() => [
    { text: 'Deploying website...', delay: 50 },
    { text: 'Uploading files to server...', delay: 50 },
    { text: 'Configuring DNS settings...', delay: 50 },
    { text: 'Activating SSL certificate...', delay: 50 },
    { text: 'Running final checks...', delay: 50 },
    { text: 'Deployment successful! ✓', delay: 50 },
  ], []);

  // Typing animation effect
  const typeText = useCallback((text, speed = 50) => {
    return new Promise((resolve) => {
      let i = 0;
      setCurrentCommand('');
      const typing = setInterval(() => {
        setCurrentCommand(text.substring(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(typing);
          setTimeout(resolve, 500);
        }
      }, speed);
    });
  }, []);

  // Initial terminal animation
  useEffect(() => {
    const initialCommands = [
      { text: 'npm install', delay: 100 },
      { text: 'Building project...', delay: 50 },
      { text: 'Optimizing assets...', delay: 50 },
      { text: 'Ready for deployment!', delay: 50 },
    ];

    const runInitialAnimation = async () => {
      const lines = [];
      
      for (const command of initialCommands) {
        await typeText(command.text, command.delay);
        lines.push(command.text);
        setTerminalLines([...lines]);
        setCurrentCommand('');
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      setIsTyping(false);
      setShowPublishButton(true);
    };

    runInitialAnimation();
  }, [typeText]);

  // Handle publish button click
  const handlePublish = useCallback(async () => {
    setIsDeploying(true);
    setShowPublishButton(false);
    setDeploymentStep(0);

    const deploymentLines = [...terminalLines];

    for (let i = 0; i < deploymentCommands.length; i++) {
      setDeploymentStep(i);
      await typeText(deploymentCommands[i].text, deploymentCommands[i].delay);
      deploymentLines.push(deploymentCommands[i].text);
      setTerminalLines([...deploymentLines]);
      setCurrentCommand('');
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Show redirect message
    setShowRedirect(true);
    
    // Redirect after 3 seconds
    setTimeout(() => {
      navigate('/bloodbank');
    }, 1000);
  }, [terminalLines, deploymentCommands, typeText, navigate]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (e) => {
      console.log('Key pressed:', e.key, 'showPublishButton:', showPublishButton, 'isDeploying:', isDeploying);
      if (e.key === 'Enter' && showPublishButton && !isDeploying) {
        e.preventDefault();
        console.log('Enter key triggered deployment');
        handlePublish();
      }
    };

    // Add event listener to document
    document.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [showPublishButton, isDeploying, handlePublish]);

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Aarogya Club
          </h1>
          <p className="text-xl text-gray-300">
            NIT Jalandhar
          </p>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-black bg-opacity-80 rounded-lg shadow-2xl border border-gray-700 p-6 w-full max-w-4xl mb-8"
        >
          {/* Terminal header */}
          <div className="flex items-center mb-4 pb-3 border-b border-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4 text-gray-400 text-sm">
              Terminal - Aarogya Club Deployment
            </div>
          </div>

          {/* Terminal content */}
          <div className="space-y-2 h-64 overflow-y-auto">
            {terminalLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                <span className="text-blue-400 mr-2">$</span>
                <span className={line.includes('✓') ? 'text-green-400' : 'text-white'}>
                  {line}
                </span>
              </motion.div>
            ))}
            
            {(isTyping || isDeploying) && (
              <div className="flex items-center">
                <span className="text-blue-400 mr-2">$</span>
                <span className="text-white">{currentCommand}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="ml-1 bg-green-400 w-2 h-5 inline-block"
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Publish Button - Terminal Style */}
        <AnimatePresence>
          {showPublishButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-2xl"
            >
              <motion.div
                className="bg-black bg-opacity-80 rounded-lg shadow-2xl border border-gray-700 p-4"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
              >
                {/* Terminal header */}
                <div className="flex items-center mb-3 pb-2 border-b border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4 text-gray-400 text-sm">
                    Terminal - Deploy
                  </div>
                </div>

                {/* Terminal command button */}
                <motion.button
                  onClick={handlePublish}
                  className="w-full flex items-center text-left p-3 rounded-md bg-gray-900 bg-opacity-50 border border-gray-600 hover:border-green-400 hover:bg-opacity-70 transition-all duration-300 group cursor-pointer"
                  whileHover={{ 
                    backgroundColor: "rgba(17, 24, 39, 0.8)",
                    borderColor: "#10b981"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-blue-400 mr-3 font-mono">$</span>
                  <span className="text-green-400 mr-2 font-mono">npm run</span>
                  <span className="text-white font-mono mr-3">deploy</span>
                  
                  <motion.span
                    className="text-lg mr-3"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🚀
                  </motion.span>

                  <span className="text-gray-400 font-mono text-sm">
                    --production
                  </span>

                  {/* Blinking cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-2 bg-green-400 w-2 h-5 inline-block"
                  />

                  {/* Enter key hint */}
                  <div className="ml-auto flex items-center text-gray-400 text-sm">
                    <span className="mr-2">Press</span>
                    <motion.div 
                      className="px-3 py-1 bg-gray-700 rounded border border-gray-600 font-mono text-green-400"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        borderColor: ["#4b5563", "#10b981", "#4b5563"]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      ⏎ Enter
                    </motion.div>
                  </div>
                </motion.button>

                {/* Terminal status line */}
                <div className="mt-3 flex items-center text-xs text-gray-500">
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full mr-2"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span>Ready to deploy • </span>
                  <span className="text-green-400">All checks passed</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Animation */}
        <AnimatePresence>
          {isDeploying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center mt-8"
            >
              <div className="flex space-x-1 mb-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.5, 1],
                      backgroundColor: ['#3B82F6', '#8B5CF6', '#3B82F6'],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="w-3 h-3 bg-blue-500 rounded-full"
                  />
                ))}
              </div>
              <p className="text-white text-lg">
                Step {deploymentStep + 1} of {deploymentCommands.length}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Redirect Message */}
        <AnimatePresence>
          {showRedirect && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mt-8"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">
                Deployment Successful!
              </h2>
              <p className="text-white text-lg">
                Redirecting to your website...
              </p>
              <div className="mt-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LaunchScreen;
