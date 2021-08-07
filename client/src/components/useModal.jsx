import React, { useState } from 'react';

const useModal = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return {
    isVisible,
    toggleModal
  };
};

export default useModal;