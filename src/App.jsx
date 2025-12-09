import React from 'react';
import { useState } from 'react';
import CardNav from './components/CardNav';
import { GoArrowUpRight } from "react-icons/go";
import logo from "./assets/logo.png"
import LetterGlitch from './components/LetterGlitch';
import FuzzyText from './components/FuzzyText';
import {GridScan} from './components/GridScan';
import FileUploader from './components/FileUploader'
import { Upload, File, X, Check } from 'lucide-react';

const App = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
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
    <div className="relative w-full overflow-hidden flex flex-col">
      {/* Section 1*/}
      <div className="relative w-full min-h-screen">
        <div className="absolute inset-0 w-full h-[90%]">
          <LetterGlitch
            glitchSpeed={60}
            centerVignette={true}
            outerVignette={true}
            smooth={true}
          />
        </div>

        {/* Navigation */}
        <CardNav
          logo={logo}
          logoAlt="Company Logo"
          items={items}
          baseColor="#212529"
          menuColor="#fff"
          buttonBgColor="#fff"
          buttonTextColor="#111"
          ease="power3.out"
        />

        {/* FuzzyText*/}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className='flex flex-col items-center gap-6'>
            <FuzzyText 
              baseIntensity={0.09} 
              hoverIntensity={0.2} 
              enableHover={true}
              fontSize='6rem'
              fontWeight={900}
            >
              Welcome to
            </FuzzyText>
            <FuzzyText 
              baseIntensity={0.09} 
              hoverIntensity={0.2} 
              enableHover={true}
              fontSize="8rem"
              fontWeight={900}
            >
              Hash-X15
            </FuzzyText>
            <button className='bg-gray-400 hover:bg-gray-600 rounded-xl'>
              {/* <p className='p-3 font-bold'>Get Started</p> */}
            </button>
          </div>
        </div>
      </div>

      {/* Section 2*/}
      <div className="relative w-full min-h-screen -mt-[10vh] bg-black">
        <div className="absolute inset-0 w-full h-full">
          <GridScan
            sensitivity={0.55}
            lineThickness={3}
            linesColor="#fff"
            gridScale={0.1}
            scanColor="#FF9FFC"
            scanOpacity={0.4}
            enablePost
            bloomIntensity={0.6}
            chromaticAberration={0.002}
            noiseIntensity={0.01}
          />
        </div>
        <div className="relative z-10 flex flex-col top-48 items-center justify-center">
          <FileUploader />
        </div>
      </div>
    </div>
  );
};

export default App;
