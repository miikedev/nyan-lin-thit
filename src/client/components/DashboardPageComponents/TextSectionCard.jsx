import React, { useEffect, useState } from 'react';

const TextSectionCard = ({height, data}) => {
  const [titles, setTitle] = useState([])
  const [contents, setContent] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(()=>{
    setTitle(()=> data?.map(d=>d.title))
    setContent(() => data?.map(d=>d.description))
  }, [data])


  const handleCardClick = () => {
    setModalTitle(titles[currentIndex]);
    setModalContent(contents[currentIndex]);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div
        className={`text-black border-[1px] border-[#e6e6e6] hover:bg-[#A2CBFE] transition-all duration-300 ease-in-out hover:text-white w-full h-[${height}] bg-white  shadow-md rounded-lg  flex justify-between items-center cursor-pointer gap-x-[10px] px-[7px] py-[10px]`}
        onClick={handleCardClick}
      >
        <div className="font-poppins flex flex-col justify-between items-center gap-[10px]">
          <div>
          <p className="font-[700] md:font-semibold text-[20px] md:text-[16px]">{titles[currentIndex]}</p>
          </div>
          <div>
          <p className="text-[16px] font-kanit font-[400] md:text-[10px] text-[#212121]">{contents[currentIndex]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSectionCard;