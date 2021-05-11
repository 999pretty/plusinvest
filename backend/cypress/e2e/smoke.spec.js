import '@testing-library/cypress/add-commands';

describe('smoke', () => {
  it('should allow a typical user flow', () => {
    cy.visit('localhost:3000');

    cy.get('.navbar__menu > img').click();
    cy.get('[alt="About"]').click();

    cy.get('.navbar__menu > img').click();
    cy.get('[alt="Join Us"]').click();

    cy.get('[placeholder="First name"]').type('Test');
    cy.get('[placeholder="Last name"]').type('User');
    cy.get('[type="email"]').type('test@user.com');
    cy.get('button').click();

    cy.wait(3000).then(() => cy.get('.navbar__menu > #navbutton').click());

    cy.get('.investnow__search__name > input').type('EQT Y');
    cy.wait(3000).then(() =>
      cy.findAllByText('EQT Y', { exact: false }).should('exist')
    );

    cy.get('[alt="Profile"]').click();
    cy.wait(500).then(() =>
      cy.findAllByText(/test@user\.com/i).should('exist')
    );
    cy.findByRole('img', { name: /invest test@user.com/i }).click();
    cy.get('[placeholder="EQT Y"]').clear();
    cy.get('[placeholder="EQT Y"]').type('1234');
    cy.wait(500).then(() => cy.get('.modal > svg').click());

    console.log('SUCCESS ✅');
  });
});
