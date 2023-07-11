// Index.test.js

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

test('Se monta la app sin problemas', () => {
  render(<App />);
});
