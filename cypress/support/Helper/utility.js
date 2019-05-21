import Constants from '../Locators/locators'
var dbConnectivityFile = 'cypress/support/DBCode/connectmysql.js';
import MenuItems from '../Helper/menuPageObject';
const MenuPageObject = new MenuItems();

var testExecutionStatus = "";
var testValidity = 0;
var elapsedTimeInMs = 0;
export class UtilityClass {

    /*Method to generate database record with Test information: To be called in AfterEach method.
       InputParams: testCaseName [Name of the test case]
       InputParams: testCategory [Category of the test case]
       InputParams: testCurrentState [Status [Pass/Fail] of the test case]
       InputParams: testCurrentDuration [Duration of the test case execution]
    */
    fetchAfterEach(testCaseName, testCategory, testCurrentState, testCurrentDuration) {
        console.log("Execution ends for test name " + testCaseName);

        console.log("test name is " + testCaseName);
        console.log("test category is " + testCategory);

        testExecutionStatus = testCurrentState;
        console.log("testExecutionStatus is " + testExecutionStatus);

        elapsedTimeInMs = testCurrentDuration;
        console.log("time elapsed " + elapsedTimeInMs);

        var durations = this.convertMS(elapsedTimeInMs);
        console.log("minutes" + durations.minute);
        console.log("seconds" + durations.seconds);

        var elapsedTime = durations.minute + " mins " + durations.seconds + " secs ";

        console.log("elapsedTime " + elapsedTime);

        const nodeCommand = 'node ' + dbConnectivityFile + ' "' + testCaseName + '" "' + testCategory + '" ' + testExecutionStatus + ' ' + testValidity + ' "' + elapsedTime + '"';

        console.log("command for storing data in database is " + nodeCommand);

        cy.exec(nodeCommand).then((result) => {
            console.log("DB read/write");
            console.log(result.stdout);
            result.stdout.length;

        });
    }

    /* Converts Milliseconds to return: Day+Hour+Minute+Seconds
       InputParams: milliseconds [value in milliseconds to be converted]    
    */
    convertMS(milliseconds) {
        var day, hour, minute, seconds;
        seconds = Math.floor(milliseconds / 1000);
        minute = Math.floor(seconds / 60);
        seconds = seconds % 60;
        hour = Math.floor(minute / 60);
        minute = minute % 60;
        day = Math.floor(hour / 24);
        hour = hour % 24;
        return {
            day: day,
            hour: hour,
            minute: minute,
            seconds: seconds
        };
    }

    /* Login method: To be used in before all for login
     */
    loginCrownpeak() {
        cy.visit(Constants.url);
        cy.wait(Constants.wait);
        cy.log('**V3 Log In screen should appear with correct build number next to Version**');
        cy.title().should('eq', 'Crownpeak V3 - Log In');
        // cy.get('.version.ng-binding').should('have.text', 'Version ' + Constants.build);
        cy.get(Constants.loginUserName_txt).should('be.visible').type(Constants.usernameInput);
        cy.get(Constants.loginPassword_txt).should('be.visible').type(Constants.passwordInput);
        cy.get(Constants.loginLogin_btn).should('be.visible').click();
        cy.log('**User should log in to application with no errors.**');
        cy.get(Constants.loginVersion_lbl).should('not.be.visible');

        // cy.wait(35000);

        // cy.title().should('eq', 'Crownpeak V3 - Content');
    }

    /* Method to Insert Text in WYSIWYG component
       InputParams: textToInsert [Text to insert inside the WYSIWYG iframe]
    */
    insertTextInWYSIWYGIframe(textToInsert) {
        cy.get('iframe').then(($iframe) => {
            const doc = $iframe.contents();
            cy.wrap(doc.find(Constants.wysiwyg_txtarea)).click();
            cy.wrap(doc.find(Constants.wysiwyg_txtarea)).clear();
            cy.wrap(doc.find(Constants.wysiwyg_txtarea)).then(($textArea) => {
                $textArea.text(textToInsert);
            });
        });
    }

    /* Method to select an image in Image component
        InputParams: siteRootName [Name of the Site Root created]
        InputParams: imageName [Name of the image to be selected.]
        InputParams: waitTime [Wait durtation in milliseconds]
    */
    selectImageInImageComponent(siteRootName, imageName, waitTime) {
        cy.get('.acquireImageRow > .fileupload > .btn-file').click();
        cy.wait(Constants.wait);
        // cy.get('asset-browser.ng-star-inserted > .head > .assetRow > .assetLabel > .assetLabelLink').click();
        cy.get('asset-browser.ng-star-inserted:nth-child(1) a.assetLabelLink.ng-binding').contains('_Assets').trigger('dblclick', {
            force: true
        });
        cy.wait(waitTime);
        //cy.get('asset-browser.ng-star-inserted > .head > .assetRow > .assetLabel > .assetLabelLink').click();
        cy.get('asset-browser.ng-star-inserted:nth-child(1) a.assetLabelLink.ng-binding').contains('images').trigger('dblclick', {
            force: true
        });
        cy.wait(waitTime);
        //cy.get('asset-browser.ng-star-inserted > .head > .assetRow > .assetLabel > .assetLabelLink').click();
        cy.get('asset-browser.ng-star-inserted:nth-child(1) a.assetLabelLink.ng-binding').contains(imageName).trigger('dblclick', {
            force: true
        });
        cy.wait(waitTime);
        cy.get('.file-path-label').should('have.text', '/' + siteRootName + '/_Assets/images/' + imageName + '');
        cy.wait(waitTime)
    }

    /*  Search the given Folder/File name in Filter
        InputParams: siteRootName: String object to be searched
        InputParams: waitTime: Wait time object from Wait Categories (Time in milliseconds) from locators.js
    */
    createSiteRoot(siteRootName) {
        cy.get(Constants.modelOptionInSubMenu_lnk).contains('Site Root').trigger('mousemove').trigger('click');
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
        // cy.get(Constants.toastNotificationMessage).should('have.text', 'Created site root ' + siteRootName + '.');

    }

    /* Toggle Dockable Panels under View menu
        InputParams: menuItem [Main Menu: File/Edit/View]
        InputParams: SubMenuName [Sub Menu: File View/Properties etc]
        InputParams: locatorOfPanel [Dockable Panel Tabs locators from locators.js]

    */
    toggleViewSubMenuItem(menuItem, SubMenuName, locatorOfPanel = null) {

        cy.get(Constants.modelOptionInSubMenu_lnk).contains(SubMenuName).prevAll('i').then(($btn) => {
            if ($btn.hasClass('invisible')) {

                cy.get(Constants.modelOptionInSubMenu_lnk).contains(SubMenuName).trigger('mousemove');
                cy.get(Constants.modelOptionInSubMenu_lnk).contains(SubMenuName).click({
                    force: true
                });
            } else {

                cy.get('button#topbar' + menuItem + 'MenuToggle').click();
                if (locatorOfPanel != null) {
                    cy.get(locatorOfPanel).click({
                        force: true
                    });
                }
            }
        })
    }

    /*  Verify the Presence of Dockable Panel
        InputParams: panelName [Name of the panel]
    */
    verifyDockablepanelPresence(panelName) {
        cy.get(Constants.dockablePanel_lbl).should('have.text', 'Dockable Panels')
        cy.get(Constants.modelOptionInSubMenu_lnk).contains(panelName).trigger('mousemove')
        cy.get(Constants.modelOptionInSubMenu_lnk).contains(panelName).trigger('mouseover')
        cy.get(Constants.dockablePanel_popup).should('be.visible')
    }

    /* Create an Automation Box; If existing go inside the Automation box for any further actions
        InputParams: menuItem [File]
        InputParams: subMenuItem [New]
        InputParams: actionMenuItem [Folder]
    */
    peepInAutomationBox(menuItem, subMenuItem, actionMenuItem) {
        // Add new folder 
        cy.get('button#topbar' + menuItem + 'MenuToggle').click();
        cy.get('button#topbar' + subMenuItem + 'MenuToggle').trigger('mouseover');
        cy.get(Constants.SubMenuOptions).contains(actionMenuItem).trigger('mousemove').trigger('click');

        cy.log('**Enter New Folder name in textbox**');
        cy.get('#folderInput').should('be.visible').click({ force: true }).type(Constants.automationBoxName)
        // Click on save button
        cy.log('**Click on save button**');
        cy.get('.ui-dialog-footer').should('be.visible').children('p-footer').children('button').last().click({
            force: true
        });
        // A notification should come up stating that the Site Root is created.
        cy.log('**A notification should come up stating that the Site Root is created.**');
        cy.get(Constants.toastNotificationMessage).then(($notification) => {
            if ($notification.text().includes('alertAction_CreatedFolderWithName Error: There is already an asset named \'' + Constants.automationBoxName + '\'')) {
                cy.wait(Constants.shortWait);

            }
            else {
                expect($notification.text()).to.equal('Created Folder ' + Constants.automationBoxName);
            }
        });


        // Enter New site root name in textbox
        cy.log('**Enter New site root name in textbox**')
        this.searchSiteRoot(Constants.automationBoxName, Constants.wait)

        cy.wait(Constants.wait);
        cy.get('.crumbsLink.ng-binding').contains(Constants.automationBoxName).should('be.visible');

    }

    /* Upload image: Note: File is required to be present in Fixtures folder
        InputParams: fileName [Name of the file]
        InputParams: fileType [type of the file, example: 'image/jpg']
    */
    UploadFileFromFixture(fileName, fileType) {

        cy.get('p-header > :nth-child(3)').should('have.text', 'Upload')
        cy.fixture(fileName, 'base64').then(fileContent => {
            cy.get('#hiddenPicker').upload(
                { fileContent, fileName: fileName, mimeType: fileType },
                { subjectType: 'input' },
            );
        })
        // click on Ok
        cy.wait(Constants.wait);
        cy.get('p-footer > :nth-child(3)').click();
        // Verify the notification message
        //cy.get(Constants.toastNotificationMessage).should('be.equal', 'Uploaded asset')
    }



    /* Configure Live Site and Stage Site of Asset in Properties Panel
        InputParams: AssetName [Name of the Asset for which config has to be done in Properties panel]
    */
    configureAssetSiteProperties(AssetName) {
        //Open the created asset
        cy.get(Constants.SearchForAnyFolderFile).contains(AssetName).trigger('click')
        cy.wait(Constants.wait)
        MenuPageObject.clickMenuItem('View');

        this.toggleViewSubMenuItem('View', 'Properties', Constants.dockablePanelProperties_tab);
        cy.get('#panelContainerDrag-properties-panel-widget').click();
        cy.wait(Constants.shortWait);
        cy.get(':nth-child(1) > childlessaccordiontab.ng-star-inserted > .ui-accordion-header > a > p-header').click();
        cy.wait(Constants.wait);
        cy.get('section.title-bar.section-border > h1').should('have.text', 'Publishing');
        // Click on Manage HTML packages
        cy.get('#ui-accordiontab-0 > p-header.ng-star-inserted').click({ force: true });
        // Click on Add package to add stage
        cy.get(':nth-child(2) > packages-accordion-panel > .section-header > p > [style="cursor:pointer"] > .add-transition-text').click();
        cy.get(':nth-child(1) > .grid-dropdown-sm > .ui-dropdown > .ui-dropdown-label').contains('Package').click();
        cy.get('.ui-dropdown-items > :nth-child(2)').contains('Stage Site').click();
        cy.get(':nth-child(1) > .grid-dropdown > .ui-dropdown > .ui-dropdown-label').contains('Template').click();
        //cy.get('.ui-dropdown-items-wrapper').scrollTo('bottom');
        cy.get('.ui-dropdown-items').children('li').contains('output.aspx').click();
        // cy.get('.ui-dropdown-items > :nth-child(2)').contains('output.aspx').click();
        // Click on Add package to add live
        cy.get(':nth-child(2) > packages-accordion-panel > .section-header > p > [style="cursor:pointer"] > .add-transition-text').click();
        cy.get(':nth-child(2) > .grid-dropdown-sm > .ui-dropdown > .ui-dropdown-label').contains('Package').click();
        cy.get('.ui-dropdown-items > :nth-child(1)').contains('Live Site').click();
        cy.get(':nth-child(2) > .grid-dropdown > .ui-dropdown > .ui-dropdown-label').contains('Template').click();
        //cy.get('.ui-dropdown-items-wrapper').scrollTo('center');
        cy.get('.ui-dropdown-items').children('li').contains('output.aspx').click();
        // cy.get('select').select('output.aspx');
        // cy.get('.ui-dropdown-items > :nth-child(2)').contains('output.aspx').click();

        // Click on Manage Media packages
        cy.get('#ui-accordiontab-1 > p-header.ng-star-inserted').click({ force: true });
        // Click on Add package to add stage
        cy.get(':nth-child(3) > packages-accordion-panel > .section-header > p > [style="cursor:pointer"] > .add-transition-text').click();
        cy.get(':nth-child(1) > .grid-dropdown-sm > .ui-dropdown > .ui-dropdown-label').contains('Package').click();
        cy.get('.ui-dropdown-items > :nth-child(2)').contains('Stage Site').click();
        cy.get(':nth-child(1) > .grid-dropdown > .ui-dropdown > .ui-dropdown-label').contains('Template').click();
        // cy.get('.ui-dropdown-items-wrapper').scrollTo('center');
        cy.get('.ui-dropdown-items').children('li').contains('output.aspx').click();
        // cy.get('.ui-dropdown-items > :nth-child(2)').contains('output.aspx').click();
        // Click on Add package to add live
        cy.get(':nth-child(3) > packages-accordion-panel > .section-header > p > [style="cursor:pointer"] > .add-transition-text').click();
        cy.get(':nth-child(2) > .grid-dropdown-sm > .ui-dropdown > .ui-dropdown-label').contains('Package').click();
        cy.get('.ui-dropdown-items > :nth-child(1)').contains('Live Site').click();
        cy.get(':nth-child(2) > .grid-dropdown > .ui-dropdown > .ui-dropdown-label').contains('Template').click();
        // cy.get('.ui-dropdown-items-wrapper').scrollTo('center');
        cy.get('.ui-dropdown-items').children('li').contains('output.aspx').click();
        // cy.get('.ui-dropdown-items > :nth-child(2)').contains('output.aspx').click();
        cy.get('.blue-btn').click();
        cy.wait(Constants.wait)
        // cy.get(Constants.toastNotificationMessage).should('be.equal','Publishing Properties updated!')

    }


    /*  Search the given Folder/File name in Filter
        InputParams: searchObjectName: String object to be searched
        InputParams: waitTime: Wait time object from Wait Categories (Time in milliseconds) from locators.js
    */
    searchSiteRoot(searchObjectName, waitTime = Constants.wait) {
        cy.get(Constants.SearchFilterOptionFromRoot).click();
        cy.get(Constants.SearchCheckPlaceHolder).click();
        cy.get(Constants.SearchCheckPlaceHolder).clear();
        cy.get(Constants.SearchCheckPlaceHolder).type(searchObjectName)
        cy.get(Constants.SearchApplyButton).click();
        cy.wait(waitTime);
        cy.get(Constants.SearchForAnyFolderFile).contains(searchObjectName).should('be.visible')
        cy.wait(waitTime);
        cy.get(Constants.SearchForAnyFolderFile).contains(searchObjectName).trigger('dblclick')
        cy.wait(waitTime);
        if (searchObjectName != Constants.automationBoxName) {
            cy.log('The folder should open and display _Assets, _Site Confi, Component Project folders and a Demo Page and Page assets.')
            cy.get(Constants.SearchForAnyFolderFile).contains(Constants.AssetWithinSiteRoot).should('be.visible')
            cy.get(Constants.SearchForAnyFolderFile).contains(Constants.SiteConfigWithinSiteRoot).should('be.visible')
            cy.get(Constants.SearchForAnyFolderFile).contains(Constants.ComponentProjectWithinSiteRoot).should('be.visible')
            cy.get(Constants.SearchForAnyFolderFile).contains(Constants.DemoPageWithinSiteRoot).should('be.visible')
            cy.get(Constants.SearchForAnyFolderFile).contains(Constants.PageWithinSiteRoot).should('be.visible')


        }
    }



    swapElements(obj1, obj2) {
        // save the location of obj2
        var parent2 = obj2.parentNode;
        var next2 = obj2.nextSibling;
        // special case for obj1 is the next sibling of obj2
        if (next2 === obj1) {
            // just put obj1 before obj2
            parent2.insertBefore(obj1, obj2);
        } else {
            // insert obj2 right before obj1
            obj1.parentNode.insertBefore(obj2, obj1);

            // now insert obj1 where obj2 was
            if (next2) {
                // if there was an element after obj2, then insert obj1 right before that
                parent2.insertBefore(obj1, next2);
            } else {
                // otherwise, just append as last child
                parent2.appendChild(obj1);
            }
        }
    }

    siteRootcheckInstallComponentProject() {
        cy.log('**Click on Install Component Project using Component Library 2.1 checkbox**')
        cy.get(Constants.SiteRootPopUpCheckbox).should('be.visible')
        cy.get(Constants.SiteRootPopUpCheckbox).children('label').should('have.text', 'Install Component Project using Component Library 2.1')
        cy.get(Constants.SiteRootPopUpCheckbox).click();
        cy.log('**A check mark should appear in the box and two more options should appear**')
        cy.get(Constants.SiteRootCheckBoxLength).should('have.length', 2)
        cy.get(Constants.SiteRootCheckBoxChild).first().should('have.text', 'Install Samples')
        cy.get(Constants.SiteRootCheckBoxChild).first().children('input').should('be.checked')
        cy.get(Constants.SiteRootCheckBoxChild).last().should('have.text', 'Rebuild Site After Creation ')
        cy.get(Constants.SiteRootCheckBoxChild).last().children('input').should('be.checked')
    }

    checkCheckBoxInstallcompoenent() {
        cy.log('**Click on Install Component Project using Component Library 2.1 checkbox**')
        cy.get('div.checkbox').should('be.visible')
        cy.get('div.checkbox').children('label').should('have.text', 'Install Component Project using Component Library 2.1')
        cy.get('div.checkbox').click();
    }


    /* Method to enter the SiteRoot name after opening the pop-up or dialbox
       InputParams: Site root name       
       InputParams: All locators from locators.js   */
    enterSiteRootName(siteRootName) {
        cy.log('**Enter New site root name in textbox**')
        cy.get(Constants.SiteRootInputBox).should('be.visible').trigger('click')
        cy.log('**Text should be in the text box.**')
        cy.get(Constants.SiteRootInputBox).type(siteRootName)
    }

    /* Method to validate siteroot dialog boc appear,after click on siteroot option from menu   
       InputParams: All locators from locators.js  */
    checkSiteRootPrompt() {
        cy.log('**The Create Site Root prompt should come up.**')
        cy.get(Constants.PopUpHeader).should('have.text', 'Create Site Root ')

    }

    /* Method to validate Create new Asset dialog box after click on File from submenu
       InputParams: All locators from locators.js   */
    checkFileDialogPrompt() {
        cy.log('**The Create Site Root prompt should come up.**')
        cy.get(Constants.PopUpHeader).should('have.text', 'Create New ')
    }


    /* Method to open File menu
       InputParams: menuItem [Main Menu: File/new]
       InputParams: SubMenuName [Sub Menu: File/SiteRoot]
       InputParams: All locators from locators.js   */
    clickAndOpenFileOptionsOnly(menuItem, subMenuItem, ) {
        cy.log('**Goto File>> New>> Click on Site root **')
        MenuPageObject.clickMenuItem(menuItem);
        MenuPageObject.clickSubMenuItem(menuItem, subMenuItem)

    }

    /* Method to open File menu
       InputParams: menuItem [Main Menu: File/new]
       InputParams: SubMenuName [Sub Menu: File/SiteRoot etc]
       InputParams: All locators from locators.js   */
    clickAndOpenFileOptions(menuItem, subMenuItem, FolderName) {
        cy.log('**Goto File>> New>> Click on Site root **')
        MenuPageObject.clickMenuItem(menuItem);
        MenuPageObject.clickSubMenuItem(menuItem, subMenuItem)
        cy.get(Constants.SubMenuOptions).contains(FolderName).trigger('mousemove').trigger('click')
    }


    // Click on file menu and open File 
    clickAndOpenFileAsset(menuItem, subMenuItem) {
        cy.log('**Goto File>> New>> Click on Site root **')
        MenuPageObject.clickMenuItem(menuItem);
        MenuPageObject.clickSubMenuItem(menuItem, subMenuItem)
        cy.get(Constants.SubMenuOptions).contains('File').trigger('mousemove').trigger('click')
    }

    /* Method to open Content Module from left Navigation bar
      InputParams: All locators from locators.js   */
    clickAndOpenContentModule() {
        cy.log('**After login,User click on content module from left hand side menu **')
        cy.get(Constants.ContentBlock).click()
    }

    /* Method to Save the siteRoot
       InputParams: All locators from locators.js   */
    clickAndSaveSiteRoot() {
        cy.log('**Click on save button**')
        cy.get(Constants.DialogCreate_btn).should('be.visible').children(Constants.DialogCreateChildren).children('button').last().click({
            force: true
        })
    }

    /* Method to click and open component folder
      InputParams: All locators from locators.js   */
    doubleClickOnComponentProjectFolder() {
        cy.log('**Action: Double click on Component folder**')
        cy.get(Constants.SearchForAnyFolderFile).contains('Component Project').should('be.visible')
        cy.get(Constants.SearchForAnyFolderFile).contains('Component Project').trigger('dblclick')
    }

    /* Method to click and open Template folder
       InputParams: All locators from locators.js   */
    doubleClickOnTemplateFolder() {
        cy.log('**Action: Double click on Templates folder**')
        cy.wait(Constants.wait)
        cy.get(Constants.SearchForAnyFolderFile).contains('Templates').should('be.visible')
        cy.get(Constants.SearchForAnyFolderFile).contains('Templates').trigger('dblclick')
        cy.wait(Constants.wait)
    }

    /* Method to Validate Template dialog box opened
       InputParams: All locators from locators.js   */
    validateTemplatePopUp() {
        cy.log('**Check Template Pop-up open up**')
        cy.get(Constants.TemplateDialog, { timeout: 5000 }).should('be.visible');
        cy.get(Constants.PopUpHeader).should('contain', 'Create Template');
    }

    /* Method to Enter Template Name in inputbox and validate it opened
       InputParams: Template folderName to create it
       InputParams: All locators from locators.js   */
    enterTemplateNameInPopUp(templateFolderName) {
        cy.log('**Enter a new template name in text box**')

        cy.get(Constants.TemplateDialogInput_lbl).should('have.text', 'Enter a new template name')
        cy.get(Constants.TemplateDialogInput_txtbx).should('be.visible').trigger('click')
        cy.log('**Text should be in the text box.**')
        cy.get(Constants.TemplateDialogInput_txtbx).type(templateFolderName)
        cy.log('**Click on create**')
        cy.get(Constants.DialogCreate_btn).should('be.visible').children(Constants.DialogCreateChildren).children('button').last().click({
            force: true
        });
    }

    /* Method to open the created template folder
       InputParams: Template folder Name which has been created recently
      InputParams: All locators from locators.js   */
    clickAndOpenTemplateFolder(templateFolderName) {
        cy.get(Constants.SearchForAnyFolderFile).contains(templateFolderName).should('be.visible')
        cy.get(Constants.SearchForAnyFolderFile).contains(templateFolderName).trigger('dblclick')
        cy.wait(Constants.wait);
        cy.log('**input.aspx and output.aspx folder should be present.**')
        cy.get(Constants.SearchForAnyFolderFile).contains('input.aspx').should('be.visible')
        cy.get(Constants.SearchForAnyFolderFile).contains('output.aspx').should('be.visible')
        cy.wait(Constants.wait)
        cy.get(Constants.SearchForAnyFolderFile).contains('input.aspx').should('be.visible').click()
        cy.wait(Constants.wait)
    }

    /* Method to open input.aspx file and delete all the content
    InputParams: All locators from locators.js   */
    emptyInputAspxFile() {
        cy.log("Action: Double click on input.aspx file**");
        cy.get(Constants.SearchForAnyFolderFile).contains('input.aspx').trigger('dblclick')

        cy.log("**Input.aspx should open.**");
        cy.wait(Constants.wait)
        cy.get('.background > .ng-binding').should('have.text', 'input.aspx');
        cy.wait(Constants.wait);
        cy.get(':nth-child(1) > .CodeMirror-line').click().then($codeText => {
            $codeText.empty()
        })
        cy.get(':nth-child(2) > .CodeMirror-line > [role="presentation"]').click().then($codeText => {
            $codeText.empty()
        })
        cy.get(':nth-child(3) > .CodeMirror-line > [role="presentation"]').click().then($codeText => {
            $codeText.empty()
        })
        cy.get(':nth-child(4) > .CodeMirror-line > [role="presentation"] > .cm-comment').click().then($codeText => {
            $codeText.empty()
        })
        cy.get(':nth-child(5) > .CodeMirror-line > [role="presentation"]').click().then($codeText => {
            $codeText.empty()
        })
        cy.get(':nth-child(6) > .CodeMirror-line > [role="presentation"]').click().then($codeText => {
            $codeText.empty()
        })
        cy.get(':nth-child(7) > .CodeMirror-line').click().then($codeText => {
            $codeText.empty()
        })
        cy.get(':nth-child(8) > .CodeMirror-line > span').click().then($codeText => {
            $codeText.empty();
        })
        cy.get(':nth-child(9) > .CodeMirror-line').click().then($codeText => {
            $codeText.empty();
        })
        cy.get(':nth-child(10) > .CodeMirror-line > span').click().then($codeText => {
            $codeText.empty();
        })
    }

    /* Method to Save Input.aspx using API
     InputParams: URLMultipleComponent [Pass the URL to call API]
     InputParams: MultipleComponentBody [Pass the body of API]
     InputParams: apiKeyIntr1 [Pass x-api-key in header]
     InputParams: acceptHeader [Pass the Accept in header]
      InputParams: contentTypeHeader [Pass the content-type in header]
     InputParams: AcceptEncoding [Pass the Accept-Encoding in header]
     InputParams: AcceptLanguage [Pass accept-language in header]
     InputParams: Connection [Pass the connection in header]
     InputParams: originHeader [Pass the Orgin in header]       
     InputParams: All locators from locators.js   */
    aPICallTOSaveInputFile(URLMultipleComponent, MultipleComponentBody, apiKeyIntr1, acceptHeader, contentTypeHeader, AcceptEncoding, AcceptLanguage, Connection, originHeader) {
        cy.location().then((loc) => {
            cy.log(loc.hash.substr(length - 6));
            var assetId = loc.hash.substr(length - 6);
            cy.request({
                method: 'POST',
                url: URLMultipleComponent,
                headers: {
                    "Accept": acceptHeader,
                    "x-api-key": apiKeyIntr1,
                    "Content-Type": contentTypeHeader,
                    "Origin": originHeader,
                    "Accept-Encoding": AcceptEncoding,
                    "Accept-Language": AcceptLanguage,
                    "Connection": Connection
                },
                body:
                {
                    "assetId": assetId, "body": MultipleComponentBody
                }
            })
        })
    }

    /* Method to Navigate from Template to Siteroot
    InputParams: All Locators from locators.js  */
    navigateSiteRootFromTemplateFolder() {
        cy.log("Navigate to Site root");
        cy.wait(Constants.wait);
        cy.get(Constants.ClickOnRoot_icn).click();
        cy.get(Constants.ClickOnSiteRootFolderName_lnk).click();
        cy.wait(Constants.wait);
    }


    /* Method to enter the fila name and validate the path
    InputParams: MultipleComponentTest[File Name]
    InputParams: siteRootName [Site Root Name]
    InputParams: templateFolderName [Template Folder Name]
    InputParams: All Locators from locators.js  */
    newFileNameAndVerifyPath(MultipleComponentTest, siteRootName, templateFolderName) {
        cy.log('**:: Enter File name and Validate File Path**')
        cy.get('#label').type(MultipleComponentTest);
        cy.get(Constants.FileDialogBoxInputBox_txtbx).should('have.text', 'Path: /' + siteRootName + '');
        cy.get(Constants.FileDialogBoxBrowse_btn).trigger('click');
        cy.wait(Constants.wait);
        cy.get(Constants.SearchForAnyFolderFile).contains(templateFolderName).click({ force: true });
        cy.get('button').contains('OK').click();
    }


    /* Method to select workflow and click on create button to create Asset
    InputParams: MultipleComponentTest[File Name]
    InputParams: All Locators from locators.js  */
    selectWorkflowAndClickOnCreateButton(MultipleComponentTest) {
        cy.log('**Select Workflow and click on Create button**')
        cy.get('select').select('Basic Workflow');
        cy.wait(Constants.wait);
        cy.get(Constants.FileDialogBoxCreate_btn).contains('Create').click();
        cy.wait(Constants.wait);
        // cy.get(Constants.toastNotificationMessage).should('have.text', 'Created asset ' + MultipleComponentTest + '.');

        cy.wait(Constants.wait);
    }

    /* Method to Enter some text in WYSIWYG 
    InputParams: WYSIWYGControlsCompressed[input the text]
    InputParams: All Locators from locators.js  */
    insertTextInWYSIWYG(WYSIWYGControlsCompressed) {
        cy.get(Constants.WYSIWYGiFrame).then(($iframe) => {
            const doc = $iframe.contents();
            cy.wrap(doc.find(Constants.WYSIWYGTextArea_txtbx)).click();
            cy.wrap(doc.find(Constants.WYSIWYGTextArea_txtbx)).clear();
            cy.wrap(doc.find(Constants.WYSIWYGTextArea_txtbx)).then(($textArea) => {
                $textArea.text(WYSIWYGControlsCompressed);
            });
        });
    }

    /* Method to input the folder Name  
    InputParams: FolderName[input the text]
    InputParams: All Locators from locators.js  */
    insertForlderName(FolderName) {
        cy.get(Constants.PopUpHeader).should('have.text', 'Create New ')
        cy.get(Constants.FolderDialog_box).type(FolderName)

    }

    /* Method to input the folder Name and select the Modal and then click on create
    InputParams: ModelName[input the text]
    InputParams: All Locators from locators.js  */
    //While creating folder select the model and then create folder
    selectModelToCreateFolder(ModelName) {
        cy.log("Click and select Model")
        cy.get(Constants.FileDialogBoxCreate_btn).contains(' Browse ').click({ force: true })
        cy.wait(Constants.wait)
        cy.get(Constants.ModelPromptFilter_Icon).click({ force: true })
        cy.log("Click on Model")
        cy.get(Constants.AllDirectories_rdbtn).click({ force: true })
        cy.log("Click on All Directory Radio button")
        cy.get(Constants.SearchCheckPlaceHolder).click();
        cy.get(Constants.SearchCheckPlaceHolder).clear();
        cy.get(Constants.SearchCheckPlaceHolder).type(ModelName)
        cy.get(Constants.ModelApply_btn).click({ force: true })
        cy.wait(Constants.wait);
        cy.get(Constants.SearchForAnyFolderFile).contains(ModelName).should('be.visible')
        cy.wait(Constants.wait);
        cy.get(Constants.SearchForAnyFolderFile).contains(ModelName).trigger('click')
        cy.get(Constants.SearchedItemDialogBox).click({ force: true })
        cy.get(Constants.DialogBoxCreate_btn).click({ force: true })
        cy.wait(Constants.wait);
    }

    // Search For Any File Folder using filter// need to delete it
    searchAnyFileOrFolder(ModelName) {
        cy.get(Constants.SearchFilterOptionFromRoot).click();
        cy.get(Constants.SearchCheckPlaceHolder).click();
        cy.get(Constants.SearchCheckPlaceHolder).clear();
        cy.get(Constants.SearchCheckPlaceHolder).type(ModelName)
        cy.get(Constants.SearchApplyButton).click();
        cy.wait(Constants.wait);
        cy.get(Constants.SearchForAnyFolderFile).contains(ModelName).should('be.visible')
        cy.wait(Constants.wait);
        cy.get(Constants.SearchForAnyFolderFile).contains(ModelName).trigger('dblclick')
        cy.wait(Constants.wait);
    }



    /* Method to logout
     User should click on Image and then check Logout Link is available and the click on it
     */
    logout() {
        cy.get(Constants.logoutImg_icon).click({ force: true })
        cy.get(Constants.signOut_lnk).should('be.visible').trigger('click')
    }

    checkActivityMonitor() {
        cy.get('#topbarPublishingMenuToggle').click();
        cy.wait(Constants.shortWait)
        cy.get('.publishingDropdown').should('be.visible');
        cy.get('.publishingactivity > .cpDropdown > .header > .name').should('have.text', 'Activity Monitor Quickview')
        cy.get(Constants.modelOptionInSubMenu_lnk).contains('Long Running Tasks').trigger('scroll')
        cy.get('.taskName').contains('RebuildCLSite').should('be.visible');
        cy.get('.taskName').contains('RebuildCLSite').prev().should('have.attr', 'class', 'statusColor session-success')
        cy.get('.taskName').contains('FinishAddCL').should('be.visible')
        cy.get('.taskName').contains('FinishAddCL').prev().should('have.attr', 'class', 'statusColor session-success')
        cy.get('.taskName').contains('AddCL').should('be.visible')
        cy.get('.taskName').contains('AddCL').prev().should('have.attr', 'class', 'statusColor session-success')

    }
    closeActivityMonitor() {
        cy.log('**Once the RebuildCLSite long running task is complete close the Activity Monitor by clicking anywhere.**')
        cy.get('#panelContainerDrag-file-panel-widget').click()
        cy.get('.publishingDropdown').should('not.be.visible')
    }

    checkAndVerifyComponentFolderStructure() {
        cy.log('**Action: Double click on Component folder**')
        cy.get('.assetLabelLink.ng-binding').contains('Component Project').should('be.visible')
        cy.get('.assetLabelLink.ng-binding').contains('Component Project').trigger('dblclick')
        cy.wait(Constants.wait);
        cy.log('**Component Project folder should open and display: Component Library, Filenames, Library, Models, Templates, Workflows folders.**')
        cy.get('.assetLabelLink.ng-binding').contains('Component Library').should('be.visible')
        cy.get('.assetLabelLink.ng-binding').contains('Filenames').should('be.visible')
        cy.get('.assetLabelLink.ng-binding').contains('Library').should('be.visible')
        cy.get('.assetLabelLink.ng-binding').contains('Models').should('be.visible')
        cy.get('.assetLabelLink.ng-binding').contains('Templates').should('be.visible')
        cy.get('.assetLabelLink.ng-binding').contains('Workflows').should('be.visible')
    }
    checkAndVerifyTemplateFolderStructure() {
        cy.log('**Action: Double click on Templates folder**')
        // Click on filter  and search for Publishing Smoke tests folder
        cy.get('.assetLabelLink.ng-binding').contains('Templates').should('be.visible')
        cy.get('.assetLabelLink.ng-binding').contains('Templates').trigger('dblclick')
        cy.wait(Constants.wait);
        cy.log('**Templates folder should open with various folders.**')
        cy.get('.assetLabelLink.ng-binding').contains('Component Framework').should('be.visible')
        cy.get('.assetLabelLink.ng-binding').contains('Summer of Fun v3 No Footer Template').should('be.visible')
        cy.get('.assetLabelLink.ng-binding').contains('Summer of Fun v3 Template').should('be.visible')
        cy.get('.assetLabelLink.ng-binding').contains('Summer of Fun v3 Template - Modified').should('be.visible')
        cy.get('.assetLabelLink.ng-binding').contains('Summer of Fun v3 Template - Zones').should('be.visible')
        cy.get('.assetLabelLink.ng-binding').contains('Summer of Fun Wrapper').should('be.visible')
        cy.get('.assetLabelLink.ng-binding').contains('Summer of Fun Wrapper No Footer').should('be.visible')
        cy.get('.assetLabelLink.ng-binding').contains('wysiwyg image test template').should('be.visible')
    }
    checkAndVerifyNewTemplatePrompt(menuItem, subMenuItem, templateFolderName) {
        cy.log('**Goto File >>New >> click on Template**')
        MenuPageObject.clickMenuItem(menuItem);
        MenuPageObject.clickSubMenuItem(menuItem, subMenuItem)
        cy.get(Constants.SubMenuOptions).contains('Template').trigger('mousemove').trigger('click')
        cy.log('**The Create Template prompt should come up.**')
        cy.get('p-header').should('have.text', 'Create Template ')
        cy.log('**Enter a new template name in text box**')
        cy.log('**Click on create**')
        cy.get('.control-label').should('have.text', 'Enter a new template name')
        cy.get('#projectInput').should('be.visible').trigger('click')
        cy.log('**Text should be in the text box.**')
        cy.get('#projectInput').type(templateFolderName)
        // cy.get('.btn-primary').click({force:true});
        cy.get('.ui-dialog-footer').should('be.visible').children('p-footer').children('button').last().click({
            force: true
        });
        cy.wait(Constants.wait)
        cy.get(Constants.elementNotificationMessage).should('have.text', 'Created ' + templateFolderName + '.');

        cy.wait(Constants.wait)
    }


    /* Method to generate  and return random number 
     */
    randomNumber() {

        let rndNum = Math.random();
        return Math.round(rndNum * 5555500555);
    }

}
