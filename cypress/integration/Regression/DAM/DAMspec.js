/// <reference types="Cypress" />
// This test map to Hiptest smoke test: https://app.hiptest.com/projects/41676/test-plan/folders/587522/scenarios/2008454
import { UtilityClass } from '../../../support/Helper/utility';
import Constants from '../../../support/Locators/locators';
import MenuItems from '../../../support/Helper/menuPageObject';

const UtilityHelper = new UtilityClass();
const MenuPageObject = new MenuItems();

const testCategory = "DAM";
var testCaseName = '';
const menuItem = 'View';
// const menuItem = 'File';
// const subMenuItem = 'New';
//const siteRootName = 'AutoSiteRoot';
// const FileName = 'Asset_Creation';
// const templateFolderName = 'AdventGeneral CSharp';
// const templatePageName = 'Content Page';
const randomNumber = UtilityHelper.randomNumber();
const siteRootName = 'Auto_SiteRoot_ ' + randomNumber;
const WisywigFileName = 'Test1';


describe("DAM should ", () => {
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


    //To check digital asset management is Openable
    it('DAM: To check digital asset management functionality ', () => {
        cy.wait(Constants.wait);

        //After Logging in to V3, go to Content
        cy.log('Opening Content tab');
        //cy.get('.module.content').should('be.visible').click({ force: true });
        cy.get(Constants.ContentBlock).should('be.visible').click({ force: true });
        cy.wait(5000);

        //Open View Menu and select Editor sub-option from Arrange Workspace option
        cy.log('**Go to View > Arrange Workspace > Editor**')
        MenuPageObject.clickMenuItem(menuItem);
        cy.wait(2000)
        cy.get(Constants.ModelOptionInSubMenu_lnk).contains('Arrange Workspace').trigger('mouseover');
        cy.get(Constants.ModelOptionInSubMenu_lnk).contains('Editor').trigger('click');
        cy.log('**File View and DAM panel should appear.**')
        cy.wait(Constants.wait)
        cy.get(Constants.dockablePanelFile_tab).should('be.visible')
        cy.get(Constants.dockablePanelDigitalAssetManagement_tab).should('be.visible')


        UtilityHelper.peepInAutomationBox('File', 'New', 'Folder');


        // Create a new site root inside the Automation box
        MenuPageObject.clickMenuItem('File');
        //.wait(Constants.shortWait)
      //  cy.get('span.name').contains('New').trigger('mouseover').should('be.visible')
      MenuPageObject.clickSubMenuItem('File','New');
        cy.wait(Constants.shortWait)
        UtilityHelper.createSiteRoot(siteRootName);

        // Search for the created site root and open it
        UtilityHelper.searchSiteRoot(siteRootName, Constants.wait);
        cy.wait(Constants.shortWait);
        cy.get(Constants.siteRootAssetsName_lnk).contains(siteRootName).should('be.visible')
        cy.wait(Constants.shortWait);
        cy.get(Constants.siteRootAssetsName_lnk).contains(siteRootName).trigger('dblclick')
     //   cy.wait(Constants.shortWait);
      //  cy.get('.crumbsLink.ng-binding').contains(siteRootName).should('be.visible');
      //cy.get('.crumbsLink').contains(siteRootName).should('be.visible');



        //CReate Wisywig Asset
        cy.wait(Constants.wait);
        MenuPageObject.clickMenuItem('File');
       //.wait(Constants.shortWait)
       MenuPageObject.clickSubMenuItem('File','New');

        // cy.get('button#topbarFileMenuToggle').click();
        // cy.get('button#topbarNewMenuToggle').trigger('mouseover');
        cy.wait(Constants.wait);
        //cy.get('body.ng-scope:nth-child(2) div.topbar.ng-scope topbar.ng-isolate-scope span.leftButtons.ng-scope span.dropdown.open:nth-child(1) ul.cpDropdown.dropdown-menu.fileMenuWidth li:nth-child(1) div.nested-dropdown.ng-scope.dropdown:nth-child(1) ul.cpDropdown.dropdown-menu.padding.fileMenuWidth span.ng-scope:nth-child(3) > button.newMenuButton.ng-scope').trigger('mousemove').trigger('click');
        cy.get(Constants.modelOptionInSubMenu_lnk).contains('File').trigger('mousemove').trigger('click');
        // Create Template File modal
        cy.get('div[role=dialog]', { timeout: Constants.wait }).should('be.visible');
        cy.get('p-header').should('contain', 'Create New');
        cy.get('#label').click();

        //input the new File name in input box and verify the file path
        cy.get('#label').type(WisywigFileName);
        //cy.get('.new-file-name-input > span').should('have.text', 'Path: /' + siteRootName + '');

        //click on Browse button and select the Wysiwyg Template
        cy.get('button.btn.btn-primary:contains(\'Browse\')').trigger('click');
        cy.wait(Constants.wait)
        //cy.get('asset-browser.ng-star-inserted > .head > .assetRow > .assetLabel > .assetLabelLink').click();
        //cy.get('.form-control.searchInput.ng-pristine.ng-valid.ng-empty').type('wysiwyg image test template{enter}')
        //cy.get('asset-browser.ng-star-inserted > .cpWidgetHeader > :nth-child(1) > .cpInput').type('wysiwyg image test template{enter}')
        //cy.get('a.assetLabelLink.ng-binding').contains('wysiwyg image test template').click({ force: true });

        //cy.get('div > asset-browser > header > div > div.cpInput.input-group.input-group-sm').type('wysiwyg image test template{enter}');

        cy.get('asset-browser.ng-star-inserted > .head > .assetRow > .assetLabel > .assetLabelLink').click();
    //    cy.get('a.assetLabelLink.ng-binding').contains('wysiwyg image test template').click({ force: true });
        cy.get('a.assetLabelLink').contains('wysiwyg image test template').click({ force: true });

        cy.get('button').contains('OK').click();
        cy.get('span.new-file-template-path').should('have.text', 'Path: /' + Constants.automationBoxName + '/' + siteRootName + '/Component Project/Templates/wysiwyg image test template');

        //select the workflow and click on Create button
        cy.get('select').select('Basic Workflow');
        cy.wait(Constants.wait);
        cy.get('button.btn.btn-primary').contains('Create').click();
        cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Created asset ' + WisywigFileName + '.');
        cy.wait(Constants.wait);



        //Open the created asset
        cy.get('a.assetLabelLink').contains(WisywigFileName).trigger('click')
        cy.wait(Constants.wait)
        cy.get('body').type('{alt}{shift}B', { force: true })
        cy.wait(Constants.wait)
        //cy.get('a.assetLabelLink.ng-binding').contains(WisywigFileName).trigger('dblclick')
        cy.get('a.assetLabelLink').contains(WisywigFileName).trigger('dblclick')
        cy.wait(Constants.wait)
        // Change image and WYSIWIG text
        cy.log('**Action: Change the image.**');
        cy.wait(Constants.wait);




        cy.log('**Click on the Display icon (4 Squares next to each other)**')
        cy.get(Constants.display_4squares_icon).trigger('click')
        cy.log('**View options appear as Grid View, List View and Full View.**')
        cy.get(Constants.display_4squares_gridView).should('be.visible')
        cy.get(Constants.display_4squares_listView).should('be.visible')
        cy.get(Constants.display_4squares_fullView).should('be.visible')
        //Select each view at least once.
        cy.log('**Select Grid View**')
        cy.get(Constants.display_4squares_gridView).trigger('click')
        cy.wait(Constants.shortWait)

        cy.get(Constants.collapseDAMToRight).click()
        cy.wait(1000)
        cy.get(Constants.expandDAMBackToOriginal).click()

        cy.log('**Sorting Grid View**');
        cy.get(Constants.sortImagesInDAM_lnk).click()
        cy.log('**Sort by Alpha A-Z**')
        cy.get(Constants.sortImagesInDAM_AtoZ).click()

        cy.get(Constants.sortImagesInDAM_lnk).click()
        cy.log('**Sort by Alpha Z-A**')
        cy.get(Constants.sortImagesInDAM_ZtoA).click()

        cy.get(Constants.sortImagesInDAM_lnk).click()
        cy.log('**Sort by Most Recent**')
        cy.get(Constants.sortImagesInDAM_MostRecent).click()

        /////-------------------------------------------------------------------

        cy.log('**Select List View**')
        cy.get(Constants.display_4squares_icon).trigger('click')
        cy.get(Constants.display_4squares_listView).trigger('click')


        cy.log('**Sorting List View**');
        cy.get(Constants.sortImagesInDAM_lnk).click()
        cy.log('**Sort by Alpha A-Z**')
        cy.get(Constants.sortImagesInDAM_AtoZ).click()

        cy.get(Constants.sortImagesInDAM_lnk).click()
        cy.log('**Sort by Alpha Z-A**')
        cy.get(Constants.sortImagesInDAM_ZtoA).click()

        cy.get(Constants.sortImagesInDAM_lnk).click()
        cy.log('**Sort by Most Recent**')
        cy.get(Constants.sortImagesInDAM_MostRecent).click()




        //Comments
        //  cy.get('div.side.right > div:nth-child(1) > panel-container > div > div.tabs.clearfix > div > button:nth-child(2)').click()
        //  cy.wait(1000)
        //  cy.get('div.side.right.collapsed > div:nth-child(1) > panel-container > div > div.tabs.clearfix > div > button:nth-child(1)').click()


        cy.log('**Select Full View**')
        cy.get(Constants.display_4squares_icon).trigger('click')
        cy.get(Constants.display_4squares_fullView).trigger('click')


        cy.log('**Sorting Full View**');
        cy.get(Constants.sortImagesInDAM_lnk).click()
        cy.log('**Sort by Alpha A-Z**')
        cy.get(Constants.sortImagesInDAM_AtoZ).click()

        cy.get(Constants.sortImagesInDAM_lnk).click()
        cy.log('**Sort by Alpha Z-A**')
        cy.get(Constants.sortImagesInDAM_ZtoA).click()

        cy.get(Constants.sortImagesInDAM_lnk).click()
        cy.log('**Sort by Most Recent**')
        cy.get(Constants.sortImagesInDAM_MostRecent).click()



        cy.get(Constants.collapseDAMToRight).click()
        cy.wait(1000)
        cy.get(Constants.expandDAMBackToOriginal).click()

        //Bulk Select
        cy.log('**Click on Bulk Select / Manage**')
        cy.get(Constants.manage_link).click()
        cy.log('**Dropdown is removed, "Select Collections" and "New Collections" now appear.**')

        cy.log('**"Select Collections" now appear.**')
        cy.get(Constants.bulkSelect_selectCollections).should('be.visible')
        cy.log('**"New Collections" now appear.**')
        cy.get(Constants.bulkSelect_newCollections).should('be.visible')
        cy.log('**Done and Cancel links now appear.**')
        cy.get(Constants.bulkSelect_done_link).should('be.visible')
        cy.get(Constants.bulkSelect_cancel_link).should('be.visible')

        cy.log('**Click on "New Collection"**')
        cy.get(Constants.bulkSelect_newCollections).click()
        cy.log('**Text field should appear with a check and x next to it.**')
        cy.get(Constants.bulkSelect_Collection_txt).should('be.visible')
        cy.get(Constants.bulkSelect_Collection_chk).should('be.visible')
        cy.get(Constants.bulkSelect_Collection_delete).should('be.visible')
        cy.log('**Click on the X next to Collection textbox**')
        cy.get(Constants.bulkSelect_Collection_delete).click()
        cy.log('**Text field should close**')
        cy.get(Constants.bulkSelect_Collection_txt).should('not.be.visible')
        cy.log('**Click on "New Collection"**')
        cy.get(Constants.bulkSelect_newCollections).click()
        cy.log('**Text field should appear with a check and x next to it.**')
        cy.get(Constants.bulkSelect_Collection_txt).should('be.visible')
        cy.get(Constants.bulkSelect_Collection_chk).should('be.visible')
        cy.get(Constants.bulkSelect_Collection_delete).should('be.visible')
        cy.log('**Enter any name for the Collection and select the check mark.**')
        const collectionName = 'Test Collection' + UtilityHelper.randomNumber()
        cy.get(Constants.bulkSelect_Collection_txt).type(collectionName)
        cy.get(Constants.bulkSelect_Collection_chk).trigger('click')
        cy.wait(1000)
        cy.log('**The Collection is created with the name selected.**')
        cy.get(Constants.bulkSelect_Collection_list).contains(collectionName)



        //-------------Comments
        // cy.wait(Constants.shortWait);
        // cy.get(Constants.toastNotificationMessage).should('have.text', 'Successfully created collection.');
        // cy.wait(Constants.wait);
        // cy.get(Constants.bulkSelect_Asset1).click()



        cy.get(Constants.collapseDAMToRight).click()
        cy.wait(1000)
        cy.get(Constants.expandDAMBackToOriginal).click()
        cy.log('**Click on Bulk Select / Manage**')
        cy.get(Constants.manage_link).click()
        cy.log('**Click on Done to close Bulk Select.**')
        cy.get(Constants.bulkSelect_done_link).click()
        cy.log('**Bulk Select is closed')

        cy.log('**"Select Collections" now disappear.**')
        cy.get(Constants.bulkSelect_selectCollections).should('not.be.visible')
        cy.log('**"New Collections" now disappear.**')
        cy.get(Constants.bulkSelect_newCollections).should('not.be.visible')
        cy.log('**Done and Cancel links now disappear.**')
        cy.get(Constants.bulkSelect_done_link).should('not.be.visible')
        cy.get(Constants.bulkSelect_cancel_link).should('not.be.visible')
        cy.log('**"Manage" link mow apper**')
        cy.get(Constants.manage_link).should('be.visible')
        cy.get(Constants.collectionDropdown).click();
        cy.log('**Use the Collections dropdown to select the newly created collection**');
        cy.get('.btn-group > .dropdown-menu').contains(collectionName).click()
        cy.log('**The selected assets should appear in the created collection.**')
        cy.get('.btn-group.dropdown.dropdown-toggle').click()
        cy.get('#cp-widget-dam-panel-widget ul').children('li').last().children('a').click()
        
       
        //----Can't automate due to technical challenges
        // cy.log('**Click on any asset and click on Metadata.**')
        // cy.log('**Edit Metadata should appear**')
        // cy.log('**Click on the Edit icon next to File Name**')
        // cy.log('**Text field should appear with the current name of the asset.**')
        // cy.log('**Edit the File Name and select the check mark.**')
        // cy.log('**File name should change.**')
        // cy.log('**Click on the Save button on the top of the panel.**')
        // cy.log('**Metadata should close and user is returned to the collection.**')
        // cy.log('**Click on the image with the changed file name.**')
        // cy.log('**Info on the image should appear.**')
        // cy.log('**Observe the name of the asset**')
        // cy.log('**The name of the asset should be updated to the new one.**')
        
        cy.get(Constants.collapseDAMToRight).click()
        cy.wait(1000)
        cy.get(Constants.expandDAMBackToOriginal).click()

        cy.log('**Click on Bulk Select.**')
        cy.get(Constants.manage_link).click()
        cy.log('**Select Collections is displayed.**')
        cy.get(Constants.bulkSelect_selectCollections).should('be.visible')
        cy.log('**Hover over the created Collection and select Rename -- functionality not working in UI**')
            cy.log('**Hover over the created Collection and select Delete**')
        cy.get(Constants.bulkSelect_lastCollection).trigger('mousemove')
        cy.get(Constants.bulkSelect_lastCollection).trigger('mouseover')
        cy.get(Constants.bulkSelect_lastCollection_delete).click({force: true})
        
        cy.log('**Click on Delete in Delete This Collection prompt**')        
        cy.wait(1500)
        cy.get(Constants.bulkSelect_DeletePopup_Confirm).click()
        
        cy.log('**The collection is removed from the Select Collections list.**')
        //cy.get('ul.collection-items li > span.ng-binding').contains(collectionName)
        cy.get('ul.collection-items li > span').contains(collectionName)
        
   




//-----------Comments


        // cy.get(Constants.bulkSelect_done_link).click()
        // cy.get(Constants.collectionDropdown).should('be.visible')

        // cy.get(Constants.collapseDAMToRight).click()
        // cy.wait(1000)
        // cy.get(Constants.expandDAMBackToOriginal).click()
        // cy.wait(Constants.wait)
        // cy.get(Constants.asset1InCollection).click()
        // cy.get(Constants.asset2InCollection).click()


        // cy.get(Constants.collapseDAMToRight).click()
        // cy.wait(1000)
        // cy.get(Constants.expandDAMBackToOriginal).click()

    });

});