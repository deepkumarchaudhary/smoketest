/// <reference types="Cypress" />
// This test map to Hiptest smoke test: https://app.hiptest.com/projects/119826/test-plan/folders/839070
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
const menuItemView = 'View';
const subMenuItem = 'New';
const randomNumber = UtilityHelper.randomNumber();
const SiteRootName = 'Auto_SiteRoot_' + UtilityHelper.randomNumber();
const imageName = 'boat cove.jpg';
const WisywigFileName = 'Wisywig_Asset'

xdescribe("Publishing should ", () => {

    beforeEach(function () {
        UtilityHelper.loginCrownpeak();
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

    it('Proceed to Folder, Branched Asset, Cloned Asset', () => {
        cy.wait(Constants.wait);
        cy.get('.module.content').should('be.visible').click({ force: true });
        cy.wait(Constants.wait);
        //Open File Menu and check New->Sub menu items are displaying
        MenuPageObject.clickMenuItem(menuItem);
        //.wait(Constants.shortWait)
        cy.get(Constants.modelOptionInSubMenu_lnk).contains('New').trigger('mouseover').should('be.visible')

        cy.wait(Constants.shortWait)
        cy.get(Constants.modelOptionInSubMenu_lnk).contains('Site Root').trigger('mousemove')
        cy.get(Constants.modelOptionInSubMenu_lnk).contains('Site Root').click({ force: true })

        // The Create Site Root prompt should come up
        cy.log('**The Create Site Root prompt should come up.**');
        cy.get('p-header').should('have.text', 'Create Site Root ');

        // Enter New site root name in textbox
        cy.log('**Enter New site root name in textbox**');
        cy.get('#siteRootInput').should('be.visible').trigger('click');
        cy.log('**Text should be in the text box.**');
        cy.get('#siteRootInput').type(SiteRootName);
        // Click on Install Component Project using Component Library 2.1 checkbox
        cy.log('**Click on Install Component Project using Component Library 2.1 checkbox**');
        cy.get('div.checkbox').should('be.visible');
        cy.get('div.checkbox').children('label').should('have.text', 'Install Component Project using Component Library 2.1');
        cy.get('div.checkbox').click();
        // A check mark should appear in the box and two more options should appear
        cy.log('**A check mark should appear in the box and two more options should appear**');
        cy.get('.checkbox.ng-star-inserted').should('have.length', 2);
        cy.get('.checkbox.ng-star-inserted > label').first().should('have.text', 'Install Samples');
        cy.get('.checkbox.ng-star-inserted > label').first().children('input').should('be.checked');
        cy.get('.checkbox.ng-star-inserted > label').last().should('have.text', 'Rebuild Site After Creation ');
        cy.get('.checkbox.ng-star-inserted > label').last().children('input').should('be.checked');

        // Click on save button
        cy.log('**Click on save button**');

        cy.get('.ui-dialog-footer').should('be.visible').children('p-footer').children('button').last().click({
            force: true
        });

        // A notification should come up stating that the Site Root is created.
        cy.log('**A notification should come up stating that the Site Root is created.**');
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Created site root ' + SiteRootName + '.');

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

        // cy.wait(Constants.wait);     
        // Search for the created SiteRoot
        UtilityHelper.searchSiteRoot(SiteRootName,Constants.wait);
        // Double click to open searched folder
        cy.get('.assetLabelLink.ng-binding').contains(SiteRootName).should('be.visible')
        cy.wait(Constants.wait);
        cy.get('.assetLabelLink.ng-binding').contains(SiteRootName).trigger('dblclick')
        cy.wait(Constants.wait);
        // Verify the display of various files
        cy.get('.crumbsLink.ng-binding').contains(SiteRootName).should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('_Assets').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('_Site Config').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Component Project').should('be.visible');

        cy.get('.assetLabelLink.ng-binding').contains('Demo Page').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Page').should('be.visible');

        //CReate Wisywig Asset
        cy.wait(Constants.shortWait);
        cy.get('button#topbarFileMenuToggle').click();
        cy.get('button#topbarNewMenuToggle').trigger('mouseover');
        cy.wait(Constants.wait);
        cy.get(Constants.modelOptionInSubMenu_lnk).contains('File').trigger('mousemove').trigger('click');
        // Create Template File modal
        cy.get('div[role=dialog]', { timeout: Constants.wait }).should('be.visible');
        cy.get('p-header').should('contain', 'Create New');
        cy.get('#label').click();

        //input the new File name in input box and verify the file path
        cy.get('#label').type(WisywigFileName);
        cy.get('.new-file-name-input > span').should('have.text', 'Path: /' + SiteRootName + '');

        //click on Browse button and select the Drag and Drop Template
        cy.get('button.btn.btn-primary:contains(\'Browse\')').trigger('click');
        cy.wait(Constants.wait)
        cy.get('asset-browser.ng-star-inserted > .head > .assetRow > .assetLabel > .assetLabelLink').click();
        cy.get('a.assetLabelLink.ng-binding').contains('wysiwyg image test template').click({ force: true });
        cy.get('button').contains('OK').click();
        cy.get('span.new-file-template-path').should('have.text', 'Path: /' + SiteRootName + '/Component Project/Templates/wysiwyg image test template');

        //select the workflow and click on Create button
        cy.get('select').select('Basic Workflow');
        cy.wait(Constants.wait);
        cy.get('button.btn.btn-primary').contains('Create').click();
        cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Created asset ' + WisywigFileName + '.');
        cy.wait(Constants.wait);

        //Open the created asset
        cy.get('a.assetLabelLink.ng-binding').contains(WisywigFileName).trigger('click')
        cy.wait(Constants.wait)
        cy.get('body').type('{alt}{shift}B', { force: true })
        cy.wait(Constants.wait)
        cy.get('a.assetLabelLink.ng-binding').contains(WisywigFileName).trigger('dblclick')
        cy.wait(Constants.wait)
        // Change image and WYSIWIG text
        cy.log('**Action: Change the image.**');
        cy.wait(Constants.wait);

        // Select Image
        UtilityHelper.selectImageInImageComponent(SiteRootName, 'Beach-Small.jpg', Constants.wait);
        
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
        cy.get('a.assetLabelLink.ng-binding').contains(WisywigFileName).trigger('contextmenu')
        cy.wait(Constants.wait)


        // Stage and Live the created Branched Asset
        cy.log('**Action: Right click the Branched Asset that is in Draft.** ');
        cy.get('.name.ng-scope').contains('Workflow').click({ force: true });
        cy.get('.statusName.workflowMenuItem').contains('Pending').click({ force: true });
        cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Send for Approval" completed.')

        cy.wait(Constants.wait);
        cy.get('a.assetLabelLink.ng-binding').contains(WisywigFileName).trigger('contextmenu')
        cy.wait(Constants.wait);
        cy.get('.name.ng-scope').contains('Workflow').click({ force: true });
        cy.get('.statusName.workflowMenuItem').contains('Stage').click({ force: true });
        cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Approve" completed.')
        // Right click the same asset and select Workflow-> Live.
        cy.log('**Action: Right click the same asset and select Workflow-> Live.**');
        cy.wait(Constants.wait);
        cy.get('a.assetLabelLink.ng-binding').contains(WisywigFileName).trigger('contextmenu')
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
        UtilityHelper.selectImageInImageComponent(SiteRootName, 'Beach-Small.jpg', Constants.wait);
        
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
        cy.wait(Constants.wait);
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
        cy.get('a.assetLabelLink.ng-binding').contains(WisywigFileName).first().trigger('click');
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

        // Cloning
        // Create a CLoned Asset.

        cy.log('**Action: Right click on the Wysiwyg and select Clone. **');


        cy.get('a.assetLabelLink.ng-binding').contains(WisywigFileName).first().trigger('click', { force: true });
        cy.wait(Constants.wait);
        cy.get('body').type('{ctrl}{shift}L', { force: true });
        cy.wait(Constants.wait);
        // Enter Clone Asset Build XXXXX in the text box and select Ok.
        cy.log('**Action: Enter Clone Asset Build XXXXX in the text box and select Ok. **')

        cy.get('p-header').should('have.text', 'Clone ');
        cy.get('#cloneInput').click();
        cy.get('#cloneInput').clear();
        cy.get('#cloneInput').type('Cloned Asset Build Test ' + randomNumber);
        cy.get('button.btn.btn-primary').contains('OK').click();
        cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Cloned asset "' + WisywigFileName + '".')

        cy.wait(Constants.shortWait)
        // Edit the cloned Asset and Change the image 
        cy.log('**Action: Right click on the newly cloned asset an select Edit->Form.**');
        cy.get('a.assetLabelLink.ng-binding').contains('Cloned Asset Build Test').last().trigger('click');
        cy.get('body').type('{alt}{shift}E', { force: true });

        // Update image.
        cy.log('**Action: Update image.**');
        UtilityHelper.selectImageInImageComponent(SiteRootName, imageName, Constants.wait);
        // Change the text in WYSIWYG to display the  build.
        cy.log('**Change the text to display the  build.**');
        UtilityHelper.insertTextInWYSIWYGIframe('This is New WYSIWIG text' + randomNumber);        // Select Save.
        


        // Add image inside the WYSIWYG component
        cy.get('.mce-ico.mce-i-image').click();

        cy.get('.mce-title').should('have.text', 'Insert/edit image');
        cy.get('.mce-ico.mce-i-browse').click();
        cy.wait(Constants.wait);
        cy.get('asset-browser.ng-star-inserted > .tree > .assetList > [style=""] > .assetRow > .assetLabel > .assetLabelLink').trigger('dblclick');
        //cy.get('asset-browser.ng-star-inserted > .tree > .assetList > [style=""] > .assetRow > .assetLabel > .assetLabelLink').trigger('dblclick');
        cy.wait(Constants.wait);
        cy.get('asset-browser.ng-star-inserted > .tree > .assetList > :nth-child(2) > .assetRow > .assetLabel > .assetLabelLink').trigger('dblclick');
        // cy.get('asset-browser.ng-star-inserted > .tree > .assetList > :nth-child(2) > .assetRow > .assetLabel > .assetLabelLink').trigger('dblclick');
        cy.wait(Constants.wait);
        cy.get('asset-browser.ng-star-inserted > .tree > .assetList > :nth-child(5) > .assetRow > .assetLabel > .assetLabelLink').trigger('dblclick');

        cy.wait(Constants.wait);
        cy.get('button > span').contains('Ok').click();
        cy.wait(Constants.wait);
        // Select Save.
        cy.log('**Action: Select Save.**');
        cy.get('#contentModuleSave').click();
        cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Saving asset completed successfully')

        // GO to preview
        cy.log('**Action: Select Preview**');
        cy.get('#contentModulePreview').click();
        // Set the Aset in draft to Stage and then to Live
        cy.log('**Action: Right click the Cloned Asset that is in Draft and click Pending. **');
        cy.wait(Constants.wait);
        cy.get('a.assetLabelLink.ng-binding').contains('Cloned Asset Build Test').last().trigger('contextmenu',{ force: true });
        cy.get('.name.ng-scope').contains('Workflow').click({ force: true });
        cy.get('.statusName.workflowMenuItem').contains('Pending').click({ force: true });
        cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Send for Approval" completed.')

        // Right click the Branched Asset that is in Draft.
        cy.log('**Action: Right click the Branched Asset that is in Draft. **');
        cy.wait(Constants.wait);
        cy.get('a.assetLabelLink.ng-binding').contains('Cloned Asset Build Test').last().trigger('contextmenu',{ force: true });
        cy.get('.name.ng-scope').contains('Workflow').click({ force: true });
        cy.get('.statusName.workflowMenuItem').contains('Stage').click({ force: true });
        cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Approve" completed.')
        // Right click the same asset and select Workflow-> Live.
        cy.log('**Action: Right click the same asset and select Workflow-> Live.**');
        cy.wait(Constants.wait);
        cy.get('a.assetLabelLink.ng-binding').contains('Cloned Asset Build Test').last().trigger('contextmenu',{ force: true });
        cy.get('.name.ng-scope').contains('Workflow').click({ force: true });
        cy.wait(Constants.wait);
        cy.get('.statusName.workflowMenuItem').contains('Live').click({ force: true });
        // Select Workflow-> Live.
        cy.log('**Action: Select Workflow-> Live.**');
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Deploy to Live" completed.');
        // Close the Asset
        cy.log('**Action: CLose the Asset.**');
        cy.get('button.tabCloseButton').click();
        cy.wait(Constants.wait);
        //Delete the Asset
        cy.log('**Action: Right click on the retired Branched Asset and select Delete.**');
        cy.get('body').type('{Del}', { force: true });
        cy.wait(Constants.wait);
        // Select Delete
        cy.log('**Action: Select Delete.**');
        cy.get('body > modal-base > modal-dialog > p-dialog > div > div.ui-dialog-content.ui-widget-content > div > p').should('have.text', 'Are you sure you want to delete "Cloned Asset Build Test ' + randomNumber + '"?');
        cy.get('button.btn.btn-danger.ng-star-inserted').contains('Delete').click();
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Successfully deleted "Cloned Asset Build Test ' + randomNumber + '".');

    });
});
