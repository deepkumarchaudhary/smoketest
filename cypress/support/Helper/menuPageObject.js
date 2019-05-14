//Menu items
/// <reference types="cypress"/>
export default class MenuItems {

    // Method to click on Menu items: File/Edit/View
    clickMenuItem(menuName)
    {
        cy.get('button#topbar'+menuName+'MenuToggle').click();
        
    }

    // Mehod to mouseover on passed Sub Menu to File/Edit/View
    clickSubMenuItem(menuName, subMenuName)
    {                
    
        cy.get('button#topbar'+subMenuName+'MenuToggle').trigger('mouseover');
               
    }
    clickSubMenuActionItem(actionName)
    {
        cy.wait(Constants.wait);
        cy.get('span.ng-scope:nth-child(3) > button.newMenuButton.ng-scope').trigger('mousemove').trigger('click');
    }
}