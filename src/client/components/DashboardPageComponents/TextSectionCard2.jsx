


import React, { useState } from 'react';
import Modal from './Modal';

const TextSectionCard2 = ({height}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const titles = [
    'The massacre of the military group12',
    'Mass Killings in September 2023',
    'Mass Killings in October 2023',
    'Mass Killings in November 2023',
    'Mass Killings in December 2023',
  ];

  const contents = [
    'Between September and December 2023, the military group committed at least (37) mass killings in which five (5) or more people were killed, and a total of (283) civilians were killed.Between September and December 2023, the military group committed Between September and',
    'In September 2023, the military group committed at least (10) mass killings in which five (5) or more people were killed, and a total of (71) civilians were killed.',
    'In October 2023, the military group committed at least (8) mass killings in which five (5) or more people were killed, and a total of (62) civilians were killed.',
    'In November 2023, the military group committed at least (9) mass killings in which five (5) or more people were killed, and a total of (78) civilians were killed.',
    'In December 2023, the military group committed at least (10) mass killings in which five (5) or more people were killed, and a total of (72) civilians were killed.',
  ];

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 5) % 5);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 5);
  };

  const handleCardClick = () => {
    setModalTitle(titles[currentIndex]);
    setModalContent(contents[currentIndex]);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        className={`text-[#7EADE3]  border-[1px] border-[#1e1835] w-full h-[${height}]  hover:bg-[#2c4766] bg-[#000408] px-[20px] py-[20px]  shadow-md rounded-lg  flex justify-between items-center cursor-pointer gap-x-[20px]`}
        onClick={handleCardClick}
      >
        {/* <div className="flex space-x-2 "> </div> */}
            <button
              className="text-[35px] font-bold hover:text-[#0f2947]"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevClick();
              }}
            >
              {/* &#8592; */}
              &lt;
            </button>
           
         
        <div className="flex flex-col justify-between items-center gap-[10px]">
          <div>
          <p className={`font-[700] text-[20px] 2xl:text-[24px] 3xl:text-[30px] 4xl:text-[32px]`}>{titles[currentIndex]}</p>
          </div>
          <div>
          <p className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px]">{contents[currentIndex]}</p>
          </div>
        </div>
      
       
        <button
              className="text-[35px] font-bold hover:text-[#0f2947] focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                handleNextClick();
              }}
            >
              {/* &#8594; */}
              &gt;
            </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={modalTitle}
        content={modalContent}
      />
    </div>
  );
};

export default TextSectionCard2;