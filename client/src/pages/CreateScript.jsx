import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TrendList from '../components/List_Trend';
import { fetchTrends } from '../redux/actions/trendAction';
import CreateScriptModal from '../components/CreateScriptModal';
import { getTrend } from '../redux/actions/apiTrendAction';

const CreateScript = () => {
  const dispatch = useDispatch();
  const trendsState = useSelector((state) => state.trends);
  const { loading, trends, error } = trendsState;

  const [selectedTrend, setSelectedTrend] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getTrend());
        dispatch(fetchTrends());
      } catch (err) {
        console.error('Error fetching trends:', err);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleTrendClick = (trend) => {
    setSelectedTrend(trend);
  };

  const handleCloseModal = () => {
    setSelectedTrend(null);
  };

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="container">
        <div className="blockHead blockFilter">
          <div class="tit">
            現在トレンドのキーワード
            <span class="trend-note">※直近3日間</span>
          </div>
        </div>
        <TrendList trends={trends} onTrendClick={handleTrendClick} />
      </div>

      {selectedTrend && <CreateScriptModal block={selectedTrend} onClose={handleCloseModal} />}
    </>
  );
};

export default CreateScript;
