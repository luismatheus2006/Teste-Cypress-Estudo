describe('template spec', () => {
  beforeEach('Acessar Plataforma', () => {
    cy.visit('/');    
  })
  it('FluxoCadastroLogin',() => {
    cy.FluxoCadastroLogin( {
      Email:"CadastroVivar@gmail.com"
  });
  });

  it('FluxoLoginInvalido',() => {
    cy.FluxoLoginInvalido({
      Email:"EmailClaramentoInvalidoNoSistema@gmail.com"
    });
  });

  it('FluxoCriarContas',() => {
    cy.FluxoCadastroLogin({
      Email: "CriarContaVivar@gmail.com"
    })
    cy.FluxoCriarContas();
  });

  it('FluxoAlterarNomeConta',() => {
    cy.FluxoCadastroLogin({
      Email: "AlterarNomeContaVivar@gmail.com"
    })
    cy.FluxoCriarContas();
    cy.FluxoAlterarNomeConta();
  });

  it('FluxoAlternativoContaNomeJaExistente',() => {
    cy.FluxoCadastroLogin({
      Email: "ContaJaExistenteVivar@gmail.com"
    })
    cy.FluxoCriarContas();
    cy.FluxoAlternativoContaNomeJaExistente();

  });

  it('FluxoExcluirContaComMovimentação',() => {
    cy.FluxoCadastroLogin({
      Email: "ContaMovimentacaoJaExistenteVivar@gmail.com"
    })
    cy.FluxoCriarContas();
    cy.FluxoExcluirContaComMovimentação();
  });

  it('FluxoCriarMovimentacao',() => {
    cy.FluxoCadastroLogin({
      Email: "CriarMovimentacaoVivar@gmail.com"
    })
    cy.FluxoCriarContas();
    cy.FluxoCriarMovimentacao();
  });

  it('FluxoValidacaoCampoDataValor',() => {
    cy.FluxoCadastroLogin({
      Email: "ValidacaoCampoDataValor@gmail.com"
    })
    cy.FluxoCriarContas();
    cy.FluxoValidacaoCampoDataValor();
  });

  it('FluxoResumoMensal',() => {
    cy.FluxoCadastroLogin({
      Email: "ResumoMensalVivar@gmail.com"
    })
    cy.FluxoCriarContas();
    cy.FluxoCriarMovimentacao();
    cy.FluxoResumoMensal();
  });

  it('FluxoSairConta',() => {
    cy.FluxoCadastroLogin({
      Email: "SairContaVivar@gmail.com"
    })
    cy.FluxoSairConta();
  });

})