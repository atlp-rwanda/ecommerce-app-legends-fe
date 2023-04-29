import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, describe, expect } from 'vitest';
import Footer from '../src/components/dashboards/admin/contents/Footer';

describe('Footer on dashboard', () => {
  test('renders the footer text', () => {
    render(<Footer />);
    const footerElement = screen.getByText(/copylights © 2023 ATLP Legends/i);
    expect(footerElement).toBeInTheDocument();
  });
});
