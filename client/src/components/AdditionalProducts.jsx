import React, { useState, useEffect } from 'react';
import RelatedCarousel from './RelatedCarousel.jsx';
import RelatedModal from './RelatedModal.jsx';
import RelatedOutfits from './RelatedOutfits.jsx';



const AdditionalProducts = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalId, setModalId] = useState(0);
  const [outfits, setOutfits] = useState([]);
  const { item, reviews } = props;
  let modalItem = props.relatedItems[modalId] || null;
  const [ratings, setRatings] = useState(false);

  const getRatingsOnProducts = (items) => {
    if (ratings === false && props.relatedItems[0].ratings === undefined) {
      props.relatedItems.map(item => {
        if (!item.ratings) {
          const productId = item.id;
          props.fetch({ endpoint: 'reviews/meta', params: { product_id: productId } },
            (data) => {
              const { ratings } = data;
              let cumulativeStars = 0;
              let numberOfRatings = 0;
              for (let key in ratings) {
                cumulativeStars += Number(key) * Number(ratings[key]);
                numberOfRatings += Number(ratings[key]);
              }
              const reviewScore = cumulativeStars / numberOfRatings;
              item.ratings = (reviewScore.toString() === 'NaN' ? 0 : Math.round(reviewScore * 2) / 2);
            },
            (error) => {
              console.log(error);
            });
        }
      });
    } else {
      return;
    }
  };
  if (props.relatedItems.length > 0) {
    getRatingsOnProducts(props.relatedItems);
    setTimeout(() => {
      setRatings(() => true)
    }, 2500);
  }

  const addToOutfit = () => {
    if (!item.ratings) {
      const { ratings } = reviews.meta;
      let cumulativeStars = 0;
      let numberOfRatings = 0;
      for (let key in ratings) {
        cumulativeStars += Number(key) * Number(ratings[key]);
        numberOfRatings += Number(ratings[key]);
      }
      const reviewScore = cumulativeStars / numberOfRatings;
      item.ratings = (reviewScore.toString() === 'NaN' ? 0 : Math.round(reviewScore * 2) / 2);
    }

    for (let i = 0; i < outfits.length; i++) {
      if (outfits[i].id === item.id) {
        return;
      }
    }

    let updatedOutfits = [...outfits, item];
    setOutfits(() => updatedOutfits);
  };

  const removeOutfit = (index) => {
    let updatedOutfits = [...outfits];
    updatedOutfits.splice(index,1);
    setOutfits(() => updatedOutfits);
    return;
  };

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
        setRatings={setRatings.bind(this)}
      />

      <h3 className="outfits-header">YOUR OUTFITS</h3>
      <RelatedOutfits
        outfits={outfits}
        item={item}
        addToOutfit={addToOutfit}
        removeOutfit={removeOutfit}
      />

    </div>
  );
};

export default AdditionalProducts;