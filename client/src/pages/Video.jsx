import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlockVideoList from '../components/List_BlockVideo';
import ModalVideo from '../components/VideoModal';
import { fetchVideos } from '../redux/actions/videoAction';

const Video = () => {
  const dispatch = useDispatch();
  const { loading, data: videos, error } = useSelector((state) => state.videos);
  const [selectedVideo, setSelectedVideo] = React.useState(null);
  const [isModalOpen, setModalOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

  // if (loading) {
  //   return <div className="loading">Loading videos...</div>;
  // }

  if (error) {
    return <div className="error">Error loading videos: {error}</div>;
  }

  return (
    <div className="container video">
      <div className="blockHead blockFilter">
        <div className="tit">
          動画一覧<span className="resultsNum"> ({videos.length})</span>
        </div>
      </div>

      <BlockVideoList videos={videos} onVideoSelect={handleVideoSelect} />

      <ModalVideo isOpen={isModalOpen} video={selectedVideo} onClose={closeModal} />
    </div>
  );
};

export default Video;
