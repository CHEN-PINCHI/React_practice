import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function WorkModal({ modalJob, setModalJob }) {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slick 設定
  const sliderSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    slidesToShow: window.innerWidth < 769 ? 2 : 3,
    slidesToScroll: 1,
    cssEase: 'ease-in-out',
    arrows: false,
    dots: false,
    beforeChange: (_, newIndex) => setCurrentSlide(newIndex),
  };

  // 點擊輪播點
  const handleDotClick = (index) => {
    if (sliderRef.current) sliderRef.current.slickGoTo(index);
  };

  // modal 打開／關閉時處理 body overflow
  useEffect(() => {
    if (modalJob) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // 清除效果（保險）
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalJob]);

  // 每次打開新 modal 時重設輪播
  useEffect(() => {
    if (modalJob && sliderRef.current) {
      setCurrentSlide(0);
      sliderRef.current.slickGoTo(0);
    }
  }, [modalJob]);

  return (
    <div
      className={`modalArea ${modalJob ? 'current' : ''}`}
      onClick={() => setModalJob(null)}
    >
      <div className="modalWrap" onClick={(e) => e.stopPropagation()}>
        {modalJob && (
          <div className="modalContent">
            <div className="detailsInfo">詳細資訊</div>

            <div className="modalBox">
              {/* ===== 標題區 ===== */}
              <div className="modalTitleBox">
                <div className="modalTitle">{modalJob.companyName}</div>
                <div className="modalSubTitle">{modalJob.jobTitle}</div>
              </div>

              {/* ===== 輪播區 ===== */}
              <div className="photoBox">
                <Slider {...sliderSettings} ref={sliderRef} className="photoList">
                  {modalJob.companyPhoto.map((url, i) => (
                    <div className="photoItem" key={i}>
                      <div className="Img">
                        <img
                          src={url}
                          alt={`${modalJob.companyName} 圖片 ${i + 1}`}
                        />
                      </div>
                    </div>
                  ))}
                </Slider>

                <div className="dotsBox">
                  {modalJob.companyPhoto.map((_, i) => (
                    <span
                      key={i}
                      className={`dot ${i === currentSlide ? 'active' : ''}`}
                      onClick={() => handleDotClick(i)}
                      role="button"
                      tabIndex={0}
                    />
                  ))}
                </div>
              </div>

              {/* ===== 說明區 ===== */}
              <div className="descriptionBox">
                <div className="descriptionTitle">工作內容</div>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: modalJob.description }}
                />
              </div>
            </div>

            {/* ===== 關閉按鈕 ===== */}
            <button
              type="button"
              className="closeBtn"
              onClick={() => setModalJob(null)}
            >
              關閉
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
