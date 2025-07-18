import { render, screen } from '@testing-library/react';
import Editor from '../src/components/Editor';

test('renders editor', () => {
  render(<Editor initial="hello" />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});
