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

const wysiwygTextField='Text field Testing';  
const wysiwygTextArea='Text area field Testing';
const wysiwygPassword='Password field Testing';
const wysiwygAutocompleteBox='VISA';
const wysiwygTextArea1='Text area field Testing';
const wysiwygTextArea2='Text area field Testing';

const UtilityHelper = new UtilityClass();
const MenuPageObject = new MenuItems();
const testCategory = "Siteroot";
var testCaseName = '';
const AssetCreationMenu = 'File'
const MultipleComponentTest = 'MultipleComponentTest_Asset'
const menuItem = 'File';
const subMenuItem = 'New';
const siteRootName = 'AutoSiteRoot_ ' + UtilityHelper.randomNumber();
const templateFolderName = 'AutoTemplateFolder ' + UtilityHelper.randomNumber();
const URLMultipleComponent = '/cpt_webservice/AccessAPI/asset/updatepluginbody/'
const MultipleComponentBody= '"<%@ Page Language=\"C#\" Inherits=\"CrownPeak.Internal.Debug.InputInit\" %>\r\n<%@ Import Namespace=\"CrownPeak.CMSAPI\" %>\r\n<%@ Import Namespace=\"CrownPeak.CMSAPI.Services\" %>\r\n<!--DO NOT MODIFY CODE ABOVE THIS LINE-->\r\n<%@ Import Namespace=\"Component_Library.Component_Project.Components\" %>\r\n<%Input.StartTabbedPanel("Text/WYSIWYG", "Lists", "Pickers", "Sections", "Misc");\r\n Input.ShowHeader("Text controls");\r\nInput.ShowTextBox("Text field", "text_field");\r\n Input.ShowTextBox("Text area", "text_area", height: 5);\r\n Input.ShowPassword("Password", "text_password");\r\n var completeOptions = new Dictionary<string, string>() { {"Cerium", "Ce"}, {"Praseodymium", "Pr"}, {"Neodymium", "Nd"}, {"Promethium", "Pm"}};\r\n Input.ShowAutoCompleteBox("Autocomplete box", "text_autocomplete", completeOptions, helpMessage: "Options are the first four Lanthanide elements.", popupMessage: "Try typing the letters C, N or P");\r\n Input.ShowHeader("Rich-text (WYSIWYG) controls");\r\n Input.ShowWysiwyg("Compressed", "rich_compressed", ServicesInput.CompressedWYSIWYG());\r\n Input.ShowWysiwyg("Medium", "rich_medium", ServicesInput.MediumWYSIWYG());\r\n Input.ShowWysiwyg("Full", "rich_full", ServicesInput.FullWYSIWYG());\r\n Input.NextTabbedPanel();\r\n Input.ShowHeader("List panel");\r\n while(Input.NextPanel("speakers")) \r\n { Input.StartControlPanel(String.IsNullOrEmpty(Input.CurrentPanel["speaker_name"]) ? "Speaker Name" : Input.CurrentPanel["speaker_name"]);\r\n Input.ShowHeader("Speaker details");\r\n Input.ShowTextBox("Text field", "speaker_name");\r\n Input.ShowTextBox("Text area", "speaker_bio", height: 5);\r\n Input.EndControlPanel();\r\n } Input.ShowHeader("Dropdowns");\r\n var dropDownItems = new Dictionary<string,string>() { { "Select one", "" }, {  "Apples","apples" }, { "Bananas", "bananas" }, { "Canteloupe", "canteloupe" }, { "Dragonfruit", "dragonfruit" } };\r\n Input.ShowDropDown("Single select", "dd_single", dropDownItems, Util.MakeList(""));\r\n Input.ShowDropDown("Multiple select", "dd_multiple", dropDownItems, multiple: true);\r\n Input.ShowHeader("Checkboxes");\r\n Input.ShowCheckBox("", "is_red", "y", "Red");\r\n Input.ShowCheckBox("", "is_green", "y", "Green");\r\n Input.ShowCheckBox("", "is_blue", "y", "Blue");\r\n Input.ShowHeader("Radio buttons");\r\n var radioItems = new Dictionary<string, string>() { { "One", "one" }, { "Two", "two" }, { "Three", "three" } };\r\n Input.ShowRadioButton("Exclusive options", "options", radioItems);\r\n Input.ShowHeader("Select List");\r\n var listItems = new Dictionary<string, string>() { { "One", "one" }, { "Two", "two" }, { "Three", "three" }, { "Four", "four" }, { "Five", "five" } };\r\n Input.ShowSelectList("Categories", "categories", listItems);\r\n Input.NextTabbedPanel();\r\n var noUpload = new ShowAcquireParams();\r\n noUpload.ShowUpload = false;\r\n Input.ShowAcquireDocument("Asset reference", "ref_asset");\r\n Input.ShowAcquireImage("Image reference", "ref_image");\r\n Input.ShowAcquireImage("Image reference (browse-only)", "ref_image_browse", noUpload);\r\n Input.ShowHeader("Calendars");\r\n Input.ShowSelectDate("Date", "date_field");\r\n Input.ShowSelectDate("Multiple Dates", "dates_field", multiple: true);\r\n Input.ShowSelectDate("Date Range", "date_range_field", range: true);\r\n Input.ShowSelectDateTime("Date Time", "datetime_field");\r\n Input.ShowSelectDateTime("Date Time (24h)", "datetime_24h_field", use24Hour: true);\r\n Input.NextTabbedPanel();\r\n Input.ShowHeader("Control Panel");\r\n Input.StartControlPanel("Title");\r\n Input.ShowMessage("Input elements appear here");\r\n Input.EndControlPanel();\r\n Input.ShowHeader("Expand Panel");\r\n Input.StartExpandPanel("Title");\r\n Input.ShowMessage("Input elements appear here");\r\n Input.EndExpandPanel();\r\n Input.ShowHeader("Dropdown Container");\r\n var yesNoItems = new string[] { "Yes", "No" }.ToDictionary(k => k.ToLower());\r\n Input.StartDropDownContainer("CTA", "dropdowncontainer", yesNoItems);\r\n ServicesInput.ShowHyperLink("select_cta");\r\n Input.NextDropDownContainer();\r\n Input.EndDropDownContainer();\r\n Input.NextTabbedPanel();\r\n var linkAsset = Asset.Load(asset.Parent.AssetPath.ToString() + "/320x200.png");\r\n if (linkAsset.IsLoaded)\r\n { Input.ShowHeader("Asset Link");\r\n Input.ShowLink(linkAsset, linkAsset.Label);\r\n } Input.ShowHeader("Messages");\r\n Input.ShowMessage("Warning message", MessageType.Warning);\r\n Input.ShowMessage("Basic message", MessageType.Basic);\r\n Input.ShowHeader("Internal CMS Links");\r\n Input.ShowMessage("ShowLink can be configured to open the target in various modes: Edit, Edit Form and Preview.");\r\n var example = Asset.Load(asset.Parent.AssetPath + "/Example 1");\r\n Input.ShowLink(example.Id, "Edit: " + example.Label, InputLinkType.Edit);\r\n	Input.ShowLink(example.Id, "Edit Form: " + example.Label, InputLinkType.EditForm);\r\n Input.ShowLink(example.Id, "Edit Tab (Volte only): " + example.Label, InputLinkType.EditTab);\r\n Input.ShowLink(example.Id, "Preview: " + example.Label, InputLinkType.Preview);\r\n Input.ShowLink(4773, "Go To Folder", InputLinkType.Preview);\r\n Input.EndTabbedPanel();\r\n%>"\r\n requestCodeAnalysis: false'

xdescribe("Site root should ", () => {
    before(() => {
        UtilityHelper.loginCrownpeak();
    });
    beforeEach(function () {
        testCaseName = this.currentTest.title;
        console.log("Execution begins for test name " + testCaseName);
    });

    afterEach(function () {
        if(Constants.dbConnectionTruthy)
        {
            UtilityHelper.fetchAfterEach(this.currentTest.title, testCategory, this.currentTest.state, this.currentTest.duration);
        }else
        {
            console.log("The DataBase connection flag is set to false!!")
        }
    });


    it('Asset Creation : For Edit and View Tabs V3', () => {
        cy.wait(30000);
        // click and Open content module
        UtilityHelper.clickAndOpenContentModule()

        //click on File->>mouse hover to New->> click on site root
        UtilityHelper.clickAndOpenFileOptions(menuItem,subMenuItem," Site Root ")

        // Check Site Root Pop-up Openend        
        UtilityHelper.checkSiteRootPrompt()

        //Enter Site Root Name in Input box withing pop-up
        UtilityHelper.enterSiteRootName(siteRootName)

        // Validate All Components and check-boxes displaying in pop-up
        UtilityHelper.siteRootcheckInstallComponentProject()

        // Save the Site Root
        UtilityHelper.clickAndSaveSiteRoot()

        // Validate the Toast Message on Save click
        cy.log('**A notification should come up stating that the Site Root is created.**');
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Created site root ' + siteRootName + '.'); 
        cy.log('**Action: Search and open created site root.**') 

        //Search the created Site Root       
        UtilityHelper.searchSiteRoot(siteRootName)
        
        //Double click on Component Project folder
        UtilityHelper.doubleClickOnComponentProjectFolder()

        //Double click on templates folder
        UtilityHelper.doubleClickOnTemplateFolder()

        // click on file->New and Then Template
        MenuPageObject.clickMenuItem(menuItem);
        MenuPageObject.clickSubMenuItem(menuItem, subMenuItem);
        
        cy.get(Constants.SubMenuOptions).contains('Template').trigger('mousemove').trigger('click');

        // Validated Template Pop-up
        UtilityHelper.validateTemplatePopUp()

        //Enter a new template name in text box
        UtilityHelper.enterTemplateNameInPopUp(templateFolderName)

       //Validate Toast message after creating Template
        cy.wait(1000)
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Created ' + templateFolderName + '.');
        cy.wait(2000);
       
        //Click and open newly created template folder
        cy.log('**Action: Double click on newly created Template folder**');
        UtilityHelper.clickAndOpenTemplateFolder(templateFolderName)

        //Empty the input.aspx file 
        cy.log('**Action: Empty the input.aspx file**')
        UtilityHelper.emptyInputAspxFile()

        //Save the file after inserting multiple component code using API
        cy.log('**Action: Save the Input.aspx file by API Call**')
        cy.log("**Input.aspx should Call API.**")
        cy.wait(1000);
        UtilityHelper.aPICallTOSaveInputFile(URLMultipleComponent,MultipleComponentBody,apiKeyIntr1,acceptHeader,contentTypeHeader,AcceptEncoding,AcceptLanguage,Connection,originHeader)
        
        //close input.aspx file
         cy.get(Constants.CloseInputAspxFile_tab).click()

        //Navigate to Site Root Project
        UtilityHelper.navigateSiteRootFromTemplateFolder()

         // click on file->New and Then File
         UtilityHelper.clickAndOpenFileAsset(menuItem,subMenuItem)
         
         //Validate File dialog box open
         UtilityHelper.checkFileDialogPrompt()

         //input the new File name in input box and verify the file path
         UtilityHelper.newFileNameAndVerifyPath(MultipleComponentTest,siteRootName,templateFolderName)
              

        //select the workflow and click on Create button
       UtilityHelper.selectWorkflowAndClickOnCreateButton(MultipleComponentTest)
        // Open Asset in Form Edit mode
        cy.get(Constants.open_Asset_lnk).dblclick()

        cy.wait(10000);
 

        
       cy.get('label[title="text_field"]').siblings('input').click({force:true}).type(wysiwygTextField)
       cy.get('label[title="text_area"]').siblings('textarea').click({force:true}).type(wysiwygTextArea)
       cy.get('label[title="text_password"]').siblings('input').click({force:true}).type(wysiwygPassword)
       cy.wait(2000)
       //cy.get('label[title="text_autocomplete"]').siblings('p-autocomplete').children('span>input').click({force:true}).type(wysiwygAutocompleteBox)

        cy.get('.mce-edit-area.mce-container.mce-panel.mce-stack-layout-item').children().each(()=> {
            UtilityHelper.insertTextInWYSIWYG("Jai SHree Ram");
        });

       
        cy.get('.nav > :nth-child(2) > a').contains('Lists').click({force:true})
        
        //TextArea
        cy.get(Constants.textArea_txtbx).click().type('Text field_ListTab')
        cy.get(Constants.textArea_txtbx).click().type('Text Area field_ListTab')

        //Dropdowns
        cy.get('#button.nowrap.ng-star-inserted').click().select(' Bananas ')
        //Multiple select
        cy.get(Constants.selectvalue_list).contains(' Bananas ').type('{ctrl}').click()
        cy.get(Constants.selectvalue_list).contains(' Canteloupe ').type('{ctrl}').click()

        //checkbox
        cy.get(Constants.AssetInputBox).contains('Red').click({force:true})
        //Radio buttons
        cy.get(Constants.AssetInputBox).contains('one').click({force:true})

        //Select List
        cy.get(Constants.selectvalue_list).select('Four')
        cy.get('.btn btn-default btn-xs').click({force:true})

        //Pickers
        cy.get('a:nth-child').contains('Lists').click({force:true})










    })

    
});