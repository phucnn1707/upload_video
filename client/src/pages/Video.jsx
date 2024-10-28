import React from 'react';
import BlockVideoList from '../components/List_BlockVideo';
import imageVideo from '../assets/images/dummy2.png';

const Video = () => {
  const videoData = [
    {
      id: 1,
      thumbnail: imageVideo,
      title: 'AIがもたらす未来',
      date: '2024/10/02',
      isPosted: true,
    },
    {
      id: 2,
      thumbnail: imageVideo,
      title: '岡本の勝ち越し弾で巨人が連敗ストップ',
      date: '2024/10/01',
      isPosted: false,
    },
    {
      id: 3,
      thumbnail: imageVideo,
      title: '未来のスマートホーム技術',
      date: '2024/09/28',
      isPosted: true,
    },
    {
      id: 4,
      thumbnail: imageVideo,
      title: '自動運転車の未来',
      date: '2024/09/26',
      isPosted: false,
    },
    {
      id: 5,
      thumbnail: imageVideo,
      title: 'AIと医療の進化',
      date: '2024/09/20',
      isPosted: true,
    },
    {
      id: 6,
      thumbnail: imageVideo,
      title: '金融業界におけるAIの影響',
      date: '2024/09/15',
      isPosted: false,
    },
    {
      id: 7,
      thumbnail: imageVideo,
      title: '次世代AI技術の展望',
      date: '2024/09/10',
      isPosted: true,
    },
  ];

  return (
    <>
      <div className="container video">
        <div className="blockHead blockFilter">
          <div className="tit">
            動画一覧<span className="resultsNum"> ({videoData.length})</span>
          </div>
          <div className="filter">
            <input className="input-search" type="text" placeholder="検索" />
            <input className="input-date" type="date" placeholder="yyyy/mm/dd" />
            <span>~</span>
            <input className="input-date" type="date" placeholder="yyyy/mm/dd" />
          </div>
        </div>
        <BlockVideoList videos={videoData} />
      </div>
    </>
  );
};

export default Video;
