export default {
    //Crownpeak URL under test
    //url: 'https://rc.crownpeak.com/Snoop/V3/#/login',
    url: 'https://cms2.crownpeak.net/QAAdventGeneral1/V3/#/login',
    
    // Constant/Variables
    usernameInput: 'smokeqa2',
    passwordInput: 'Password1@',
    dbConnectionTruthy: true,
    // https://cms2.crownpeak.net/QAAdventGeneral1/
    // https://intr1.cprd.io/
    originHeader: 'https://rc.crownpeak.com',
    
 
    // Wait Categories (Time in milliseconds)
    wait: 5000,
    shortWait: 15000,
    mediumWait: 30000,
    longWait: 60000,
 
    // Login Page Locators
    loginUserName_txt: 'input#username',
    loginPassword_txt: 'input#password',
    loginLogin_btn: 'button.primary.full-width',
    loginVersion_lbl: 'version.ng-binding',
    loginForgot_lnk: '#loginForgotLink',
    loginForgot_txt: '.forgotText',
    loginForgotPasswordBack_lnk: '#loginForgotPasswordBack',
    loginError_txt: '.error-group > :nth-child(2)',
 
    //Notification text message locators
    toastNotificationMessage: '.toast-message',
 
    //Reports
    reportsHeader_txt: 'span.title-left.title-text',
    // Links to verify
    linkSupport_url: 'http://www.crownpeak.com/Support/Index.aspx',
    linkDocumentationBestPractices_url: 'http://stagedeveloper.crownpeak.com/Documentation/BestPractices/Version-3-Guide/Version-3-Guide.html',
    linkPrivacy_url: 'https://www.crownpeak.com/privacy/',
    linkReleaseNotes_url: 'https://support.crownpeak.com/s/article/ka01W0000004nWtQAI/DXM-Release-Notes',
 
    //Publishing script folder name, site root name
    folderName: 'TestAutomation',
    siteRootName: 'NewSite',
 
    // File Creation Locators
    searchBox: 'div.cpInput.input-group.input-group-sm > input.searchInput[type=\'text\']',
    searchedFolderBreadCrumb: 'a.crumbsLink.ng-binding',
 
    // Filter Locators
    filterOptionFromRoot_icn: '[ng-click="vm.toggleSearchDropdown(true)"] > cp-svg',
    filterCheckPlaceHolder_txtBx: '[placeholder="Label"]',
    filterApply_btn: '.btn-primary',
 
    // Dockable Panel Tabs locators
    dockablePanelFile_tab: '#panelContainerDrag-file-panel-widget',
    dockablePanelInformation_tab: '#panelContainerDrag-information-panel-widget',
    dockablePanelConversations_tab: '#panelContainerDrag-conversations-panel-widget',
    dockablePanelContentBlock_tab: '#panelContainerDrag-content-block-panel-widget',
    dockablePanelDigitalAssetManagement_tab: '#panelContainerDrag-dam-panel-widget',
    dockablePanelWCOTargeting_tab: '#panelContainerDrag-targeting-panel-widget',
    dockablePanelWCOReporting_tab: '#panelContainerDrag-reports-panel-widget',
    dockablePanelWCOTesting_tab: '#panelContainerDrag-testing-panel-widget',
    dockablePanelDigitalQualityManagement_tab: '#panelContainerDrag-dqm-panel-widget',
    dockablePanelProperties_tab: '#panelContainerDrag-properties-panel-widget',
    dockablePanel_lbl: 'span.dockable',
    dockablePanel_popup: '.dropdown-menu.dropdown-preview',
 
    // WYSIWYG text area locator
    wysiwyg_txtarea: '#tinymce',
 
    // Reports page locators
    reportsSection_lnk: 'p-header',
    
    // SiteRoot Page
    siteRootAssetsName_lnk: '.assetLabelLink.ng-binding',
    modelOptionInSubMenu_lnk:'span.name',
 
 }
