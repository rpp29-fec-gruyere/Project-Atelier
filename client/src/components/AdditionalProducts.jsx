import React, { useState, useEffect } from 'react';
import RelatedCarousel from './RelatedCarousel.jsx';
import RelatedModal from './RelatedModal.jsx';



const AdditionalProducts = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalId, setModalId] = useState(0);
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
        review={review}
      />
      {/* <Carousel show={4} content={props.relatedItems}>
        {props.relatedItems.length > 0 && props.relatedItems.map(item => {
          const img = item.styles[0].photos[0].thumbnail_url;
          return (
            <img src={img} alt="" />
          );
        })}
      </Carousel> */}
      <h3>YOUR OUTFITS</h3>
    </div>
  );
};

export default AdditionalProducts;