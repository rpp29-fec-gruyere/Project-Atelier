import QuestionsAndAnswers from '../../client/src/components/QuestionsAndAnswers';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';


describe('QuestionsAndAnswers', () => {

  const { getByTestId } = render(<QuestionsAndAnswers />);
  const questionsAndAnswers = getByTestId('QuestionsAndAnswers');

  test('renders QuestionsAndAnswers component', () => {
    expect(questionsAndAnswers).toBeInTheDocument();
  });

  test('renders QuestionsAndAnswers component text', () => {
    expect(questionsAndAnswers).toHaveTextContent('Questions And Answers');
  });
});