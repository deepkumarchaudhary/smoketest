/// <reference types="Cypress" />
// This test map to Hiptest smoke test: https://app.hiptest.com/projects/119826/test-plan/folders/839069
import { UtilityClass } from '../../../support/Helper/utility';
import Constants from '../../../support/Locators/locators';
//import Constants from '../Locators/locators'
var testCaseName = '';
const UtilityHelper = new UtilityClass();
var expectedForgotText = 'Enter the Username that you use to access your account and click Send Email. A message will be sent to your email address containing account access steps.';
// Category of the test case to be inserted in Database
const testCategory = "Login";
const randomNumber = UtilityHelper.randomNumber();
const dashboardName = 'automateddashboard_' + randomNumber;


describe("Dashboard should", () => {
  before(() => {
    //  UtilityHelper.loginCrownpeak();
  });
  beforeEach(function () {
    testCaseName = this.currentTest.title;
    console.log("Execution begins for test name " + testCaseName);
    //Call For login
    UtilityHelper.loginCrownpeak();
    cy.wait(Constants.wait);
    const randomNumber = UtilityHelper.randomNumber();
    const dashboardName = 'automateddashboard_' + randomNumber;

  });
  afterEach(function () {

    if (Constants.dbConnectionTruthy) {
      UtilityHelper.fetchAfterEach(this.currentTest.title, testCategory, this.currentTest.state, this.currentTest.duration);
    } else {
      console.log("The DataBase connection flag is set to false!!")
    }
  });
  /*
  **Function to create DashBoard
   */
  function CreateDashBoard() {
    cy.wait(Constants.wait);
    cy.get(Constants.dashBoardDropDown_btn).should('contain', 'Dashboard:').click({ force: true });
    cy.wait(Constants.wait);
    cy.log('**A list of Dashboard should display**');
    //click on add new dashboard
    cy.get(Constants.dashboardAddNewDashboard_btn).click({ force: true });
    cy.wait(Constants.wait);
    cy.get(Constants.dashboardAddNewControl_lbl).contains('Dashboard Name').should('be.visible');
    cy.get(Constants.dashboardAddNewControl_lbl).contains('Dashboard Visibility').should('be.visible');
    cy.get(Constants.dashboardAddtoFavorites_lbl).contains('Add to Favorites').should('be.visible');
  }
  /*
  **Function to add widgets 
  **
  */
  function AddWidgets(value) {
    //Select widget
    cy.get(Constants.dashboardSelectWidget_lbl).contains('Select a widget below.').should('be.visible');
    //Click on recent file activity widget available
    cy.get('span.card-text').contains(value).click({ force: true });
    //verify the success message
    cy.wait(Constants.shortWait);
    cy.get(Constants.dashboadWidgetAddSuccessMessage_lbl).contains('Widget ready to be added. Click \'Save\' to continue.').should('be.visible');
    cy.wait(Constants.wait);
    //add widget by clicking Save button
    cy.get(Constants.dashboadAddWidgetSave_btn).contains('Save').click({ force: true });
    //wait for widget to be added and refershed
    cy.wait(Constants.wait);
  }
  /*
   **Function to Delete Dashboard 
   **
   */
  function DeleteDashboard(value) {
    cy.wait(Constants.wait);
    cy.get('.dashboard-name').click();
    cy.wait(Constants.wait);
    //Click on Settings for current DashBoard
    cy.get(value).siblings(Constants.dashboardSettings_btn).click();
    //Edit DashBoard
    cy.wait(Constants.wait);
    //Click on Delete button 
    cy.get(Constants.dashboardDelete_btn).click();
    //Delete Alert handle
    cy.wait(Constants.wait);
    //Verify that Alert Should Appear
    cy.get(Constants.dashboardDeleteAlert_lbl).contains('Are you sure you want to delete this item?').should('be.visible');
    cy.wait(Constants.wait);
    //Delete
    cy.get(Constants.dashboadDeleteAlertDelete_btn).click();
    cy.wait(Constants.wait);
    //verify toast message
    cy.get(Constants.dashboardToastMessage_lbl).contains('Successfully deleted dashboard').should('be.visible');
  }
  /*
   **Function to Create  Dashboard 
   **
   */
  function CreateDashboardwithName(value) {
    //Click on Dashboard DropDown
    cy.get(Constants.dashboadDropDown_dropdown).click({ force: true });
    //call function to create dashboard
    CreateDashBoard();
    //click on the Dashboard text box
    cy.get(Constants.dashboardCreateName_txtBx).type(value);
    cy.wait(Constants.wait);
    //Click Save button
    cy.get(Constants.dashboardCreateSave_btn).should('be.visible').click({ force: true });
  }
  /*
  Function to createPrivateDashBoardwithName(Value)
  */
  function CreatePrivateDashboardwithName(value) {
    cy.wait(Constants.wait);
    cy.get(Constants.dashboadDropDown_dropdown).click({ force: true });
    //call function to create dashboard
    CreateDashBoard();
    //Click Save Button
    cy.get(Constants.dashboardCreateSave_btn).should('be.visible').click({ force: true });
    cy.wait(Constants.wait);
    //click on the Dashboard text box
    cy.get(Constants.dashboardCreateName_txtBx).type(value);
    cy.wait(Constants.wait);
    //click on private radio button 
    cy.get(Constants.dashboardCreatePrivate_rbtn).click({ force: true });

    //Click Save button
    cy.get(Constants.dashboardCreateSave_btn).should('be.visible').click({ force: true });

  }


  /*
  **Testcase to test the functionality of dashboard.
  **This Testcase creates a dashboard add a widget to it .
  **And then edit the DashBoard.
  */
  it('Dashboard V3', () => {

    cy.get(Constants.dashboadDropDown_dropdown).click({ force: true });
    //call function to create dashboard
    CreateDashBoard();
    //Click cancel Button
    cy.get(Constants.dashBoardCreateCancel_btn).click({ force: true });
    //call function to create dashboard
    CreateDashBoard();
    //Click Save Button
    cy.get(Constants.dashboardCreateSave_btn).should('be.visible').click({ force: true });
    cy.wait(Constants.wait);
    //click on the Dashboard text box
    cy.get(Constants.dashboardCreateName_txtBx).type(dashboardName);
    //click on public radio button 
    cy.get(Constants.dashboardCreatePublic_rbtn).click();
    //Click Save button
    cy.get(Constants.dashboardCreateSave_btn).should('be.visible').click({ force: true });
    cy.wait(Constants.wait);//wait for the dashboard to be created
    //Click on Add new widget
    cy.get(Constants.dashboardAddNewWidget_btn).should('be.visible').click({ force: true });
    //verify the page opens with correct attributes
    //widget category label
    cy.get(Constants.dashBoardWidgetCategory_lbl).contains('Widget Category').should('be.visible');
    //function to add widget Recent File Activity
    cy.wait(Constants.wait);
    cy.get(Constants.dashBoardwidgetSelect_dropdown).should('be.visible');
    AddWidgets('Recent File Activity');
    //verify that widget should be added on dashboard
    cy.get('div.dw-name').contains('Recent File Activity').click({ force: true });

    //click on content tab
    cy.get(Constants.ContentTab_tab).click({ force: true });
    //Click on DashBoard Tab
    cy.get(Constants.dashboadDropDown_dropdown).click({ force: true });
    //Add Maximum number of widgets currently 6 ??
    //Click on DashBoard Drop Down
    cy.get(Constants.dashBoardDropDown_btn).should('contain', 'Dashboard:').click({ force: true });

    //Click on Settings for current DashBoard
    cy.get('span.dashboard-span[title= "' + dashboardName + '"]').siblings('span.cog-span').click();
    //Edit the name of the dashboard
    //click on the Dashboard text box
    cy.get(Constants.dashboardCreateName_txtBx).type("1");
    //Click on Save Button 
    cy.get(Constants.dashboadAddWidgetSave_btn).click({ force: true });//edit need to check 
    cy.wait(Constants.wait);
    DeleteDashboard('span.dashboard-span[title= "' + dashboardName + '1"]');


  });
  /*
   **Testcase to test the functionality of widgets.
   This Testcase creates a dashboard add a widget to it .
   And then edit the DashBoard.
   */
  it('Add Widgets', () => {
    function testfunction() {

      cy.get(Constants.dashboadDropDown_dropdown).click({ force: true });
      //create dashboard
      //call function to create dashboard
      CreateDashBoard();

      //Click Save Button
      cy.get(Constants.dashboardCreateSave_btn).should('be.visible').click({ force: true });
      cy.wait(Constants.wait);
      //click on the Dashboard text box
      cy.get(Constants.dashboardCreateName_txtBx).type(dashboardName);
      cy.wait(Constants.wait);
      //click on private radio button 
      cy.get(Constants.dashboardCreatePrivate_rbtn).click({ force: true });

      //Click Save button
      cy.get(Constants.dashboardCreateSave_btn).should('be.visible').click({ force: true });

      cy.wait(Constants.wait);
      //Click on Add widgets
      cy.get(Constants.dashboardAddNewWidget_btn).should('be.visible').click({ force: true });
      cy.wait(Constants.wait);
      //Add Errors
      AddWidgets('Errors');
      //Click on Settings cog
      cy.get(Constants.dashboardWidgetSettingd_btn).click();
      // cy.get('.dw-name').contains('Recent File Activity').siblings('.dw-settings-btn.ng-star-inserted > cp-svg').click({ force: true });
      // cy.get('cp-svg.svg#Layer_1').click({ force: true });//not working
      //Edit Widget Should appear
      cy.get('Section.h1').contains('Edit Widget').should('be.visible');
      //Click on Delete Widget
      cy.get(Constants.dashboardWidgetDelete_btn).click();
      //confirm the alert
      cy.get(Constants.dashboardWidgetDeleteMessage_lbl).contains('Are you sure you want to delete this item?').should('be.visible');
      //Close the alert by clicking on x
      cy.get('span.pi.pi-times').click();
      //click on Delete widget
      cy.get(Constants.dashboardWidgetDelete_btn).click();
      //click on cancel button in prompt
      cy.get('button.btn.btn-default').click();
      //click on Delete widget
      cy.get(Constants.dashboardWidgetDelete_btn).click();
      //Click on Delete button
      cy.get('button.btn.btn-danger').click();
      //Delete Automated DashBoard
      DeleteDashboard('span.dashboard-span[title= "' + dashboardName + '"]');


    }
  });
  /*
  **Testcase to test the functionality of private DashBoard.
  **
  */
  it('private Dashboard V3', () => {
    cy.get(Constants.dashboadDropDown_dropdown).click({ force: true });
    //call function to create dashboard
    CreateDashBoard();

    //Click Save Button
    cy.get(Constants.dashboardCreateSave_btn).should('be.visible').click({ force: true });
    cy.wait(Constants.wait);
    //click on the Dashboard text box
    cy.get(Constants.dashboardCreateName_txtBx).type(dashboardName);
    cy.wait(Constants.wait);
    //click on private radio button 
    cy.get(Constants.dashboardCreatePrivate_rbtn).click({ force: true });

    //Click Save button
    cy.get(Constants.dashboardCreateSave_btn).should('be.visible').click({ force: true });
    //log out of V3
    cy.get(Constants.userMenu_btn).click();
    cy.get(Constants.userSignout_btn).click();
    cy.wait(Constants.wait);
    /* //not working because of BUG
    //login with another user
    cy.get(Constants.loginUserName_txt).should('be.visible').type('Abha_Dev');//need to replace that
         cy.get(Constants.loginPassword_txt).should('be.visible').type('Password1!');
    cy.get(Constants.loginLogin_btn).should('be.visible').click();
    cy.log('**User should log in to application with no errors.**');
    cy.get(Constants.loginVersion_lbl).should('not.be.visible');
    //Click on Dashboard and check that private dashboard not available
    cy.get('Constants.dashboadDropDown_dropdown').click({ force: true });
    //click on add new dashboard
    cy.get('span.dashboard-span[title=\'Automated Private DashBoard\']').should('not.be.visible');
    */
    UtilityHelper.loginCrownpeak();
    cy.wait(Constants.mediumWait);
    //Dashboard should be visible
    //Click on Dashboard and check that private dashboard not available
    // cy.get(Constants.dashBoardDropDown_btn).should('contain', 'Dashboard:');
    //click on add new dashboard
    DeleteDashboard('span.dashboard-span[title= "' + dashboardName + '"]');
  });

  /*Failing because of BUG
  ** DashBoard Permissions
  */
  xit('Dashboard Permissions', () => {
    CreateDashboardwithName('Automated DashBoard1');
    /* cy.get('Constants.dashboadDropDown_dropdown').click({ force: true });
     //call function to create dashboard
     CreateDashBoard();
     //click on the Dashboard text box
     cy.get(Constants.dashboardCreateName_txtBx).type("Automated DashBoard");
     cy.wait(Constants.wait);
   //Click Save button
     cy.get(Constants.dashboardCreateSave_btn).should('be.visible').click({ force: true });
     */
    //user 1 logout and user 2 log in 
    cy.get(Constants.userMenu_btn).click();
    cy.get(Constants.userSignout_btn).click();
    cy.wait(Constants.wait);

    //login with another user
    cy.get(Constants.loginUserName_txt).should('be.visible').type('Abha_Dev');//need to replace that
    cy.get(Constants.loginPassword_txt).should('be.visible').type('Password1!');
    cy.get(Constants.loginLogin_btn).should('be.visible').click();
    cy.log('**User should log in to application with no errors.**');
    cy.get(Constants.loginVersion_lbl).should('not.be.visible');
    //Click on Dashboard Created
    cy.wait(Constants.shortWait)
    cy.get(Constants.dashBoardDropDown_btn).should('contain', 'Dashboard:').click({ force: true });
    //click on add new dashboard
    cy.get('span.dashboard-span[title=\'Automated DashBoard1\']').click();
    //not able to add widgets
    cy.get('span.ng-binding').should('contain', ' (Cannot add widget)').click();
    //Select 
    //Click on Dashboard and check that private dashboard not available
    cy.get(Constants.dashBoardDropDown_btn).should('contain', 'Dashboard:').click({ force: true });
    //click on add new dashboard
    cy.get('span.dashboard-span[title=\'Automated DashBoard1\']').click();
    //click on settings
    //Click on Settings for current DashBoard
    cy.get('span.dashboard-span[title=\'Automated DashBoard\']').siblings('span.cog-span').click();
    //Add to Favorites click
    cy.get('span.ng-star-inserted').should('contain', 'Add to Favorites').click();
    //Text changed
    cy.get('span.ng-star-inserted').should('contain', 'Favorited').click();
    //Click on Save
    cy.get(Constants.dashboardCreateSave_btn).should('be.visible').click({ force: true });
    //Log out 
    //user 1 logout and user 2 log in 
    cy.get(Constants.userMenu_btn).click();
    cy.get(Constants.userSignout_btn).click();
    cy.wait(Constants.wait);
    //Log in 
    UtilityHelper.loginCrownpeak();
    cy.wait(Constants.wait);
    //Click on Add new widget
    cy.get(Constants.dashboardAddNewWidget_btn).should('be.visible').click({ force: true });
    //verify the page opens with correct attributes
    //widget category label
    cy.get(Constants.dashBoardWidgetCategory_lbl).contains('Widget Category').should('be.visible');
    //function to add widget Recent File Activity
    cy.wait(Constants.wait);
    cy.get('label.ng-tns-c17-6.ui-dropdown-label.ui-inputtext.ui-corner-all.ng-star-inserted').should('be.visible');
    AddWidgets('Recent File Activity');
    //Edit DashBoard
    //Click on DashBoard Drop Down
    cy.get(Constants.dashBoardDropDown_btn).should('contain', 'Dashboard:').click({ force: true });

    //Click on Settings for current DashBoard
    cy.get('span.dashboard-span[title=\'Automated DashBoard1\']').siblings('span.cog-span').click();
    //Edit the name of the dashboard
    //click on the Dashboard text box
    cy.get(Constants.dashboardCreateName_txtBx).type("1");
    //Click on Save Button 
    cy.get(Constants.dashboadAddWidgetSave_btn).click({ force: true });
    //Add code to delete Dashboard here



  });
  /*
  ** Testing
  */
  it('Testing Testcase', () => {
    cy.get(Constants.dashboadDropDown_dropdown).click({ force: true });
    //call function to create dashboard
    CreateDashBoard();
    //click on the Dashboard text box
    cy.get(Constants.dashboardCreateName_txtBx).type(dashboardName);
    cy.wait(Constants.wait);
    //click on private radio button 
    cy.get(Constants.dashboardCreatePrivate_rbtn).click({ force: true });
    //Click Save button
    cy.get(Constants.dashboardCreateSave_btn).should('be.visible').click({ force: true });
    cy.wait(Constants.wait);
    //Click on Add Widget Button
    cy.get(Constants.dashboardAddNewWidget_btn).should('be.visible').click({ force: true });
    //Add WCO widget
    cy.wait(Constants.mediumWait);
    cy.get(Constants.dashBoardwidgetSelect_lbl).contains('Select a widget below.').should('be.visible');
    //click DropDown
    cy.get(Constants.dashBoardwidgetSelect_dropdown).click();
    cy.wait(Constants.wait);
    //Select WCO widget

    cy.get(Constants.dashboardWidgetSelectWCO_dropdown).click();
    //Select Testing 
    //Click on recent file activity widget available
    cy.get('span.card-text').contains('Testing').click({ force: true });
    //Select Save
    cy.get(Constants.dashboardCreateSave_btn).contains('Save').click({ force: true });
    cy.wait(Constants.mediumWait);
    //Use the collection drop down 
    cy.get(Constants.dashboardCollectionFilter_dropdown).click;
    //Use the content drop down 
    cy.get(':nth-child(2) > .ui-inputwrapper-filled > .filter-dropdown > .ui-dropdown-trigger').click;
    //Resize and change by clicking DashBoard,Scroll functionality
    //Click on Settings Clog
    cy.get(Constants.dashboardWidgetSettingd_btn).click();
    //Click on Cancel button 
    cy.get('.cancel').click();
    cy.wait(Constants.wait);
    //Click on Settings Clog
    cy.get(Constants.dashboardWidgetSettingd_btn).click();
    //Click on Delete button in widget
    cy.get(Constants.dashboardWidgetDelete_btn).click();
    cy.wait(Constants.wait);
    cy.get(Constants.dashboardDeleteAlert_lbl).contains('Are you sure you want to delete this item?').should('be.visible');
    cy.wait(Constants.wait);
    //Delete
    cy.get(Constants.dashboardWidgetDeleteWidgetAlert_btn).click();
    cy.wait(Constants.wait);
    //verify toast message
    cy.get(Constants.toastNotificationMessage).contains('Successfully deleted dashboard widget.').should('be.visible');


    //Delete DashBoard Created
    DeleteDashboard('span.dashboard-span[title= "' + dashboardName + '"]');

  });
  /**
  ** Functionality to Targeting Testcase
  */
  it('Targeting Testcase', () => {
    cy.wait(Constants.wait);
    cy.get(Constants.dashboadDropDown_dropdown).click({ force: true });
    //call function to create dashboard
    CreateDashBoard();
    //click on the Dashboard text box
    cy.get(Constants.dashboardCreateName_txtBx).type(dashboardName);
    cy.wait(Constants.wait);
    //click on private radio button 
    cy.get(Constants.dashboardCreatePrivate_rbtn).click({ force: true });
    //Click Save button
    cy.get(Constants.dashboardCreateSave_btn).should('be.visible').click({ force: true });
    cy.wait(Constants.wait);
    //Click on Add Widget Button
    cy.get(Constants.dashboardAddNewWidget_btn).should('be.visible').click({ force: true });
    //Add WCO widget
    cy.wait(Constants.mediumWait);
    cy.get(Constants.dashBoardwidgetSelect_lbl).contains('Select a widget below.').should('be.visible');
    //click DropDown
    cy.get(Constants.dashBoardwidgetSelect_dropdown).click();
    cy.wait(Constants.wait);
    //Select WCO widget

    cy.get(Constants.dashboardWidgetSelectWCO_dropdown).click();
    //Select Testing 
    //Click on recent file activity widget available
    cy.get('span.card-text').contains('Targeting').click({ force: true });
    //Select Save
    cy.get(Constants.dashboadAddWidgetSave_btn).contains('Save').click({ force: true });
    cy.wait(Constants.wait);
    //Change to visit and conversation over time
    cy.get(':nth-child(2) > .col-sm-1').click();
    //verify the title
    //cy.get('.footer-title').contains(' Visits and Conversions Over Time ').click();
    //click on filters
    cy.get(Constants.dashboardCollectionFilter_dropdown).click;
    //Click on settings of widget
    cy.get(Constants.dashboardWidgetSettingd_btn).click();
    //Delete widget
    cy.get(Constants.dashboardWidgetDelete_btn).click();
    cy.wait(Constants.wait);
    //Verify that Alert Should Appear
    cy.get(Constants.dashboardDeleteAlert_lbl).contains('Are you sure you want to delete this item?').should('be.visible');
    cy.wait(Constants.wait);
    //Delete
    cy.get(Constants.dashboardWidgetDeleteWidgetAlert_btn).click();
    cy.wait(Constants.wait);
    //verify toast message
    cy.get(Constants.toastNotificationMessage).contains('Successfully deleted dashboard widget.').should('be.visible');
    //Delete DashBoard 
    DeleteDashboard('span.dashboard-span[title= "' + dashboardName + '"]');
  });
  /**
  ** Functionality to Dashboard
  */
  it('DashBoard', () => {
    //Function to create Dashboard Automated Dashboard should be created before calling 
    CreateDashboardwithName(dashboardName);
    //function start
    /* cy.get(Constants.dashboadDropDown_dropdown).click({ force: true });
    //call function to create dashboard
         CreateDashBoard();
       //click on the Dashboard text box
       cy.get(Constants.dashboardCreateName_txtBx).type("Automated DashBoard");
       cy.wait(Constants.wait);
     //Click Save button
       cy.get(Constants.dashboardCreateSave_btn).should('be.visible').click({ force: true });
       */
    cy.wait(Constants.wait);
    //Click on Add Widget Button
    cy.get(Constants.dashboardAddNewWidget_btn).should('be.visible').click({ force: true });

    cy.wait(Constants.mediumWait);
    cy.get(Constants.dashBoardwidgetSelect_lbl).contains('Select a widget below.').should('be.visible');
    //Add widget
    AddWidgets('Recent File Activity');

    //Function to create dashboard end with one widget end
    cy.wait(Constants.wait);
    cy.wait(Constants.wait);
    //click on Content Tab 
    cy.get(Constants.ContentIcon_tab).click();
    cy.wait(Constants.wait);
    //click back to Dashboard Tab 
    cy.get(Constants.DashBoardIcon_tab).click();
    cy.wait(Constants.wait);
    //Verify that Dashboard is opened
    DeleteDashboard('span.dashboard-span[title= "' + dashboardName + '"]');

  });
  /**
    ** Functionality to Delete Dashboard
    */
  it('Audience Test', () => {
    //create private Dashboard
    CreatePrivateDashboardwithName(dashboardName);
    cy.wait(Constants.mediumWait);

    //Click on Add Widget Button
    cy.get(Constants.dashboardAddNewWidget_btn).should('be.visible').click({ force: true });
    //Add WCO widget
    cy.wait(Constants.mediumWait);
    cy.get(Constants.dashBoardwidgetSelect_lbl).contains('Select a widget below.').should('be.visible');
    //click DropDown
    cy.get(Constants.dashBoardwidgetSelect_dropdown).click();
    cy.wait(Constants.wait);
    //Select WCO widget
    cy.get(Constants.dashboardWidgetSelectWCO_dropdown).click();
    //Select Audience 
    cy.get('span.card-text').contains('Audience').click({ force: true });
    //Select Save
    cy.get(Constants.dashboadAddWidgetSave_btn).contains('Save').click({ force: true });
    //mouse hover code add
    //click on Conversations
    cy.wait(Constants.wait);
    cy.get(Constants.dashboardConversationFilter_dropdown).click();
    //Verify 
    cy.get('.legend-wrapper').contains(' Chrome ').should('be.visible');
    //click on Grid View
    cy.get(Constants.dashboardWidgetFooter_lbl).contains('Grid View').click();
    cy.wait(Constants.wait);
    //click on chart view
    cy.get(Constants.dashboardWidgetFooter_lbl).contains('Chart View').click();
    cy.wait(Constants.mediumWait);
    //Click on Drop Down
    cy.get('.top-controls > .ui-inputwrapper-filled > .ui-dropdown > .ui-dropdown-trigger').click();
    cy.wait(Constants.wait);
    //click on operating system 
    cy.get(Constants.dashboardWidgetSelectWCO_dropdown).click();
    //Click on Visits Radio button
    cy.get(':nth-child(1) > label > .ng-valid').click();
    //ledgend item conatins window
    cy.get('.legend-wrapper').contains('Windows').should('be.visible');
    //Click on Drop Down
    cy.get('.top-controls > .ui-inputwrapper-filled > .ui-dropdown > .ui-dropdown-trigger').click();
    //click on ScreenSize
    cy.get('.ui-dropdown-items > :nth-child(3)').click();
    //ledgend item conatins window
    cy.get('.legend-wrapper').contains('1920x1080').should('be.visible');
    //click on language
    //Click on Drop Down
    cy.get('.top-controls > .ui-inputwrapper-filled > .ui-dropdown > .ui-dropdown-trigger').click();
    //click on language
    cy.get('.ui-dropdown-items > :nth-child(4)').click();
    //ledgend item conatins window
    cy.get('.legend-wrapper').contains('en-us').should('be.visible');
    //Click on Country
    //Click on Drop Down
    cy.get('.top-controls > .ui-inputwrapper-filled > .ui-dropdown > .ui-dropdown-trigger').click();
    //click on Country
    cy.get('.ui-dropdown-items > :nth-child(5)').click();

    cy.get(Constants.dashboardWidgetSettingd_btn).click();
    //Delete widget
    cy.get(Constants.dashboardWidgetDelete_btn).click();

    //Verify that Alert Should Appear
    cy.get(Constants.dashboardDeleteAlert_lbl).contains('Are you sure you want to delete this item?').should('be.visible');
    //Delete
    cy.get(Constants.dashboardWidgetDeleteWidgetAlert_btn).click();
    //cy.wait(Constants.wait);
    //verify toast message
    cy.get(Constants.toastNotificationMessage).contains('Successfully deleted dashboard widget.').should('be.visible');
    cy.wait(Constants.wait);
    //delete Dashboard
    DeleteDashboard('span.dashboard-span[title= "' + dashboardName + '"]');
  });
  /*
  **Analytical Chart
  */
  it('Analytical Chart', () => {
    CreatePrivateDashboardwithName(dashboardName);
    cy.wait(Constants.mediumWait);

    //Click on Add Widget Button
    cy.get(Constants.dashboardAddNewWidget_btn).should('be.visible').click({ force: true });
    //Add WCO widget
    cy.wait(Constants.mediumWait);
    cy.get(Constants.dashBoardwidgetSelect_lbl).contains('Select a widget below.').should('be.visible');
    //click DropDown
    cy.get(Constants.dashBoardwidgetSelect_dropdown).click();
    cy.wait(Constants.wait);
    //Select WCO widget
    cy.get(Constants.dashboardWidgetSelectWCO_dropdown).click();
    //Select Audience 
    cy.get('span.card-text').contains('Analytics Charts').click({ force: true });
    //save
    cy.get(Constants.dashboadAddWidgetSave_btn).contains('Save').click({ force: true });
    cy.wait(Constants.wait);
    //cy.get('.stats-information > :nth-child(1)').contains('Visits: ').should('be.visible');
    //click on next arrow
    cy.get('.chart-selector-options > .fa-caret-right').click();
    cy.wait(Constants.wait);
    //check how to verify 
    /*cy.get('.stats-information > :nth-child(1)').contains('Conversions: ').should('be.visible');
    //Click on Next arrow
   // cy.get('.chart-selector-options > .fa-caret-right').click();
  //  cy.wait(Constants.wait);
   // cy.get('.stats-information > :nth-child(1)').contains('Conversion Rate: ').should('be.visible');
   */

    //Delete widget 
    //Click on settings of widget
    cy.get(Constants.dashboardWidgetSettingd_btn).click();
    //Delete widget
    cy.get(Constants.dashboardWidgetDelete_btn).click();
    cy.wait(Constants.wait);
    //Verify that Alert Should Appear
    cy.get(Constants.dashboardDeleteAlert_lbl).contains('Are you sure you want to delete this item?').should('be.visible');
    //Delete
    cy.get(Constants.dashboardWidgetDeleteWidgetAlert_btn).click();
    // cy.wait(Constants.wait);
    //verify toast message
    cy.get(Constants.toastNotificationMessage).contains('Successfully deleted dashboard widget.').should('be.visible');
    cy.wait(Constants.wait);
    //delete Dashboard
    DeleteDashboard('span.dashboard-span[title= "' + dashboardName + '"]');
  });
  /*
  **Content Chart
  */
  it('Content', () => {
    CreatePrivateDashboardwithName(dashboardName);
    cy.wait(Constants.mediumWait);

    //Click on Add Widget Button
    cy.get(Constants.dashboardAddNewWidget_btn).should('be.visible').click({ force: true });
    //Add WCO widget
    cy.wait(Constants.mediumWait);
    cy.get(Constants.dashBoardwidgetSelect_lbl).contains('Select a widget below.').should('be.visible');
    //click DropDown
    cy.get(Constants.dashBoardwidgetSelect_dropdown).click();
    cy.wait(Constants.wait);
    //Select WCO widget
    cy.get(Constants.dashboardWidgetSelectWCO_dropdown).click();
    //Select Audience 
    cy.get('span.card-text').contains('Content').click({ force: true });
    //save
    cy.get('button.blue-btn.btn.btn-primary').contains('Save').click({ force: true });
    cy.wait(Constants.wait);
    //Visits Radio Button
    cy.get('.visits-conversions > :nth-child(1) > label').contains('Visits').should('be.visible');
    cy.wait(Constants.wait);
    //Conversation Radio Button
    cy.get('.visits-conversions > :nth-child(2) > label').contains('Conversion').should('be.visible');
    //click on Grid View 
    cy.get(Constants.dashboardWidgetFooter_lbl).click();

    //Click on Chart 
    cy.get(Constants.dashboardWidgetFooter_lbl).contains('Chart').should('be.visible');
    cy.get(Constants.dashboardWidgetFooter_lbl).contains('Chart').click();

    //Delete widget 
    //Click on settings icon of widget
    cy.get(Constants.dashboardWidgetSettingd_btn).click();
    //Delete widget
    cy.get(Constants.dashboardWidgetDelete_btn).click();
    cy.wait(Constants.mediumWait);
    //Verify that Alert Should Appear
    cy.get(Constants.dashboardDeleteAlert_lbl).contains('Are you sure you want to delete this item?').should('be.visible');
    //Delete
    cy.get(Constants.dashboardWidgetDeleteWidgetAlert_btn).click();
    // cy.wait(Constants.wait);
    //verify toast message
    cy.get(Constants.toastNotificationMessage).contains('Successfully deleted dashboard widget.').should('be.visible');
    cy.wait(Constants.wait);
    //delete Dashboard
    DeleteDashboard('span.dashboard-span[title= "' + dashboardName + '"]');
  });


});