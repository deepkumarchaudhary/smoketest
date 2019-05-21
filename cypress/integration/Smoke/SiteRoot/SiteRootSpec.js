/// <reference types="Cypress" />
// This test map to Hiptest smoke test: https://app.hiptest.com/projects/119826/test-plan/folders/839070
import {
    UtilityClass
} from '../../../support/Helper/utility';
import Constants from '../../../support/Locators/locators';
import MenuItems from '../../../support/Helper/menuPageObject';

export const apiKey = '0a6477a93cd540508910';
export const apiKeyRC = 'b86608bbb7744a9a8cf7';
export const acceptHeader = 'application/json, text/plain, */*';
export const contentTypeHeader = 'application/json';
export const originHeader = Constants.originHeader;

const UtilityHelper = new UtilityClass();
const MenuPageObject = new MenuItems();
const testCategory = "Siteroot";
var testCaseName = '';
const FileName = 'Asset_Creation'
const menuItem = 'File';
const subMenuItem = 'New';
const siteRootName = 'AutoSiteRoot_ ' + UtilityHelper.randomNumber();
const templateFolderName = 'AutoTemplateFolder ' + UtilityHelper.randomNumber();


describe("Site root should ", () => {
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


    it('Site root option: To verify user able to view site root option', () => {
        cy.wait(Constants.shortWait);
        // *User click on content module from left hand side menu >> Goto File>> New>> Click on Site root
        cy.log('**User click on content module from left hand side menu >> Goto File>> New>> Click on Site root**');
        cy.get('div[title=\'Content\']').click();
        cy.wait(Constants.mediumWait)

        MenuPageObject.clickMenuItem(menuItem);
        cy.wait(Constants.wait)
        MenuPageObject.clickSubMenuItem(menuItem, subMenuItem);
        cy.wait(Constants.wait)

        
        // MenuPageObject.clickMenuItem(menuItem);
        // cy.wait(Constants.shortWait)
        // MenuPageObject.clickSubMenuItem(menuItem, subMenuItem);
        // cy.wait(Constants.shortWait)

        UtilityHelper.createSiteRoot(siteRootName)

        // cy.get('#topbarPublishingMenuToggle').click();
        // cy.wait(Constants.longWait)
        // cy.get('.publishingDropdown').should('be.visible');
        // cy.get('.publishingactivity > .cpDropdown > .header > .name').should('have.text', 'Activity Monitor Quickview');
        // cy.get(Constants.modelOptionInSubMenu_lnk).contains('Long Running Tasks').trigger('scroll');
        // cy.wait(Constants.wait)
        // cy.get('.taskName.ng-binding').contains('RebuildCLSite').should('be.visible');

        // cy.get('.taskName.ng-binding').contains('RebuildCLSite').prev().should('have.attr', 'class', 'statusColor session-success');
        // cy.get('.taskName.ng-binding').contains('FinishAddCL').should('be.visible');
        // cy.wait(Constants.wait);
        // cy.get('.taskName.ng-binding').contains('FinishAddCL').prev().should('have.attr', 'class', 'statusColor session-success');
        // cy.get('.taskName.ng-binding').contains('AddCL').should('be.visible');
        // //.wait(Constants.shortWait);
        // cy.get('.taskName.ng-binding').contains('AddCL').prev().should('have.attr', 'class', 'statusColor session-success');
        // Once the RebuildCLSite long running task is complete close the Activity Monitor by clicking anywhere.
        cy.log('**Once the RebuildCLSite long running task is complete close the Activity Monitor by clicking anywhere.**')
        cy.get('#panelContainerDrag-file-panel-widget').click();
        cy.get('.publishingDropdown').should('not.be.visible');
        // });

        // Action: Select Publishing Smoke Tests folder.  If not on the first page continue on to second or third page to find folder
        cy.log('**Action: Select Publishing Smoke Tests folder.  If not on the first page continue on to second or third page to find folder.**');
        // Click on filter  and search for Publishing Smoke tests folder
        UtilityHelper.searchSiteRoot(siteRootName, Constants.wait);
        cy.get(Constants.siteRootAssetsName_lnk).contains(siteRootName).should('be.visible')
        cy.wait(2000);
        cy.get(Constants.siteRootAssetsName_lnk).contains(siteRootName).trigger('dblclick')
        cy.wait(3000);
        // The folder should open and display _Assets, _Site Confi, Component Project folders and a Demo Page and Page assets.
        cy.log('The folder should open and display _Assets, _Site Confi, Component Project folders and a Demo Page and Page assets.');
        cy.get(Constants.siteRootAssetsName_lnk).contains('_Assets').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('_Site Config').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Component Project').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Demo Page').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Page').should('be.visible');
        // })

        // it('Folder structure of Component Project Folder: To verify user able to view Component Project folder', () => {
        cy.log('**Action: Double click on Component folder**');
        // Click on filter  and search for Publishing Smoke tests folder
        cy.get(Constants.siteRootAssetsName_lnk).contains('Component Project').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Component Project').trigger('dblclick');
        cy.wait(Constants.wait);
        cy.log('**Component Project folder should open and display: Component Library, Filenames, Library, Models, Templates, Workflows folders.**');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Component Library').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Filenames').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Library').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Models').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Templates').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Workflows').should('be.visible');
        // Action: Double click on Templates folder
        cy.log('**Action: Double click on Templates folder**');
        // Click on filter  and search for Publishing Smoke tests folder
        cy.get(Constants.siteRootAssetsName_lnk).contains('Templates').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Templates').trigger('dblclick');
        cy.wait(Constants.mediumWait);
        cy.log('**Templates folder should open with various folders.**');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Component Framework').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Summer of Fun v3 No Footer Template').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Summer of Fun v3 Template').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Summer of Fun v3 Template - Modified').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Summer of Fun v3 Template - Zones').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Summer of Fun Wrapper').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Summer of Fun Wrapper No Footer').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('wysiwyg image test template').should('be.visible');


        // Create new Template prompt: To verify user able to view new template
        cy.log('**Goto File >>New >> click on Template**')
        MenuPageObject.clickMenuItem(menuItem);
        MenuPageObject.clickSubMenuItem(menuItem, subMenuItem);
        cy.get(Constants.modelOptionInSubMenu_lnk).contains('Template').trigger('mousemove').trigger('click');
        cy.log('**The Create Template prompt should come up.**');
        cy.get('p-header').should('have.text', 'Create Template ');
        cy.log('**Enter a new template name in text box**')
        cy.log('**Click on create**');
        cy.get('.control-label').should('have.text', 'Enter a new template name');
        cy.get('#projectInput').should('be.visible').trigger('click');
        // Text should be in the text box
        cy.log('**Text should be in the text box.**');
        cy.get('#projectInput').type(templateFolderName);
        // cy.get('.btn-primary').click({force:true});
        cy.get('.ui-dialog-footer').should('be.visible').children('p-footer').children('button').last().click({
            force: true
        });
        cy.wait(Constants.wait)
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Created ' + templateFolderName + '.');

        cy.wait(Constants.wait);

        cy.log('**Action: Double click on newly created Template folder**');
        // Click on filter  and search for Publishing Smoke tests folder
        cy.get(Constants.siteRootAssetsName_lnk).contains(templateFolderName).should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains(templateFolderName).trigger('dblclick');
        cy.wait(Constants.wait);
        cy.log('**input.aspx and output.aspx folder should be present.**');
        cy.get(Constants.siteRootAssetsName_lnk).contains('input.aspx').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('output.aspx').should('be.visible');

        cy.log("Action: Double click on input.aspx file**");
        cy.get(Constants.siteRootAssetsName_lnk).contains('input.aspx').trigger('dblclick');

        cy.log("**Input.aspx should open.**");
        cy.wait(Constants.wait)
        cy.get('.background > .ng-binding').should('have.text', 'input.aspx');
        cy.wait(Constants.shortWait);

        //Insert code in input.aspx
        cy.log("**Open Input.aspx and insert drag and drop code **");
        // cy.get(':nth-child(5) > .CodeMirror-line > [role="presentation"]').click().then($codeText => {
        //     $codeText.text('<%');
        //     $codeText.text(InputchangeExisting);

        // });
        // cy.get(':nth-child(9) > .CodeMirror-line > [role="presentation"] > .cm-comment').click().then($codeText => {
        //     $codeText.text('<%');
        //     $codeText.text(inputcodeHeader)

        // });
        cy.get(':nth-child(1) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(2) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(3) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(4) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(5) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(6) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(7) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(8) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(9) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(10) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(11) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })

        //Save Input.aspx and validate the toast message    
        cy.log("**Validate Input.aspx Toast Message **");
        //cy.get('#contentModuleSave').click();
        // cy.get(Constants.toastNotificationMessage).should('have.text', 'Saved asset(s)');
        cy.location().then((loc) => {
            cy.log(loc.hash.substr(length - 6));
            var assetId = loc.hash.substr(length - 6);

            cy.request({
                method: 'POST',
                url:  'cpt_webservice/AccessAPI/asset/updatepluginbody/',
                headers: {
                    "Accept": acceptHeader,
                    "x-api-key": apiKeyRC,
                    "Content-Type": contentTypeHeader,
                    "Origin": originHeader
                },
                body: { "assetId": assetId, "body": "<%@ Page Language=\"C#\" Inherits=\"CrownPeak.Internal.Debug.InputInit\" %>\r\n<%@ Import Namespace=\"CrownPeak.CMSAPI\" %>\r\n<%@ Import Namespace=\"CrownPeak.CMSAPI.Services\" %>\r\n<!--DO NOT MODIFY CODE ABOVE THIS LINE-->\r\n<%@ Import Namespace=\"\"Component_Library.Component_Project.Components\" %>\r\n<% //MODIFY or ADD Import Statements to Define Namespaces Used by the Template %>\r\n<%//This plugin uses InputContext as its context class type%>\r\n<%\r\nInput.ShowDragDrop(\"Header Drag Drop Zone\", \"header\");\r\nInput.ShowDragDrop(\"Main Drag Drop Zone\", \"main\");\r\nInput.ShowDragDrop(\"Footer Drag Drop Zone\", \"footer\");\r\n// input.aspx: template file to specify content entry input form\r\n%>\r\n", "requestCodeAnalysis": false }

            })
        })
        //Save Input.aspx and validate the toast message    
        cy.log("**Validate Input.aspx Toast Message **");
        //cy.get('#contentModuleSave').click();

       // cy.get(Constants.toastNotificationMessage).should('have.text', 'Compilation Succeeded');
        //cy.get(Constants.toastNotificationMessage).should('have.text', 'Saved asset(s)');

        //Close Input.aspx
        cy.log("**Close Input.aspx File **");
        cy.get('button.tabCloseButton').click({ force: true })

        //Double click and open Output.aspx
        cy.log("Action: Double click on output.aspx file**");
        cy.get(Constants.siteRootAssetsName_lnk).contains('output.aspx').trigger('dblclick');

        // Open Output.aspx file
        cy.log("**Output.aspx should open.**");
        cy.wait(Constants.wait)
        cy.get('.background > .ng-binding').should('have.text', 'output.aspx');
        cy.wait(Constants.shortWait);

        //Insert code in Output.aspx
        cy.log("**Open Output.aspx and insert drag and drop code **");
        // cy.get(':nth-child(5) > .CodeMirror-line > [role="presentation"]').click().then($codeText => {
        //     $codeText.text('<%');
        //     $codeText.text(OutputChangeExisting);

        // });
        // cy.get(':nth-child(9) > .CodeMirror-line > [role="presentation"] > .cm-comment').click().then($codeText => {
        //     $codeText.text('<%');
        //     $codeText.text(Outputcode)

        // });

        cy.get(':nth-child(1) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(2) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(3) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(4) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(5) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(6) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(7) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(8) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(9) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(10) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.get(':nth-child(11) > .CodeMirror-line').then($Remove => {
            //$changeComponentLibrary.text('')
            $Remove.empty();
        })
        cy.location().then((loc) => {
            cy.log(loc.hash.substr(length - 6));
            var assetId = loc.hash.substr(length - 6);

            cy.request({
                method: 'POST',
                url: 'cpt_webservice/AccessAPI/asset/updatepluginbody/',
                headers: {
                    "Accept": acceptHeader,
                    "x-api-key": apiKeyRC,
                    "Content-Type": contentTypeHeader,
                    "Origin": originHeader
                },
                body:
                    { "assetId": assetId, "body": "<%@ Page Language=\"C#\" Inherits=\"CrownPeak.Internal.Debug.OutputInit\" %>\r\n<%@ Import Namespace=\"CrownPeak.CMSAPI\" %>\r\n<%@ Import Namespace=\"CrownPeak.CMSAPI.Services\" %>\r\n<!--DO NOT MODIFY CODE ABOVE THIS LINE-->\r\n<%@ Import Namespace=\"\"Component_Library.Component_Project.Components\" %>\r\n<% //MODIFY or ADD Import Statements to Define Namespaces Used by the Template %>\r\n<%//This plugin uses OutputContext as its context class type%>\r\n<% \r\n   // output.aspx: template file to specify the published content in site HTML\r\n   // if no preview.aspx exists, then this is used by default for preview\r\n %>\r\n<% Out.ShowDragDrop(\"header\"); %>\r\n<% Out.ShowDragDrop(\"main\"); %>\r\n<% Out.ShowDragDrop(\"footer\"); %>\r\n", "requestCodeAnalysis": false }

            })
        })
        //Save Output.aspx and validate the toast message    
        cy.log("**Validate Output.aspx Toast Message **");
        // cy.get('#contentModuleSave').click();
        // cy.get(Constants.toastNotificationMessage).should('have.text', 'Compilation Succeeded');
        //need to check toast message****

        //Close Output.aspx
        cy.log("**Close Output.aspx File **");
        cy.get('button.tabCloseButton').click({ force: true })

        // Back to site root folder
        cy.log("**Validate or go back to site Root folder **");
        cy.get('div[title=\'Content\']').click();

        //Search for created site root
        UtilityHelper.searchSiteRoot(siteRootName, Constants.wait);

        cy.get(Constants.siteRootAssetsName_lnk).contains(siteRootName).should('be.visible');
        cy.wait(Constants.wait);
        cy.get(Constants.siteRootAssetsName_lnk).contains(siteRootName).trigger('dblclick');
        cy.wait(Constants.wait);

        //Double click on Component folder
        cy.log('**Action: Double click on Component folder**')

        cy.get(Constants.siteRootAssetsName_lnk).contains('Component Project').should('be.visible')
        cy.get(Constants.siteRootAssetsName_lnk).contains('Component Project').trigger('dblclick')

        //click on double click on templates folder
        cy.log('**Action: Double click on Templates folder**')
        cy.wait(Constants.wait)
        cy.get(Constants.siteRootAssetsName_lnk).contains('Templates').should('be.visible')

        cy.get(Constants.siteRootAssetsName_lnk).contains('Templates').trigger('dblclick')

        //Click on double down arrows and select the Site Root folder
        cy.log('**Click on double down arrows and select the  Site Root folder**')
        cy.get('.crumbsDropdownToggleButton').click({ force: true })
        cy.get('span.ng-binding').contains(siteRootName).click({ force: true })

        //click on root folder
        cy.get('div.root.inside').click({ force: true })




        //Navigate to site root project again          
        UtilityHelper.searchSiteRoot(siteRootName, Constants.wait);

        cy.get(Constants.siteRootAssetsName_lnk).contains(siteRootName).should('be.visible');
        cy.wait(Constants.wait);
        cy.get(Constants.siteRootAssetsName_lnk).contains(siteRootName).trigger('dblclick');
        cy.wait(Constants.wait);
        // Verify the display of varios files
        //********
        cy.log('**Verify the display of various files**')
        cy.get('.crumbsLink.ng-binding').contains(siteRootName).should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('_Assets').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('_Site Config').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Component Project').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Demo Page').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Page').should('be.visible');

        //Prompt to create Template Wrong Test case
        cy.log("**Prompt to create Template**")
        // Back to site root folder
        cy.log("**Validate or go back to site Root folder **");
        cy.get('div[title=\'Content\']').click();

        //Navigate to site root project again          
        cy.log("**Searched for Site root **");
        UtilityHelper.searchSiteRoot(siteRootName, Constants.wait);

        cy.get(Constants.siteRootAssetsName_lnk).contains(siteRootName).should('be.visible');
        cy.wait(Constants.wait);
        cy.get(Constants.siteRootAssetsName_lnk).contains(siteRootName).trigger('dblclick');
        cy.wait(Constants.wait);

        //Double click on Component folder
        cy.log('**Action: Double click on Component folder**')
        cy.get(Constants.siteRootAssetsName_lnk).contains('Component Project').should('be.visible')
        cy.get(Constants.siteRootAssetsName_lnk).contains('Component Project').trigger('dblclick')

        //click on double click on templates folder
        cy.log('**Action: Double click on Templates folder**')
        cy.wait(Constants.wait)
        cy.get(Constants.siteRootAssetsName_lnk).contains('Templates').should('be.visible')
        cy.get(Constants.siteRootAssetsName_lnk).contains('Templates').trigger('dblclick')
        cy.wait(Constants.wait)
        // click on file->New and check 
        MenuPageObject.clickMenuItem(menuItem);
        MenuPageObject.clickSubMenuItem(menuItem, subMenuItem);

        cy.get(Constants.modelOptionInSubMenu_lnk).contains('Template').trigger('mousemove').trigger('click');

        // Validate create template pop-up opens
        cy.log('**Check Template Pop-up open up**')
        cy.get('div[role=dialog]', { timeout: Constants.wait }).should('be.visible');
        cy.get('p-header').should('contain', 'Create Template');
        cy.get('.btn-default').click();

        //Validate File Name
        // Back to site root folder
        cy.log("**Validate or go back to site Root folder **");
        cy.get('div[title=\'Content\']').click();

        //Navigate to site root project again          
        cy.log("**Searched for Site root **");
        UtilityHelper.searchSiteRoot(siteRootName, Constants.wait);

        cy.wait(Constants.wait);
        cy.get(Constants.siteRootAssetsName_lnk).contains(siteRootName).should('be.visible');
        cy.wait(Constants.wait);
        cy.get(Constants.siteRootAssetsName_lnk).contains(siteRootName).trigger('dblclick');
        cy.wait(Constants.wait);
        //  //Create new Asset
        cy.log("**Create New Assets**");
        MenuPageObject.clickMenuItem(menuItem);
        MenuPageObject.clickSubMenuItem(menuItem, subMenuItem);
        cy.get(Constants.modelOptionInSubMenu_lnk).contains('File').trigger('mousemove').trigger('click');

        //Verify the Prompt Header
        cy.log("**Verify the Header of Prompt **");
        cy.get('p-header').should('contain', 'Create New')

        //input the new File name in input box and verify the file path
        cy.log("**Input the File Name or Asset Name and verify the path **");
        cy.get('#label').type(FileName);
        cy.get('.new-file-name-input > span').should('have.text', 'Path: /' + siteRootName + '')

        //click on Browse button and select the Created Template
        cy.log("**Click on Browse button To select Template**");
        cy.get('button.btn.btn-primary:contains(\'Browse\')').trigger('click');
        cy.wait(Constants.wait)

        cy.log("**Select The created Template and verify the path**");
        cy.get('asset-browser.ng-star-inserted > .head > .assetRow > .assetLabel > .assetLabelLink').click();
        cy.get('a.assetLabelLink.ng-binding').contains(templateFolderName).click({ force: true });
        cy.get('button').contains('OK').click();
        cy.get('span.new-file-template-path').should('have.text', 'Path: /' + siteRootName + '/Component Project/Templates/' + templateFolderName + '');

        //select the workflow and click on Create button
        cy.log("**Click on Create button to create new Asset **");
        cy.get('select').select('Basic Workflow');
        cy.wait(Constants.wait);
        cy.get('button.btn.btn-primary').contains('Create').click();
        cy.wait(Constants.wait)

        // Validate Success Message
        cy.log("**Validate Success Message **")
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Created asset ' + FileName + '.')

        // Root icon
        // Back to site root folder
        cy.log("**Validate or go back to site Root folder **");
        cy.get('div[title=\'Content\']').click();
        // cy.get('div.root.inside').click({ force: true })

        //Navigate to site root project again and search for the created site root         
        cy.log("**Searched for Site root **");
        UtilityHelper.searchSiteRoot(siteRootName, Constants.wait);

        cy.wait(Constants.wait)
        cy.get(Constants.siteRootAssetsName_lnk).contains(siteRootName).should('be.visible')
        cy.wait(Constants.wait)
        cy.get(Constants.siteRootAssetsName_lnk).contains(siteRootName).trigger('dblclick', { force: true })
        cy.wait(Constants.wait)


        //Navigate to Site root
        // it('Folder structure of Component Project Folder: To verify user able to view Component Project folder', () => {
        cy.log('**Action: Double click on Component folder**');
        // Click on filter  and search for Publishing Smoke tests folder
        cy.get(Constants.siteRootAssetsName_lnk).contains('Component Project').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Component Project').trigger('dblclick');
        cy.wait(Constants.wait);
        cy.log('**Component Project folder should open and display: Component Library, Filenames, Library, Models, Templates, Workflows folders.**');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Component Library').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Filenames').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Library').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Models').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Templates').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Workflows').should('be.visible');
        // Action: Double click on Templates folder
        cy.log('**Action: Double click on Templates folder**');
        // Click on filter  and search for Publishing Smoke tests folder
        cy.get(Constants.siteRootAssetsName_lnk).contains('Templates').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Templates').trigger('dblclick');
        cy.wait(Constants.mediumWait);
        cy.log('**Templates folder should open with various folders.**');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Component Framework').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Summer of Fun v3 No Footer Template').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Summer of Fun v3 Template').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Summer of Fun v3 Template - Modified').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Summer of Fun v3 Template - Zones').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Summer of Fun Wrapper').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('Summer of Fun Wrapper No Footer').should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains('wysiwyg image test template').should('be.visible');

        // Open the created template

        cy.get(Constants.siteRootAssetsName_lnk).contains(templateFolderName).should('be.visible');
        cy.get(Constants.siteRootAssetsName_lnk).contains(templateFolderName).trigger('click');

        //

        // Back to site root folder
        cy.log("**Validate or go back to site Root folder **");
        cy.get('div[title=\'Content\']').click();
        // cy.get('div.root.inside').click({ force: true })

        //Navigate to site root project again and search for the created site root         
        cy.log("**Searched for Site root **");
        UtilityHelper.searchSiteRoot(siteRootName, Constants.wait);

        cy.wait(Constants.wait)
        cy.get(Constants.siteRootAssetsName_lnk).contains(siteRootName).should('be.visible')
        cy.wait(Constants.wait)
        cy.get(Constants.siteRootAssetsName_lnk).contains(siteRootName).trigger('dblclick', { force: true })
        cy.wait(Constants.wait)

        // Double click on the Created Asset
        cy.wait(Constants.wait)
        cy.get(Constants.siteRootAssetsName_lnk).contains(FileName).should('be.visible')
        cy.wait(Constants.wait)
        cy.get(Constants.siteRootAssetsName_lnk).contains(FileName).trigger('dblclick', { force: true })
        cy.wait(Constants.wait)

        // Goto View click on Content Blocks
        MenuPageObject.clickMenuItem("View");

        UtilityHelper.toggleViewSubMenuItem("View", "Content Blocks", Constants.dockablePanelContentBlock_tab);
        cy.get('#contentModuleInline').click({ force: true });
        cy.wait(Constants.shortWait);
        
       // UtilityHelper.verifyDockablepanelPresence('Content Blocks');


    });
});