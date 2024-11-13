// Create.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTextScripts } from '../redux/actions/textScriptActions';
import BlockAiList from '../components/List_BlockAi';

const Create = () => {
  const dispatch = useDispatch();

  const { loading, textScripts, error } = useSelector((state) => state.textScripts);

  useEffect(() => {
    dispatch(fetchTextScripts());
  }, [dispatch]);

  return (
    <>
      <div className="container create">
        <div className="blockHead blockFilter">
          <div className="tit">2024/10/02動画スクリプト</div>
          <div className="filter">
            <input className="input-date" type="date" placeholder="yyyy/mm/dd" />
          </div>
        </div>

        {loading ? <p>Loading...</p> : error ? <p>Error: {error}</p> : <BlockAiList blocks={textScripts} />}
      </div>
    </>
  );
};

export default Create;
