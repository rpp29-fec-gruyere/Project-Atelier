import React from 'react';
import { createPortal } from 'react-dom';

const ComparisonModal = ({ isVisible, hideModal }) => {

  return isVisible
    ? createPortal(
      <div className="modal-overlay">
        <div className="modal-wrapper">

          <div className="modal-content">
            <span className="close" onClick={hideModal}>&times;</span>
            <div className="modal-header">
              <h4 className="header">Comparing</h4>
              <div className="name-header">
                <h4 className="product-name">Product Name With Long Name</h4>
                <div className="filler"></div>
                <h4 className="product-name">Product Name With Long Name</h4>
              </div>
            </div>
            <div className="modal-body">
              <div className="feature-box">
                <div className="checklist">
                  <div className="check">check</div>
                  <div className="check">check</div>
                  <div className="check">check</div>
                  <div className="check">check</div>
                  <div className="check">check</div>
                  <div className="check">check</div>
                  <div className="check">check</div>
                  <div className="check">check</div>
                  <div className="check">check</div>
                  <div className="check">check</div>
                </div>
                <div className="feature-name">
                  <div className="feature">Made With 100% Generic Modification</div>
                  <div className="feature">Made With 100% Generic Modification</div>
                  <div className="feature">Made With 100% Generic Modification</div>
                  <div className="feature">Made With 100% Generic Modification</div>
                  <div className="feature">Made With 100% Generic Modification</div>
                  <div className="feature">Made With 100% Generic Modification</div>
                  <div className="feature">Made With 100% Generic Modification</div>
                  <div className="feature">Made With 100% Generic Modification</div>
                  <div className="feature">Made With 100% Generic Modification</div>
                  <div className="feature">Made With 100% Generic Modification</div>
                </div>
                <div className="checklist">
                  <div className="check">check</div>
                  <div className="check">check</div>
                  <div className="check">check</div>
                  <div className="check">check</div>
                  <div className="check">check</div>
                  <div className="check">check</div>
                  <div className="check">check</div>
                  <div className="check">check</div>
                  <div className="check">check</div>
                  <div className="check">check</div>
                </div>
              </div>
              <p>Some text in the Modal Body</p>
              <p>Some other text...</p>
            </div>
            <div className="modal-footer">
              <h3>Modal Footer</h3>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
    : null;
};

export default ComparisonModal;

{/* <div className="modal-overlay">
        <div className="modal-wrapper">
          <div className="modal">
            <div className="modal-header">
              <span className="close" onClick={hideModal}>&times;</span>
              <h5>Modal</h5>
              <span className="modal-content">
                Why this modal has popped up
              </span>
            </div>
          </div>
        </div>
      </div>,
      document.body */}