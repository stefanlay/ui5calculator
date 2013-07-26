describe("The display of an initial controller", function() {

	var sut = undefined;

	beforeEach(function() {
		sut = sap.ui.controller("ui5calculator.Calculator");
		sut.onInit();
	});

	it("should show 0", function() {
		expect(sut.model.getProperty("/display")).toBe(0);
	});

	it("should show 0 after pressing 0", function() {
		sut.buttonPressed("0");

		expect(sut.model.getProperty("/display")).toBe(0);
	});

	it("should show 5 after pressing 0", function() {
		sut.buttonPressed("5");

		expect(sut.model.getProperty("/display")).toBe(5);
	});

});

describe("The display of a controller showing 5", function() {

	var sut = undefined;

	beforeEach(function() {
		sut = sap.ui.controller("ui5calculator.Calculator");
		sut.onInit();
		sut.buttonPressed("5");
	});

	it("should show 50 after pressing 0", function() {
		sut.buttonPressed("0");

		expect(sut.model.getProperty("/display")).toBe(50);
	});

	it("should show 0 after pressing 'C'", function() {
		sut.buttonPressed("C");

		expect(sut.model.getProperty("/display")).toBe(0);
	});

});

describe("Initial display of a controller ", function() {

	var sut = undefined;

	beforeEach(function() {
		sut = sap.ui.controller("ui5calculator.Calculator");
		sut.onInit();
	});

	it("should show 5 after pressing 5", function() {
		sut.buttonPressed("5");

		expect(sut.model.getProperty("/display")).toBe(5);
	});

	it("should show 0 after pressing '+'", function() {
		sut.buttonPressed("1");
		sut.buttonPressed("+");
		expect(sut.model.getProperty("/display")).toBe(1);
		sut.buttonPressed("5");
		expect(sut.model.getProperty("/display")).toBe(5);
		sut.buttonPressed("=");
		expect(sut.model.getProperty("/display")).toBe(6);
	});

});

describe("Addition with multidigit operands", function() {

	var sut = undefined;

	beforeEach(function() {
		sut = sap.ui.controller("ui5calculator.Calculator");
		sut.onInit();
		sut.buttonPressed("1");
		sut.buttonPressed("0");
	});

	it("should show 55 after adding 45", function() {
		sut.buttonPressed("+");
		sut.buttonPressed("4");
		sut.buttonPressed("5");
		sut.buttonPressed("=");
		expect(sut.model.getProperty("/display")).toBe(55);
	});

});

describe("Equals w/o operation does keep display value unchanged", function() {

	var sut = undefined;

	beforeEach(function() {
		sut = sap.ui.controller("ui5calculator.Calculator");
		sut.onInit();
	});

	it("should show 5 after pressing 5", function() {
		sut.buttonPressed("5");
		sut.buttonPressed("=");
		expect(sut.model.getProperty("/display")).toBe(5);
	});

});
