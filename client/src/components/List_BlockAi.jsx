import React from 'react';
import BlockAi from './BlockAi';

const BlockAiList = ({ blocks }) => {
  const handleEditClick = (name) => {
    console.log(`Edit button clicked for: ${name}`);
  };

  const handleGenerateClick = (name) => {
    console.log(`Generate button clicked for: ${name}`);
  };

  return (
    <div className="blockContent blockCreateList">
      {blocks.map((block, index) => (
        <BlockAi
          key={index}
          name={block.name}
          detail={block.detail}
          tags={block.tags}
          onEditClick={() => handleEditClick(block.name)}
          onGenerateClick={() => handleGenerateClick(block.name)}
        />
      ))}
    </div>
  );
};

export default BlockAiList;
