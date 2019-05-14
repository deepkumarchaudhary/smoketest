/// <reference types="Cypress" />
// This test map to Hiptest smoke test: https://app.hiptest.com/projects/119826/test-plan/folders/839070
import {
    UtilityClass
} from '../../../support/Helper/utility';
import Constants from '../../../support/Locators/locators';
import MenuItems from '../../../support/Helper/menuPageObject';
const UtilityHelper = new UtilityClass();
const MenuPageObject = new MenuItems();
const testCategory = "Login";
var testCaseName = '';
const menuItem = 'File';
const subMenuItem = 'New';
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
    it('.should() - login to v3 > navigate through reports > verify each settings', () => {
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
        cy.get('h1').first().should('have.text', 'Edit Profile');
        /*
        Click on Edit Preferences
        */
        cy.get('a').contains('Edit Preferences').should('be.visible').click().url().should('include', '/account/preferences')
        // Edit Preferences page should display
        cy.get('h1').first().contains('Preferences').should('be.visible');
        /*
        Click on Users/groups>> Users
        */
        cy.get('p-header').contains('Users / Groups').should('be.visible').click();
        cy.wait(8000)
        cy.get('#ui-accordiontab-1-content > .ui-accordion-content > :nth-child(1) > ul.ng-star-inserted > .ng-star-inserted > a').should('be.visible').click({
            timeout: Constants.wait
        });
        cy.wait(Constants.wait)
        // Edit Preferences page should display
        cy.url().should('include', '/users/groups/users')
        cy.get('h1').first().should('have.text', 'Users');
        // Click on Users/groups>> Groups
        cy.get('#ui-accordiontab-1-content > .ui-accordion-content > :nth-child(2) > ul.ng-star-inserted > .ng-star-inserted > a').should('be.visible').click().url().should('include', '/users/groups/groups')
        // Page with groups info should display
        cy.get('h1').first().contains('Groups').should('be.visible');
        // Click on Workflow>> Workflows
        cy.get('p-header').contains('Workflow').should('be.visible').click();
        // List of Workflows should display
        cy.get('#ui-accordiontab-2-content > .ui-accordion-content > :nth-child(1) > ul.ng-star-inserted > .ng-star-inserted > a').should('be.visible').click({
            timeout: Constants.shortWait
        });
        cy.wait(Constants.wait)
        cy.url().should('include', '/workflow/workflows')
        // Click on Test workflow or any workflow
        cy.get('h1').first().should('have.text', 'Workflows');

        /*  Edit Workflow modal should appear
            Click on Test workflow 
            Click on Edit steps link
        */
        cy.get('tr:nth-child(1) > td:nth-child(1)').should('be.visible');
        cy.get('tr:nth-child(1) > td:nth-child(1)').click({force: true} );
        // Edit the name of the workflow and description>> Click on Cancel button
        cy.get('#description').clear();
        cy.get('#description').type('Automation test');
        cy.log('**Action: Select Cancel.**');
        cy.get('button.cancel.btn').contains('Cancel').should('be.visible').click();
        cy.get('p-header').contains('Discard Changes').should('be.visible');
        cy.get('div.modal-body').should('have.text', ' Are you sure you want to discard changes? ');
        cy.get('button.btn.btn-danger').contains('Discard Changes').should('be.visible');
        cy.log('**Action: Select Discard changes button.**');
        cy.get('button.btn.btn-danger').contains('Discard Changes').click();
        // Click on Workflow>> Workflow Filters
        cy.get('a').contains('Workflow Filters').should('be.visible').click().url().should('include', '/workflow/workflowFilters')
        // Workflow Filters should display
        cy.get('h1').first().contains('Workflow Filters').should('be.visible');
        // Click on Publishing>> Export SFTP
        cy.get('p-header').contains('Publishing').should('be.visible').click();
        // Export SFTP page should display
        cy.get('a').contains('Export SFTP').should('be.visible').click();
        cy.wait(Constants.shortWait);
        cy.url().should('include', '/publishing/exportftp')
        cy.get('h1').first().should('have.text', 'Export SFTP');
        // Click on Publishing>> Export S3
        cy.get('a').contains('Export S3').should('be.visible').click().url().should('include', '/publishing/exports3')
        // Export S3 page should display
        cy.get('h1').first().should('have.text', 'Export S3');
        // Click on Publishing>> FTP Certificates
        cy.get('a').contains('FTP Certificates').should('be.visible').click().url().should('include', '/publishing/ftpcertificates')
        // FTP Certificates page should display
        cy.get('h1').first().should('have.text', 'FTP Certificates');
        // Click on Publishing>> FTP Mounts
        cy.get('a').contains('FTP Mounts').should('be.visible').click().url().should('include', '/publishing/ftp-mounts')
        // FTP Mounts page should display
        cy.get('h1').first().should('have.text', 'FTP Mounts');
        // Click on Publishing>> Export HTTP
        cy.get('a').contains('Export HTTP').should('be.visible').click().url().should('include', '/publishing/exporthttpservers')
        // Export HTTP page should display
        cy.get('h1').first().should('have.text', 'Export HTTP');
        // Click on Publishing>> Packages
        cy.get('a').contains('Packages').should('be.visible').click().url().should('include', '/publishing/packages')
        // Packages page should display
        cy.get('h1').first().should('have.text', 'Packages');
        // Click on Publishing>>  Fed Auth Configuration
        cy.get('a').contains('Fed Auth Configuration').should('be.visible').click().url().should('include', '/publishing/fedauth')
        // Fed Auth Configuration page should display
        cy.get('h1').first().should('have.text', 'Fed Auth Configuration');
        // Click on Publishing>>  Filenames
        cy.get('a').contains('Filenames').should('be.visible').click().url().should('include', '/publishing/filenames')
        // Filenames page should display
        cy.get('h1').first().should('have.text', 'Filenames');
        // Click on Publishing>>  Import SMTP
        cy.get('a').contains('Import SMTP').should('be.visible').click().url().should('include', '/publishing/importsmtp')
        // Import SMTP page should display
        cy.get('h1').first().should('have.text', 'Import SMTP');
        // Click on Publishing>>  Import SFTP
        cy.get('a').contains('Import SFTP').should('be.visible').click().url().should('include', '/publishing/importsftp')
        // Import SFTP page should display
        cy.get('h1').first().should('have.text', 'Import SFTP');
        // Click on Publishing>>  Configuration
        cy.get('p-header').contains('Configuration').should('be.visible').click();
        // click on Configuration>> DQM
        cy.get('a').contains('DQM').click({
            force: true
        });
        // DQM page should display
        cy.wait(Constants.shortWait);
        cy.url().should('include', '/configure/dqm')
        cy.get('h1').first().should('have.text', 'DQM');
        // Click on Configuration>> WCM
        cy.get('a').contains('WCM').should('be.visible').click().url().should('include', '/configure/wcm')
        // WCM page should display
        cy.get('h1').first().should('have.text', 'General WCM');
        // Click on Configuration>> WCO
        cy.get('a').contains('WCO').should('be.visible').click().url().should('include', '/configure/wco')
        // WCO page should display
        cy.get('h1').first().should('have.text', 'General WCO');
        // Click on Configuration>> Search G2
        cy.get('a').contains('Search G2').should('be.visible').click().url().should('include', '/configure/generalsearchg2')
        // Search G2 page should display
        cy.get('h1').first().should('have.text', 'Search G2');
        // Click on Configuration>> DBaaS Hosts
        cy.get('a').contains('DBaaS Hosts').should('be.visible').click().url().should('include', '/configure/dbaashosts')
        // DBaaS Hosts page should display
        cy.get('h1').first().should('have.text', 'DBaaS Hosts');
        // Click on Configuration>> DBaaS Connections
        cy.get('a').contains('DBaaS Connections').should('be.visible').click().url().should('include', '/configure/dbaasconnections')
        // DBaaS Connections page should display
        cy.get('h1').first().should('have.text', 'DBaaS Connections');
        // Click on Configuration>> Authentication Settings
        cy.get('a').contains('Authentication Settings').should('be.visible').click().url().should('include', '/configure/auth')
        // Authentication Settings page should display
        cy.get('h1').first().should('have.text', 'Authentication Settings');
        // Click on Configuration>> Security
        cy.get('a').contains('Security').should('be.visible').click().url().should('include', '/configure/security')
        // Security page should display
        cy.get('h1').first().should('have.text', 'Security');
        // Click on Configuration>> Variables
        cy.get('a').contains('Variables').should('be.visible').click().url().should('include', '/configure/variables')
        // System Variables page should display
        cy.get('h1').first().should('have.text', 'System Variables');
        // Click on Configuration>> Password Expiration
        cy.get('a').contains('Password Expiration').should('be.visible').click().url().should('include', '/configure/passwordpolicy')
        // Password Expiration page should display
        cy.get('h1').first().should('have.text', 'Password Expiration');
        // Click on Configuration>> Output Views
        cy.get('a').contains('Output Views').should('be.visible').click().url().should('include', '/configure/outputviews')
        // Output Views page should display
        cy.get('h1').first().should('have.text', 'Output Views');
        // Click on Tools >>DBaaS Console
        cy.get('p-header').contains('Tools').should('be.visible').click();
        cy.get('a').contains('DBaaS Console').should('be.visible').click().url().should('include', '/tools/dbaas-console')
        // DBaaS Console  page should display
        cy.get('h1').first().should('have.text', 'DBaaS Console');
        // Click on Tools >>Recompile DBaaS Console
        cy.get('a').contains('Recompile').should('be.visible').click().url().should('include', '/tools/recompile')
        // Recompile page should display
        cy.get('h1').first().should('have.text', 'Recompile');
        // Click on Tools >>Clear link Cache
        cy.get('a').contains('Clear Link Cache').should('be.visible').click().url().should('include', '/tools/clearlinkcache')
        // Clear link Cache page should display
        cy.get('h1').first().should('have.text', 'Clear Link Cache');
        /*
        1. Go to user icon on the top right side of page
        2. Click on Profile link
        */
        cy.wait(Constants.wait);
        cy.log('**1. Go to user icon displayed on upper top right of page **');
        cy.get('#topbarUserMenuToggle').click();
        cy.log('**2. Click on Profile link **');
        cy.get('button').contains('Profile').click();
        cy.log('**Profile edit should display**');
        // Edit Profile page should display
        cy.get('a').contains('Edit Profile').should('be.visible').url().should('include', '/account/profile')
        cy.get('h1').first().should('have.text', 'Edit Profile');
    });
});