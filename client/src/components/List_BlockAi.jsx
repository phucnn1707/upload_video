import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlockAi from './BlockAi';
import EditModal from './EditModal';
import AvatarModal from './AvatarModal';
import { generateVideo } from '../redux/actions/generateVideoAction';
import { toast } from 'react-toastify';

const BlockAiList = ({ blocks, avatars }) => {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { generating } = useSelector((state) => state.generateVideo);

  const handleEditClick = (block) => {
    setSelectedBlock(block);
    setIsEditModalOpen(true);
  };

  const handleGenerateClick = (block) => {
    setSelectedBlock(block);
    setIsAvatarModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedBlock(null);
  };

  const handleAvatarModalClose = () => {
    setIsAvatarModalOpen(false);
    setSelectedBlock(null);
  };

  const handleAvatarSelect = async (avatar) => {
    if (selectedBlock) {
      try {
        await dispatch(generateVideo(selectedBlock.script_id, avatar.avatar_url, avatar.voice_id, avatar.type));
        toast.success('ビデオが正常に生成されました！');
      } catch (error) {
        toast.error('ビデオ生成中にエラーが発生しました。');
      }
    }
    setIsAvatarModalOpen(false);
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
          onGenerateClick={() => handleGenerateClick(block)}
        />
      ))}
      {isEditModalOpen && selectedBlock && <EditModal block={selectedBlock} onClose={handleEditModalClose} />}
      {isAvatarModalOpen && (
        <AvatarModal avatars={avatars} onClose={handleAvatarModalClose} onSelect={handleAvatarSelect} />
      )}
      {generating && (
        <div className="loading-overlay">
          <div className="loading-circle"></div>
          <p className="loading-text">ビデオを生成しています。少々お待ちください...</p>
        </div>
      )}
    </div>
  );
};

export default BlockAiList;
