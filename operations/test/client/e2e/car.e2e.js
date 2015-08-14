'use strict';

describe('E2E: car page', function() {
  it('should add and delete a car', function() {
    var carDescriptionElement = by.id('car_description');
    var carDescription = 'E2E TestCar - ' + (new Date()).toString();
    var carAddedPromise;
    var carsWithDescPromise;
    var carsWithOutDescPromise;
    var getCarsWithDescription = function(filterDesc) {
      return element.all(by.repeater('(id, car) in cars'))
        .filter(function(carElement) {
          return carElement.$('.title h5').getText()
              .then(function(textDescription) {
                return textDescription === filterDesc;
              });
        });
    };

    browser.driver.get('http://localhost:9999/#/car');
    element(carDescriptionElement).sendKeys(carDescription);
    element(carDescriptionElement).sendKeys(protractor.Key.ENTER);
    carAddedPromise = browser.driver.wait(
        function() {
          return $('[ng-show=isCreatingCar]')
            .isDisplayed()
            .then(function(result) {return !result;});
        },
        2000);
    carsWithDescPromise = carAddedPromise.then(function() {
      return getCarsWithDescription(carDescription);
    });
    carsWithOutDescPromise = carsWithDescPromise.then(function(carElements) {
      expect(carElements.length).toBe(1);
      carElements[0].$('[ng-click="deleteCar(car)"]').click();
      browser.refresh();
      return browser.waitForAngular().then(function() {
        return getCarsWithDescription(carDescription);
      });
    });
    carsWithOutDescPromise.then(function(carElements) {
      expect(carElements.length).toBe(0);
    });
  });
});
