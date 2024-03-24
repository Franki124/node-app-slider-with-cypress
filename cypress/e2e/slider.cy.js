describe('Swiper Gallery Test', function () {
  it('Checks if second slide contains "United Kingdom"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-slide-active').should('contain', 'United Kingdom');
  });
});

describe('Swiper Gallery Test', function () {
  it('Checks if third slide contains "Paris"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-button-next').click({ force: true });
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Paris');
  });
});

describe('Nawigacja w galerii', function () {
  it('Przechodzenie do następnego slajdu', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-button-next').click({ force: true });
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Paris');
  });
  

  it('Przechodzenie do poprzedniego slajdu', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-button-prev').click();
    cy.get('.swiper-slide-active').should('not.have.class', 'swiper-slide-next');
  });
});

describe('Opisy slajdów', function () {
  it('Sprawdzenie tytułu i opisu', function () {
    cy.visit('http://localhost:3000');

    cy.get('.swiper-slide').each(($slide) => {
      const title = $slide.find('.swiper-slide-title').text();
      const description = $slide.find('.swiper-slide-description').text();

      expect(title).to.be.not.empty;
      expect(description).to.be.not.empty;
    });
  });
});

describe('Zachowanie galerii na różnych urządzeniach', function () {
  const devices = [
    {
      name: 'Komputer',
      width: 1200,
      height: 800,
    },
    {
      name: 'Tablet',
      width: 768,
      height: 1024,
    },
    {
      name: 'Telefon',
      width: 375,
      height: 812,
    },
  ];

  devices.forEach((device) => {
    it(`Sprawdzenie na ${device.name}`, function () {
      cy.viewport(device.width, device.height);
      cy.visit('http://localhost:3000');

      cy.get('.swiper-container').should('have.css', 'width', `${device.width}px`);
      cy.get('.swiper-container').should('have.css', 'height', `${device.height}px`);

      cy.get('.swiper-button-next').should('be.visible');
      cy.get('.swiper-button-prev').should('be.visible');

      if (device.name === 'Telefon') {
        cy.get('.swiper-slide').should('have.css', 'width', `${device.width}px`);
      }
    });
  });
});
