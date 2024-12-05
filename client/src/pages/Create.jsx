import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTextScripts } from '../redux/actions/textScriptActions';
import BlockAiList from '../components/List_BlockAi';
import { fetchAvatars } from '../redux/actions/avatarAction';

const Create = () => {
  const dispatch = useDispatch();

  const { loading: scriptsLoading, textScripts, error: scriptsError } = useSelector((state) => state.textScripts);
  const { loading: avatarsLoading, avatars, error: avatarsError } = useSelector((state) => state.avatars);

  useEffect(() => {
    dispatch(fetchTextScripts());
    dispatch(fetchAvatars());
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

        {scriptsLoading || avatarsLoading ? (
          <p>Loading...</p>
        ) : scriptsError ? (
          <p>Error: {scriptsError}</p>
        ) : avatarsError ? (
          <p>Error: {avatarsError}</p>
        ) : (
          <BlockAiList blocks={textScripts} avatars={avatars} />
        )}
      </div>
    </>
  );
};

export default Create;
