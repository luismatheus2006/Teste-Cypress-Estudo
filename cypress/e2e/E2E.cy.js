describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://seubarriga.wcaquino.me/login');
    
  })
  it('FEATURE01_Login',() => {
    cy.FEATURE01_Login();
  });
  it('FEATURE02_Contas',() => {
    cy.FEATURE02_Contas();
  });
  it('FEATURE03_Movimentação',() => {
    cy.FEATURE03_Movimentação();
  });
  it('FEATURE04_Resumo_mensal',() => {
    cy.FEATURE04_Resumo_mensal();
  });
  it('FEATURE05_Logout',() => {
    cy.FEATURE05_Logout();
  });
})