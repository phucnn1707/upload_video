import React from 'react';

const ScriptAi = () => {
  return (
    <div className="blockAiDesc">
      <div className="name">AIがもたらす未来</div>
      <div className="detail">
        次世代の技術として注目されるAIは、さまざまな産業で変革をもたらしています。特に、医療や製造業、金融業において、その応用が急速に広がっています。AIの活用により、データ分析や自動化が進み、業務効率が向上。さらに、AIは人々の生活にも影響を与えており、スマートホームや自動運転車など、日常生活を便利にする技術も発展中です。しかし、倫理的課題やセキュリティの問題も指摘されており、今後はそれらの課題にどう対処するかが鍵となります。
      </div>
      <div className="footer">
        <div className="tag">
          <a href="#">#AI</a>
          <a href="#">#未来の技術</a>
        </div>
        <div className="button">
          <button className="btn-edit" type="button" data-bs-toggle="modal" data-bs-target="#editContentAi">
            編集
          </button>
          <button className="btn-gradient btn-generate" type="button">
            動画生成
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScriptAi;
