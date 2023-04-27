import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import BurgerButton from '../src/components/dashboards/admin/bars/BurgerButton';

test('renders FaBars icon when isOpen is false', () => {
  const { container } = render(<BurgerButton isOpen={false} />);
  expect(container.querySelector('svg.fa-times')).toBeNull();
});

test('renders FaTimes icon when isOpen is true', () => {
  const { container } = render(<BurgerButton isOpen />);
  expect(container.querySelector('svg.fa-bars')).toBeNull();
});
