/// <reference types="Cypress" />
// This test map to Hiptest smoke test: https://app.hiptest.com/projects/119826/test-plan/folders/839077
import { UtilityClass } from '../../../support/Helper/utility';
import Constants from '../../../support/Locators/locators';
import MenuItems from '../../../support/Helper/menuPageObject';

const UtilityHelper = new UtilityClass();
const MenuPageObject = new MenuItems();
const testCategory = "LINKS";
var testCaseName = '';
const menuItem = 'File';
const subMenuItem = 'New';

describe("Links: To check all available links are clickable and opening properly ", () => {
    before(() => {
        UtilityHelper.loginCrownpeak();
    });
    beforeEach(function () {
        testCaseName = this.currentTest.title;
        console.log("Execution begins for test name " + testCaseName);
    });

    afterEach(function () {
        if(Constants.dbConnectionTruthy)
        {
            UtilityHelper.fetchAfterEach(this.currentTest.title, testCategory, this.currentTest.state, this.currentTest.duration);
        }else
        {
            console.log("The DataBase connection flag is set to false!!")
        }
    });


    it('HelpIcon: To verify the navigation on clicking Help icon from left menu', () => {
        cy.wait(Constants.shortWait);
        // Go to Help menu
        cy.log('** Go to Help menu**');
        cy.get('div[title=\'Help\']').click();
        cy.wait(Constants.shortWait);
        // Overview page should display
        cy.log('**Overview page should display**');
        cy.title().should('eq', 'Crownpeak V3 - Help - Overview');
        cy.get('strong').contains('Overview').should('be.visible');
    });

    it('Customer Documents: To verify the Customer Documents tab (if applicable)', () => {
        cy.wait(Constants.wait);
        // Click on Customer Documents
        cy.log('** Click on Customer Documents**');
        cy.get('p-header.ng-star-inserted > span').contains('Customer Documents').click();
        // Customer Documents page should display (if applicable)
        cy.log('**Customer Documents page should display (if applicable)**');
        cy.title().should('eq', 'Crownpeak V3 - Help - Customer Documents');
    });

    it('Contact Support tab: To verify the Contact Support tab', () => {
        cy.wait(Constants.wait);
        // Click on Contact Support tab
        cy.log('** Click on Contact Support tab**');
        cy.get('p-header > span').contains('Contact Support').click();
        // Contact Support form should display
        cy.log('**Contact Support form should display**');
        cy.title().should('eq', 'Crownpeak V3 - Help - Support');
        cy.get('strong').contains('Contact Support').should('be.visible');
    });

    it('Debug tab: To verify the Debug tab', () => {
        cy.wait(Constants.wait);
        // Click on Debug
        cy.log('** Click on Debug**');
        cy.get('p-header > span').contains('Debug').click();
        // Debug page should display with Address, Cached Items, User Information
        cy.log('**Debug page should display with Address, Cached Items, User Information**');
        cy.title().should('eq', 'Crownpeak V3 - Help - Debug');
        cy.get('.debug-section > strong').contains('Address:').should('be.visible');
        cy.get('.debug-section-heading').contains('Cached Items').should('be.visible');
        cy.get('.debug-section-heading').contains('User Information:').should('be.visible');
    });

    it('Product Feedback: To verify the navigation on clicking Product feedback under the User icon', () => {
        cy.wait(Constants.wait);
        // Go to user icon displayed on upper top right of page
        cy.log('**1. Go to user icon displayed on upper top right of page **');
        cy.get('#topbarUserMenuToggle').click();
        // Click on Product feedback link
        cy.log('**2. Click on Product feedback link **');
        cy.get('#topbarFeedback').click();
        // Contact Support form should display
        cy.log('**Contact Support form should display**');
        cy.title().should('eq', 'Crownpeak V3 - Help - Support');
        cy.get('strong').contains('Contact Support').should('be.visible');
    });

    it('Support: To verify the navigation on clicking Support under the User icon', () => {
        cy.wait(Constants.wait);
        // Go to user icon displayed on upper top right of page
        cy.log('**1. Go to user icon displayed on upper top right of page **');
        cy.get('#topbarUserMenuToggle').click();
        // Click on Support link
        cy.log('**2. Click on Support link **');
        // A browser window should open for the Crownpeak Support page
        cy.log('**A browser window should open for the Crownpeak Support page**');
        // cy.get('#topbarSupport').should('have.attr', 'cp-open-link-target', '_blank');
        // cy.get('#topbarSupport').should('have.attr', 'cp-open-link-target', '_blank');
        cy.get('#topbarSupport > span.name').should('have.text', 'Support');

    });

    it('Help: To verify the navigation on clicking Help under User icon', () => {
        cy.wait(Constants.wait);
        // Go to user icon displayed on upper top right of page
        cy.log('**1. Go to user icon displayed on upper top right of page **');
        cy.get('#topbarUserMenuToggle').click();
        // Click on Help link
        cy.log('**2. Click on Help link **');
        // A browser window should open for the Crownpeak Support page
        cy.log('**A browser window should open for the Crownpeak Support page**');
        // cy.get('#topbarHelp').should('have.attr', 'cp-open-link-target', '_blank');
        // cy.get('#topbarHelp').should('have.attr', 'cp-open-link', Constants.linkDocumentationBestPractices_url);
        cy.get('#topbarHelp > span.name').should('have.text', 'Help');

    });
    
    it('Theme: To verify the option displayed on hovering theme link under User icon', () => {
        cy.wait(Constants.wait);
        // Go to user icon displayed on upper top right of page
        cy.log('**1. Go to user icon displayed on upper top right of page **');
        cy.get('#topbarUserMenuToggle').click();
        // Hover  theme  link
        cy.log('**2. Hover  theme  link **');
        //cy.get('#topbarThemeMenuToggle').trigger('mousemove');
        cy.get('#topbarThemeMenuToggle').trigger('mouseover');
        // Default option should display
        cy.log('**Default option should display**');
        //cy.get('.open > .cpDropdown > li > .ng-scope > .name').should('have.text', 'Default'); // Old
        cy.get('.open > .cpDropdown.dropdown-menu.dropdown-menu-right > li > button > .name').contains('Default').should('have.text', 'Default'); // New
       
    });
    
    it('Language: To verify the option displayed on hovering language link under User icon', () => {
        cy.wait(Constants.wait);
        // Go to user icon displayed on upper top right of page
        // Hover  language  link
        cy.log('**1. Go to user icon displayed on upper top right of page **');
        cy.log('**2. Hover  language  link **');
        //cy.get('#topbarLanguage').trigger('mousemove');
        cy.get('#topbarLanguage').trigger('mouseover');
        // A list of languages should display
        cy.log('**A list of languages should display**');
        cy.get('ul.cpDropdown.dropdown-menu.dropdown-menu-right > li').children('button').should('have.length',18);

    });
    
    it('Privacy link: To verify the Privacy link under User icon', () => {
        cy.wait(Constants.wait);
        // Go to user icon displayed on upper top right of page
        // Click  Privacy link
        cy.log('**1. Go to user icon displayed on upper top right of page **');
        cy.get('#topbarUserMenuToggle').click();
        cy.log('**2. Click on Privacy link **');
        //cy.get('#topbarSupport').click();
        cy.log('**A browser window should open for the Crownpeak Support page**');
        // cy.get('#topbarPrivacy').should('have.attr', 'cp-open-link-target', '_blank');
        // cy.get('#topbarPrivacy').should('have.attr', 'cp-open-link', Constants.linkPrivacy_url);
        cy.get('#topbarPrivacy > span.name').should('have.text', 'Privacy');

    });
    
    it('WCO (1): To verify the navigation on  WCO icon from the left menu', () => {
        cy.wait(Constants.wait);
        // Click on WCO icon from left menu
        cy.log('** Click on WCO icon from left menu**');
        cy.get('div[title=\'WCO\']').should('be.visible');
        // Targeted Groups page should be displayed
        cy.log('**Targeted Groups page should be displayed**');
        // cy.title().should('eq', 'Crownpeak V3 - WCO - Dynamic Content - Targeting Groups');
        // cy.get('strong').contains('Targeting Groups').should('be.visible');
    });

    
    it('Logout: To verify the Log out option under User', () => {
        cy.wait(Constants.shortWait);
        // Go to user icon displayed on upper top right of page
        // Click on Logout link
        cy.log('**1. Go to user icon displayed on upper top right of page **');
        cy.get('#topbarUserMenuToggle').click({force: true});
        cy.log('**2. Click on Logout link **');
        cy.wait(Constants.wait);
        cy.get('#topbarSignOut').click({force: true});
        cy.wait(Constants.shortWait);
        // The user should successfully be logged out of the CMS
        cy.log('**The user should successfully be logged out of the CMS**');
        cy.title().should('eq', 'Crownpeak V3 - Log In');
        

    });
});