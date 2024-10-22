import React from 'react';
import ScriptAi from '../components/ScriptAI';

const Create = () => {
  return (
    <>
      <div className="container create">
        <div className="blockHead blockFilter">
          <div className="tit">2024/10/02動画スクリプト</div>
          <div className="filfer">
            <input className="input-date" type="date" placeholder="yyyy/mm/dd" />
          </div>
        </div>
        <div className="blockContent blockCreateList">
          <ScriptAi />
          <ScriptAi />
          <ScriptAi />
        </div>
      </div>
    </>
  );
};

export default Create;
