import Stars from '../../client/src/components/Stars';
import '@testing-library/jest-dom/extend-expect';
import { render, within } from '@testing-library/react';
import React from 'react';


describe('Stars', () => {
  const findImgSrc = (element) => {
    return element[Object.keys(element)[0]].pendingProps.src;
  };

  test('renders two and a half stars', () => {
    const { getByTestId } = render(<Stars starId="half-star" rating={2.5} />);
    const HalfStar = getByTestId('half-star');
    let star1 = within(HalfStar).getByTestId('half-star-star1');
    let star2 = within(HalfStar).getByTestId('half-star-star2');
    let star3 = within(HalfStar).getByTestId('half-star-star3');
    let star4 = within(HalfStar).getByTestId('half-star-star4');
    let star5 = within(HalfStar).getByTestId('half-star-star5');
    expect(findImgSrc(star1)).toBe('./assets/stars/star4.png');
    expect(findImgSrc(star2)).toBe('./assets/stars/star4.png');
    expect(findImgSrc(star3)).toBe('./assets/stars/star2.png');
    expect(findImgSrc(star4)).toBe('./assets/stars/star0.png');
    expect(findImgSrc(star5)).toBe('./assets/stars/star0.png');
  });

  test('renders zero stars', () => {
    const { getByTestId } = render(<Stars starId="zero-star" rating={0} />);
    const HalfStar = getByTestId('zero-star');
    let star1 = within(HalfStar).getByTestId('zero-star-star1');
    let star2 = within(HalfStar).getByTestId('zero-star-star2');
    let star3 = within(HalfStar).getByTestId('zero-star-star3');
    let star4 = within(HalfStar).getByTestId('zero-star-star4');
    let star5 = within(HalfStar).getByTestId('zero-star-star5');
    expect(findImgSrc(star1)).toBe('./assets/stars/star0.png');
    expect(findImgSrc(star2)).toBe('./assets/stars/star0.png');
    expect(findImgSrc(star3)).toBe('./assets/stars/star0.png');
    expect(findImgSrc(star4)).toBe('./assets/stars/star0.png');
    expect(findImgSrc(star5)).toBe('./assets/stars/star0.png');
  });

  test('renders five stars', () => {
    const { getByTestId } = render(<Stars starId="five-star" rating={5} />);
    const HalfStar = getByTestId('five-star');
    let star1 = within(HalfStar).getByTestId('five-star-star1');
    let star2 = within(HalfStar).getByTestId('five-star-star2');
    let star3 = within(HalfStar).getByTestId('five-star-star3');
    let star4 = within(HalfStar).getByTestId('five-star-star4');
    let star5 = within(HalfStar).getByTestId('five-star-star5');
    expect(findImgSrc(star1)).toBe('./assets/stars/star4.png');
    expect(findImgSrc(star2)).toBe('./assets/stars/star4.png');
    expect(findImgSrc(star3)).toBe('./assets/stars/star4.png');
    expect(findImgSrc(star4)).toBe('./assets/stars/star4.png');
    expect(findImgSrc(star5)).toBe('./assets/stars/star4.png');
  });

  test('rounds stars to nearest quarter', () => {
    const { getByTestId } = render(<Stars starId="q-star" rating={1.81253426} />);
    const HalfStar = getByTestId('q-star');
    let star1 = within(HalfStar).getByTestId('q-star-star1');
    let star2 = within(HalfStar).getByTestId('q-star-star2');
    let star3 = within(HalfStar).getByTestId('q-star-star3');
    let star4 = within(HalfStar).getByTestId('q-star-star4');
    let star5 = within(HalfStar).getByTestId('q-star-star5');
    expect(findImgSrc(star1)).toBe('./assets/stars/star4.png');
    expect(findImgSrc(star2)).toBe('./assets/stars/star3.png');
    expect(findImgSrc(star3)).toBe('./assets/stars/star0.png');
    expect(findImgSrc(star4)).toBe('./assets/stars/star0.png');
    expect(findImgSrc(star5)).toBe('./assets/stars/star0.png');
  });
});