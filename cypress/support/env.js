export const usernameInput = 'auto12';
export const passwordInput = 'Password1!';

export const apiKey = '0a6477a93cd540508910';
export const apiKeyRC = 'b86608bbb7744a9a8cf7';
export const acceptHeader = 'application/json, text/plain, */*';
export const contentTypeHeader = 'application/json';
export const originHeader = 'https://rc.crownpeak.com';


// export const cookie = ''_ga = GA1.2.747583465.1525374897; _mkto_trk = id: 692 - NEY - 636 & token: _mch - crownpeak.com - 1526673966364 - 27418; _biz_uid = 379ef9f807c64937ae76c07098d2b4aa; _biz_flagsA =% 7B % 22Version % 22 % 3A1 % 2C % 22XDomain % 22 % 3A % 221 % 22 % 7D; ei_client_id = 5aff32169d299b0016cb3d01; _biz_nA = 3; _biz_pendingA =% 5B % 5D; _gid = GA1.2.218683739.1527107186; ASP.NET_SessionId = 2ohwt5jpbziqv1kois41kkzz; _gat = 1; GLBSESSIONID = 2f3ed457e81762d27e964bd94e1a02371d5f2a35f328a3bdaac1dd7cab9e7b3081064f85c10f9b7768fee82b640c0b27; mp_8c42612d17af75256ce6382aa204715a_mixpanel =% 7B % 22distinct_id % 22 % 3A % 20 % 22Sandbox1 - 11 % 22 % 2C % 22 % 24initial_referrer % 22 % 3A % 20 % 22 % 24direct % 22 % 2C % 22 % 24initial_referring_domain % 22 % 3A % 20 % 22 % 24direct % 22 % 7D';

export class v3helper {
   
    login_noUI() {
        cy.request({
            method: 'POST',
            url: 'cpt_webservice/AccessAPI/auth/preauth', // baseUrl will be prepended to this url
            headers:{
                "Accept":acceptHeader,
                "x-api-key":apiKeyRC,
                "Content-Type":contentTypeHeader,
                "Origin":originHeader
            }
        })
        cy.request({
            method: 'POST',
            url: 'cpt_webservice/AccessAPI/auth/authenticate',
            headers:{
                "Accept":acceptHeader,
                "x-api-key":apiKeyRC,
                "Content-Type":contentTypeHeader,
                "Origin":originHeader
            },
            body: {
                    "instance":"snoop",
                    "username":usernameInput,
                    "password":passwordInput,
                    "remember_me": false,
                    "timeZoneOffsetMinutes":-480
            }
        })
        cy.visit('/v3')
        cy.server()
        cy.route("POST", /preauth/).as('getLoginPage')
        cy.wait('@getLoginPage').url().should('include', 'login')
        cy.route("POST", /read/).as('getContentPage')
        cy.wait('@getContentPage').url().should('include', '/content')
    }
    
    clickView(){
        cy.get('#topbarViewMenuToggle').should('be.visible').click()
    }
};