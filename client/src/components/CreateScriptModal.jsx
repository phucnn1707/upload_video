import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateText } from '../redux/actions/generateTextActions';

const CreateScriptModal = ({ block, onClose }) => {
  const dispatch = useDispatch();

  const generatedText = useSelector((state) => state.generateText?.generatedText);
  const loading = useSelector((state) => state.generateText?.loading);
  const error = useSelector((state) => state.generateText?.error);

  const [detail, setDetail] = useState('');

  useEffect(() => {
    if (!loading && generatedText) {
      setDetail(generatedText);
    }
  }, [loading, generatedText]);

  const handleGenerateText = () => {
    dispatch(generateText(block.keyword));
  };

  const handleSave = () => {
    console.log('Saved changes:', { name: block.keyword, detail });
    onClose();
  };

  return (
    <div className="modal fade show" tabIndex="-1" role="dialog" aria-hidden="true" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-4">
                <label className="col-form-label">目出し</label>
                <input className="form-control" type="text" value={block.keyword} readOnly />
              </div>
              <div className="mb-4 d-flex justify-content-center">
                <button
                  type="button"
                  className="btn-gradient btn-generate"
                  onClick={handleGenerateText}
                  disabled={loading}
                >
                  {loading ? '生成中...' : '動画生成'}
                </button>
              </div>
              <div className="mb-4">
                <label className="col-form-label" htmlFor="message-text">
                  内容
                </label>
                <textarea
                  className="form-control"
                  id="message-text"
                  rows="4"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  placeholder="生成ボタンを押してテキストを生成してください。生成されたテキストは自由に編集できます。"
                />
                {error && <p style={{ color: 'red' }}>エラー: {error}</p>}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              キャンセル
            </button>
            <button type="button" className="btn-gradient" onClick={handleSave}>
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateScriptModal;
