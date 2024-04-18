import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Categories from '../../components/essentials/Categories';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Categories Component', () => {
  it('renders links when selectedCategory is not empty', () => {
    const selectedCategory = ['Category1', 'Category2', 'Category3'];
    render(
      <Router>
        <Categories selectedCategory={selectedCategory} lnav={true} link="/category" />
      </Router>
    );

    selectedCategory.forEach(category => {
      const linkElement = screen.getByText(category);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', '/category/' + category);
    });
  });

  it('does not render links when selectedCategory is empty', () => {
    render(
      <Router>
        <Categories selectedCategory={[]} lnav={true} link="/category" />
      </Router>
    );

    const linkElements = screen.queryAllByRole('link');
    expect(linkElements.length).toBe(0);
  });

  it('renders links with correct link prefix', () => {
    const selectedCategory = ['Category1', 'Category2', 'Category3'];
    const linkPrefix = '/prefix';
    render(
      <Router>
        <Categories selectedCategory={selectedCategory} lnav={true} link={linkPrefix} />
      </Router>
    );

    selectedCategory.forEach(category => {
      const linkElement = screen.getByText(category);
      expect(linkElement).toHaveAttribute('href', linkPrefix + '/' + category);
    });
  });
});
