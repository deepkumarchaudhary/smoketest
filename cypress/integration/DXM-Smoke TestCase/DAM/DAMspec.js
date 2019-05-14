/// <reference types="Cypress" />
// This test map to Hiptest smoke test: https://app.hiptest.com/projects/119826/test-plan/folders/839070
import { UtilityClass } from '../../../support/Helper/utility';
import Constants from '../../../support/Locators/locators';
import MenuItems from '../../../support/Helper/menuPageObject';
const UtilityHelper = new UtilityClass();
const MenuPageObject = new MenuItems();
const testCategory = "DAM";
var testCaseName = '';
const menuItem = 'View';
const siteRootName = 'AutoSiteRoot';

describe("DAM should ", () => {
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

    //To check digital asset management is Openable
    it('DAM: To check digital asset management functionality ', () => {
        cy.log('**Open Asset **');
        cy.wait(Constants.mediumWait)
        cy.get('div[title=\'Content\']').click();
        MenuPageObject.clickMenuItem(menuItem);
        cy.get('span.dockable').should('have.text', 'Dockable Panels')
        UtilityHelper.toggleViewSubMenuItem(menuItem,'File View',Constants.dockablePanelFile_tab );
        
        cy.wait(Constants.wait)
        //cy.get('fa fa-times').trigger('click')
        cy.get('[ng-click="vm.toggleSearchDropdown(true)"] > cp-svg').click();
        cy.get('[placeholder="Label"]').click();
        cy.get('[placeholder="Label"]').clear();
        cy.get('[placeholder="Label"]').type(Constants.folderName);
        cy.get('.btn-primary').click();
        cy.wait(Constants.wait);
        cy.get('.assetLabelLink.ng-binding').contains(Constants.folderName).should('be.visible');
        cy.wait(Constants.wait);
        cy.get('.assetLabelLink.ng-binding').contains(Constants.folderName).trigger('dblclick');
        cy.wait(Constants.wait);
        cy.log('**Action: Select Publishing Test.. **');
        
        

    });
})
