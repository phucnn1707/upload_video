import React, { useState } from 'react';
import BlockAi from './BlockAi';
import EditModal from './EditModal';

const BlockAiList = ({ blocks }) => {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (block) => {
    setSelectedBlock(block);
    setIsModalOpen(true);
  };

  const handleGenerateClick = (name) => {
    console.log(`Generate button clicked for: ${name}`);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBlock(null);
  };

  return (
    <div className="blockContent blockCreateList">
      {blocks.map((block, index) => (
        <BlockAi
          key={index}
          name={block.title}
          detail={block.text_content}
          tag={[block.keyword?.keyword]}
          onEditClick={() => handleEditClick(block)}
          onGenerateClick={() => handleGenerateClick(block.name)}
        />
      ))}
      {isModalOpen && selectedBlock && <EditModal block={selectedBlock} onClose={handleModalClose} />}
    </div>
  );
};

export default BlockAiList;
