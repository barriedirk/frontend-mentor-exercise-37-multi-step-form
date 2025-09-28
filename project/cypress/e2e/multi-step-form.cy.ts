/// <reference types="cypress" />

describe('Multi-step Form E2E', () => {
  beforeEach(() => {
    cy.visit('#/multi-step-form');
  });

  it('should complete the multi-step form and display the thank-you screen - all steps without going back or changing', () => {
    // Step 1: Personal Info
    cy.get('[data-cy="step-form-name"]').type('Stephen King');
    cy.get('[data-cy="step-form-email"]').type('stephenking@lorem.com');
    cy.get('[data-cy="step-form-phone"]').type('+1 234 567 890');
    cy.get('[data-cy="step-button-next-step"]').click();

    // Step 2: Select Plan
    cy.get('[data-cy^="step-plan-"]').first().click(); // Select first plan
    cy.get('[data-cy="step-input-switch"]').check({ force: true }); // Switch to yearly
    cy.get('[data-cy="step-button-next-step"]').click();

    // Step 3: Pick Add-ons
    cy.get('[data-cy="step-add-on-0"]').click(); // First add-on
    cy.get('[data-cy="step-add-on-1"]').click(); // Second add-on
    cy.get('[data-cy="step-button-next-step"]').click();

    // Step 4: Summary
    cy.get('[data-cy="step-summary-plan"]').should('contain', 'Yearly');
    cy.get('[data-cy="step-summary-item-0"]').should('contain', 'Online service');
    cy.get('[data-cy="step-summary-item-1"]').should('contain', 'Larger Storage');
    cy.get('[data-cy="step-summary-total"]').should('contain', '+$');

    cy.get('[data-cy="step-button-confirm"]').click();

    // Step 5: Thank You
    cy.get('[data-cy="step-thankyou"]').should('exist');
    cy.contains('Thank you!').should('be.visible');
  });

  it('should complete the multi-step form and display the thank-you screen - using go back', () => {
    // Step 1: Personal Info
    cy.get('[data-cy="step-form-name"]').type('John Doe');
    cy.get('[data-cy="step-form-email"]').type('johndoe@lorem.com');
    cy.get('[data-cy="step-form-phone"]').type('+ 234 234 234');

    cy.get('[data-cy="step-button-next-step"]').click();

    // Step 2: Select Plan
    cy.get('[data-cy^="step-plan-"]').first().click();
    cy.get('[data-cy="step-input-switch"]').check({ force: true }); // Switch to yearly

    cy.get('[data-cy="step-button-go-back"]').click();

    // Step 1: Personal Info
    cy.get('[data-cy="step-form-name"]').should('have.value', 'John Doe');

    cy.get('[data-cy="step-form-email"]').should('have.value', 'johndoe@lorem.com');

    cy.get('[data-cy="step-button-next-step"]').click();

    // Step 2: Select Plan
    cy.get('[data-cy^="step-plan-1-Advanced"]').first().click();
    cy.get('[data-cy="step-input-switch"]').check({ force: false }); // Switch to Monthly

    cy.get('[data-cy="step-button-next-step"]').click();

    // Step 3: Pick Add-ons
    cy.wait(5);
    cy.get('[data-cy="step-add-on-input-0"]').should('exist');
    cy.get('[data-cy="step-add-on-input-2"]').should('exist');
    cy.get('[data-cy="step-add-on-2"]').click();
    cy.get('[data-cy="step-add-on-0"]').click();

    cy.get('[data-cy="step-button-next-step"]').click();

    // Step 4: Summary
    cy.wait(5);
    cy.get('[data-cy="step-summary-plan"]')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.contain('Advanced (Yearly)');
      });
    cy.get('[data-cy="step-summary-plan-price"]')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.contain('$120/yr');
      });
    cy.get('[data-cy="step-summary-item-addon-0"]')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.contain('Customizable profile');
      });
    cy.get('[data-cy="step-summary-item-addon-price-0"]')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.contain('+$20/yr');
      });

    cy.get('[data-cy="step-summary-total"]').should('contain', '+$150/yr');

    cy.get('[data-cy="step-button-change"]').click();

    // Step 2: Select Plan
    cy.get('[data-cy="step-button-next-step"]').click();

    // Step 3: Pick Add-ons
    cy.get('[data-cy="step-button-next-step"]').click();

    // Step 4: Summary
    cy.get('[data-cy="step-summary-total"]').should('contain', '+$150/yr');

    cy.get('[data-cy="step-button-confirm"]').click();

    // Step 5: Thank You
    cy.get('[data-cy="step-thankyou"]').should('exist');
    cy.contains('Thank you!').should('be.visible');
  });
});
