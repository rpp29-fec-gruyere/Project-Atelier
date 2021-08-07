import '@testing-library/jest-dom/extend-expect';
import QuestionsAndAnswers from '../../client/src/components/QuestionsAndAnswers';
import QandAForm from '../../client/src/components/QandAForm';
import QandAList from '../../client/src/components/QandAList';
import QandAItem from '../../client/src/components/QandAItem';
import QandAButtons from '../../client/src/components/QandAButtons';
import exampleData from '../../helpers/QandAExample.js';
import { render } from '@testing-library/react';
import React from 'react';


describe('QuestionsAndAnswers', () => {

  test('renders QuestionsAndAnswers component', () => {
    const { getByTestId } = render(<QuestionsAndAnswers />);
    const questionsAndAnswers = getByTestId('QuestionsAndAnswers');
    expect(questionsAndAnswers).toBeInTheDocument();
  });

  test('renders QandAForm component', () => {
    const { getByTestId } = render(<QandAForm />);
    const questionsAndAnswers = getByTestId('QAndAForms');
    expect(questionsAndAnswers).toBeInTheDocument();
  });

  test('renders QandAItem component', () => {
    const { getByTestId } = render(<QandAItem questionsAndAnswers= {exampleData}/>);
    const questionsAndAnswers = getByTestId('QAndAItems');
    expect(questionsAndAnswers).toBeInTheDocument();
  });

  test('renders QandAList component', () => {
    const { getByTestId } = render(<QandAList questionsAndAnswers={exampleData} />);
    const questionsAndAnswers = getByTestId('QAndAList');
    expect(questionsAndAnswers).toBeInTheDocument();
  });

  test('renders QandAButtons component', () => {
    const { getByTestId } = render(<QandAButtons />);
    const questionsAndAnswers = getByTestId('QAndAButtons');
    expect(questionsAndAnswers).toBeInTheDocument();
  });

});