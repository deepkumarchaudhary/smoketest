/// <reference types="Cypress" />
// This test map to Hiptest Regression test: https://app.hiptest.com/projects/41676/test-plan/folders/463730/scenarios/1589133
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
const templateFolderName = 'AdventGeneral CSharp';
const templatePageName = 'Content Page';


describe("Publishing should ", () => {

    before(() => {
        UtilityHelper.loginCrownpeak();
        PrepareAssetToPublish();
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


    it('Publish 101 Assets', () => {
        cy.log('inside test')

    });

    function PrepareAssetToPublish() {
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

        // Search for the created site root and open it
        UtilityHelper.searchSiteRoot(SiteRootName, Constants.wait);
        cy.wait(Constants.shortWait);
        
        cy.get('.crumbsLink').contains(SiteRootName).should('be.visible');

        // Create New Asset with Template as AdventGeneral CSharp -> Content Page
        cy.log("**Create New Assets**");
        MenuPageObject.clickMenuItem(menuItem);
        MenuPageObject.clickSubMenuItem(menuItem, subMenuItem);
        cy.get(Constants.SubMenuOptions).contains('File').trigger('mousemove').trigger('click');

        //Verify the Prompt Header
        cy.log("**Verify the Header of Prompt **");
        cy.get('p-header').should('contain', 'Create New')

        //input the new File name in input box and verify the file path
        cy.log("**Input the File Name or Asset Name and verify the path **");
        cy.get('#label').type(FileName);
        cy.get('.new-file-name-input > span').should('have.text', 'Path: /AutomationBox/' + SiteRootName + '')

        //click on Browse button and select the Created Template
        cy.log("**Click on Browse button To select Template**");
        cy.get('button.btn.btn-primary:contains(\'Browse\')').trigger('click');
        cy.wait(Constants.wait)

        cy.log("**Select The created Template and verify the path**");
        //cy.get('asset-browser.ng-star-inserted > .crumbs > .root').click();
        // //cy.get('asset-browser.ng-star-inserted > .cpWidgetHeader > :nth-child(1) > .btn-group-sm > .filterButton > cp-svg').click({force: true});
        // cy.get('asset-browser.ng-star-inserted > .cpWidgetHeader > :nth-child(1) > .cpInput').type('"'+templateFolderName+'"{enter}');
        // //cy.get('asset-browser.ng-star-inserted > .head > .assetRow > .assetLabel > .assetLabelLink').click();
        // cy.get(Constants.SearchForAnyFolderFile).contains(templateFolderName).click({ force: true });
        // cy.get(Constants.SearchForAnyFolderFile).contains(templatePageName).click({ force: true });



        cy.get('asset-browser.ng-star-inserted > .cpWidgetHeader > :nth-child(1) > .btn-group-sm > .filterButton > cp-svg > svg').click({ force: true })
        cy.get(Constants.AllDirectories_rdbtn).click({ force: true })
        cy.get(Constants.SearchCheckPlaceHolder).click();
        cy.get(Constants.SearchCheckPlaceHolder).clear();
        cy.get(Constants.SearchCheckPlaceHolder).type(templateFolderName)
        //cy.get(Constants.SearchApplyButton).click();
        cy.get(Constants.ModelApply_btn).click({ force: true })
        cy.wait(2000);
        cy.get(Constants.SearchForAnyFolderFile).contains(templateFolderName).should('be.visible')
        cy.wait(2000);
        cy.get(Constants.SearchForAnyFolderFile).contains(templateFolderName).trigger('dblclick')
        cy.wait(15000);

        cy.get('asset-browser.ng-star-inserted > .cpWidgetHeader > :nth-child(1) > .btn-group-sm > .filterButton > cp-svg > svg').click({ force: true })

        cy.get(Constants.SearchCheckPlaceHolder).click();
        cy.get(Constants.SearchCheckPlaceHolder).clear();
        cy.get(Constants.SearchCheckPlaceHolder).type(templatePageName)
        //cy.get(Constants.SearchApplyButton).click();
        cy.get(Constants.ModelApply_btn).click({ force: true })
        cy.wait(2000);
        cy.wait(2000);
        cy.get('asset-browser.ng-star-inserted > .tree > .assetList > :nth-child(2) > .assetRow > .assetLabel > .assetLabelLink').click({ force: true });
        cy.wait(15000);

        cy.get('button').contains('OK').click();
        cy.get('span.new-file-template-path').should('have.text', 'Path: /System/Templates/AdventGeneral CSharp/Content Page');

        //select the workflow and click on Create button
        cy.log("**Click on Create button to create new Asset **");
        cy.get('select').select('Basic Workflow');
        cy.wait(Constants.wait);
        cy.get('button.btn.btn-primary').contains('Create').click();


        // Validate Success Message
        cy.log("**Validate Success Message **")
        // cy.get(Constants.toastNotificationMessage).should('have.text', 'Created asset ' + FileName + '.')
        ModifyAssetAndSave(FileName);
        cy.wait(Constants.shortWait);
        CloneAssets(FileName, Constants.NumberOfAssetsToClone);

    }

    function ModifyAssetAndSave(AssetName) {
        cy.wait(Constants.wait)

        cy.get(Constants.SearchForAnyFolderFile).contains(AssetName).dblclick({ force: true });
        cy.wait(Constants.shortWait)
        cy.get(':nth-child(1) > .control > .expandable > .expandbar').click({ force: true });
        cy.wait(Constants.wait)

        cy.get('label[title="page_filename"]').siblings('input').click({ force: true }).type(AssetName);
        cy.get('label[title="page_title"]').siblings('input').click({ force: true }).type('Text inside page title')
        cy.get('label[title="page_content"]').scrollIntoView();
        cy.wait(Constants.wait);

        UtilityHelper.insertTextInWYSIWYGIframe('This is New WYSIWIG text' + randomNumber);
        cy.get(':nth-child(2) > .control > .expandable > .expandbar').contains('Right Column Contents').scrollIntoView().click({ force: true });
        cy.wait(Constants.wait)

        cy.get(':nth-child(2) > :nth-child(1) > .control > .expandable > .expandbar').click();
        cy.get('.acquireImageRow > .fileupload > .btn-file').click();
        
        cy.wait(Constants.wait);
        //cy.get('asset-browser.ng-star-inserted > .head > .assetRow > .assetLabel > .assetLabelLink').click();
        cy.get('asset-browser.ng-star-inserted:nth-child(1) a.assetLabelLink.ng-binding').contains('ajapan.jpg').trigger('dblclick', {
            force: true
        });
        cy.get('#contentModuleSave').click();
        
        //Save Input.aspx and validate the toast message    
        cy.log("**Validate Asset save Toast Message **");
        //cy.get('#contentModuleSave').click();
        cy.wait(Constants.wait)

        // cy.get(Constants.toastNotificationMessage).should('have.text', 'Saving asset completed successfully');

    }

    function CloneAssets(AssetToClone, NumberOfAssetsToClone)
    {
        var n = NumberOfAssetsToClone;
        while(n > 0)
        {
            // Cloning
        // Create a CLoned Asset.

        cy.log('**Action: Right click on the Wysiwyg and select Clone. **');


        cy.get(Constants.SearchForAnyFolderFile).contains(AssetToClone).first().trigger('click', { force: true });
        cy.wait(Constants.wait);
        cy.get('body').type('{ctrl}{shift}L', { force: true });
        cy.wait(Constants.wait);
        // Enter Clone Asset Build XXXXX in the text box and select Ok.
        cy.log('**Action: Enter Clone Asset Build XXXXX in the text box and select Ok. **')

        cy.get('p-header').should('have.text', 'Clone ');
        cy.get('#cloneInput').click();
        cy.get('#cloneInput').clear();
        cy.get('#cloneInput').type(AssetToClone + n);
        cy.get('button.btn.btn-primary').contains('OK').click();
        cy.wait(Constants.wait);
        // cy.get(Constants.toastNotificationMessage).should('have.text', 'Cloned asset "' + AssetToClone + '".')

        cy.wait(Constants.shortWait)
       
        n--;
        }
    }
});