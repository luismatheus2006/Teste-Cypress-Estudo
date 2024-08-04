describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://seubarriga.wcaquino.me/login');
    
  })
  it('Feature01_Loginn',() => {
    cy.Feature01_Login();
  });
  it('Feature02_Contas',() => {
    cy.Feature02_Contas();
  });
  it('Feature03_Movimentação',() => {
    cy.Feature03_Movimentação();
  });
  it('Feature04_Resumo_mensal',() => {
    cy.Feature04_Resumo_mensal();
  });
  it('Feature05_Logout',() => {
    cy.Feature05_Logout();
  });
})