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


describe("Reports should ", () => {
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

    function verifyReportsSection(locatorReportsSecction, reportsSectionName) {
        cy.get(locatorReportsSecction).contains(reportsSectionName).should('be.visible').click();
    }

    it('.should() - login to v3 > navigate through reports > verify each reports url', () => {
        /*
            1. Go to Reports menu
            2. Options will display
        */
        cy.wait(Constants.shortWait)
        cy.get('.module.reports').should('be.visible').click({
            force: true
        })
        cy.wait(Constants.shortWait)
        /*
        Instance Overview page should open and nav should display: 
        Operational, Audit, My Reports, Users and Logins, Publishing, 
        Assets and Tasks
        */
        verifyReportsSection(Constants.reportsSection_lnk, 'Operational');

        cy.url().should('include', '/reports/operational/instance-overview')
        cy.get(Constants.reportsHeader_txt).first().should('have.text', 'Instance Overview');
        // Click on Audit>> Asset Publish
        verifyReportsSection(Constants.reportsSection_lnk, 'Audit');
        cy.get('a').contains('Asset Publish').should('be.visible').click().url().should('include', '/asset-publish')
        // Asset Publish page should display
        cy.get(Constants.reportsHeader_txt).first().contains('Asset Publish').should('be.visible');
        // Click on Audit>>  Publish
        cy.get('a').contains(/^Publish$/).should('be.visible').click().url().should('include', '/publish')
        // Publish page should display
        cy.get(Constants.reportsHeader_txt).first().contains('Publish').should('be.visible');
        // Click on Audit>>  System
        cy.get('a').contains('System').should('be.visible').click().url().should('include', '/system')
        // System page should display
        cy.get(Constants.reportsHeader_txt).first().contains('System').should('be.visible');
        // Click on Audit>>  Orphan Content
        cy.get('a').contains('Orphan Content').should('be.visible').click().url().should('include', '/orphan-content')
        // Orphan Content page should display
        cy.get(Constants.reportsHeader_txt).first().contains('Orphan Content').should('be.visible');
        // Click on My Reports>> My Flagged Assets
        verifyReportsSection(Constants.reportsSection_lnk, 'My Reports');

        cy.get('a').contains('My Flagged Assets').should('be.visible').click().url().should('include', '/my-flagged-assets')
        // My Flagged Assets page should display
        cy.get(Constants.reportsHeader_txt).first().contains('My Flagged Assets').should('be.visible');
        // Click on My Reports>> My Locked Assets
        cy.get('a').contains('My Locked Assets').should('be.visible').click().url().should('include', '/my-locked-assets')
        // My Locked Assets page should display
        cy.get(Constants.reportsHeader_txt).first().contains('My Locked Assets').should('be.visible');
        // Click on My Reports>> My Queued Assets
        cy.get('a').contains('My Queued Assets').should('be.visible').click().url().should('include', '/my-queued-assets')
        // My Queued Assets page should display
        cy.get(Constants.reportsHeader_txt).first().contains('My Queued Assets').should('be.visible');
        // Click on My Reports>> My Last Modified
        cy.get('a').contains('My Last Modified').should('be.visible').click().url().should('include', '/my-last-modified')
        // My Last Modified page should display
        cy.get(Constants.reportsHeader_txt).first().contains('My Last Modified').should('be.visible');
        // Click on My Reports>> My Alerts
        cy.get('a').contains('My Alerts').should('be.visible').click().url().should('include', '/my-alerts')
        // My Alerts page should display
        cy.get(Constants.reportsHeader_txt).first().contains('My Alerts').should('be.visible');
        // Click on My Reports>> My Modified Unpublished
        cy.get('a').contains('My Modified Unpublished').should('be.visible').click().url().should('include', '/my-modified-unpublished')
        // My Modified Unpublished page should display     
        cy.get(Constants.reportsHeader_txt).first().contains('My Modified Unpublished').should('be.visible');

        // Click on My Custom Reports>>  Save Asset report
        verifyReportsSection(Constants.reportsSection_lnk, 'My Custom Reports');
        // cy.get('a').contains('Save asset report').should('be.visible').click().url().should('include', '/my-custom-report')
        // // Save Asset report should display
        // cy.get('strong').first().contains('Save asset report').should('be.visible');

        // Click on Users and Logins>>   Last Logins
        verifyReportsSection(Constants.reportsSection_lnk, 'Users and Logins');
        cy.get('a').contains('Last Logins').should('be.visible').click().url().should('include', '/last-logins')
        // Last Logins page should display
        cy.get('strong').first().contains('Last Logins').should('be.visible');
        // Click on Users and Logins>>   Most Active Users
        cy.get('a').contains('Most Active Users').should('be.visible').click().url().should('include', '/most-active-users')
        // Most Active Users page should display
        cy.get('strong').first().contains('Most Active Users').should('be.visible');
        // Click on Users and Logins>>   Least Active Users
        cy.get('a').contains('Least Active Users').should('be.visible').click().url().should('include', '/least-active-users')
        // Least Active Users page should display
        cy.get('strong').first().contains('Least Active Users').should('be.visible');
        // Click on Users and Logins>>  Login Alerts
        cy.get('a').contains('Login Alerts').should('be.visible').click().url().should('include', '/login-alerts')
        // Login Alerts Users page should display
        cy.get('strong').first().contains('Login Alerts').should('be.visible');
        // Click on Users and Logins>>  Never Logged In
        cy.get('a').contains('Never Logged In').should('be.visible').click().url().should('include', '/never-logged-in')
        // Never Logged In page should display
        cy.get('strong').first().contains('Never Logged In').should('be.visible');

        // Click on Publishing>>  Last Published
        verifyReportsSection(Constants.reportsSection_lnk, 'Publishing');
        cy.get('a').contains('Last Published').should('be.visible').click().url().should('include', '/last-published')
        // Last Published page should display
        cy.get(Constants.reportsHeader_txt).first().contains('Last Published').should('be.visible');
        // Click on Publishing>>  Assets Near Publishing
        cy.get('a').contains('Assets Near Publishing').should('be.visible').click().url().should('include', '/assets-near-publishing')
        // Assets Near Publishing page should display
        cy.get(Constants.reportsHeader_txt).first().contains('Assets Near Publishing').should('be.visible');
        // Click on Publishing>>  Modified Unpublished
        cy.get('a').contains(/^Modified Unpublished$/).should('be.visible').click().url().should('include', '/modified-unpublished')
        // Modified Unpublished page should display
        cy.get(Constants.reportsHeader_txt).first().contains('Modified Unpublished').should('be.visible');
        // Click on Publishing>>  Asset Refresh Schedule
        cy.get('a').contains('Asset Refresh Schedule').should('be.visible').click().url().should('include', '/asset-refresh-schedule')
        // Asset Refresh Schedule page should display
        cy.get(Constants.reportsHeader_txt).first().contains('Asset Refresh Schedule').should('be.visible');
        // Click on Publishing>>  Queued Assets
        cy.get('a').contains(/^Queued Assets$/).should('be.visible').click().url().should('include', '/queued-assets')
        // Queued Assets page should display
        cy.get(Constants.reportsHeader_txt).first().contains('Queued Assets').should('be.visible');
        // Click on Publishing>>  Queue Size
        cy.get('a').contains(/^Queue Size$/).should('be.visible').click().url().should('include', '/queue-size')
        // Queue Size page should display
        cy.get(Constants.reportsHeader_txt).first().contains('Queue Size').should('be.visible');
        // Click on Publishing>>  Errors
        cy.get('a').contains('Errors').should('be.visible').click().url().should('include', '/errors')
        // Errors page should display
        cy.get(Constants.reportsHeader_txt).first().contains('Errors').should('be.visible');

        // Click on Assets >>  Locked Assets
        verifyReportsSection(Constants.reportsSection_lnk, 'Assets');
        cy.get('a').contains(/^Locked Assets$/).should('be.visible').click().url().should('include', '/locked-assets')
        // Locked Assets page should display
        cy.get('strong').first().contains('Locked Assets').should('be.visible');
        // Click on Assets >>  Templates
        cy.get('a').contains('Templates').should('be.visible').click().url().should('include', '/templates')
        // Templates page should display
        cy.get('strong').first().contains('Templates').should('be.visible');
        // Click on Assets >>  New Assets
        cy.get('a').contains('New Assets').should('be.visible').click().url().should('include', '/new-assets')
        // New Assets page should display
        cy.get('strong').first().contains('New Assets').should('be.visible');
        // Click on Assets >>  Oldest Pages
        cy.get('a').contains('Oldest Pages').should('be.visible').click().url().should('include', '/oldest-pages')
        // Oldest Pages page should display
        cy.get(Constants.reportsHeader_txt).first().contains('Oldest Pages').should('be.visible');
        // Click on Assets >>  Last Modified
        cy.get('a').contains(/^Last Modified$/).should('be.visible').click().url().should('include', '/last-modified')
        // Last Modified page should display
        cy.get(Constants.reportsHeader_txt).first().contains('Last Modified').should('be.visible');
        // Click on Assets >>  Slow Performing Templates
        cy.get('a').contains('Slow Performing Templates').should('be.visible').click().url().should('include', '/slow-performing-templates')
        // Slow Performing Templates page should display
        cy.get('strong').first().contains('Slow Performing Templates').should('be.visible');

        // Click on Tasks>> Workflow Tasks
        verifyReportsSection(Constants.reportsSection_lnk, 'Tasks');
        cy.get('a').contains('Workflow Tasks').should('be.visible').click().url().should('include', '/workflow-tasks')
        // Workflow Tasks page should display
        cy.get(Constants.reportsHeader_txt).first().contains('Workflow Tasks').should('be.visible');
        // Click on Tasks>> Site Tasks
        cy.get('a').contains('Site Tasks').should('be.visible').click().url().should('include', '/site-tasks')
        // Site Tasks page should display
        cy.get(Constants.reportsHeader_txt).first().contains('Site Tasks').should('be.visible');
    })
});