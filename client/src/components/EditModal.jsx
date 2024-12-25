import React, { useState, useEffect } from 'react';

const EditModal = ({ block, onClose }) => {
  const [name, setName] = useState(block.title);
  const [detail, setDetail] = useState(block.text_content);

  const handleSave = () => {
    console.log('Saved changes:', { name, detail });
    onClose();
  };

  return (
    <div
      className="modal fade show"
      id="editContentAi"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
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
                <label className="col-form-label" htmlFor="name">
                  見出し
                </label>
                <div className="position-relative">
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value.slice(0, 30))}
                    style={{ paddingRight: '60px' }}
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
                    {name.length}/30
                  </span>
                </div>
              </div>
              <div className="mb-0">
                <label className="col-form-label" htmlFor="message-text">
                  内容
                </label>
                <div className="position-relative">
                  <textarea
                    className="form-control"
                    id="message-text"
                    rows="4"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value.slice(0, 99999))}
                    style={{ paddingRight: '90px' }}
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
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              キャンセル
            </button>
            <button type="button" className="btn-gradient btn-generate" onClick={handleSave}>
              動画生成
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
