/// <reference types="Cypress" />
// This test map to Hiptest regression test: https://app.hiptest.com/projects/41676/test-plan/folders/482296/scenarios/1653093
import {
    UtilityClass
} from '../../../../support/Helper/utility';
import Constants from '../../../../support/Locators/locators';
import MenuItems from '../../../../support/Helper/menuPageObject';
const UtilityHelper = new UtilityClass();
const MenuPageObject = new MenuItems();
const testCategory = "Settings";
var testCaseName = '';
describe("Settings should ", () => {
    before(() => {
        UtilityHelper.loginCrownpeak();
    });
    beforeEach(function () {
        testCaseName = this.currentTest.title;
        console.log("Execution begins for test name " + testCaseName);
    });
    afterEach(function () {
        if (Constants.dbConnectionTruthy) {
            UtilityHelper.fetchAfterEach(this.currentTest.title, testCategory, this.currentTest.state, this.currentTest.duration);
        } else {
            console.log("The DataBase connection flag is set to false!!")
        }
    });
    it('.should() - login to v3 > navigate through reports > verify settings', () => {
        /*
        Go to Settings menu
        Options will display
        */
        cy.wait(Constants.shortWait)
        cy.get('.module.settings').should('be.visible').click({
            force: true
        })
        cy.wait(Constants.shortWait)
        cy.get('.cpModuleHeader').first().should('have.text', 'Settings');
        cy.get('p-header').contains('Account').should('be.visible');
        cy.url().should('include', '/settings/account/profile')

        // Click on Tools >>Clear link Cache
        cy.get('p-header').contains('Tools').should('be.visible').click();

        cy.get('a').contains('Clear Link Cache').should('be.visible').click().url().should('include', '/tools/clearlinkcache')
        // Clear link Cache page should display
        cy.get('h1').first().should('have.text', 'Clear Link Cache');
        cy.wait(Constants.wait);

        // Verify teh display of "Clear Link Cache button"
        cy.get('.btn-new-clear-link-cache.blue-btn.btn.btn-primary.btn-add').contains('Clear Link Cache').should('be.visible');

        // Select Clear Link Cache button
        cy.get('.btn-new-clear-link-cache.blue-btn.btn.btn-primary.btn-add').contains('Clear Link Cache').click({ force: true });

        // Success message 'Table Link Cache is now empty' should display.
        cy.get('.success.padding-left.ng-star-inserted').children('i').should('have.attr', 'class', 'fa fa-check');
        cy.get('.success.padding-left.ng-star-inserted').should('be.visible').and('have.text', ' Table Link Cache is now empty');
    });


});