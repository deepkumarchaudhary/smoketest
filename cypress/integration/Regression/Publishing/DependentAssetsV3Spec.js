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


    it('Dependent Assets', () => {
        cy.log('Replace the image');
        cy.get(Constants.SearchForAnyFolderFile).contains('bird.jpg').should('be.visible')
        cy.get(Constants.SearchForAnyFolderFile).contains('bird.jpg').should('be.visible').trigger('dblclick');
        cy.get('.btn-default').click();
        cy.wait(Constants.shortWait);
        cy.get(Constants.SearchForAnyFolderFile).contains('bird.jpg').click().trigger('contextmenu');
        cy.get('.cpMenuItem').contains('Replace').click({ force: true });
        UtilityHelper.UploadFileFromFixture('penguin.jpg', 'image/jpg');
        cy.wait(Constants.shortWait);
        cy.get(Constants.SearchForAnyFolderFile).contains('bird.jpg').should('be.visible').trigger('dblclick');
        cy.get('.btn-default').click();
        // cy.get(Constants.siteRootAssetsName_lnk).contains(FileName).should('be.visible')
        // cy.get(Constants.siteRootAssetsName_lnk).contains(FileName).should('be.visible').trigger('dblclick');
        

    });

    function PrepareAssetToPublish() {
        cy.wait(Constants.shortWait);
        cy.get(Constants.LeftMenuModuleContent_lnk).should('be.visible').click({ force: true });
        cy.wait(Constants.wait);
        // Get Inside the Automation box
        //Temporarily click on View and Wait
       
        cy.wait(Constants.shortWait)
        UtilityHelper.peepInAutomationBox('File', 'New', 'Folder');


        // Create a new site root inside the Automation box
        MenuPageObject.clickMenuItem(menuItem);
        //.wait(Constants.shortWait)
        
        MenuPageObject.clickSubMenuItem(menuItem,subMenuItem)
        cy.wait(Constants.shortWait)
        UtilityHelper.createSiteRoot(SiteRootName);

        // Search for the created site root and open it
        UtilityHelper.searchSiteRoot(SiteRootName, Constants.wait);
        cy.wait(Constants.shortWait);
       
        cy.get('.crumbsLink.ng-binding').contains(SiteRootName).should('be.visible');

        // Upload Images
        UtilityHelper.clickAndOpenFileOptions('File', 'New', 'Upload')
        UtilityHelper.UploadFileFromFixture('penguin.jpg', 'image/jpg');
        UtilityHelper.clickAndOpenFileOptions('File', 'New', 'Upload')
        UtilityHelper.UploadFileFromFixture('bird.jpg', 'image/jpg');

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
        cy.wait(Constants.wait);
        cy.wait(Constants.wait);

        // Validate Success Message
        cy.log("**Validate Success Message **")
       // // cy.get(Constants.toastNotificationMessage).should('have.text', 'Created asset ' + FileName + '.')
        //Open the created asset and configure the Stage Site and Live Site 
        UtilityHelper.configureAssetSiteProperties(FileName);
        cy.get('#panelContainerDrag-file-panel-widget').click();
        ModifyAssetAndSave(FileName);
        cy.wait(Constants.shortWait);

        // Send asset to Live
        cy.wait(Constants.wait)
        cy.get(Constants.SearchForAnyFolderFile).contains(FileName).trigger('contextmenu')
        cy.wait(Constants.wait)


        // Stage and Live the created Branched Asset
        cy.log('**Action: Right click the Branched Asset that is in Draft.** ');
        cy.get('.name.ng-scope').contains('Workflow').click({ force: true });
        cy.get('.statusName.workflowMenuItem').contains('Pending').click({ force: true });
        //cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Send for Approval" completed.')

        cy.wait(Constants.wait);
        cy.get(Constants.SearchForAnyFolderFile).contains(FileName).trigger('contextmenu')
        cy.wait(Constants.wait);
        cy.get('.name.ng-scope').contains('Workflow').click({ force: true });
        cy.get('.statusName.workflowMenuItem').contains('Stage').click({ force: true });
        cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Approve" completed.')
        // Right click the same asset and select Workflow-> Live.
        cy.log('**Action: Right click the same asset and select Workflow-> Live.**');
        cy.wait(Constants.wait);
        cy.get(Constants.SearchForAnyFolderFile).contains(FileName).trigger('contextmenu')
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

        // Send Image to Live
        cy.wait(Constants.wait)
        cy.get(Constants.SearchForAnyFolderFile).contains('bird.jpg').trigger('contextmenu')
        cy.wait(Constants.wait)


        // Stage and Live the created Branched Asset
        cy.log('**Action: Right click the Branched Asset that is in stage and live.** ')

        cy.wait(Constants.wait);
        cy.get(Constants.SearchForAnyFolderFile).contains('bird.jpg').trigger('contextmenu')
        cy.wait(Constants.wait);
        cy.get('.name.ng-scope').contains('Workflow').click({ force: true });
        cy.get('.statusName.workflowMenuItem').contains('Stage').click({ force: true });
        //cy.wait(Constants.wait);
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Deploy to Stage" completed.')
        // Right click the same asset and select Workflow-> Live.
        cy.log('**Action: Right click the same asset and select Workflow-> Live.**');
        cy.wait(Constants.wait);
        cy.get(Constants.SearchForAnyFolderFile).contains('bird.jpg').trigger('contextmenu')
        cy.wait(Constants.wait);
        cy.get('.name.ng-scope').contains('Workflow').click({ force: true });
        cy.wait(Constants.wait);
        cy.get('.statusName.workflowMenuItem').contains('Live').click({ force: true });
        // cy.wait(Constants.wait);
        // Select Workflow-> Live.
        cy.log('**Action: Select Workflow-> Live.**');
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Deploy to Live" completed.');
        cy.wait(Constants.wait);


        //  cy.get('button.tabCloseButton').click();


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
        // cy.get('asset-browser.ng-star-inserted:nth-child(1) a.assetLabelLink.ng-binding').contains('ajapan.jpg').trigger('dblclick', {
        //     force: true
        // });
        // Upload dependant image here
        cy.get('asset-browser.ng-star-inserted > .cpWidgetHeader > :nth-child(1) > .btn-group-sm > .filterButton > cp-svg > svg').click({ force: true })
        cy.get(Constants.AllDirectories_rdbtn).click({ force: true })
        cy.get(Constants.SearchCheckPlaceHolder).click();
        cy.get(Constants.SearchCheckPlaceHolder).clear();
        cy.get(Constants.SearchCheckPlaceHolder).type(SiteRootName)
        //cy.get(Constants.SearchApplyButton).click();
        cy.get(Constants.ModelApply_btn).click({ force: true })
        cy.wait(2000);
        cy.get(Constants.SearchForAnyFolderFile).contains(SiteRootName).should('be.visible')
        cy.wait(2000);
        cy.get(Constants.SearchForAnyFolderFile).contains(SiteRootName).trigger('dblclick')
        cy.wait(15000);

        cy.get('asset-browser.ng-star-inserted > .cpWidgetHeader > :nth-child(1) > .btn-group-sm > .filterButton > cp-svg > svg').click({ force: true })

        cy.get(Constants.SearchCheckPlaceHolder).click();
        cy.get(Constants.SearchCheckPlaceHolder).clear();
        cy.get(Constants.SearchCheckPlaceHolder).type('bird.jpg')
        //cy.get(Constants.SearchApplyButton).click();
        cy.get(Constants.ModelApply_btn).click({ force: true })
        cy.wait(2000);
        cy.wait(2000);
        cy.get('asset-browser.ng-star-inserted > .tree > .assetList > .asset > .assetRow > .assetLabel > .assetLabelLink').click({ force: true });
        //cy.get('asset-browser.ng-star-inserted > .tree > .assetList > :nth-child(2) > .assetRow > .assetLabel > .assetLabelLink').click({ force: true });
        cy.wait(Constants.wait);

        cy.get('.btn-primary').click();


        cy.get('#contentModuleSave').click();

        //Save Input.aspx and validate the toast message    
        cy.log("**Validate Asset save Toast Message **");
        //cy.get('#contentModuleSave').click();
        cy.wait(Constants.wait)

        cy.get(Constants.toastNotificationMessage).should('have.text', 'Saving asset completed successfully');

    }
});