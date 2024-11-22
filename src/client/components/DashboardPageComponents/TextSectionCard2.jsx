import Slider from "react-slick";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function CustomSlide(props) {
  const { index, height, title, description, ...otherProps } = props;
  return (
    <div {...otherProps}>
      <div
          className={`text-[#848484]  border-[1px] border-[#e6e6e6]  w-full min-h-[16.7rem] h-[${height}]  hover:bg-[#f8f8f8] transition-all duration-300 ease-in-out bg-white px-[20px] py-[20px] rounded-lg flex justify-start items-start cursor-pointer gap-x-[20px]`}
        >
          <div className="font-poppins flex flex-col gap-[10px]">
            <div>
            <p className="text-black font-[600] text-[20px]">{title}</p>
            </div>
            <div>
            <p className="text-[16px] font-kanit font-[400] ">{description}</p>
            </div>
          </div>
        </div>
    </div>
  );
}
const TextSectionCard2 = ({height}) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [modalTitle, setModalTitle] = useState('');
  // const [modalContent, setModalContent] = useState('');
  // const [currentIndex, setCurrentIndex] = useState(0);

  const contents = [
    {title: 'The massacre of the military group12',description: 'The massacre of the military group12'},
    {title: 'Mass Killings in September 2023',description: 'In September 2023, the military group committed at least (10) mass killings in which five (5) or more people were killed, and a total of (71) civilians were killed.In September 2023, the military group committed at least (10) mass killings in which five (5) or more people were killed, and a total of (71) civilians were killed.'},
    {title: 'Mass Killings in October 2023',description: 'In October 2023, the military group committed at least (8) mass killings in which five (5) or more people were killed, and a total of (62) civilians were killed.'},
    {title: 'Mass Killings in November 2023',description: 'In November 2023, the military group committed at least (9) mass killings in which five (5) or more people were killed, and a total of (78) civilians were killed.'},
    {title: 'Mass Killings in December 2023',description: 'In December 2023, the military group committed at least (10) mass killings in which five (5) or more people were killed, and a total of (72) civilians were killed.'},
  ];

  // const handlePrevClick = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex - 1 + 5) % 5);
  // };

  // const handleNextClick = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % 5);
  // };

  // const handleCardClick = () => {
  //   setModalTitle(titles[currentIndex]);
  //   setModalContent(contents[currentIndex]);
  //   setIsModalOpen(true);
  // };

  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  // };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear"
  };
  return (
    <div className='slide-container'>
      <Slider {...settings} className="flex">
        {contents.map((content, index) => {
          return (
            <CustomSlide

              key={index}
              index={index}
              height={height}
              title={content.title}
              description={content.description}
            />
          )
        })}
      </Slider>
      {/* <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={modalTitle}
        content={modalContent}
      /> */}
    </div>
  );
};

export default TextSectionCard2;