import React from 'react';
import imageVideo from '../assets/images/dummy.png';

const VideoDetail = () => {
  const handleDownloadClick = () => {
    alert('動画のダウンロードが開始されました！');
  };
  const handlePublishClick = () => {
    alert('SNSに投稿しました！');
  };

  return (
    <div className="container video">
      <div className="blockHead blockFilter">
        <div className="tit">AIがもたらす未来</div>
        <div className="filter">
          <button className="btn-download" onClick={handleDownloadClick}>
            ダウンロード
          </button>
        </div>
      </div>
      <div className="blockContent blockVideoDetail">
        <div className="video">
          <img src={imageVideo} alt="Video Thumbnail" />
        </div>
        <div className="detail">
          <table>
            <tbody>
              <tr>
                <th>タイトル：</th>
                <td>AIがもたらす未来</td>
              </tr>
              <tr>
                <th>内容：</th>
                <td>
                  次世代の技術として注目されるAIは、さまざまな産業で変革をもたらしています。特に、医療や製造業、金融業において、その応用が急速に広がっています。AIの活用により、データ分析や自動化が進み、業務効率が向上。さらに、AIは人々の生活にも影響を与えており、スマートホームや自動運転車など、日常生活を便利にする技術も発展中です。しかし、倫理的課題やセキュリティの問題も指摘されており、今後はそれらの課題にどう対処するかが鍵となります。
                </td>
              </tr>
              <tr>
                <th>動画の長さ：</th>
                <td>00:01:02s</td>
              </tr>
              <tr>
                <th>作成日：</th>
                <td>2024/10/02 10:20</td>
              </tr>
              <tr>
                <th>SNS投稿：</th>
                <td>未投稿</td>
              </tr>
            </tbody>
          </table>
          <div className="text_right">
            <button className="btn-gradient btn-publish" onClick={handlePublishClick}>
              SNSに投稿する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
