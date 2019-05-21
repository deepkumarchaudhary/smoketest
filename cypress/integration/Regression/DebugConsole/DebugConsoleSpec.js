/// <reference types="Cypress" />
// This test map to Hiptest smoke test: https://app.hiptest.com/projects/41676/test-plan/folders/491775
import { UtilityClass } from '../../../support/Helper/utility';
import Constants from '../../../support/Locators/locators';
import MenuItems from '../../../support/Helper/menuPageObject';
const UtilityHelper = new UtilityClass();
const MenuPageObject = new MenuItems();
const testCategory = "Asset";
var testCaseName = '';
const menuItem = 'File';
const subMenuItem = 'New';
const randomNumber = UtilityHelper.randomNumber();
const siteRootName = 'AutoSiteRoot ' + UtilityHelper.randomNumber();
const templateFolderName = 'AutoTemplateFolder ' + UtilityHelper.randomNumber();
const WisywigFileName = 'Test1'


describe("Debug Console should ", () => {
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

     //Create Asset using cuatomized template 
     it('Debug Console: To verify user able to open debug console', () => {
        //Create SiteRoot
        cy.wait(Constants.wait);
        cy.log('Opening Content tab');
       cy.get(Constants.ContentBlock).should('be.visible').click({ force: true });
        cy.wait(5000);
        //Open File Menu and check New->Sub menu items are displaying
       // cy.get('div[title=\'Content\']').click();
        MenuPageObject.clickMenuItem(menuItem);

        cy.get('span.name').contains('New').trigger('mouseover').should('be.visible')

        //cy.wait(2000)
        cy.wait(Constants.wait)
        //cy.get('span.name.ng-binding').contains('Site Root').trigger('mousemove')
        cy.get(Constants.ModelOptionInSubMenu_lnk).contains('Site Root').trigger('mousemove');
        //cy.get('span.name.ng-binding').contains('Site Root').click({ force: true })
        cy.get(Constants.ModelOptionInSubMenu_lnk).contains('Site Root').click({ force: true })

        cy.log('**The Create Site Root prompt should come up.**');
        //cy.get('p-header').should('have.text', 'Create Site Root ');
        cy.get(Constants.PopUpHeader).should('have.text', 'Create Site Root ');
        cy.log('**Enter New site root name in textbox**');
        //cy.get('#siteRootInput').should('be.visible').trigger('click');
        cy.get(Constants.SiteRootInputBox).should('be.visible').trigger('click');
        cy.log('**Text should be in the text box.**');
        //cy.get('#siteRootInput').type(siteRootName);
        cy.get(Constants.SiteRootInputBox).type(siteRootName);
        cy.log('**Click on Install Component Project using Component Library 2.1 checkbox**');
        //cy.get('div.checkbox').should('be.visible');
        cy.get(Constants.SiteRootPopUpCheckbox).should('be.visible');
        //cy.get('div.checkbox').children('label').should('have.text', 'Install Component Project using Component Library 2.1');
        cy.get(Constants.SiteRootPopUpCheckbox).children('label').should('have.text', 'Install Component Project using Component Library 2.1');
        //cy.get('div.checkbox').click();
        cy.get(Constants.SiteRootPopUpCheckbox).click();
        cy.log('**A check mark should appear in the box and two more options should appear**');
        //cy.get('.checkbox.ng-star-inserted').should('have.length', 2);
        cy.get(Constants.SiteRootCheckBoxLength).should('have.length', 2);
        //cy.get('.checkbox.ng-star-inserted > label').first().should('have.text', 'Install Samples');
        cy.get(Constants.SiteRootCheckBoxChild).first().should('have.text', 'Install Samples');
        //cy.get('.checkbox.ng-star-inserted > label').first().children('input').should('be.checked');
        cy.get(Constants.SiteRootCheckBoxChild).first().children('input').should('be.checked');
        //cy.get('.checkbox.ng-star-inserted > label').last().should('have.text', 'Rebuild Site After Creation ');
        cy.get(Constants.SiteRootCheckBoxChild).last().should('have.text', 'Rebuild Site After Creation ');
        //cy.get('.checkbox.ng-star-inserted > label').last().children('input').should('be.checked');
        cy.get(Constants.SiteRootCheckBoxChild).last().children('input').should('be.checked');
        cy.log('**Click on save button**');
        // cy.get('.ui-dialog-footer').should('be.visible').children('p-footer').children('button').last().click({
        //     force: true
        // });
        cy.get(Constants.DialogCreate_btn).should('be.visible').children(Constants.DialogCreateChildren).children('button').last().click({
            force: true
        });
        cy.wait(5000);

        cy.log('**A notification should come up stating that the Site Root is created.**');
        //cy.get(Constants.elementNotificationMessage).should('have.text', 'Created site root ' + siteRootName + '.');
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Created site root ' + siteRootName + '.');
        //Search for created SiteRoot and open it
        //cy.get('[ng-click="vm.toggleSearchDropdown(true)"] > cp-svg').click();
        cy.get(Constants.filterOptionFromRoot_icn).click();
        //cy.get('[placeholder="Label"]').click();
        cy.get(Constants.filterCheckPlaceHolder_txtBx).click();
        //cy.get('[placeholder="Label"]').clear();
        cy.get(Constants.filterCheckPlaceHolder_txtBx).clear();
      //  cy.get('[placeholder="Label"]').type(siteRootName);
        cy.get(Constants.filterCheckPlaceHolder_txtBx).type(siteRootName);
        //cy.get('.btn-primary').click();
        cy.get(Constants.filterApply_btn).click();
        cy.wait(2000);
        //cy.get('div.assetRow.ng-scope').contains(siteRootName).should('be.visible');
        cy.get(Constants.assetName).contains(siteRootName).should('be.visible');
        cy.wait(3000);
        //cy.get('div.assetRow.ng-scope').contains(siteRootName).trigger('dblclick');
        cy.get(Constants.assetName).contains(siteRootName).trigger('dblclick');
        cy.wait(2000);
        cy.log('The folder should open and display _Assets, _Site Confi, Component Project folders and a Demo Page and Page assets.');
        cy.wait(Constants.wait);
       
        // cy.get('.assetLabelLink.ng-binding').contains('_Assets').should('be.visible');
        // cy.get('.assetLabelLink.ng-binding').contains('_Site Config').should('be.visible');
        // cy.get('.assetLabelLink.ng-binding').contains('Component Project').should('be.visible');
        // cy.get('.assetLabelLink.ng-binding').contains('Demo Page').should('be.visible');
        // cy.get('.assetLabelLink.ng-binding').contains('Page').should('be.visible');
       

        cy.get(Constants.SearchForAnyFolderFile).contains(Constants.AssetWithinSiteRoot).should('be.visible');
        cy.get(Constants.SearchForAnyFolderFile).contains(Constants.SiteConfigWithinSiteRoot).should('be.visible');
        cy.get(Constants.SearchForAnyFolderFile).contains(Constants.ComponentProjectWithinSiteRoot).should('be.visible');
        cy.get(Constants.SearchForAnyFolderFile).contains(Constants.DemoPageWithinSiteRoot).should('be.visible');
        cy.get(Constants.SearchForAnyFolderFile).contains(Constants.PageWithinSiteRoot).should('be.visible');

       
       
       
        // cy.log('The folder should open and display _Assets, _Site Confi, Component Project folders and a Demo Page and Page assets.');
        // cy.get('.assetLabelLink.ng-binding').contains('_Assets').should('be.visible');
        // cy.get('.assetLabelLink.ng-binding').contains('_Site Config').should('be.visible');
        // cy.get('.assetLabelLink.ng-binding').contains('Component Project').should('be.visible');
        // cy.get('.assetLabelLink.ng-binding').contains('Demo Page').should('be.visible');
        // cy.get('.assetLabelLink.ng-binding').contains('Page').should('be.visible');
        
        // cy.log('**Goto File >>New >> click on File**')
        // MenuPageObject.clickMenuItem(menuItem);
        // MenuPageObject.clickSubMenuItem(menuItem, subMenuItem);
        // cy.get('.name.ng-binding').contains('File').trigger('mousemove').trigger('click');
        // cy.log('**The Create Template prompt should come up.**');
        // cy.get('p-header').should('have.text', 'Create New ');
        // cy.log('**Enter a new file name in text box**');
        // cy.log('**Select template**');
        // cy.log('**Click on create**');


        //Create Wysiwyg Asset
        cy.wait(Constants.shortWait);
        //cy.get('button#topbarFileMenuToggle').click();
        cy.get(Constants.File_menu).click();
        //cy.get('button#topbarNewMenuToggle').trigger('mouseover');
        cy.get(Constants.File_New_menu).trigger('mouseover');
        cy.wait(Constants.wait);
        //cy.get('body.ng-scope:nth-child(2) div.topbar.ng-scope topbar.ng-isolate-scope span.leftButtons.ng-scope span.dropdown.open:nth-child(1) ul.cpDropdown.dropdown-menu.fileMenuWidth li:nth-child(1) div.nested-dropdown.ng-scope.dropdown:nth-child(1) ul.cpDropdown.dropdown-menu.padding.fileMenuWidth span.ng-scope:nth-child(3) > button.newMenuButton.ng-scope').trigger('mousemove').trigger('click');
        cy.get(Constants.ModelOptionInSubMenu_lnk).contains('File').trigger('mousemove').trigger('click');
        //cy.get(Constants.File_New_CreateFile_menu).trigger('mousemove').trigger('click');
        // Create Template File modal
        //cy.get('div[role=dialog]', { timeout: Constants.wait }).should('be.visible');
        cy.get(Constants.PopupDialog, { timeout: Constants.wait }).should('be.visible');
        //cy.get('p-header').should('contain', 'Create New');
        cy.get(Constants.PopUpHeader).should('contain', 'Create New');
        //cy.get('#label').click();
        cy.get(Constants.AssetInputBox).click();
 
        //input the new File name in input box and verify the file path
     //   cy.get('#label').type(WisywigFileName);
        cy.get(Constants.AssetInputBox).type(WisywigFileName);
        //cy.get('.new-file-name-input > span').should('have.text', 'Path: /' + Constants.automationBoxName +'/'+ siteRootName + '');
        //cy.get('.new-file-name-input > span').should('have.text', 'Path: /' + siteRootName + '');
        cy.get(Constants.FileDialogBoxInputBox_txtbx).should('have.text', 'Path: /' + siteRootName + '');
 
        //click on Browse button and select the Drag and Drop Template
        cy.get('button.btn.btn-primary:contains(\'Browse\')').trigger('click');
        cy.wait(Constants.wait)
        //cy.get('asset-browser.ng-star-inserted > .head > .assetRow > .assetLabel > .assetLabelLink').click();
        cy.get(Constants.SelectAsset_label).click();
        //cy.get('a.assetLabelLink.ng-binding').contains('wysiwyg image test template').click({ force: true });
        cy.get(Constants.SearchForAnyFolderFile).contains('wysiwyg image test template').click({ force: true });
        cy.get('button').contains('OK').click();
        //cy.get('span.new-file-template-path').should('have.text', 'Path: /'  + Constants.automationBoxName +'/'+ siteRootName + '/Component Project/Templates/wysiwyg image test template');
       // cy.get('span.new-file-template-path').should('have.text', 'Path: /'  + siteRootName + '/Component Project/Templates/wysiwyg image test template');
       cy.get(Constants.TemplatePathOfAsset).should('have.text', 'Path: /'  + siteRootName + '/Component Project/Templates/wysiwyg image test template');
 
        //select the workflow and click on Create button
        cy.get('select').select('Basic Workflow');
        cy.wait(Constants.wait);
        //cy.get('button.btn.btn-primary').contains('Create').click();
        cy.get(Constants.FileDialogBoxCreate_btn).contains('Create').click();
        cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Created asset ' + WisywigFileName + '.');
        cy.wait(Constants.wait);

        
        cy.log('**Action: Double click on newly created asset**');
        //cy.get('.assetLabelLink.ng-binding').contains(WisywigFileName).trigger('contextmenu');
        cy.get(Constants.ListOfAssetsInSiteRoot).contains(WisywigFileName).trigger('contextmenu');
        cy.wait(Constants.wait);
        //cy.get('.name.ng-binding').contains('Edit').should('be.visible');
        cy.get(Constants.SubMenuOptions).contains('Edit').should('be.visible');
        
        //cy.get('body > ul > li > span:nth-child(6) > div > button > span').trigger('click');
        cy.get(Constants.EditAsset).trigger('click');
        cy.wait(Constants.wait);

        
       // cy.get('.name.ng-binding').contains('output.aspx').should('be.visible');
       cy.get(Constants.SubMenuOptions).contains('output.aspx').should('be.visible');
     //   cy.get('.name.ng-binding').contains('output.aspx').trigger('click');
       cy.get(Constants.SubMenuOptions).contains('output.aspx').trigger('click');
        cy.wait(Constants.wait);
        cy.log('**Action: Launch Debug Console**');
        //cy.get('.img-debug-button').trigger('click');
        cy.get(Constants.DebugConsole).trigger('click');

       

    });

});