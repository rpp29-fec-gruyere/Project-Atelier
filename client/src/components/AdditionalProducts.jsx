import React, { useState, useEffect } from 'react';
import RelatedCarousel from './RelatedCarousel.jsx';
import RelatedModal from './RelatedModal.jsx';
import RelatedOutfits from './RelatedOutfits.jsx';



const AdditionalProducts = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalId, setModalId] = useState(0);
  const [outfits, setOutifts] = useState([]);
  const { item, review } = props;
  let modalItem = props.relatedItems[modalId] || null;


  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const changeModalIndex = (index) => {
    setModalId(index);
  };

  return (
    <div data-testid="AdditionalProducts" className="additional-products">
      <h3>RELATED PRODUCTS</h3>

      <RelatedModal
        isVisible={isVisible}
        hideModal={toggleModal}
        modalItem={modalItem}
        item={item}
      />
      <RelatedCarousel
        items={props.relatedItems}
        fetch={props.fetch}
        loadPage={props.loadPage}
        toggleModal={toggleModal}
        changeModalIndex={changeModalIndex}
      />

      <h3>YOUR OUTFITS</h3>
      {/* <RelatedOutfits
        items={props.relatedItems}
        outfits={outfits}
      /> */}

    </div>
  );
};

export default AdditionalProducts;