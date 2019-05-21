/// <reference types="Cypress" />
// This test map to Hiptest smoke test: https://app.hiptest.com/projects/119826/test-plan/folders/839069
import { UtilityClass } from '../../../support/Helper/utility';
import Constants from '../../../support/Locators/locators';
var testCaseName = '';
var expectedForgotText = 'Enter the Username that you use to access your account and click Send Email. A message will be sent to your email address containing account access steps.';
// Category of the test case to be inserted in Database
const testCategory = "Login";

describe("Login should ", () => {
    const UtilityHelper = new UtilityClass();

    beforeEach(function () {
        testCaseName = this.currentTest.title;
        console.log("Execution begins for test name " + testCaseName);
    });

    afterEach(function () {
        if (Constants.dbConnectionTruthy) {
            UtilityHelper.fetchAfterEach(this.currentTest.title, testCategory, this.currentTest.state, this.currentTest.duration);
        } else {
            cy.log("The DataBase connection flag is set to false!!")
        }
    });

    it('V3 Login: To verify that user navigation on hitting application url', () => {
        cy.visit(Constants.url);
        cy.wait(Constants.longWait);
        // V3 Log In screen should appear 
        cy.log('**V3 Log In screen should appear.**');
        cy.title().should('eq', 'Crownpeak V3 - Log In');
    });

    it('Forget Password Link: To verify the functionality of Forgot Password? link on the CMS Login screen', () => {
        cy.get(Constants.loginForgot_lnk).should('be.visible');
        cy.get(Constants.loginForgot_lnk).click();
        // A Send Email prompt should appear for resetting the CMS Login password
        cy.log('**A Send Email prompt should appear for resetting the CMS Login password**');
        cy.get(Constants.loginForgot_txt).should('have.text', expectedForgotText);
    });

    it('Back to login link: To verify the navigation of the user on clicking back to Login link', () => {
        cy.wait(Constants.shortWait);
        cy.get(Constants.loginForgotPasswordBack_lnk).should('be.visible');
        cy.get(Constants.loginForgotPasswordBack_lnk).click();
        cy.wait(Constants.shortWait);
        // User should be returned to the CMS Login page
        cy.log('**User should be returned to the CMS Login page**');
        //cy.get('.version.ng-binding').should('have.text', 'Version ' + Constants.build);
    });

    it('Privacy Link: Verify the functionality of Privacy link on the CMS Login screen', () => {
        // A browser window should open for the Privacy Policy page
        cy.log('**A browser window should open for the Privacy Policy page**');
        cy.get('a[href="'+Constants.linkPrivacy_url+'"]').should('have.attr', 'target', '_blank');
    });

    it('Close browser windows and return to V3 Clone: To verify the case when user returns to login page and Release Notes & Privacy browser windows are closed', () => {
        cy.log('**Cypress limitation!!**');

    });

    it('Release Notes link: To verify the Release Note link on the CMS Login screen', () => {
        // A browser window should open with a login screen for the Release Notes page
        cy.log('**A browser window should open with a login screen for the Release Notes page**');
        cy.get('a[href="'+Constants.linkReleaseNotes_url+'"]').should('have.attr', 'target', '_blank');

    });

    it('Login with incorrect username: Enter the wrong Username and Password', () => {
        cy.get(Constants.loginUserName_txt).should('be.visible').type('WrongUserName');
        cy.get(Constants.loginPassword_txt).should('be.visible').type('WrongPassword');
        cy.get(Constants.loginLogin_btn).should('be.visible').click();
        // Error prompt should appear stating Your Crownpeak Username or Password is Incorrect.
        cy.log('**Error prompt should appear stating Your Crownpeak Username or Password is Incorrect.**');
        cy.get(Constants.loginError_txt).should('have.text', 'Your Crownpeak Username or Password is Incorrect.');
    });

    it('Login with correct password: Enter the correct Username and Password for your admin account', () => {
        cy.get(Constants.loginUserName_txt).should('be.visible').clear().type(Constants.usernameInput);
        cy.get(Constants.loginPassword_txt).should('be.visible').clear().type(Constants.passwordInput);
        cy.get(Constants.loginLogin_btn).should('be.visible').click();
        // User should log in to application with no errors.
        cy.log('**User should log in to application with no errors.**');
        cy.get(Constants.loginVersion_lbl).should('not.be.visible');
        cy.wait(Constants.shortWait);

    });

    it('To verify the page displayed after login to application: Observe the page loaded upon login', () => {
        // User should be taken to the Content page(or as set by user in preferences)
        cy.log('**User should be taken to the Content page(or as set by user in preferences)**');
        cy.title().should('eq', 'Crownpeak V3 - Dashboard');
    });
});
