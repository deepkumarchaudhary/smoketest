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
const WisywigFileName = 'Wisywig_Asset';
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


    it('Branched Assets V3', () => {
        // Activity Monitor Status: To verify user able to Open the Activity Monitor
        cy.get('#topbarPublishingMenuToggle').click();
        cy.wait(Constants.longWait);

        cy.get('.publishingDropdown').should('be.visible');
        cy.get('.publishingactivity > .cpDropdown > .header > .name').should('have.text', 'Activity Monitor Quickview');
        cy.get(Constants.modelOptionInSubMenu_lnk).contains('Long Running Tasks').trigger('scroll');
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
        cy.wait(Constants.shortWait)
        cy.get('.crumbsLink').contains(SiteRootName).should('be.visible');

        cy.get(Constants.SearchForAnyFolderFile).contains('_Assets').should('be.visible');
        cy.get(Constants.SearchForAnyFolderFile).contains('_Site Config').should('be.visible');
        cy.get(Constants.SearchForAnyFolderFile).contains('Component Project').should('be.visible');

        cy.get(Constants.SearchForAnyFolderFile).contains('Demo Page').should('be.visible');
        cy.get(Constants.SearchForAnyFolderFile).contains('Page').should('be.visible');

        //CReate Wisywig Asset
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

        //click on Browse button and select the Drag and Drop Template
        cy.get('button.btn.btn-primary:contains(\'Browse\')').trigger('click');
        cy.wait(Constants.wait)
        cy.get('asset-browser.ng-star-inserted > .head > .assetRow > .assetLabel > .assetLabelLink').click();
        cy.get(Constants.SearchForAnyFolderFile).contains('wysiwyg image test template').click({ force: true });
        cy.get('button').contains('OK').click();
        cy.get('span.new-file-template-path').should('have.text', 'Path: /' + Constants.automationBoxName + '/' + SiteRootName + '/Component Project/Templates/wysiwyg image test template');

        //select the workflow and click on Create button
        cy.get('select').select('Basic Workflow');
        cy.wait(Constants.wait);
        cy.get('button.btn.btn-primary').contains('Create').click();
        cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Created asset ' + WisywigFileName + '.');
        cy.wait(Constants.wait);

        //Open the created asset
        cy.get(Constants.SearchForAnyFolderFile).contains(WisywigFileName).trigger('click')
        cy.wait(Constants.wait)
        cy.get('body').type('{alt}{shift}B', { force: true })
        cy.wait(Constants.wait)
        cy.get(Constants.SearchForAnyFolderFile).contains(WisywigFileName).trigger('dblclick')
        cy.wait(Constants.wait)
        // Change image and WYSIWIG text
        cy.log('**Action: Change the image.**');
        cy.wait(Constants.wait);

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
        // click on created Asset and make it Branch Asset
        cy.wait(Constants.wait)
        cy.get(Constants.SearchForAnyFolderFile).contains(WisywigFileName).trigger('contextmenu')
        cy.wait(Constants.wait)


        // Stage and Live the created Branched Asset
        cy.log('**Action: Right click the Branched Asset that is in Draft.** ');
        cy.get('.name.ng-scope').contains('Workflow').click({ force: true });
        cy.get('.statusName.workflowMenuItem').contains('Pending').click({ force: true });
        //cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Send for Approval" completed.')

        cy.wait(Constants.wait);
        cy.get(Constants.SearchForAnyFolderFile).contains(WisywigFileName).trigger('contextmenu')
        cy.wait(Constants.wait);
        cy.get('.name.ng-scope').contains('Workflow').click({ force: true });
        cy.get('.statusName.workflowMenuItem').contains('Stage').click({ force: true });
        cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Approve" completed.')
        // Right click the same asset and select Workflow-> Live.
        cy.log('**Action: Right click the same asset and select Workflow-> Live.**');
        cy.wait(Constants.wait);
        cy.get(Constants.SearchForAnyFolderFile).contains(WisywigFileName).trigger('contextmenu')
        cy.wait(Constants.wait);
        cy.get('.name.ng-scope').contains('Workflow').click({ force: true });
        cy.wait(Constants.wait);
        cy.get('.statusName.workflowMenuItem').contains('Live').click({ force: true });
        cy.wait(Constants.wait);
        // Select Workflow-> Live.
        cy.log('**Action: Select Workflow-> Live.**');
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Deploy to Live" completed.');
        cy.wait(Constants.wait);


        cy.get('button.tabCloseButton').click();
        //Open the created asset
        cy.get('div.asset.ng-scope:nth-child(7) div.assetRow.ng-scope div.assetLabel:nth-child(4) > a.assetLabelLink.ng-binding').contains(WisywigFileName).trigger('click')
        cy.wait(Constants.wait)
        cy.wait(Constants.wait)
        cy.get('div.asset.ng-scope:nth-child(7) div.assetRow.ng-scope div.assetLabel:nth-child(4) > a.assetLabelLink.ng-binding').contains(WisywigFileName).trigger('dblclick')
        cy.wait(Constants.wait)
        // Change image and WYSIWIG text
        cy.log('**Action: Change the image.**');
        cy.wait(Constants.wait);
        // Select Image
        UtilityHelper.selectImageInImageComponent(Constants.automationBoxName + '/' + SiteRootName, 'Beach-Small.jpg', Constants.wait);

        // Change the text in WYSIWYG to display the  build.
        cy.log('**Change the text to display the  build.**');
        UtilityHelper.insertTextInWYSIWYGIframe('This is New WYSIWIG text' + randomNumber);        // Select Save.
        cy.log('**Action: Select Save.**');
        cy.get('#contentModuleSave').click();
        cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Saving asset completed successfully')
        // click on created Asset and make it Branch Asset
        cy.wait(Constants.wait)
        cy.get('div.asset.ng-scope:nth-child(7) div.assetRow.ng-scope div.assetLabel:nth-child(4) > a.assetLabelLink.ng-binding').trigger('contextmenu')
        cy.wait(Constants.wait)


        // Stage and Live the created Branched Asset
        cy.log('**Action: Right click the Branched Asset that is in Draft.** ');
        cy.wait(Constants.wait);
        cy.get('.name.ng-scope').contains('Workflow').click({ force: true });
        cy.get('.statusName.workflowMenuItem').contains('Pending').click({ force: true });
        //cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Send for Approval" completed.')

        cy.wait(Constants.wait);
        cy.get('div.asset.ng-scope:nth-child(7) div.assetRow.ng-scope div.assetLabel:nth-child(4) > a.assetLabelLink.ng-binding').trigger('contextmenu')

        cy.wait(Constants.wait);
        cy.get('.name.ng-scope').contains('Workflow').click({ force: true });
        cy.get('.statusName.workflowMenuItem').contains('Stage').click({ force: true });
        cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Approve" completed.')
        // Right click the same asset and select Workflow-> Live.
        cy.log('**Action: Right click the same asset and select Workflow-> Live.**');
        cy.wait(Constants.wait);
        cy.get('div.asset.ng-scope:nth-child(7) div.assetRow.ng-scope div.assetLabel:nth-child(4) > a.assetLabelLink.ng-binding').trigger('contextmenu')
        cy.wait(Constants.wait);
        cy.get('.name.ng-scope').contains('Workflow').click({ force: true });
        cy.wait(Constants.wait);
        cy.get('.statusName.workflowMenuItem').contains('Live').click({ force: true });
        cy.wait(Constants.wait);
        // Select Workflow-> Live.
        cy.log('**Action: Select Workflow-> Live.**');
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Deploy to Live" completed.');
        cy.wait(Constants.wait);

        // Verify and Delete the retired Branched Assret
        cy.get(Constants.SearchForAnyFolderFile).contains(WisywigFileName).first().trigger('click');
        cy.get(':nth-child(6) > .assetRow > .status > .statusColor').should('have.attr', 'uib-tooltip', 'RETIRED');
        cy.wait(Constants.wait);
        cy.wait(Constants.wait);
        // Right click on the retired Branched Asset and select Delete.
        cy.log('**Action: Right click on the retired Branched Asset and select Delete.**');
        cy.get('body').type('{Del}', { force: true });
        cy.wait(Constants.wait);
        // Select Delete.
        cy.log('**Action: Select Delete.**');
        cy.get('body > modal-base > modal-dialog > p-dialog > div > div.ui-dialog-content.ui-widget-content > div > p').should('have.text', 'Are you sure you want to delete "Wisywig_Asset"?');
        cy.get('button.btn.btn-danger.ng-star-inserted').contains('Delete').click();
        cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Successfully deleted "Wisywig_Asset".');


        cy.get('button.tabCloseButton').click();

    });
});