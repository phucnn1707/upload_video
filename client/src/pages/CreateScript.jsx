import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TrendList from '../components/List_Trend';
import { fetchTrends } from '../redux/actions/trendAction';

const CreateScript = () => {
  const dispatch = useDispatch();
  const trendsState = useSelector((state) => state.trends);
  const { loading, trends, error } = trendsState;

  useEffect(() => {
    // dispatch(fetchTrends());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const sampleTrends = [
    { name: '#AI技術', url: 'https://twitter.com/search?q=%23AI技術' },
    { name: '#チャットGPT', url: 'https://twitter.com/search?q=%23チャットGPT' },
    { name: '#日本料理', url: 'https://twitter.com/search?q=%23日本料理' },
    { name: '#アニメ', url: 'https://twitter.com/search?q=%23アニメ' },
    { name: '#旅行', url: 'https://twitter.com/search?q=%23旅行' },
    { name: '#ラーメン', url: 'https://twitter.com/search?q=%23ラーメン' },
    { name: '#漫画', url: 'https://twitter.com/search?q=%23漫画' },
    { name: '#Jポップ', url: 'https://twitter.com/search?q=%23Jポップ' },
    { name: '#日経平均', url: 'https://twitter.com/search?q=%23日経平均' },
    { name: '#スーパーマーケット', url: 'https://twitter.com/search?q=%23スーパーマーケット' },
    { name: '#IT技術', url: 'https://twitter.com/search?q=%23IT技術' },
    { name: '#ビジネス', url: 'https://twitter.com/search?q=%23ビジネス' },
    { name: '#秋の紅葉', url: 'https://twitter.com/search?q=%23秋の紅葉' },
    { name: '#寿司', url: 'https://twitter.com/search?q=%23寿司' },
    { name: '#京都観光', url: 'https://twitter.com/search?q=%23京都観光' },
    { name: '#映画', url: 'https://twitter.com/search?q=%23映画' },
    { name: '#コンサート', url: 'https://twitter.com/search?q=%23コンサート' },
    { name: '#温泉', url: 'https://twitter.com/search?q=%23温泉' },
    { name: '#ドローン', url: 'https://twitter.com/search?q=%23ドローン' },
    { name: '#テクノロジー', url: 'https://twitter.com/search?q=%23テクノロジー' },
    { name: '#教育', url: 'https://twitter.com/search?q=%23教育' },
    { name: '#プログラミング', url: 'https://twitter.com/search?q=%23プログラミング' },
    { name: '#宇宙開発', url: 'https://twitter.com/search?q=%23宇宙開発' },
    { name: '#芸術', url: 'https://twitter.com/search?q=%23芸術' },
    { name: '#音楽', url: 'https://twitter.com/search?q=%23音楽' },
    { name: '#フェスティバル', url: 'https://twitter.com/search?q=%23フェスティバル' },
    { name: '#スポーツ', url: 'https://twitter.com/search?q=%23スポーツ' },
    { name: '#野球', url: 'https://twitter.com/search?q=%23野球' },
    { name: '#サッカー', url: 'https://twitter.com/search?q=%23サッカー' },
    { name: '#料理レシピ', url: 'https://twitter.com/search?q=%23料理レシピ' },
    { name: '#和菓子', url: 'https://twitter.com/search?q=%23和菓子' },
    { name: '#京都', url: 'https://twitter.com/search?q=%23京都' },
    { name: '#東京', url: 'https://twitter.com/search?q=%23東京' },
    { name: '#大阪', url: 'https://twitter.com/search?q=%23大阪' },
    { name: '#花見', url: 'https://twitter.com/search?q=%23花見' },
    { name: '#夏祭り', url: 'https://twitter.com/search?q=%23夏祭り' },
    { name: '#冬の景色', url: 'https://twitter.com/search?q=%23冬の景色' },
    { name: '#温暖化', url: 'https://twitter.com/search?q=%23温暖化' },
    { name: '#電気自動車', url: 'https://twitter.com/search?q=%23電気自動車' },
    { name: '#エコロジー', url: 'https://twitter.com/search?q=%23エコロジー' },
    { name: '#サステナビリティ', url: 'https://twitter.com/search?q=%23サステナビリティ' },
    { name: '#メンタルヘルス', url: 'https://twitter.com/search?q=%23メンタルヘルス' },
    { name: '#健康', url: 'https://twitter.com/search?q=%23健康' },
    { name: '#フィットネス', url: 'https://twitter.com/search?q=%23フィットネス' },
    { name: '#美容', url: 'https://twitter.com/search?q=%23美容' },
    { name: '#ファッション', url: 'https://twitter.com/search?q=%23ファッション' },
    { name: '#フードトレンド', url: 'https://twitter.com/search?q=%23フードトレンド' },
    { name: '#デザイン', url: 'https://twitter.com/search?q=%23デザイン' },
    { name: '#インテリア', url: 'https://twitter.com/search?q=%23インテリア' },
    { name: '#料理', url: 'https://twitter.com/search?q=%23料理' },
  ];

  return (
    <>
      <div className="container">
        <div className="blockHead blockFilter">
          <div className="tit">現在トレンドのキーワード</div>
        </div>
        <TrendList trends={sampleTrends} />
      </div>
    </>
  );
};

export default CreateScript;
