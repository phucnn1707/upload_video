import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateScript, resetGenerateScript } from '../redux/actions/generateScriptAction';
import { createTextScript } from '../redux/actions/textScriptAction';
import { toast } from 'react-toastify';

const GenerateScriptModal = ({ block, onClose, onProceed }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.generateScript?.loading);

  const [desiredContent, setDesiredContent] = useState('');
  const [characterLimit, setCharacterLimit] = useState('');
  const [desiredTitle, setDesiredTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const handleGenerateScript = async () => {
    if (!desiredTitle.trim()) {
      setTitleError(true);
      return;
    }

    const options = {
      desiredTitle: desiredTitle.trim() === '' ? '' : desiredTitle,
      desiredContent: desiredContent.trim() === '' ? '' : desiredContent,
      characterLimit: characterLimit.trim() === '' ? '' : parseInt(characterLimit, 10),
    };

    console.log('Options:', options);

    await dispatch(generateScript(block.keyword, options));
    onProceed();
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
            <div className="mb-4">
              <label className="col-form-label">キーワード</label>
              <input className="form-control" type="text" value={block.keyword} readOnly />
            </div>
            <div className="mb-4">
              <label className="col-form-label">
                希望するタイトル <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <input
                  className="form-control"
                  type="text"
                  maxLength="15"
                  value={desiredTitle}
                  onChange={(e) => {
                    setDesiredTitle(e.target.value.slice(0, 15));
                    setTitleError(false);
                  }}
                  placeholder="希望するタイトルを入力してください (任意)"
                  style={{ paddingRight: '80px' }}
                />
                <span
                  className="text-muted position-absolute"
                  style={{
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }}
                >
                  {desiredTitle.length}/15
                </span>
              </div>
              {titleError && <p className="text-danger mt-2">タイトルは必須です。</p>}
            </div>
            <div className="mb-4">
              <label className="col-form-label">希望する内容</label>
              <div className="position-relative">
                <textarea
                  className="form-control"
                  rows="2"
                  maxLength="200"
                  value={desiredContent}
                  onChange={(e) => setDesiredContent(e.target.value.slice(0, 200))}
                  placeholder="希望する内容を入力してください (任意)"
                  style={{ paddingRight: '80px' }}
                />
                <span
                  className="text-muted position-absolute"
                  style={{
                    right: '10px',
                    bottom: '10px',
                    pointerEvents: 'none',
                  }}
                >
                  {desiredContent.length}/200
                </span>
              </div>
            </div>
            {/* <div className="mb-4">
              <label className="col-form-label">文字数</label>
              <div className="position-relative">
                <input
                  className="form-control"
                  type="number"
                  value={characterLimit}
                  onChange={(e) => setCharacterLimit(e.target.value.slice(0, 5))}
                  placeholder="文字数を入力してください (任意)"
                  style={{ paddingRight: '80px' }}
                />
                <span
                  className="text-muted position-absolute"
                  style={{
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }}
                >
                  {characterLimit.toString().length}/5
                </span>
              </div>
            </div> */}
            <div className="mb-4 d-flex justify-content-center">
              {loading ? (
                <div className="loading-spinner" />
              ) : (
                <button type="button" className="btn-gradient btn-generate" onClick={handleGenerateScript}>
                  原稿生成
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditScriptModal = ({ block, onClose }) => {
  const dispatch = useDispatch();

  const generatedText = useSelector((state) => state.generateScript?.generatedText);
  const generatedTitle = useSelector((state) => state.generateScript?.generatedTitle);
  const loading = useSelector((state) => state.generateScript?.loading);
  const error = useSelector((state) => state.generateScript?.error);
  const user_id = useSelector((state) => state.auth?.user?.user?.id);

  const [detail, setDetail] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (!loading && generatedText && generatedTitle) {
      setDetail(generatedText);
      setTitle(generatedTitle);
    }
  }, [loading, generatedTitle, generatedText]);

  const handleSave = async () => {
    const textScriptData = {
      user_id,
      keyword_id: block.keyword_id,
      generatedTitle: title,
      generatedText: detail,
    };

    try {
      await dispatch(createTextScript(textScriptData));
      toast.success('保存が成功しました！');
    } catch (error) {
      toast.error('保存に失敗しました。');
    }
    handleClose();
  };

  const handleClose = () => {
    dispatch(resetGenerateScript());
    onClose();
  };

  return (
    <div className="modal fade show" tabIndex="-1" role="dialog" aria-hidden="true" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-4">
                <div className="position-relative">
                  <label className="col-form-label">見出し</label>
                  <input
                    className="form-control"
                    type="text"
                    value={title}
                    maxLength="30"
                    onChange={(e) => setTitle(e.target.value.slice(0, 30))}
                    style={{
                      paddingRight: '50px',
                    }}
                  />
                  <span
                    className="text-muted position-absolute"
                    style={{
                      right: '10px',
                      bottom: '10px',
                      pointerEvents: 'none',
                    }}
                  >
                    {title.length}/30
                  </span>
                </div>
              </div>
              <div className="mb-0">
                <div className="position-relative">
                  <label className="col-form-label">内容</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={detail}
                    maxLength="99999"
                    onChange={(e) => setDetail(e.target.value.slice(0, 99999))}
                    style={{
                      paddingRight: '90px',
                    }}
                  />
                  <span
                    className="text-muted position-absolute"
                    style={{
                      right: '10px',
                      bottom: '10px',
                      pointerEvents: 'none',
                    }}
                  >
                    {detail.length}/99999
                  </span>
                </div>
              </div>
              {error && <p style={{ color: 'red' }}>エラー: {error}</p>}
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-cancel" onClick={handleClose}>
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

const CreateScriptModal = ({ block, onClose }) => {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && <GenerateScriptModal block={block} onClose={onClose} onProceed={() => setStep(2)} />}
      {step === 2 && <EditScriptModal block={block} onClose={onClose} />}
    </>
  );
};

export default CreateScriptModal;
