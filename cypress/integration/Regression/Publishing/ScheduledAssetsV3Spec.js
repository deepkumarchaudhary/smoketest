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
        cy.get('span.name').contains('New').trigger('mouseover').should('be.visible')

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
        cy.get('span.name.ng-binding').contains('Long Running Tasks').trigger('scroll');
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
        cy.get(Constants.siteRootAssetsName_lnk).contains(SiteRootName).should('be.visible')
        cy.wait(Constants.shortWait);
        cy.get(Constants.siteRootAssetsName_lnk).contains(SiteRootName).trigger('dblclick')
        cy.wait(Constants.shortWait);
        cy.get('.crumbsLink.ng-binding').contains(SiteRootName).should('be.visible');

        cy.get(Constants.siteRootAssetsName_lnk).contains('_Assets').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('_Site Config').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Component Project').should('be.visible');

        cy.get(Constants.siteRootAssetsName_lnk).contains('Demo Page').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Page').should('be.visible');

        //CReate Wisywig Asset
        cy.wait(Constants.shortWait);
        cy.get('button#topbarFileMenuToggle').click();
        cy.get('button#topbarNewMenuToggle').trigger('mouseover');
        cy.wait(Constants.wait);
        cy.get('body.ng-scope:nth-child(2) div.topbar.ng-scope topbar.ng-isolate-scope span.leftButtons.ng-scope span.dropdown.open:nth-child(1) ul.cpDropdown.dropdown-menu.fileMenuWidth li:nth-child(1) div.nested-dropdown.ng-scope.dropdown:nth-child(1) ul.cpDropdown.dropdown-menu.padding.fileMenuWidth span.ng-scope:nth-child(3) > button.newMenuButton.ng-scope').trigger('mousemove').trigger('click');
        // Create Template File modal
        cy.get('div[role=dialog]', { timeout: Constants.wait }).should('be.visible');
        cy.get('p-header').should('contain', 'Create New');
        cy.get('#label').click();

        //input the new File name in input box and verify the file path
        cy.get('#label').type(WisywigFileName);
        cy.get('.new-file-name-input > span').should('have.text', 'Path: /' + Constants.automationBoxName +'/'+ SiteRootName + '');

        //click on Browse button and select the Drag and Drop Template
        cy.get('button.btn.btn-primary:contains(\'Browse\')').trigger('click');
        cy.wait(Constants.wait)
        cy.get('asset-browser.ng-star-inserted > .head > .assetRow > .assetLabel > .assetLabelLink').click();
        cy.get(Constants.SearchForAnyFolderFile).contains('wysiwyg image test template').click({ force: true });
        cy.get('button').contains('OK').click();
        cy.get('span.new-file-template-path').should('have.text', 'Path: /'  + Constants.automationBoxName +'/'+ SiteRootName + '/Component Project/Templates/wysiwyg image test template');

        //select the workflow and click on Create button
        cy.get('select').select('Basic Workflow');
        cy.wait(Constants.wait);
        cy.get('button.btn.btn-primary').contains('Create').click();
        cy.wait(Constants.wait);
        // cy.get(Constants.toastNotificationMessage).should('have.text', 'Created asset ' + WisywigFileName + '.');
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
        UtilityHelper.selectImageInImageComponent(Constants.automationBoxName +'/' +SiteRootName, 'Beach-Small.jpg', Constants.wait);
        
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
        cy.wait(Constants.wait);
        // cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Send for Approval" completed.')

        cy.wait(Constants.wait);
        cy.get(Constants.SearchForAnyFolderFile).contains(WisywigFileName).trigger('contextmenu')
        cy.wait(Constants.wait);
        cy.get('.name.ng-scope').contains('Workflow').click({ force: true });
        cy.get('.statusName.workflowMenuItem').contains('Stage').click({ force: true });
        cy.wait(Constants.wait);
        // cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Approve" completed.')
    });
});
