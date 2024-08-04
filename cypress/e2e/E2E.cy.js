import {Conta1, Conta2,Data1 , Data2} from '../support/variaveis';

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
    cy.FluxoCriarContas({
      Conta:`${Conta1}`
    });
    cy.FluxoCriarContas({
      Conta:`${Conta2}`
    });
  });

  it('FluxoAlterarNomeConta',() => {
    cy.FluxoCadastroLogin({
      Email: "AlterarNomeContaVivar@gmail.com"
    })
    cy.FluxoCriarContas({
      Conta:`${Conta1}`
    });
    cy.FluxoCriarContas({
      Conta:`${Conta2}`
    });
    cy.FluxoAlterarNomeConta();
  });

  it('FluxoAlternativoContaNomeJaExistente',() => {
    cy.FluxoCadastroLogin({
      Email: "ContaJaExistenteVivar@gmail.com"
    })
    cy.FluxoCriarContas({
      Conta:`${Conta1}`
    });
    cy.FluxoAlternativoContaNomeJaExistente();

  });

  it('FluxoExcluirContaComMovimentação',() => {
    cy.FluxoCadastroLogin({
      Email: "ContaMovimentacaoJaExistenteVivar@gmail.com"
    })
    cy.FluxoCriarContas({
      Conta:`${Conta1}`
    });
    cy.FluxoCriarMovimentacao({
      Conta: `${Conta1}`,
      Data:`${Data1}`,
      Valor:"1400",
      Tipo:"Receita",
      Resposta:"Movimentação adicionada com sucesso!",
      Status:"#status_pago"
    });
    cy.FluxoExcluirContaComMovimentação();
  });

  it('FluxoCriarMovimentacao',() => {
    cy.FluxoCadastroLogin({
      Email: "CriarMovimentacaoVivar@gmail.com"
    })
    cy.FluxoCriarContas({
      Conta:`${Conta1}`
    });
    cy.FluxoCriarContas({
      Conta:`${Conta2}`
    });

    cy.FluxoCriarMovimentacao({
      Conta: `${Conta1}`,
      Data:`${Data1}`,
      Valor:"1400",
      Tipo:"Receita",
      Resposta:"Movimentação adicionada com sucesso!",
      Status:"#status_pendente"
    });
    cy.FluxoCriarMovimentacao({
      Conta: `${Conta2}`,
      Data:`${Data2}`,
      Valor:"1400",
      Tipo:"Receita",
      Resposta:"Movimentação adicionada com sucesso!",
      Status:"#status_pendente"
    });
    cy.FluxoCriarMovimentacao({
      Conta: `${Conta1}`,
      Data:`${Data2}`,
      Valor:"1400",
      Tipo:"Despesa",
      Resposta:"Movimentação adicionada com sucesso!",
      Status:"#status_pago"
    });
    cy.FluxoCriarMovimentacao({
      Conta: `${Conta1}`,
      Data:`${Data1}`,
      Valor:"1400",
      Tipo:"Despesa",
      Resposta:"Movimentação adicionada com sucesso!",
      Status:"#status_pago"
    });
  });

  it('FluxoValidacaoCampoDataValor',() => {
    cy.FluxoCadastroLogin({
      Email: "ValidacaoCampoDataValor@gmail.com"
    })
    cy.FluxoCriarContas({
      Conta:`${Conta1}`
    });
    cy.FluxoCriarMovimentacao({
      Conta: `${Conta1}`,
      Data:"asdasd",
      Valor:"1400",
      Tipo:"Despesa",
      Resposta:"Data da Movimentação inválida (DD/MM/YYYY)",
      Status:"#status_pago"
    });
    cy.FluxoCriarMovimentacao({
      Conta: `${Conta1}`,
      Data:"14042024",
      Valor:"1400",
      Tipo:"Despesa",
      Resposta:"Data do pagamento inválida (DD/MM/YYYY)",
      Status:"#status_pago"
    });
    cy.FluxoCriarMovimentacao({
      Conta: `${Conta1}`,
      Data:`${Data2}`,
      Valor:"adsiaosdsauoduas",
      Tipo:"Despesa",
      Resposta:"Valor deve ser um número",
      Status:"#status_pago"
      
    });
  });

  it('FluxoResumoMensal',() => {
    cy.FluxoCadastroLogin({
      Email: "ResumoMensalVivar@gmail.com"
    })
    cy.FluxoCriarContas({
      Conta:`${Conta1}`
    });
    cy.FluxoCriarContas({
      Conta:`${Conta2}`
    });
    cy.FluxoCriarMovimentacao({
      Conta: `${Conta1}`,
      Data:`${Data1}`,
      Valor:"1400",
      Tipo:"Receita",
      Resposta:"Movimentação adicionada com sucesso!",
      Status:"#status_pendente"
    });
    cy.FluxoCriarMovimentacao({
      Conta: `${Conta2}`,
      Data:`${Data2}`,
      Valor:"1400",
      Tipo:"Receita",
      Resposta:"Movimentação adicionada com sucesso!",
      Status:"#status_pendente"
    });
    cy.FluxoCriarMovimentacao({
      Conta: `${Conta1}`,
      Data:`${Data2}`,
      Valor:"1400",
      Tipo:"Despesa",
      Resposta:"Movimentação adicionada com sucesso!",
      Status:"#status_pago"
    });
    cy.FluxoCriarMovimentacao({
      Conta: `${Conta1}`,
      Data:`${Data1}`,
      Valor:"1400",
      Tipo:"Despesa",
      Resposta:"Movimentação adicionada com sucesso!",
      Status:"#status_pago"
    });
    cy.FluxoResumoMensal();
  });

  it('FluxoSairConta',() => {
    cy.FluxoCadastroLogin({
      Email: "SairContaVivar@gmail.com"
    })
    cy.FluxoSairConta();
  });

})