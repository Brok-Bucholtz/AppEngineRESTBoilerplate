'use strict';

describe('E2E: general pages', function() {
  it('should not throw any JS errors', function() {
    browser.driver.get('http://localhost:9999/');
    browser.manage().logs().get('browser').then(function(browserLog) {
      expect(browserLog.length).toBe(0);
    });
  });
});
