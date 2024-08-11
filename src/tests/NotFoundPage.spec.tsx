import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

describe('NotFoundPage', () => {
  test('renders Page not found message', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  test('renders Go to main page link', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    const link = screen.getByText('Go to main page');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });

  test('navigates to main page when Go to main page link is clicked', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <div>Main Page</div>,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
      {
        initialEntries: ['/not-found'],
      },
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByText('Page not found')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Go to main page'));

    expect(screen.getByText('Main Page')).toBeInTheDocument();
  });
});
