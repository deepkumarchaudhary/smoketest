/// <reference types="Cypress" />
// This test map to Hiptest smoke test: https://app.hiptest.com/projects/119826/test-plan/folders/839072
import {
  UtilityClass
} from '../../../support/Helper/utility';
import Constants from '../../../support/Locators/locators';
import MenuItems from '../../../support/Helper/menuPageObject';

const UtilityHelper = new UtilityClass();
const MenuPageObject = new MenuItems();
const testCategory = "WORKSPACE";
var testCaseName = '';
const menuItem = 'View';
const menuItemFile = 'File';
const randomNumber = UtilityHelper.randomNumber();
const siteRootName = 'Auto_SiteRoot_ ' + UtilityHelper.randomNumber();

describe("Dockable Panel should ", () => {
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



  //To verify the presence of Dockable Panels option under View menu
  it('Dockable Panel option: To verify user able to view Dockable Panel options', () => {

    //Create SiteRoot
    cy.wait(Constants.wait);
    cy.get('.module.content').should('be.visible').click({
      force: true
    });
    cy.wait(Constants.wait);
    //Open File Menu and check New->Sub menu items are displaying
    MenuPageObject.clickMenuItem(menuItemFile);

    cy.get(Constants.modelOptionInSubMenu_lnk).contains('New').trigger('mouseover').should('be.visible')

    cy.wait(Constants.shortWait)
    cy.get(Constants.modelOptionInSubMenu_lnk).contains('Site Root').trigger('mousemove')
    cy.get(Constants.modelOptionInSubMenu_lnk).contains('Site Root').click({
      force: true
    })

    // The Create Site Root prompt should come up.
    cy.log('**The Create Site Root prompt should come up.**');
    cy.get('p-header').should('have.text', 'Create Site Root ');
    // Enter New site root name in textbox
    cy.log('**Enter New site root name in textbox**');
    cy.get('#siteRootInput').should('be.visible').trigger('click');
    // Text should be in the text box.
    cy.log('**Text should be in the text box.**');
    cy.get('#siteRootInput').type(siteRootName);
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
    cy.get(Constants.toastNotificationMessage).should('have.text', 'Created site root ' + siteRootName + '.');

    MenuPageObject.clickMenuItem(menuItem);
    cy.get(Constants.dockablePanel_lbl).should('have.text', 'Dockable Panels')
    cy.get(Constants.modelOptionInSubMenu_lnk).contains('File View').should('be.visible')
    cy.get(Constants.modelOptionInSubMenu_lnk).contains('Information').should('be.visible')
    cy.get(Constants.modelOptionInSubMenu_lnk).contains('Conversation').should('be.visible')
    cy.get(Constants.modelOptionInSubMenu_lnk).contains('Content Blocks').should('be.visible')
    cy.get(Constants.modelOptionInSubMenu_lnk).contains('Digital Asset Management').should('be.visible')
    cy.get(Constants.modelOptionInSubMenu_lnk).contains('WCO Targeting').should('be.visible')
    cy.get(Constants.modelOptionInSubMenu_lnk).contains('WCO Reporting').should('be.visible')
    cy.get(Constants.modelOptionInSubMenu_lnk).contains('WCO Testing').should('be.visible')
    cy.get(Constants.modelOptionInSubMenu_lnk).contains('Digital Quality Management').should('be.visible')
    cy.get(Constants.modelOptionInSubMenu_lnk).contains('Properties').should('be.visible')



    //To verify the File view option under dockable panel (File View option in Dockable Panel)
    cy.log('**File View option in Dockable Panel**');
    UtilityHelper.verifyDockablepanelPresence('File View');

    //To verify that user can add File view panel (Add File View panel)
    cy.log('**Add File View panel**');
    cy.get(Constants.dockablePanel_lbl).should('have.text', 'Dockable Panels')

    UtilityHelper.toggleViewSubMenuItem(menuItem, 'File View', Constants.dockablePanelFile_tab);
    //Search for created SiteRoot and open it
    UtilityHelper.searchSiteRoot(siteRootName, Constants.shortWait)

    //To verify the Information option under dockable panel (Information option in Dockable Panel)
    cy.log('**Information option in Dockable Panel**');
    MenuPageObject.clickMenuItem(menuItem);
    UtilityHelper.verifyDockablepanelPresence('Information');

    //To verify that user can add Info panel (Add Information panel)
    cy.log('**Add Information panel**');
    // MenuPageObject.clickMenuItem(menuItem);
    cy.get(Constants.dockablePanel_lbl).should('have.text', 'Dockable Panels')
    UtilityHelper.toggleViewSubMenuItem(menuItem, 'Information', Constants.dockablePanelInformation_tab);
    //To verify the Conversation option under dockable panel (Conversation option in Dockable Panel)
    cy.log('**Conversation option in Dockable Panel**');
    MenuPageObject.clickMenuItem(menuItem);
    UtilityHelper.verifyDockablepanelPresence('Conversation');
    cy.get(Constants.dockablePanel_lbl).should('have.text', 'Dockable Panels')

    //To verify that user can add Conversation panel (Add Conversation panel)
    //MenuPageObject.clickMenuItem(menuItem);
    cy.log('**Add Conversation panel**');

    UtilityHelper.toggleViewSubMenuItem(menuItem, 'File View', Constants.dockablePanelFile_tab);
    cy.wait(Constants.shortWait)
    UtilityHelper.searchSiteRoot(siteRootName, Constants.wait);
    cy.get('.assetLabelLink.ng-binding').contains(siteRootName).should('be.visible');
    cy.wait(Constants.shortWait);
    cy.get('.assetLabelLink.ng-binding').contains(siteRootName).trigger('dblclick');
    cy.wait(Constants.shortWait);
    cy.get('.assetLabelLink.ng-binding').contains('Demo Page').should('be.visible').trigger('dblclick');
    // cy.get('#panelContainerDrag-conversations-panel-widget').contains('Conversation').trigger('click');
    MenuPageObject.clickMenuItem(menuItem);
    UtilityHelper.verifyDockablepanelPresence('Conversation');
    cy.get(Constants.dockablePanel_lbl).should('have.text', 'Dockable Panels')
    UtilityHelper.toggleViewSubMenuItem(menuItem, 'Conversation', Constants.dockablePanelConversations_tab);

    //To verify that user can add any message within the Conversation panel for the previewed asset (Message in Conversation Panel)
    cy.log('**Message in Conversation Panel**');

    cy.wait(Constants.shortWait)
    cy.get('.input-message-footer > .ng-pristine').click({
      force: true
    });
    cy.get('.input-message-footer > .ng-pristine').type('Hello{enter}', {
      force: true
    });
    //cy.get('.conversations-body.ng-binding').contains('Hello').should('be.true'); need to check
    cy.get('div.conversations-body.ng-binding').should('have.text', 'Hello')
    //To verify the Content blocks option under dockable panel (Content Blocks option in Dockable Panel)
    MenuPageObject.clickMenuItem(menuItem);
    UtilityHelper.verifyDockablepanelPresence('Content Blocks');
    //To verify that user can add Conversation panel (Add Conversation panel)
    cy.log('**Add Conversation panel**');
    cy.get(Constants.dockablePanel_lbl).should('have.text', 'Dockable Panels')
    UtilityHelper.toggleViewSubMenuItem(menuItem, 'Content Blocks', Constants.dockablePanelContentBlock_tab);

    //To verify the Digital Asset Management option under dockable panel (Digital Asset Management option in Dockable Panel)
    MenuPageObject.clickMenuItem(menuItem);
    cy.log('**Digital Asset Management option in Dockable Panel**');
    UtilityHelper.verifyDockablepanelPresence('Digital Asset Management');
    //To verify that user can add DAM panel (Add DAM panel)
    cy.log('**Add Digital Asset Management panel**');
    cy.get(Constants.dockablePanel_lbl).should('have.text', 'Dockable Panels')
    UtilityHelper.toggleViewSubMenuItem(menuItem, 'Digital Asset Management', Constants.dockablePanelDigitalAssetManagement_tab);

    //To verify the WCO Targeting option under dockable panel (WCO Targeting option in Dockable Panel)
    MenuPageObject.clickMenuItem(menuItem);
    cy.log('**WCO Targeting option in Dockable Panel**');
    UtilityHelper.verifyDockablepanelPresence('WCO Targeting');
    //To verify that user can add WCO Targeting (Add WCO Targeting  panel)
    cy.log('**Add WCO Targeting panel**');
    cy.get(Constants.dockablePanel_lbl).should('have.text', 'Dockable Panels')
    UtilityHelper.toggleViewSubMenuItem(menuItem, 'WCO Targeting', Constants.dockablePanelWCOTargeting_tab);

    //To verify the WCO Reporting option under dockable panel (WCO Reporting option in Dockable Panel)
    MenuPageObject.clickMenuItem(menuItem);
    cy.log('**WCO Reporting option in Dockable Panel**');
    UtilityHelper.verifyDockablepanelPresence('WCO Reporting');

    //To verify that user can add WCO Reporting (Add WCO Reporting  panel)
    cy.log('**Add WCO Reporting panel**');
    cy.get(Constants.dockablePanel_lbl).should('have.text', 'Dockable Panels')
    UtilityHelper.toggleViewSubMenuItem(menuItem, 'WCO Reporting', Constants.dockablePanelWCOReporting_tab);

    //To verify the WCO Testing option under dockable panel (WCO Testing option in Dockable Panel)
    MenuPageObject.clickMenuItem(menuItem);
    cy.log('**WCO Testing option in Dockable Panel**');
    UtilityHelper.verifyDockablepanelPresence('WCO Testing');

    //To verify that user can add WCO Testing (Add WCO Testing  panel)
    cy.log('**Add WCO Testing panel**');
    cy.get(Constants.dockablePanel_lbl).should('have.text', 'Dockable Panels')

    UtilityHelper.toggleViewSubMenuItem(menuItem, 'WCO Testing', Constants.dockablePanelWCOTesting_tab);

    //To verify the Digital Quality Management option under dockable panel (Digital Quality Management option in Dockable Panel)
    MenuPageObject.clickMenuItem(menuItem);
    cy.log('**Digital Quality Management option in Dockable Panel**');
    UtilityHelper.verifyDockablepanelPresence('Digital Quality Management');

    //To verify that user can add WCO Digital Quality Management (Add Digital Quality Management  panel)
    cy.log('**Add Digital Quality Management panel**');
    cy.get(Constants.dockablePanel_lbl).should('have.text', 'Dockable Panels')
    UtilityHelper.toggleViewSubMenuItem(menuItem, 'Digital Quality Management', Constants.dockablePanelDigitalQualityManagement_tab);

    //To verify the Properties option in Dockable Panel option under dockable panel (Properties option in Dockable Panel option in Dockable Panel)
    MenuPageObject.clickMenuItem(menuItem);
    cy.log('**Properties option in Dockable Panel option in Dockable Panel**');
    UtilityHelper.verifyDockablepanelPresence('Properties');

    //To verify that user can add Properties Panel (Add Properties  panel)
    cy.log('**Add Properties panel**');
    cy.get(Constants.dockablePanel_lbl).should('have.text', 'Dockable Panels')
    UtilityHelper.toggleViewSubMenuItem(menuItem, 'Properties', Constants.dockablePanelProperties_tab);
    cy.wait(Constants.wait);
  });

})