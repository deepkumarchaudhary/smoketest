/// <reference types="Cypress" />
// This test map to Hiptest smoke test: https://app.hiptest.com/projects/119826/test-plan/folders/839071
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
const inputCode = 'Input.ShowAcquireImage("image", "image"); \n Input.ShowTextBox("Text Componenrt","before");';
const InputchangeExisting = '<%@ Import Namespace="Component_Library.Component_Project.Components" %>';
const OutputChangeExisting = '<%@ Import Namespace="Component_Library.Component_Project.Components" %>';
const Outputcode = '<%=asset["before"]%> \n <img src="<%= asset["image"] %>" />';
describe("Asset should ", () => {
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
    it('Asset creation: To verify user able to create using customized template', () => {
        //Create SiteRoot
        cy.wait(Constants.wait);
        cy.get('.module.content').should('be.visible').click({ force: true });
        cy.wait(5000);
        //Open File Menu and check New->Sub menu items are displaying
        cy.get('div[title=\'Content\']').click();
        MenuPageObject.clickMenuItem(menuItem);

        cy.get(Constants.modelOptionInSubMenu_lnk).contains('New').trigger('mouseover').should('be.visible')

        cy.wait(2000)
        cy.get(Constants.modelOptionInSubMenu_lnk).contains('Site Root').trigger('mousemove')
        cy.get(Constants.modelOptionInSubMenu_lnk).contains('Site Root').click({ force: true })

        cy.log('**The Create Site Root prompt should come up.**');
        cy.get('p-header').should('have.text', 'Create Site Root ');
        cy.log('**Enter New site root name in textbox**');
        cy.get('#siteRootInput').should('be.visible').trigger('click');
        cy.log('**Text should be in the text box.**');
        cy.get('#siteRootInput').type(siteRootName);
        cy.log('**Click on Install Component Project using Component Library 2.1 checkbox**');
        cy.get('div.checkbox').should('be.visible');
        cy.get('div.checkbox').children('label').should('have.text', 'Install Component Project using Component Library 2.1');
        cy.get('div.checkbox').click();
        cy.log('**A check mark should appear in the box and two more options should appear**');
        cy.get('.checkbox.ng-star-inserted').should('have.length', 2);
        cy.get('.checkbox.ng-star-inserted > label').first().should('have.text', 'Install Samples');
        cy.get('.checkbox.ng-star-inserted > label').first().children('input').should('be.checked');
        cy.get('.checkbox.ng-star-inserted > label').last().should('have.text', 'Rebuild Site After Creation ');
        cy.get('.checkbox.ng-star-inserted > label').last().children('input').should('be.checked');
        cy.log('**Click on save button**');
        cy.get('.ui-dialog-footer').should('be.visible').children('p-footer').children('button').last().click({
            force: true
        });

        cy.log('**A notification should come up stating that the Site Root is created.**');
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Created site root ' + siteRootName + '.');
        //Search for created SiteRoot and open it
        cy.get('[ng-click="vm.toggleSearchDropdown(true)"] > cp-svg').click();
        cy.get('[placeholder="Label"]').click();
        cy.get('[placeholder="Label"]').clear();
        cy.get('[placeholder="Label"]').type(siteRootName);
        cy.get('.btn-primary').click();
        cy.wait(2000);
        cy.get('div.assetRow.ng-scope').contains(siteRootName).should('be.visible');
        cy.wait(3000);
        cy.get('div.assetRow.ng-scope').contains(siteRootName).trigger('dblclick');
        cy.wait(2000);
        cy.log('The folder should open and display _Assets, _Site Confi, Component Project folders and a Demo Page and Page assets.');
        cy.get('.assetLabelLink.ng-binding').contains('_Assets').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('_Site Config').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Component Project').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Demo Page').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Page').should('be.visible');
        cy.log('The folder should open and display _Assets, _Site Confi, Component Project folders and a Demo Page and Page assets.');
        cy.get('.assetLabelLink.ng-binding').contains('_Assets').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('_Site Config').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Component Project').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Demo Page').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Page').should('be.visible');
        cy.log('**Action: Double click on Component folder**');
        cy.get('.assetLabelLink.ng-binding').contains('Component Project').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Component Project').trigger('dblclick');
        cy.wait(5000);
        cy.log('**Component Project folder should open and display: Component Library, Filenames, Library, Models, Templates, Workflows folders.**');
        cy.get('.assetLabelLink.ng-binding').contains('Component Library').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Filenames').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Library').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Models').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Templates').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Workflows').should('be.visible');
        cy.log('**Action: Double click on Templates folder**');
        cy.get('.assetLabelLink.ng-binding').contains('Templates').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Templates').trigger('dblclick');
        cy.wait(5000);
        cy.log('**Templates folder should open with various folders.**');
        cy.get('.assetLabelLink.ng-binding').contains('Component Framework').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Summer of Fun v3 No Footer Template').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Summer of Fun v3 Template').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Summer of Fun v3 Template - Modified').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Summer of Fun v3 Template - Zones').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Summer of Fun Wrapper').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('Summer of Fun Wrapper No Footer').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('wysiwyg image test template').should('be.visible');

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
        cy.log('**Text should be in the text box.**');
        cy.get('#projectInput').type(templateFolderName);
        cy.get('.ui-dialog-footer').should('be.visible').children('p-footer').children('button').last().click({
            force: true
        });
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Created ' + templateFolderName + '.');
        cy.wait(5000);
        cy.log('**Action: Double click on newly created Template folder**');
        cy.get('.assetLabelLink.ng-binding').contains(templateFolderName).should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains(templateFolderName).trigger('dblclick');
        cy.wait(5000);
        cy.log('**input.aspx and output.aspx folder should be present.**');
        cy.get('.assetLabelLink.ng-binding').contains('input.aspx').should('be.visible');
        cy.get('.assetLabelLink.ng-binding').contains('output.aspx').should('be.visible');
        // cy.log("Action: Double click on input.aspx file**");
        // cy.get('.assetLabelLink.ng-binding').contains('input.aspx').trigger('dblclick');
        // cy.log("**Input.aspx should open.**");
        // cy.get('.background > .ng-binding').should('have.text', 'input.aspx');
        // cy.wait(10000);
        // //Input code in Input.aspx
        // cy.log("**Open Input.aspx and insert code **");
        // cy.get(':nth-child(5) > .CodeMirror-line > [role="presentation"]').click().then($codeText => {
        //     $codeText.text('<%');
        //     $codeText.text(InputchangeExisting);
        //     cy.wait(3000)
        // });

        // cy.get('div:nth-child(9) pre.CodeMirror-line span:nth-child(1) > span.cm-comment').then($codeText => {
        //     $codeText.text('<%');
        //     $codeText.text(inputCode);
        //     cy.wait(3000)
        // });
        // //Save Input.aspx and validate the toast message    
        // cy.log("**Validate Input.aspx Toast Message **");
        // cy.get('#contentModuleSave').click();
        // cy.get(Constants.elementNotificationMessage).should('have.text', 'Compilation SucceededSaved asset(s)');
        // //Close Input.aspx
        // cy.log("**Close Input.aspx File **");
        // cy.get('button.tabCloseButton').click({ force: true })
        // //Double click and open Output.aspx
        // cy.log("Action: Double click on input.aspx file**");
        // cy.get('.assetLabelLink.ng-binding').contains('output.aspx').trigger('dblclick');
        // // Open Output.aspx file
        // cy.log("**Output.aspx should open.**");
        // cy.wait(3000)
        // cy.get('.background > .ng-binding').should('have.text', 'output.aspx');
        // cy.wait(10000);
        // //Insert code in Output.aspx
        // cy.log("**Open Output.aspx and insert drag and drop code **");
        // cy.get(':nth-child(5) > .CodeMirror-line > [role="presentation"]').click().then($codeText => {
        //     $codeText.text('<%');
        //     $codeText.text(OutputChangeExisting);
        // });
        // cy.get(':nth-child(12) > .CodeMirror-line > [role="presentation"] > .cm-comment').click().then($codeText => {
        //     $codeText.text('<%');
        //     $codeText.text(Outputcode);
        // });
        // //Save Output.aspx and validate the toast message    
        // cy.log("**Validate Output.aspx Toast Message **");
        // cy.get('#contentModuleSave').click();
        // cy.get(Constants.elementNotificationMessage).should('have.text', 'Compilation SucceededSaved asset(s)');
        // //need to check toast message****
        // //Close Output.aspx
        // cy.log("**Close Output.aspx File **");
        // cy.get('button.tabCloseButton').click({ force: true })

    });
})