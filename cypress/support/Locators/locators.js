export default {
    //Crownpeak URL under test
    // https://rc.crownpeak.com/WTFDXM/V3/#/login
    // https://cms2.crownpeak.net/QAAdventGeneral1/V3/#/login
    // https://intr1.cprd.io/Snoop/V3/#/login

    url: 'https://intr1.cprd.io/Snoop/V3/#/login',
    build: '58046',
    // Constant/Variables
    usernameInput: 'user1',
    passwordInput: 'Password1!',
    dbConnectionTruthy: false,
    automationBoxName: 'AutomationBox',

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

    // Links to verify
    linkSupport_url: 'http://www.crownpeak.com/Support/Index.aspx',
    linkDocumentationBestPractices_url: 'http://stagedeveloper.crownpeak.com/Documentation/BestPractices/Version-3-Guide/Version-3-Guide.html',
    linkPrivacy_url: 'https://www.crownpeak.com/privacy/',
    //Logout Locators
    logoutImg_icon: 'img.cpAvatar',
    signOut_lnk: '#topbarSignOut',
    linkReleaseNotes_url: 'https://support.crownpeak.com/s/article/ka01W0000004nWtQAI/DXM-Release-Notes',

    //Publishing script folder name, site root name
    folderName: 'TestAutomation',
    siteRootName: 'NewSite',

    // File Creation Locators
    SearchFilterOptionFromRoot: '[ng-click="vm.toggleSearchDropdown(true)"] > cp-svg',
    searchBox: 'div.cpInput.input-group.input-group-sm > input.searchInput[type=\'text\']',
    searchedFolderBreadCrumb: 'a.crumbsLink.ng-binding',

    // SearchSiteRoot Locators
    SearchFilterOptionFromRoot: '[ng-click="vm.toggleSearchDropdown(true)"] > cp-svg',
    SearchCheckPlaceHolder: '[placeholder="Label"]',
    SearchApplyButton: '.btn-primary',

    //Content block Locators
    ContentBlock: 'div[title=\'Content\']',
    assetName: 'div.assetRow.ng-scope',

    // SiteRoot sub-menu locator
    SubMenuOptions: 'span.name',

    // SiteRoot Pop-up Locators
    PopupDialog: 'div[role=dialog]',
    PopUpHeader: 'p-header',
    SiteRootInputBox: '#siteRootInput',
    SiteRootPopUpCheckbox: 'div.checkbox',
    SiteRootCheckBoxLength: '.checkbox.ng-star-inserted',
    SiteRootCheckBoxChild: '.checkbox.ng-star-inserted > label',

    // Site Root Save Button locators
    DialogCreate_btn: '.ui-dialog-footer',
    DialogCreateChildren: 'p-footer',

    // Filter Locators
    filterOptionFromRoot_icn: '[ng-click="vm.toggleSearchDropdown(true)"] > cp-svg',
    filterCheckPlaceHolder_txtBx: '[placeholder="Label"]',
    filterApply_btn: '.btn-primary',
    template_filter_icon: 'asset-browser.ng-star-inserted > .cpWidgetHeader > :nth-child(1) > .btn-group-sm > .filterButton > cp-svg > svg',
    searched_folder_lnk: 'asset-browser.ng-star-inserted > .tree > .assetList > :nth-child(2) > .assetRow > .assetLabel > .assetLabelLink',

    //Asset Popup Locators
    AssetInputBox: '#label',
    TemplatePathOfAsset: 'span.new-file-template-path',

    //Assets in SiteRoot
    ListOfAssetsInSiteRoot: '.assetLabelLink.ng-binding',
    EditAsset: 'body > ul > li > span:nth-child(6) > div > button > span',
    DebugConsole: '.img-debug-button',

    //Select Asset Popup Locators
    SelectAsset_label: 'asset-browser.ng-star-inserted > .head > .assetRow > .assetLabel > .assetLabelLink',
    // Template DailogBox Locators
    TemplateDialog: 'div[role=dialog]',
    TemplateDialogInput_lbl: '.control-label',
    TemplateDialogInput_txtbx: '#projectInput',

    //Input.aspx child
    InputNthChild_div: ':nth-child',
    CloseInputAspxFile_tab: '.tabCloseButton',

    //Select Root Icon and click on SiteRoot Name
    ClickOnRoot_icn: '.crumbsDropdownToggleButton',
    ClickOnSiteRootFolderName_lnk: 'body.ng-scope:nth-child(2) div.main:nth-child(2) content-module.ng-scope.ng-isolate-scope:nth-child(2) div.side.left.absolute:nth-child(2) div.widget:nth-child(1) panel-container.ng-isolate-scope div.widgetContainer.ng-scope file-panel-widget.ng-scope.ng-isolate-scope asset-browser.ng-isolate-scope div.crumbs:nth-child(3) div.overflow.dropdown.dropdown-toggle.open ul.dropdown-menu.cpDropdown.menuWidth li:nth-child(1) > button.crumbsDropdownFolderButton.ng-scope:nth-child(4)',

    //File menu
    File_menu: 'button#topbarFileMenuToggle',
    File_New_menu: 'button#topbarNewMenuToggle',
    upload_header_lbl: 'div.modal-title:nth-child(3)',
    File_New_CreateFile_menu: 'body.ng-scope:nth-child(2) div.topbar.ng-scope topbar.ng-isolate-scope span.leftButtons.ng-scope span.dropdown.open:nth-child(1) ul.cpDropdown.dropdown-menu.fileMenuWidth li:nth-child(1) div.nested-dropdown.ng-scope.dropdown:nth-child(1) ul.cpDropdown.dropdown-menu.padding.fileMenuWidth span.ng-scope:nth-child(3) > button.newMenuButton.ng-scope',
   File_New_Upload_menu: 'p-header > :nth-child(3)',
    //File Dialog box
    FileDialogBoxInputBox_txtbx: '.new-file-name-input > span',
    FileDialogBoxBrowse_btn: 'button.btn.btn-primary:contains(\'Browse\')',
    FileDialogBoxCreate_btn: 'button.btn.btn-primary',
    
    //WYSIWYG And Frame Locators
    WYSIWYGiFrame: 'iframe',
    WYSIWYGTextArea_txtbx: '#tinymce',

    //SiteRoot Folder Structure element Locators
    AssetWithinSiteRoot: '_Assets',
    SiteConfigWithinSiteRoot: '_Site Config',
    ComponentProjectWithinSiteRoot: 'Component Project',
    DemoPageWithinSiteRoot: 'Demo Page',
    PageWithinSiteRoot: 'Page',

    //After selecting Model click on Content Page and opens up the Pop-up
    CreateAssetInput_box: '#modelInput',

    //Open Created Asset and click on Expandbar
    MainExpandBar_lnk: 'div.expandbar',
    PageWithinSiteRoot: 'Page',

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
    dockablePanel_popup: '.dropdown-menu.dropdown-preview.ng-scope',

    // Template DailogBox Locators
    TemplateDialog: 'div[role=dialog]',
    TemplateDialogInput_lbl: '.control-label',
    TemplateDialogInput_txtbx: '#projectInput',

    //Input.aspx child
    InputNthChild_div: ':nth-child',
    CloseInputAspxFile_tab: '.tabCloseButton',

    //Select Root Icon and click on SiteRoot Name
    ClickOnRoot_icn: '.crumbsDropdownToggleButton',
    ClickOnSiteRootFolderName_lnk: 'body.ng-scope:nth-child(2) div.main:nth-child(2) content-module.ng-scope.ng-isolate-scope:nth-child(2) div.side.left.absolute:nth-child(2) div.widget:nth-child(1) panel-container.ng-isolate-scope div.widgetContainer.ng-scope file-panel-widget.ng-scope.ng-isolate-scope asset-browser.ng-isolate-scope div.crumbs:nth-child(3) div.overflow.dropdown.dropdown-toggle.open ul.dropdown-menu.cpDropdown.menuWidth li:nth-child(1) > button.crumbsDropdownFolderButton.ng-scope:nth-child(4)',

    //File Dialog box
    FileDialogBoxInputBox_txtbx: '.new-file-name-input > span',
    FileDialogBoxBrowse_btn: 'button.btn.btn-primary:contains(\'Browse\')',
    FileDialogBoxCreate_btn: 'button.btn.btn-primary',

    //WYSIWYG And Frame Locators
    WYSIWYGiFrame: 'iframe',
    WYSIWYGTextArea_txtbx: '#tinymce',

    // WYSIWYG text area locator
    wysiwyg_txtarea: '#tinymce',

    // Reports page locators
    reportsSection_lnk: 'p-header',

    // SiteRoot Page
    siteRootAssetsName_lnk: '.crumbsLink',

    // Folder Dailog box
    FolderDialog_box: '#folderInput',
    ModelPromptFilter_Icon: '.ng-scope.ng-isolate-scope > .cpWidgetHeader > :nth-child(1) > .btn-group-sm > .filterButton > cp-svg > svg',
    AllDirectories_rdbtn: '.filter > :nth-child(3) > .ng-binding',
    ModelApply_btn: '.filter > .btn-primary',
    SearchedItemDialogBox: '[ng-click="vm.accept(vm.asset)"]',
    DialogBoxCreate_btn: 'p-footer > .btn-primary',
    SearchForAnyFolderFile: 'a.assetLabelLink.ng-binding',
    FileDialogBoxCreate_btn: 'button.btn.btn-primary',
    SearchCheckPlaceHolder: '[placeholder="Label"]',

    // Content page form locators
    NumberOfAssetsToClone: 5,

    // Left menu navigation
    LeftMenuModuleContent_lnk: '.module.content',
    modelOptionInSubMenu_lnk: 'span.name',
    ModelOptionWithinSubMenu1_lbl: 'span',

    //After selecting Model click on Content Page and opens up the Pop-up
    CreateAssetInput_box: '#modelInput',


    //Open Created Asset and click on Expandbar
    MainExpandBar_lnk: 'div.expandbar',
    ContentIcon_tab: '.content > .icon',
    DashBoardIcon_tab: '.dashboard > .icon',

    // Reports page locators
    reportsSection_lnk: 'p-header',

    //Dashboard Locators
    dashBoardDropDown_btn: '.dashboard-dropdown-container > .topbutton',
    dashboadDropDown_dropdown: 'div[title=\'Dashboard\']',
    dashboardAddNewDashboard_btn: 'button > .ui-g > .ui-g-12',
    dashboardAddNewControl_lbl: '.control-label',
    dashboardAddtoFavorites_lbl: '.ui-g-12',
    dashboardSelectWidget_lbl: 'span.select-widget',
    dashboadWidgetAddSuccessMessage_lbl: 'span.ng-star-inserted',
    dashboadAddWidgetSave_btn: 'button.blue-btn.btn.btn-primary',
    dashboardSettings_btn: 'span.cog-span',
    dashboardDelete_btn: '.pull-right > cp-svg',
    dashboardDeleteAlert_lbl: '.modal-body > .ng-star-inserted',
    dashboadDeleteAlertDelete_btn: '.btn-danger',
    dashboardToastMessage_lbl: '.toast',

    
    //FolderSetup Test case Locators
    // Folder Dailog box
    FolderDialog_box: '#folderInput',
    ModelPromptFilter_Icon: '.ng-scope.ng-isolate-scope > .cpWidgetHeader > :nth-child(1) > .btn-group-sm > .filterButton > cp-svg > svg',
    AllDirectories_rdbtn : '.filter > :nth-child(3) > .ng-binding',
    ModelApply_btn:'.filter > .btn-primary',
    SearchedItemDialogBox:'[ng-click="vm.accept(vm.asset)"]',
    DialogBoxCreate_btn:'p-footer > .btn-primary',
    SelectCreatedModelFolder:'.asset > .assetRow > .assetLabel > .assetLabelLink',

    //DashBoard Create 
    dashboardCreateName_txtBx: '.form-control',
    dashboardCreateSave_btn: '.blue-btn',
    dashboardCreatePrivate_rbtn: '.margin-left-radio > .radio > .normal-font > .ng-pristine',
    dashboardCreatePublic_rbtn: 'input.ng-valid.ng-touched.ng-dirty',
    dashBoardCreateCancel_btn: 'button.cancel.btn',
    dashboardAddNewWidget_btn: '.name > .add-icon > svg',
    dashBoardWidgetCategory_lbl: '.control-label',
    dashboardWidgetSettingd_btn: '.dw-settings-btn > cp-svg > #Layer_1',
    dashboardWidgetDelete_btn: '#svg14',
    dashboardWidgetDeleteMessage_lbl: 'p.ng-star-inserted',
    dashBoardwidgetSelect_lbl: 'span.select-widget',
    dashBoardwidgetSelect_dropdown: '.ui-dropdown-trigger',
    dashboardWidgetSelectWCO_dropdown: '.ui-dropdown-items > :nth-child(2)',
    dashboardWidgetDeleteWidgetAlert_btn: '.btn-danger',

    dashboardCollectionFilter_dropdown: ':nth-child(1) > .ui-inputwrapper-filled > .filter-dropdown > .ui-dropdown-trigger',
    dashboardConversationFilter_dropdown: ':nth-child(2) > label > .ng-untouched',
    dashboardWidgetFooter_lbl: '.footer-wrapper > .ng-star-inserted',

    //dashboard Controls
    dashboardWidgetTitle_lbl: '.legend-item',
    dashbordNoData_lbl: '.no-data',
    //Content Tab
    ContentTab_tab:'div[title=\'Content\']',
    SettingsTab_tab: 'div[title=\'Settings\']',
    ContentIcon_tab:'.content > .icon',
    DashBoardIcon_tab: '.dashboard > .icon',
    //click on user menu 
    userMenu_btn: 'button#topbarUserMenuToggle',
    userSignout_btn: 'button#topbarSignOut',

    //DAM Panel Locators
    display_4squares_icon: 'div.cpButtons.dropdown > #damPanelViewButton > cp-svg > #Layer_1',
    display_4squares_gridView: '.open > .dropdown-menu > :nth-child(1)',
    display_4squares_listView: '.open > .dropdown-menu > :nth-child(2)',
    display_4squares_fullView: '.open > .dropdown-menu > :nth-child(3)',
    collapseDAMToRight: 'div.side.right > div:nth-child(1) > panel-container > div > div.tabs.clearfix > div > button:nth-child(2)',
    expandDAMBackToOriginal: 'div.side.right.collapsed > div:nth-child(1) > panel-container > div > div.tabs.clearfix > div > button:nth-child(1)',
    sortImagesInDAM_lnk: '#damPanelSortButton > cp-svg > #Layer_1',
    sortImagesInDAM_AtoZ: '.open > .dropdown-menu > :nth-child(1)',
    sortImagesInDAM_ZtoA: '.open > .dropdown-menu > :nth-child(2)',
    sortImagesInDAM_MostRecent: '.open > .dropdown-menu > :nth-child(3)',
    collectionDropdown: '.caret-down',
    newlyCreatedCollectionName: '.collection-items > :last > .ng-binding',
    renameNewlyCreatedCollection: 'div.ui-g.collection-container.ng-scope > div > div > ul > li:last-child > div',
    asset1InCollection: '#damScroller > div:nth-child(1) > div',
    asset2InCollection: '#damScroller > div:nth-child(2) > div',


    //Bulk Select in DAM
    manage_link: '.bulk-button',
    bulkSelect_selectCollections: '.control-label',
    bulkSelect_newCollections: '.new-collection-margin',
    bulkSelect_done_link: '.done-button',
    bulkSelect_cancel_link: '.cancel-button',
    bulkSelect_Collection_txt: '[ng-if="vm.isAddCollection"] > .form-control',
    bulkSelect_Collection_chk: '.check-icon > svg',
    bulkSelect_Collection_delete: '.close-icon > svg',
    bulkSelect_Collection_list: '.collection-items',
    bulkSelect_Asset1: '#damScroller > div:nth-child(1) > div > div.custom-checkbox.ng-scope > input[type="checkbox"]',
    bulkSelect_Asset2: '#damScroller > div:nth-child(2) > div > div.custom-checkbox.ng-scope > input[type="checkbox"]',
    bulkSelect_Asset3: '#damScroller > div:nth-child(3) > div > div.custom-checkbox.ng-scope > input[type="checkbox"]',
    bulkSelect_lastCollection: '.collection-items > :last > .ng-binding',
    bulkSelect_lastCollection_delete: '.collection-items > :last > div.pull-right > span:nth-child(1)',
    bulkSelect_DeletePopup_Confirm: '.btn-danger',

    //Tab Test Locators
    open_Asset_lnk: ':nth-child(5) > .assetRow > .assetLabel > .assetLabelLink',
    content_tab:'body.ng-scope:nth-child(2) div.main:nth-child(2) content-module.ng-scope.ng-isolate-scope:nth-child(2) section.content-module.ng-pristine.ng-untouched.ng-valid.ng-not-empty.rightWidgetCollapsed.hasLeftWidget:nth-child(1) main.preview main.edit.ng-scope.form-pane:nth-child(2) edit-form-pane.ng-scope form.ng-untouched.ng-pristine.ng-valid div.control div.expandable.expandcontainer edit-form-control.nestedControl div.control div.expandable.tabcontainer div.basic-wizard ul.nav.nav-pills.nav-justified li.active:nth-child(1) > a:nth-child(1)',
    tagging_tab:'body.ng-scope:nth-child(2) div.main:nth-child(2) content-module.ng-scope.ng-isolate-scope:nth-child(2) section.content-module.ng-pristine.ng-untouched.ng-valid.ng-not-empty.rightWidgetCollapsed.hasLeftWidget:nth-child(1) main.preview main.edit.ng-scope.form-pane:nth-child(2) edit-form-pane.ng-scope form.ng-untouched.ng-pristine.ng-valid div.control div.expandable.expandcontainer edit-form-control.nestedControl div.control div.expandable.tabcontainer div.basic-wizard ul.nav.nav-pills.nav-justified li:nth-child(2) > a:nth-child(1)',
    people_tab:'body.ng-scope:nth-child(2) div.main:nth-child(2) content-module.ng-scope.ng-isolate-scope:nth-child(2) section.content-module.ng-pristine.ng-untouched.ng-valid.ng-not-empty.rightWidgetCollapsed.hasLeftWidget:nth-child(1) main.preview main.edit.ng-scope.form-pane:nth-child(2) edit-form-pane.ng-scope form.ng-untouched.ng-pristine.ng-valid div.control div.expandable.expandcontainer edit-form-control.nestedControl div.control div.expandable.tabcontainer div.basic-wizard ul.nav.nav-pills.nav-justified li:nth-child(3) > a:nth-child(1)',
    topics_tab:'body.ng-scope:nth-child(2) div.main:nth-child(2) content-module.ng-scope.ng-isolate-scope:nth-child(2) section.content-module.ng-pristine.ng-untouched.ng-valid.ng-not-empty.rightWidgetCollapsed.hasLeftWidget:nth-child(1) main.preview main.edit.ng-scope.form-pane:nth-child(2) edit-form-pane.ng-scope form.ng-untouched.ng-pristine.ng-valid div.control div.expandable.expandcontainer edit-form-control.nestedControl div.control div.expandable.tabcontainer div.basic-wizard ul.nav.nav-pills.nav-justified li:nth-child(4) > a:nth-child(1)',
    metadata_tab:'body.ng-scope:nth-child(2) div.main:nth-child(2) content-module.ng-scope.ng-isolate-scope:nth-child(2) section.content-module.ng-pristine.ng-untouched.ng-valid.ng-not-empty.rightWidgetCollapsed.hasLeftWidget:nth-child(1) main.preview main.edit.ng-scope.form-pane:nth-child(2) edit-form-pane.ng-scope form.ng-untouched.ng-pristine.ng-valid div.control div.expandable.expandcontainer edit-form-control.nestedControl div.control div.expandable.tabcontainer div.basic-wizard ul.nav.nav-pills.nav-justified li:nth-child(5) > a:nth-child(1)',
    tabsTest_tab:'body.ng-scope:nth-child(2) div.main:nth-child(2) content-module.ng-scope.ng-isolate-scope:nth-child(2) section.content-module.ng-pristine.ng-untouched.ng-valid.ng-not-empty.rightWidgetCollapsed.hasLeftWidget:nth-child(1) main.preview main.edit.ng-scope.form-pane:nth-child(2) edit-form-pane.ng-scope form.ng-untouched.ng-pristine.ng-valid div.control div.expandable.expandcontainer edit-form-control.nestedControl div.control div.expandable.tabcontainer div.basic-wizard ul.nav.nav-pills.nav-justified li:nth-child(6) > a:nth-child(1)',

    // Upload file/image dialogbox locator
    upload_file_icon: '#hiddenPicker',

    //Check Model options 
    ModelOptionInSubMenu_lnk:'span',
    ModelOptionWithinSubMenu_lbl:'span.ng-binding',

    //Others
    createdOn_lbl: 'section.createSection.ng-scope:nth-child(3) > div:nth-child(2) > span',
    ok_btn: 'button',
    select_dropdownvalue_lnk: 'select',
    module_Save_btn : '#contentModuleSave',
    dialogbox_OK_btn : 'p-footer > :nth-child(3)',
    selectvalue_list : '.option.ng-star-inserted',
    textArea_txtbx : '.form-control.ng-pristine.ng-valid.ng-star-inserted.ng-touched',
    ModelOptionWithinSubMenu_lbl:'.cpMenuItem.header.ng-star-inserted > span',

}