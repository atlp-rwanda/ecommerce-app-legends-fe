import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import FormInput from '../src/components/formControlscomponents/formInput/FormInput';

test('renders FaBars icon when isOpen is false', () => {
  const { container } = render(
    <FormInput id="email" type="email" placeholder="Enter your email address" />
  );
  expect(container.querySelector('svg.fa-times')).toBeNull();
});

test('renders FaTimes icon when isOpen is true', () => {
  const { container } = render(<FormInput isOpen />);
  expect(container.querySelector('svg.fa-bars')).toBeNull();
});
