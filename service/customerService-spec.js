describe('customerService', function() {

    beforeEach(module('webtrekk'));

    it('should test get customer data', inject(function(customerService) {
        customerService.getCustomerDataLogic()
            .then(function(data) {
                expect(data.length).not.toEqual(0);
            });
    }));

    it('should test add customer data', inject(function(customerService) {
        var customer = { "name": { "first": "first", "last": "last" }, "birthday": "1996-10-12T00:00:00.000Z", "gender": "m", "lastContact": "2017-06-01T23:28:56.782Z", "customerLifetimeValue": 191.12 };
        customerService.addCustomerInfo(customer)
            .then(function(data) {
                expect(data.length).not.toEqual(0);
            });
    }));

});