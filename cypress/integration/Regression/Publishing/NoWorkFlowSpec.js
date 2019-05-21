/// <reference types="Cypress" />
// This test map to Hiptest Regression test: https://app.hiptest.com/projects/41676/test-plan/folders/463730/scenarios/1589167
import {
    UtilityClass
} from '../../../support/Helper/utility';
import Constants from '../../../support/Locators/locators';
import MenuItems from '../../../support/Helper/menuPageObject';
const UtilityHelper = new UtilityClass();
const MenuPageObject = new MenuItems();
const testCategory = "Publishing";
var testCaseName = '';
const menuItem = 'File';
const subMenuItem = 'New';
const randomNumber = UtilityHelper.randomNumber();
const SiteRootName = 'Auto_SiteRoot_' + UtilityHelper.randomNumber();
const imageName = 'boat cove.jpg';
const WisywigFileName = 'Wisywig_Asset_No_Workflow';
const FileName = 'Asset_Creation';

describe("Publishing should ", () => {

    before(() => {
        UtilityHelper.loginCrownpeak();
        cy.wait(Constants.shortWait);
        cy.get(Constants.LeftMenuModuleContent_lnk).should('be.visible').click({ force: true });
        cy.wait(Constants.wait);
        // Get Inside the Automation box
        UtilityHelper.peepInAutomationBox('File', 'New', 'Folder');
        // Create a new site root inside the Automation box
        MenuPageObject.clickMenuItem(menuItem);
        //.wait(Constants.shortWait)
        MenuPageObject.clickSubMenuItem(menuItem,subMenuItem)

        cy.wait(Constants.shortWait)
        UtilityHelper.createSiteRoot(SiteRootName);
        // Activity Monitor Status: To verify user able to Open the Activity Monitor
        cy.get('#topbarPublishingMenuToggle').click();
        cy.wait(Constants.longWait);

        cy.get('.publishingDropdown').should('be.visible');
        cy.get('.publishingactivity > .cpDropdown > .header > .name').should('have.text', 'Activity Monitor Quickview');
        cy.get('span.name').contains('Long Running Tasks').trigger('scroll');
        cy.get('.taskName').contains('RebuildCLSite').should('be.visible');
        cy.wait(Constants.shortWait);

        cy.get('.taskName').contains('RebuildCLSite').prev().should('have.attr', 'class', 'statusColor session-success');
        cy.get('.taskName').contains('FinishAddCL').should('be.visible');
        cy.wait(Constants.shortWait);
        cy.get('.taskName').contains('FinishAddCL').prev().should('have.attr', 'class', 'statusColor session-success');
        cy.get('.taskName').contains('AddCL').should('be.visible');
        //.wait(Constants.shortWait);
        cy.get('.taskName').contains('AddCL').prev().should('have.attr', 'class', 'statusColor session-success');

        // Search for the created site root and open it
        UtilityHelper.searchSiteRoot(SiteRootName, Constants.wait);
        cy.wait(Constants.shortWait);

        cy.get('.crumbsLink.ng-binding').contains(SiteRootName).should('be.visible');

        cy.get(Constants.SearchForAnyFolderFile).contains('_Assets').should('be.visible');
        cy.get(Constants.SearchForAnyFolderFile).contains('_Site Config').should('be.visible');
        cy.get(Constants.SearchForAnyFolderFile).contains('Component Project').should('be.visible');

        cy.get(Constants.SearchForAnyFolderFile).contains('Demo Page').should('be.visible');
        cy.get(Constants.SearchForAnyFolderFile).contains('Page').should('be.visible');


    })
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


    it('No workflow V3', () => {


        //CReate No WorkFlow Asset
        cy.wait(Constants.shortWait);
        MenuPageObject.clickMenuItem(menuItem);
        MenuPageObject.clickSubMenuItem(menuItem, subMenuItem);

        cy.wait(Constants.wait);
        cy.get(Constants.modelOptionInSubMenu_lnk).contains(menuItem).trigger('mousemove').trigger('click');
        // Create Template File modal
        cy.get('div[role=dialog]', { timeout: Constants.wait }).should('be.visible');
        cy.get('p-header').should('contain', 'Create New');
        cy.get('#label').click();

        //input the new File name in input box and verify the file path
        cy.get('#label').type(WisywigFileName);
        cy.get('.new-file-name-input > span').should('have.text', 'Path: /' + Constants.automationBoxName + '/' + SiteRootName + '');

        //click on Browse button and select the WYSISWYG template
        cy.get('button.btn.btn-primary:contains(\'Browse\')').trigger('click');
        cy.wait(Constants.wait)
        cy.get('asset-browser.ng-star-inserted > .head > .assetRow > .assetLabel > .assetLabelLink').click();
        cy.get(Constants.SearchForAnyFolderFile).contains('wysiwyg image test template').click({ force: true });
        cy.get('button').contains('OK').click();
        cy.get('span.new-file-template-path').should('have.text', 'Path: /' + Constants.automationBoxName + '/' + SiteRootName + '/Component Project/Templates/wysiwyg image test template');

        //Dont select any workflow and click on Create button
        // cy.get('select').select('Basic Workflow');
        cy.wait(Constants.wait);
        cy.get('button.btn.btn-primary').contains('Create').click();
        cy.wait(Constants.wait);
        // cy.get(Constants.toastNotificationMessage).should('have.text', 'Created asset ' + WisywigFileName + '.');
        cy.wait(Constants.wait);

        //Open the created asset and configure the Stage Site and Live Site 
        UtilityHelper.configureAssetSiteProperties(WisywigFileName);

        // Click on File View
        cy.get(Constants.dockablePanelFile_tab).click();
        cy.get(Constants.SearchForAnyFolderFile).contains(WisywigFileName).trigger('click')
        cy.wait(Constants.wait)
        cy.get(Constants.SearchForAnyFolderFile).contains(WisywigFileName).trigger('dblclick')
        cy.wait(Constants.wait)
        // Select Image
        UtilityHelper.selectImageInImageComponent(Constants.automationBoxName + '/' + SiteRootName, 'Beach-Small.jpg', Constants.wait);

        // Change the text in WYSIWYG to display the  build.
        cy.log('**Change the text to display the  build.**');
        UtilityHelper.insertTextInWYSIWYGIframe('This is New WYSIWIG text' + randomNumber);

        //Action: Select Save.
        cy.log('**Action: Select Save.**');
        cy.get('#contentModuleSave').click();
        cy.wait(Constants.wait);
        cy.get('.toast-message').should('have.text', 'Saving asset completed successfully')

        cy.get('#contentModuleWorkflowMenuToggle').click();
        cy.get('.labeled-dropdown > .cpDropdown > workflow-menu > .workflowMenuItems > .ng-star-inserted').contains('Publish').should('be.visible').click();

        // Activity Monitor Status: To verify user able to Open the Activity Monitor
        cy.get('#topbarPublishingMenuToggle').click();
        cy.wait(Constants.longWait);
        cy.get('.publishingDropdown').should('be.visible');
        cy.get('.publishingactivity > .cpDropdown > .header > .name').should('have.text', 'Activity Monitor Quickview');
        cy.get('span.name').contains('My Publishing').should('be.visible');
        cy.get('.taskName').contains('RebuildCLSite').should('be.visible');

        cy.wait(Constants.shortWait);

        cy.get('.sender.session-success').contains('Complete').should('be.visible', { timeout: 120000 });
        cy.get('#topbarPublishingMenuToggle').click();

        // Close the asset
        cy.get('button.tabCloseButton').click();

        // Reopen the Asset
        cy.wait(Constants.wait)
        cy.get(Constants.SearchForAnyFolderFile).contains(WisywigFileName).trigger('dblclick')
        cy.wait(Constants.wait)

        // Change the text in WYSIWYG to display the  build.
        cy.log('**Change the text to display the  build.**');
        UtilityHelper.insertTextInWYSIWYGIframe('This is New WYSIWIG text updated' + randomNumber);

        //Action: Select Save.
        cy.log('**Action: Select Save.**');
        cy.get('#contentModuleSave').click();
        cy.wait(Constants.wait);
        cy.get('.toast-message').should('have.text', 'Saving asset completed successfully')
        //////
        cy.get('#contentModuleWorkflowMenuToggle').click();
        // cy.get('.ng-star-inserted > .cpMenuItem').contains('Re-Publish').should('be.visible').click();
        cy.get('.ng-star-inserted > .cpMenuItem').contains('Publish').should('be.visible').click();

        // Activity Monitor Status: To verify user able to Open the Activity Monitor
        cy.get('#topbarPublishingMenuToggle').click();
        cy.wait(Constants.longWait);
        cy.get('.publishingDropdown').should('be.visible');
        cy.get('.publishingactivity > .cpDropdown > .header > .name').should('have.text', 'Activity Monitor Quickview');
        cy.get('span.name').contains('My Publishing').should('be.visible');
        cy.get('.taskName').contains('RebuildCLSite').should('be.visible');

        cy.wait(Constants.shortWait);

        cy.get('.sender.session-success').contains('Complete').should('be.visible', { timeout: 120000 });
        cy.get('#topbarPublishingMenuToggle').click();

        // Close the asset
        cy.get('button.tabCloseButton').click();

    });
});


