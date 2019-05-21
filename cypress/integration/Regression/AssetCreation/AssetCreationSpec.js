/// <reference types="Cypress" />
// This test map to Hiptest smoke test: https://app.hiptest.com/projects/119826/test-plan/folders/839070
import {
    UtilityClass
} from '../../../support/Helper/utility';
import Constants from '../../../support/Locators/locators';
import MenuItems from '../../../support/Helper/menuPageObject';


export const apiKey = '0a6477a93cd540508910';
export const apiKeyIntr1 = 'b86608bbb7744a9a8cf7';
export const acceptHeader = 'application/json, text/plain, */*';
export const contentTypeHeader = 'application/json';
export const AcceptEncoding = 'gzip, deflate, br';
export const AcceptLanguage = 'en-US,en;q=0.9';
export const Connection = 'keep-alive';
export const originHeader = 'https://intr1.cprd.io/snoop';


const UtilityHelper = new UtilityClass();
const MenuPageObject = new MenuItems();
const testCategory = "SITEROOT";
var testCaseName = '';
const AssetCreationMenu = 'File'
const MultipleComponentTest = 'MultipleTabTest_Asset'
const menuItem = 'File';
const subMenuItem = 'New';
const siteRootName = 'Auto_Site_Root_ ' + UtilityHelper.randomNumber()
const FileName = 'File_Name' + UtilityHelper.randomNumber()
const FolderName = 'AutoFolderName_ ' + UtilityHelper.randomNumber()
const FolderName0 = 'AutoFolderName_ ' + UtilityHelper.randomNumber()
const FolderName1 = 'AutoFolderName_ ' + UtilityHelper.randomNumber()
const FolderName2 = 'AutoFolderName_ ' + UtilityHelper.randomNumber()
const FolderName3 = 'AutoFolderName_ ' + UtilityHelper.randomNumber()
const FolderName4 = 'AutoFolderName_ ' + UtilityHelper.randomNumber()
const FolderName40 = 'AutoFolderName_ ' + UtilityHelper.randomNumber()
const FolderName5 = 'AutoFolderName_ ' + UtilityHelper.randomNumber()
const FolderName6 = 'AutoFolderName_ ' + UtilityHelper.randomNumber()
const FolderName7 = 'AutoFolderName_ ' + UtilityHelper.randomNumber()
const ModelContentPageName = 'ModelContentPageName_' + UtilityHelper.randomNumber()
const templateFolderName = 'AdventGeneral CSharp'
const templatePageName = 'Content Page'

const URLMultipleComponent = '/cpt_webservice/AccessAPI/asset/updatepluginbody/'
const TabTestComponentBody = '"<%@ Page Language=\"C#\" Inherits=\"CrownPeak.Internal.Debug.InputInit\" %>\r\n<%@ Import Namespace=\"CrownPeak.CMSAPI\" %>\r\n<%@ Import Namespace=\"CrownPeak.CMSAPI.Services\" %>\r\n<!--DO NOT MODIFY CODE ABOVE THIS LINE-->\r\n<%@ Import Namespace=\"Component_Library.Component_Project.Components\" %>\r\n<% //MODIFY or ADD Import Statements to Define Namespaces Used by the Template %>\r\n<%//This plugin uses InputContext as its context class type%>\r\n<%\r\n// input.aspx: template file to specify content entry input form\r\nInput.StartExpandPanel(\"Expand Tab Test\");\r\nInput.StartTabbedPanel(\"Content\", \"Tagging\", \"People\", \"Topics\", \"Metadata\", \"TabsTest\");\r\n//tab content 1\r\nInput.ShowMessage(\"tab1 contents\");\r\nInput.NextTabbedPanel(); \r\n//tab content 2\r\nInput.ShowMessage(\"tab2 contents\");\r\nInput.NextTabbedPanel();\r\n//tab content 3\r\n\r\nInput.ShowMessage(\"tab3 contents\");\r\nInput.NextTabbedPanel();\r\n//tab content 4\r\nInput.ShowMessage(\"tab4 contents\");\r\nInput.NextTabbedPanel();\r\n//tab content 5\r\nInput.ShowMessage(\"tab5 contents\");\r\nInput.NextTabbedPanel();\r\n//tab content 6\r\nInput.ShowMessage(\"tab6 contents\");\r\nInput.EndTabbedPanel();\r\nInput.EndExpandPanel();\r\n%>\r\n", "requestCodeAnalysis": false'

describe("Site root should ", () => {

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

   it('Asset Using Model : Create Asset From a model', () => {
        cy.wait(Constants.wait)
        // click and Open content module
        UtilityHelper.clickAndOpenContentModule()
        cy.wait(Constants.shortWait)

        UtilityHelper.peepInAutomationBox(menuItem, subMenuItem, "Folder")
        cy.wait(Constants.shortWait)
        //Click and open File Menu and click on Folder Menu
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Folder")


        //Check the Dialog box and insert Random Name to create folder
        UtilityHelper.insertForlderName(FolderName)

        //Click on Create button
        cy.get(Constants.FileDialogBoxCreate_btn).contains('Create').click({ force: true })

        //Validate Success message or Toast Message
        //cy.wait(Constants.wait)
       //cy.get(Constants.toastNotificationMessage).should('have.text', 'Created Folder ' + FolderName + '');

        //Search for the created Folder
        UtilityHelper.searchAnyFileOrFolder(FolderName)
        cy.wait(Constants.shortWait)
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Folder")

        UtilityHelper.insertForlderName(FolderName0)

        UtilityHelper.selectModelToCreateFolder("Generic Model")
        cy.get(Constants.SelectCreatedModelFolder).trigger('dblclick')
        cy.wait(Constants.shortWait)
        //Open the sub Menu and validate All model Optiona are displaying in sub menu
        UtilityHelper.clickAndOpenFileOptionsOnly(menuItem, subMenuItem)
        
        //Validate Model is displaying in sub menu
        cy.get(Constants.ModelOptionWithinSubMenu1_lbl).contains(' Model ').should('be.visible')

        //Validate within Model other model otipns are displaying in sub menu
        cy.get(Constants.ModelOptionInSubMenu_lnk).contains(' Article Page Model ').should('be.visible')
        cy.get(Constants.ModelOptionInSubMenu_lnk).contains(' AssetQA ').should('be.visible')
        cy.get(Constants.ModelOptionInSubMenu_lnk).contains(' Content Page ').should('be.visible')
        cy.get(Constants.ModelOptionInSubMenu_lnk).contains(' Content Page ').click({ force: true })

        //Validate Create content Asset Model dialog box is displaying
        cy.get(Constants.PopUpHeader).contains('Create Asset ').should('be.visible')
        cy.get(Constants.CreateAssetInput_box).click()
        cy.get(Constants.CreateAssetInput_box).clear()
        cy.get(Constants.CreateAssetInput_box).type(ModelContentPageName)

        // Click on Create button to create content Asset
        cy.get(Constants.FileDialogBoxCreate_btn).click({ force: true })
        //cy.wait(2000)
        // cy.get(Constants.toastNotificationMessage).should('have.text', 'Created asset ' + ModelContentPageName + '.');
        cy.wait(Constants.wait)
        //Get the Data and time
        const CreatedDate = Cypress.moment().format('MMM D, YYYY')
        cy.log(CreatedDate)
        //Open Information section
        cy.log('**Add Information panel**');
        cy.wait(Constants.shortWait)
        MenuPageObject.clickMenuItem(menuItem);
        cy.get(Constants.dockablePanel_lbl).should('have.text', 'Dockable Panels')
        cy.get(Constants.SubMenuOptions).contains('Information').prevAll('i').then(($btn) => {
            if ($btn.hasClass('invisible')) {
                console.log('I am Inside')
                cy.get(Constants.SubMenuOptions).contains('Information').click({ force: true })
            } else {
                cy.wait(Constants.shortWait)
                MenuPageObject.clickMenuItem(menuItem);
                cy.get(Constants.dockablePanelInformation_tab).click({ force: true });
            }
        })
        // Validate Created Date
        cy.wait(Constants.wait)
        cy.get(Constants.createdOn_lbl).then(($elem) => {
        expect($elem.text()).to.include(CreatedDate);

        })


    })

    it('Asset Using Template : Create a Asset using Template', () => {

        cy.wait(Constants.wait)
        // click and Open content module
        UtilityHelper.clickAndOpenContentModule()
        cy.wait(Constants.shortWait)
        UtilityHelper.peepInAutomationBox(menuItem, subMenuItem, "Folder")

        cy.wait(Constants.shortWait)
        //Click and open File Menu and click on Folder Menu
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Folder")

        //Check the Dialog box and insert Random Name to create folder
        UtilityHelper.insertForlderName(FolderName1)

        //Click on Create button
        cy.get(Constants.FileDialogBoxCreate_btn).contains('Create').click({ force: true })

        //Validate Success message or Toast Message
        // cy.get(Constants.toastNotificationMessage).should('have.text', 'Created Folder ' + FolderName1 +'');

        //Search for the created Folder
        UtilityHelper.searchAnyFileOrFolder(FolderName1)
        cy.wait(Constants.shortWait)
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Folder")

        UtilityHelper.insertForlderName(FolderName1)

        UtilityHelper.selectModelToCreateFolder("Generic Model")
        cy.get(Constants.SelectCreatedModelFolder).trigger('dblclick')

        cy.wait(Constants.shortWait)
        //Open the sub Menu and validate All model Optiona are displaying in sub menu
        UtilityHelper.clickAndOpenFileOptionsOnly(menuItem, subMenuItem)

        cy.wait(Constants.shortWait)
        //Validate Model is displaying in sub menu
        cy.get(Constants.ModelOptionWithinSubMenu_lbl).contains(' Model ').should('be.visible')

        //Validate within Model other model otipns are displaying in sub menu
        cy.get(Constants.ModelOptionInSubMenu_lnk).contains(' Article Page Model ').should('be.visible')
        cy.get(Constants.ModelOptionInSubMenu_lnk).contains(' AssetQA ').should('be.visible')
        cy.get(Constants.ModelOptionInSubMenu_lnk).contains(' Content Page ').should('be.visible')

        // click on File To create Asset
        // MenuPageObject.clickMenuItem(menuItem);
        cy.wait(Constants.shortWait)
        MenuPageObject.clickSubMenuItem(menuItem, subMenuItem);

        cy.get(Constants.SubMenuOptions).contains('File').trigger('mousemove').trigger('click')

        //Verify the Prompt Header
        UtilityHelper.checkFileDialogPrompt()

        cy.get(Constants.AssetInputBox).type(FileName)
        //click on Browse button and select the Created Template
        cy.log("**Click on Browse button To select Template**")
        cy.get(Constants.FileDialogBoxBrowse_btn).trigger('click')
        cy.wait(Constants.wait)


        cy.get('asset-browser.ng-star-inserted > .cpWidgetHeader > :nth-child(1) > .btn-group-sm > .filterButton > cp-svg > svg').click({ force: true })
        cy.get(Constants.AllDirectories_rdbtn).click({ force: true })
        cy.get(Constants.SearchCheckPlaceHolder).click();
        cy.get(Constants.SearchCheckPlaceHolder).clear();
        cy.get(Constants.SearchCheckPlaceHolder).type(templateFolderName)
       
        cy.get(Constants.ModelApply_btn).click({ force: true })
        cy.wait(Constants.wait)
        cy.get(Constants.SearchForAnyFolderFile).contains(templateFolderName).should('be.visible')
        cy.wait(Constants.wait)
        cy.get(Constants.SearchForAnyFolderFile).contains(templateFolderName).trigger('dblclick')
        cy.wait(Constants.wait)

        cy.get(Constants.template_filter_icon).click({ force: true })

        cy.get(Constants.SearchCheckPlaceHolder).click();
        cy.get(Constants.SearchCheckPlaceHolder).clear();
        cy.get(Constants.SearchCheckPlaceHolder).type(templatePageName)
        //cy.get(Constants.SearchApplyButton).click();
        cy.get(Constants.ModelApply_btn).click({ force: true })
        cy.wait(Constants.wait)

        cy.get(Constants.searched_folder_lnk).click({ force: true })
        cy.wait(Constants.wait)

        cy.get(Constants.ok_btn).contains('OK').click();
        cy.get(Constants.TemplatePathOfAsset).should('have.text', 'Path: /System/Templates/AdventGeneral CSharp/Content Page');

        //select the workflow and click on Create button
        cy.log("**Click on Create button to create new Asset **")
        cy.get(Constants.select_dropdownvalue_lnk).select('Basic Workflow')
        cy.wait(Constants.wait)
        cy.get(Constants.FileDialogBoxCreate_btn).contains('Create').click({force:true})

        // Validate Success Message
        cy.log("**Validate Success Message **")
        cy.wait(Constants.wait)
       //cy.get(Constants.toastNotificationMessage).should('have.text', 'Created asset ' + FileName + '.')
    })

    it('FolderSetup : Setup the folder after selecting Generic model', () => {
        cy.wait(Constants.wait)
        // click and Open content module
        UtilityHelper.clickAndOpenContentModule()
        cy.wait(Constants.shortWait)
        UtilityHelper.peepInAutomationBox(menuItem, subMenuItem, "Folder")
        cy.wait(Constants.shortWait)
        //Click and open File Menu and click on Folder Menu
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Folder")


        //Check the Dialog box and insert Random Name to create folder
        UtilityHelper.insertForlderName(FolderName2)

        //Click on Create button
        cy.get(Constants.FileDialogBoxCreate_btn).contains('Create').click({ force: true })

        //Validate Success message or Toast Message
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Created Folder ' + FolderName2 +'');

        //Search for the created Folder
        UtilityHelper.searchAnyFileOrFolder(FolderName2)
        cy.wait(Constants.shortWait)
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Folder")

        UtilityHelper.insertForlderName(FolderName2)

        UtilityHelper.selectModelToCreateFolder("Generic Model")
        cy.get(Constants.SelectCreatedModelFolder).trigger('dblclick')
        cy.wait(Constants.shortWait)
        //Open the sub Menu and validate All model Optiona are displaying in sub menu
        UtilityHelper.clickAndOpenFileOptionsOnly(menuItem, subMenuItem)
        cy.get(Constants.ModelOptionInSubMenu_lnk).contains(' Model ').should('be.visible')

        cy.get(Constants.ModelOptionInSubMenu_lnk).contains(' Article Page Model ').should('be.visible')
        cy.get(Constants.ModelOptionInSubMenu_lnk).contains(' AssetQA ').should('be.visible')
        cy.get(Constants.ModelOptionInSubMenu_lnk).contains(' Content Page ').should('be.visible')       

    })

    it('Upload Doc : Upload a Doc file', () => {
        cy.wait(Constants.wait)
        // click and Open content module
        UtilityHelper.clickAndOpenContentModule()
        cy.wait(Constants.shortWait)
        UtilityHelper.peepInAutomationBox(menuItem, subMenuItem, "Folder")

        cy.wait(Constants.shortWait)
        //Click and open File Menu and click on Folder Menu
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Folder")


        //Check the Dialog box and insert Random Name to create folder
        UtilityHelper.insertForlderName(FolderName3)

        //Click on Create button
        cy.get(Constants.FileDialogBoxCreate_btn).contains('Create').click({ force: true })

        //Validate Success message or Toast Message
        //cy.get(Constants.toastNotificationMessage).should('have.text', 'Created Folder ' + FolderName3 + '');

        //Search for the created Folder
        UtilityHelper.searchAnyFileOrFolder(FolderName3)
        cy.wait(Constants.shortWait)
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Folder")

        UtilityHelper.insertForlderName(FolderName3)

        UtilityHelper.selectModelToCreateFolder("Generic Model")

        cy.get(Constants.SelectCreatedModelFolder).trigger('dblclick')
        cy.wait(Constants.shortWait)
        //Open the sub Menu and validate All model Optiona are displaying in sub menu
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Upload")

        //Validate Model is displaying in sub menu
        cy.get(Constants.File_New_Upload_menu).should('have.text', 'Upload')
        // cy.get('#hiddenPicker').trigger('click')

        cy.log('**Some Technical Challange in uploading Doc file**')
        /*
                // cy.fixture('/DocTest.docx', 'utf8').then(fileContent => {
                //     cy.get(Constants.upload_file_icon).upload(
                //         { fileContent, fileName: 'DocTest.docx', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
                //         { subjectType: 'input' },
                //     )
                // })
                // cy.get(Constants.dialogbox_OK_btn).click({force:true})
        
                //  //logout 
                //  UtilityHelper.logout()*/
    })

    it('Upload Image : Upload an Image', () => {
        cy.wait(Constants.wait)
        // click and Open content module
        UtilityHelper.clickAndOpenContentModule()
        cy.wait(Constants.shortWait)
        UtilityHelper.peepInAutomationBox(menuItem, subMenuItem, "Folder")
        cy.wait(Constants.shortWait)
        //Click and open File Menu and click on Folder Menu
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Folder")

        //Check the Dialog box and insert Random Name to create folder
        UtilityHelper.insertForlderName(FolderName4)

        //Click on Create button
        cy.get(Constants.FileDialogBoxCreate_btn).contains('Create').click({ force: true })

        //Validate Success message or Toast Message
        //cy.get(Constants.toastNotificationMessage).should('have.text', 'Created Folder ' + FolderName4 + '');

        //Search for the created Folder
        UtilityHelper.searchAnyFileOrFolder(FolderName4)
        cy.wait(Constants.shortWait)
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Folder")

        UtilityHelper.insertForlderName(FolderName40)

        UtilityHelper.selectModelToCreateFolder("Generic Model")

        cy.get(Constants.SelectCreatedModelFolder).trigger('dblclick')
        cy.wait(Constants.shortWait)
        //Open the sub Menu and validate All model Optiona are displaying in sub menu
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Upload")

        //Validate Model is displaying in sub menu
        cy.get(Constants.upload_header_lbl).should('have.text', 'Upload')

        cy.fixture('Tulips.jpg', 'base64').then(fileContent => {
            cy.get(Constants.upload_file_icon).upload(
                { fileContent, fileName: 'Tulips.jpg', mimeType: 'image/jpg' },
                { subjectType: 'input' },
            )
        })
        cy.wait(Constants.wait)
        cy.get(Constants.dialogbox_OK_btn).click({ force: true })

    })

    it('Upload PDF : Upload a PDF File', () => {
        cy.wait(Constants.wait)
        // click and Open content module
        UtilityHelper.clickAndOpenContentModule()
        cy.wait(Constants.shortWait)
        UtilityHelper.peepInAutomationBox(menuItem, subMenuItem, "Folder")

        cy.wait(Constants.shortWait)
        //Click and open File Menu and click on Folder Menu
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Folder")

        //Check the Dialog box and insert Random Name to create folder
        UtilityHelper.insertForlderName(FolderName5)

        //Click on Create button
        cy.get(Constants.FileDialogBoxCreate_btn).contains('Create').click({ force: true })

        //Validate Success message or Toast Message
        //cy.get(Constants.toastNotificationMessage).should('have.text', 'Created Folder ' + FolderName5 + '');

        //Search for the created Folder
        UtilityHelper.searchAnyFileOrFolder(FolderName5)
        cy.wait(Constants.shortWait)
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Folder")

        UtilityHelper.insertForlderName(FolderName5)

        UtilityHelper.selectModelToCreateFolder("Generic Model")

        cy.get(Constants.SelectCreatedModelFolder).trigger('dblclick')
        cy.wait(Constants.shortWait)
        //Open the sub Menu and validate All model Optiona are displaying in sub menu
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Upload")

        //Validate Model is displaying in sub menu
        cy.get(Constants.upload_header_lbl).should('have.text', 'Upload')

        cy.log('**Some Technical Challange in uploading PDF file**')
        /*
        cy.fixture('PDF.pdf').as('logo')
         .get(Constants.upload_file_icon).then(function(el) {
         return Cypress.Blob.base64StringToBlob(this.logo, 'pdf/pdf')
        .then(blob => {
        el[0].files[0] = blob
        el[0].dispatchEvent(new Event('change', {bubbles: true}))
            })
         })

        cy.wait(Constants.wait)
        cy.get(Constants.dialogbox_OK_btn).click({force:true})*/

    })

    it('Upload TXT : Upload TXT file', () => {
        cy.wait(Constants.wait)
        // click and Open content module
        UtilityHelper.clickAndOpenContentModule()
        cy.wait(Constants.shortWait)
        UtilityHelper.peepInAutomationBox(menuItem, subMenuItem, "Folder")

        //UtilityHelper.peepInAutomationBox(menuItem, subMenuItem, "Folder")
        cy.wait(Constants.shortWait)
        //Click and open File Menu and click on Folder Menu
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Folder")

        //Check the Dialog box and insert Random Name to create folder
        UtilityHelper.insertForlderName(FolderName6)

        //Click on Create button
        cy.get(Constants.FileDialogBoxCreate_btn).contains('Create').click({ force: true })

        //Validate Success message or Toast Message
        //cy.get(Constants.toastNotificationMessage).should('have.text', 'Created Folder ' + FolderName6 + '');

        //Search for the created Folder
        UtilityHelper.searchAnyFileOrFolder(FolderName6)
        cy.wait(Constants.shortWait)
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Folder")

        UtilityHelper.insertForlderName(FolderName6)

        UtilityHelper.selectModelToCreateFolder("Generic Model")

        cy.get(Constants.SelectCreatedModelFolder).trigger('dblclick')
        cy.wait(Constants.shortWait)
        //Open the sub Menu and validate All model Optiona are displaying in sub menu
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Upload")

        //Validate Model is displaying in sub menu
        cy.get(Constants.upload_header_lbl).should('have.text', 'Upload')

        cy.log('**Some Technical Challange in uploading TXT file**')
        /* // cy.get('#hiddenPicker').trigger('click')
 
         cy.fixture('TxtTest.txt', 'base64').then(fileContent => {
             cy.get(Constants.upload_file_icon).upload(
                 { fileContent, fileName: 'PDF.pdf', mimeType: 'txt' },
                 { subjectType: 'input' },
             )
         })
         cy.wait(Constants.wait)
         cy.get(Constants.dialogbox_OK_btn).click({force:true})*/

    })

    it('WorkFlow On New Upload : Push asset through workflow steps to Live ', () => {
        cy.wait(Constants.wait)
        // click and Open content module
        UtilityHelper.clickAndOpenContentModule()
        cy.wait(Constants.shortWait)
        UtilityHelper.peepInAutomationBox(menuItem, subMenuItem, "Folder")
        cy.wait(Constants.shortWait)
        //Click and open File Menu and click on Folder Menu
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Folder")

        //Check the Dialog box and insert Random Name to create folder
        UtilityHelper.insertForlderName(FolderName7)

        //Click on Create button
        cy.get(Constants.FileDialogBoxCreate_btn).contains('Create').click({ force: true })

        //Validate Success message or Toast Message
        //cy.get(Constants.toastNotificationMessage).should('have.text', 'Created Folder ' + FolderName7 + '');

        //Search for the created Folder
        UtilityHelper.searchAnyFileOrFolder(FolderName7)
        cy.wait(Constants.shortWait)
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Folder")

        UtilityHelper.insertForlderName(FolderName7)

        UtilityHelper.selectModelToCreateFolder("Generic Model")

        cy.get(Constants.SelectCreatedModelFolder).trigger('dblclick')
        cy.wait(Constants.shortWait)
        //Open the sub Menu and validate All model Optiona are displaying in sub menu
        UtilityHelper.clickAndOpenFileOptions(menuItem, subMenuItem, "Upload")

        //Validate Model is displaying in sub menu
        cy.get(Constants.upload_header_lbl).should('have.text', 'Upload')
        // cy.get('#hiddenPicker').trigger('click')

        cy.fixture('Tulips.jpg', 'base64').then(fileContent => {
            cy.get('#hiddenPicker').upload(
                { fileContent, fileName: 'Tulips.jpg', mimeType: 'image/jpg' },
                { subjectType: 'input' },
            )
        })
        cy.wait(Constants.wait)
        cy.get(Constants.dialogbox_OK_btn).click({ force: true })

        cy.wait(Constants.wait)
        

        // Stage and Live the created Branched Asset
       cy.log('**Action: Right click the uploaded Asset** ')
   
       cy.wait(Constants.wait)
       cy.get(Constants.SearchForAnyFolderFile).contains('Tulips.jpg').trigger('contextmenu')
       cy.wait(Constants.wait)
      
       cy.get('.name.ng-scope').contains('Workflow').click({ force: true })
       cy.get('.statusName.workflowMenuItem').contains('Stage').click({ force: true })
       cy.wait(Constants.wait);
       //cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Approve" completed.')
       // Right click the same asset and select Workflow-> Live.
       cy.log('**Action: Right click the same asset and select Workflow-> Live.**')
       cy.wait(Constants.wait);
      
       cy.get(Constants.SearchForAnyFolderFile).contains('Tulips.jpg').trigger('contextmenu')
       cy.get('.name.ng-scope').contains('Workflow').click({ force: true })
       cy.wait(Constants.wait);
       cy.get('.statusName.workflowMenuItem').contains('Live').click({ force: true })
       cy.wait(Constants.wait);
       // Select Workflow-> Live.
       cy.log('**Action: Select Workflow-> Live.**')
       //cy.get(Constants.toastNotificationMessage).should('have.text', 'Workflow command "Deploy to Live" completed.');
       cy.wait(Constants.wait);

    })


})