import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const RelatedModal = ({ isVisible, hideModal, modalItem, item }) => {
  const modalFeature = modalItem ? modalItem.features : null;
  const itemFeature = item ? item.features : null;
  let featureClone = [];

  const feature = itemFeature && modalFeature ? new Set([
    ...itemFeature.map(item => item),
    ...modalFeature.map(modal => modal)
  ]) : null;

  if (feature) {
    let temp = Array.from(feature);
    for (let item of temp) {
      if (item !== null) {
        featureClone.push(item);
      }
    }
  }

  return isVisible
    ? createPortal(
      <div id="modal-overlay">
        <div id="modal-box">
          {/* close button on top-right */}
          <span className="close" onClick={hideModal}>&times;</span>
          <div id="modal-content">
            <div id="modal-header">
              <h4 className="header">Comparing</h4>
              <div className="name-header">
                <h4 className="product-name product-name-left">{item.name}</h4>
                <div className="filler"></div>
                <h4 className="product-name product-name-right">{modalItem.name}</h4>
              </div>
            </div>

            <div id="modal-body">
              <div id="feature-box">
                <div className="checklist">
                  {feature !== null &&
                    featureClone.map(feat => {
                      // checks if "displayed" product's feature is included or not
                      for (let i = 0; i < itemFeature.length; i++) {
                        if (itemFeature[i].value === feat.value) {
                          return (<div className="check">check</div>);
                        } else if (i === itemFeature.length - 1) {
                          return (<div className="not-check"></div>);
                        }
                      }
                    })
                  }
                </div>
                <div className="feature-box2">
                  {feature !== null &&
                    featureClone.map(feat => {
                      // list all the features between two products (no dups)
                      return (
                        <div className="feature">
                          <div className="feature-name">{feat.feature}</div>
                          {feat.value ?
                            <div className="feature-value">{feat.value}</div>
                            : <div className="feature-value-null">True</div>
                          }
                        </div>
                      );
                    })
                  }
                </div>
                <div className="checklist">
                  {feature !== null &&
                    featureClone.map(feat => {
                      // checks if "related" product's feature is included or not
                      for (let i = 0; i < modalFeature.length; i++) {
                        if (modalFeature[i].value === feat.value) {
                          return (<div className="check">check</div>);
                        } else if (i === modalFeature.length - 1) {
                          return (<div className="not-check"></div>);
                        }
                      }
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
    : null;
};

export default RelatedModal;