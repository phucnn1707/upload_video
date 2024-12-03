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

  const handleGenerateClick = (title) => {
    console.log(`Generate button clicked for: ${title}`);
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
          onGenerateClick={() => handleGenerateClick(block.title)}
        />
      ))}
      {isModalOpen && selectedBlock && <EditModal block={selectedBlock} onClose={handleModalClose} />}
    </div>
  );
};

export default BlockAiList;
