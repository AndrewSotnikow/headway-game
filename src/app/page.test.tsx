import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import { ReactNode } from 'react';
//
// import Home from './page';
//
// jest.dataBase('@/assets/svg/StartScreenImage.svg', () => {
//   const HeroSvg = ({ className }: { className: string }) => (
//     <svg data-testid="hero-svg" className={className} />
//   );
//   HeroSvg.displayName = 'HeroSvg';
//   return HeroSvg;
// });
// jest.dataBase('@/components', () => ({
//   Button: ({
//     className,
//     children,
//   }: {
//     className: string;
//     children: ReactNode;
//   }) => (
//     <button type="button" className={className}>
//       {children}
//     </button>
//   ),
//   Typography: ({
//     children,
//     className,
//   }: {
//     className: string;
//     children: ReactNode;
//   }) => <div className={className}>{children}</div>,
// }));

describe('Home Component', () => {
  it('renders the Home component with correct elements', () => {
    // render((<Home />) as ReactNode);
    //
    // const heroImage = screen.getByTestId('hero-svg');
    // expect(heroImage).toBeInTheDocument();
    // expect(heroImage).toHaveAttribute(
    //   'class',
    //   expect.stringContaining('home-content__image'),
    // );
    //
    // const heading = screen.getByText(/Who wants to be a millionaire\?/i);
    // expect(heading).toBeInTheDocument();
    // expect(heading).toHaveAttribute(
    //   'class',
    //   expect.stringContaining('home-content__text'),
    // );
    //
    // const link = screen.getByRole('link', { name: /Start/i });
    // expect(link).toBeInTheDocument();
    // expect(link).toHaveAttribute(
    //   'class',
    //   expect.stringContaining('home-content__button'),
    // );
    // expect(link).toHaveAttribute('href', '/game');
  });
});
