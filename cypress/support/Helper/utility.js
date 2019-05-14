import Constants from '../Locators/locators'
var dbConnectivityFile = 'cypress/support/DBCode/connectmysql.js';
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
        cy.get('.btn-file').click();
        cy.wait(6000);
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
        cy.get(Constants.toastNotificationMessage).should('have.text', 'Created site root ' + siteRootName + '.');

    }


    /*  Search the given Folder/File name in Filter
        InputParams: searchObjectName: String object to be searched
        InputParams: waitTime: Wait time object from Wait Categories (Time in milliseconds) from locators.js
    */
    searchSiteRoot(searchObjectName, waitTime) {
        cy.get(Constants.filterOptionFromRoot_icn).click();
        cy.get(Constants.filterCheckPlaceHolder_txtBx).click();
        cy.get(Constants.filterCheckPlaceHolder_txtBx).clear();
        cy.get(Constants.filterCheckPlaceHolder_txtBx).type(searchObjectName)
        cy.get(Constants.filterApply_btn).click();
        cy.wait(waitTime);

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


    /* Method to generate  and return random number 
     */
    randomNumber() {

        let rndNum = Math.random();
        return Math.round(rndNum * 100000);
    }

}