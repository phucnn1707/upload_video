import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TrendList from '../components/List_Trend';
import { fetchTrends } from '../redux/actions/trendAction';
import CreateScriptModal from '../components/CreateScriptModal';

const CreateScript = () => {
  const dispatch = useDispatch();
  const trendsState = useSelector((state) => state.trends);
  const { loading, trends, error } = trendsState;

  const [selectedTrend, setSelectedTrend] = useState(null);

  useEffect(() => {
    dispatch(fetchTrends());
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
          <div className="tit">現在トレンドのキーワード</div>
        </div>
        <TrendList trends={trends} onTrendClick={handleTrendClick} />
      </div>

      {selectedTrend && <CreateScriptModal block={selectedTrend} onClose={handleCloseModal} />}
    </>
  );
};

export default CreateScript;
