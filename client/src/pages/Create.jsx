import React from 'react';
import BlockAiList from '../components/List_BlockAi';

const Create = () => {
  const blockAiData = [
    {
      name: 'AIがもたらす未来',
      detail:
        '次世代の技術として注目されるAIは、さまざまな産業で変革をもたらしています。特に、医療や製造業、金融業において、その応用が急速に広がっています。',
      tags: ['#AI', '#未来の技術'],
    },
    {
      name: '岡本の勝ち越し弾で巨人が連敗ストップ、阪神の連勝止まる',
      detail: 'プロ野球の試合で、岡本選手がホームランを放ち、巨人の連敗をストップさせ、阪神の連勝を止めました。',
      tags: ['#プロ野球の試合', '#巨人vs阪神'],
    },
    {
      name: '自動運転の未来',
      detail:
        '自動運転技術の発展により、今後の交通システムが大きく変わると予想されています。安全性と効率性が向上し、新しい交通の時代が始まるでしょう。',
      tags: ['#自動運転', '#未来の交通'],
    },
    {
      name: 'スマートホームの進化',
      detail:
        'スマートホーム技術の進化により、家庭内での生活がより便利になっています。家電の操作がスマホでできるようになり、生活が大きく変わっています。',
      tags: ['#スマートホーム', '#生活の未来'],
    },
    {
      name: 'AIによる医療の進化',
      detail:
        'AI技術の導入で、診断の精度が向上し、治療プロセスの効率化が進んでいます。医療業界におけるAIの役割がますます重要になっています。',
      tags: ['#医療', '#AIの応用'],
    },
    {
      name: '日本経済とテクノロジー',
      detail:
        '日本経済において、テクノロジーが大きな役割を果たしています。AIとロボット技術の進化により、製造業が強化されています。',
      tags: ['#日本経済', '#テクノロジー'],
    },
    {
      name: '量子コンピュータの可能性',
      detail:
        '量子コンピュータの研究が進み、計算速度が飛躍的に向上する未来が予測されています。これにより、科学研究やビジネスでの応用が期待されています。',
      tags: ['#量子コンピュータ', '#未来技術'],
    },
    {
      name: '宇宙探査とAI',
      detail:
        '宇宙探査においてもAI技術が活用されています。AIを使ったデータ分析やロボット探査が、さらなる宇宙の秘密を明らかにする手助けをしています。',
      tags: ['#宇宙探査', '#AI'],
    },
    {
      name: '教育とAIの未来',
      detail:
        '教育の分野においてもAIが導入され始め、学習方法が進化しています。生徒の進捗を追跡し、個々に合わせた指導が可能になる未来が訪れています。',
      tags: ['#教育', '#AI教育'],
    },
    {
      name: 'サイバーセキュリティとAI',
      detail:
        'サイバーセキュリティ分野でのAIの役割が注目されています。AIが脅威を早期に検出し、迅速に対策を行うことで、セキュリティが向上しています。',
      tags: ['#サイバーセキュリティ', '#AI防御'],
    },
  ];

  return (
    <>
      <div className="container create">
        <div className="blockHead blockFilter">
          <div className="tit">2024/10/02動画スクリプト</div>
          <div className="filter">
            <input className="input-date" type="date" placeholder="yyyy/mm/dd" />
          </div>
        </div>
        <div className="blockContent blockCreateList">
          <BlockAiList blocks={blockAiData} />
        </div>
      </div>
    </>
  );
};

export default Create;
