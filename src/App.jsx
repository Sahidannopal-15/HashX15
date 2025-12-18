import React, { useState } from 'react';
import LetterGlitch from './components/LetterGlitch';
import FuzzyText from './components/FuzzyText';
import { GridScan } from './components/GridScan';
import FileUploader from './components/FileUploader';
import SelectAlgorithm from "./components/SelectAlgorithm";
import HashButton from './components/HashButton';
import Result from './components/Result';
import AlgorithmEducation from './components/AlgorithmEducation';
import Footer from './components/Footer';

const App = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [algorithm, setAlgorithm] = useState("");
  const [hashResults, setHashResults] = useState([]);

  const handleFileSelect = (files) => {
    setSelectedFiles(files);
  };

  const handleHashComplete = (results) => {
    setHashResults(results);
  };

  const items = [
    {
      label: "About",
      bgColor: "#240046",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" }
      ]
    },
    {
      label: "Projects",
      bgColor: "#003554",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#3c096c",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" }
      ]
    }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Section 1 */}
      <section className="relative w-full h-[90vh] bg-black">
        <div className="absolute inset-0 w-full h-[90vh]">
          <GridScan
            lineThickness={1.4}
            linesColor="#A855F7"
            gridScale={0.1}
            scanColor="#EC4899"
            scanOpacity={1}
            enablePost
            bloomIntensity={0}
            chromaticAberration={0.002}
            noiseIntensity={0.008}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className='flex flex-col items-center gap-8'>
            <FuzzyText
              baseIntensity={0.09}
              hoverIntensity={0}
              enableHover={true}
              fontSize='clamp(3rem, 8vw, 6rem)'
              fontWeight={900}
              color='#F3F4F6'
            >
              Welcome to
            </FuzzyText>
            <FuzzyText
              baseIntensity={0.12}
              hoverIntensity={0.25}
              enableHover={true}
              fontSize="clamp(4rem, 12vw, 8rem)"
              fontWeight={900}
              color='#A855F7'
            >
              Hash-X15
            </FuzzyText>
            <p className="text-gray-400 text-lg md:text-xl text-center px-4 mt-10">
              Secure, fast, and reliable file hash calculator powered by HashX-15
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 */}
  <section className="relative w-full bg-black">
    <div className="absolute inset-0 w-full h-[46vh]">
    <LetterGlitch
      glitchSpeed={120}
      centerVignette={true}
      outerVignette={true}
      smooth={false}
      glitchColors={['#A855F7', '#8B5CF6']}
    />
  </div>

  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />
  <div className="relative z-10 py-16 px-4">
    <div className="max-w-4xl mx-auto space-y-10">
      <FileUploader onFileSelect={handleFileSelect} />
      {selectedFiles.length > 0 && (
        <div className="space-y-10">
          <div className="relative my-6">
            <div className="h-px bg-purple-500/20 w-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="px-5 py-1.5 bg-black text-purple-400 text-xs font-semibold rounded-full border border-purple-500/20">
                Step 2: Select Algorithm
              </span>
            </div>
          </div>

          <SelectAlgorithm
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
          />

          {/* Hash Button */}
          {algorithm && (
            <div>
              <div className="relative my-6">
                <div className="h-px bg-pink-500/20 w-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="px-5 py-1.5 bg-black text-pink-400 text-xs font-semibold rounded-full border border-pink-500/20">
                    Step 3: Calculate Hash
                  </span>
                </div>
              </div>

              <HashButton
                files={selectedFiles}
                algorithm={algorithm}
                onHashComplete={handleHashComplete}
              />
            </div>
          )}

          {/* Result*/}
          {hashResults.length > 0 && (
            <div>
              <div className="relative my-6">
                <div className="h-px bg-green-500/20 w-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="px-5 py-1.5 bg-black text-green-400 text-xs font-semibold rounded-full border border-green-500/20">
                    Results
                  </span>
                </div>
              </div>

              <Result results={hashResults} />
            </div>
          )}
        </div>
      )}
    </div>
  </div>
</section>

      {/* Section 3*/}
      <AlgorithmEducation />

      {/*Footer*/}
      <Footer />

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;