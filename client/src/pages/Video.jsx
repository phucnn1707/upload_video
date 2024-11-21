import React, { useState } from 'react';
import BlockVideoList from '../components/List_BlockVideo';
import imageVideo from '../assets/images/dummy2.png';
import ModalVideo from '../components/VideoModal';

const Video = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const videoData = [
    {
      id: 1,
      thumbnail: imageVideo,
      title: 'AIがもたらす未来',
      date: '2024/10/02',
      isPosted: true,
      videoUrl: 'video/output_1730253292779_with_sub_and_title.mp4',
    },
    {
      id: 2,
      thumbnail: imageVideo,
      title: '岡本の勝ち越し弾で巨人が連敗ストップ',
      date: '2024/10/01',
      isPosted: false,
      videoUrl: 'video/output_1730253292779_with_sub_and_title.mp4',
    },
  ];

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="container video">
      <div className="blockHead blockFilter">
        <div className="tit">
          動画一覧<span className="resultsNum"> ({videoData.length})</span>
        </div>
      </div>

      <BlockVideoList videos={videoData} onVideoSelect={handleVideoSelect} />

      <ModalVideo isOpen={isModalOpen} video={selectedVideo} onClose={closeModal} />
    </div>
  );
};

export default Video;
