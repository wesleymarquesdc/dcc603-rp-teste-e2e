describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Marca e desmarca uma tarefa como concluída', () => {
    cy.visit('');
  
    cy.get('[data-cy=todo-input]')
      .type('Estudar Cypress{enter}');
  
    cy.get('[data-cy=todos-list] > li')
      .first()
      .as('primeiraTarefa');
  
    cy.get('@primeiraTarefa')
      .find('.toggle')
      .check();
  
    cy.get('@primeiraTarefa')
      .should('have.class', 'completed');
  
    cy.get('@primeiraTarefa')
      .find('.toggle')
      .uncheck();
  
    cy.get('@primeiraTarefa')
      .should('not.have.class', 'completed');
  });

  it('Não adiciona tarefa vazia', () => {
    cy.visit('');
  
    cy.get('[data-cy=todo-input]')
      .type('{enter}');
  
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });
  
  it('Limpa todas as tarefas concluídas', () => {
    cy.visit('');
  
    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}');
  
    cy.get('[data-cy=todos-list] > li')
      .first()
      .find('.toggle')
      .check();
  
    cy.get('.clear-completed')
      .click();
  
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('contain.text', 'Tarefa 2');
  });
});