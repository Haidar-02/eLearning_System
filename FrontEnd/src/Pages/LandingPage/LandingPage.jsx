import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';

import kidImage from '../../assets/images/Homepage/kid.png';
import plant from '../../assets/images/Homepage/plant.png';
import toy from '../../assets/images/Homepage/toy.png';

import './LandingPage.css';
const LandingPage = () => {
  return (
    <main className="flex flex-col grow h-full">
      <Navbar />
      <div className="hero monster flex items-center grow">
        <div className="left flex justify-center items-center">
          <div className="hero-text flex flex-col grow gap-2">
            <div className="">E-COURSE-PLATFORM</div>
            <div className="main-text gothic  text-[48px] ">
              Learning and teaching online, made easy.
            </div>
            <div>Enjoy various games, puzzles, and challenges</div>
          </div>
        </div>
        <div className="right "></div>
        <div className="landing-images flex items-center">
          <img className="kid" src={kidImage} alt="" />
          <img className="plant" src={plant} alt="" />
          <img className="toy" src={toy} alt="" />
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
