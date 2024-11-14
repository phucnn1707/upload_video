import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateScript } from '../redux/actions/generateScriptActions';
import { createTextScript } from '../redux/actions/textScriptActions'; // Import action createTextScript

const CreateScriptModal = ({ block, onClose }) => {
  const dispatch = useDispatch();

  const generatedText = useSelector((state) => state.generateScript?.generatedText);
  const generatedTitle = useSelector((state) => state.generateScript?.generatedTitle);
  const loading = useSelector((state) => state.generateScript?.loading);
  const error = useSelector((state) => state.generateScript?.error);

  const user_id = useSelector((state) => state.auth?.user?.user?.id);
  console.log(user_id);

  const [detail, setDetail] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (!loading && generatedText && generatedTitle) {
      setDetail(generatedText);
      setTitle(generatedTitle);
    }
  }, [loading, generatedTitle, generatedText]);

  // Dispatch the generate script action
  const handleGenerateScript = () => {
    dispatch(generateScript(block.keyword));
  };

  const handleSave = () => {
    const textScriptData = {
      user_id,
      keyword_id: block.keyword_id,
      title,
      text_content: detail,
    };

    console.log(textScriptData);

    // dispatch(createTextScript(textScriptData));

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
                <label className="col-form-label">キーワード</label>
                <input className="form-control" type="text" value={block.keyword} readOnly />
              </div>
              <div className="mb-4 d-flex justify-content-center">
                <button
                  type="button"
                  className="btn-gradient btn-generate"
                  onClick={handleGenerateScript}
                  disabled={loading}
                >
                  {loading ? '生成中...' : '動画生成'}
                </button>
              </div>
              <div className="mb-4">
                <div className="mb-4">
                  <label className="col-form-label">目出し</label>
                  <input
                    className="form-control"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="目出しを入力してください"
                  />
                </div>
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
