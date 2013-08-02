describe("A button row", function() {
	var sut = sap.ui.jsview("ui5calculator.Calculator");

	var oRow = new sap.ui.commons.layout.MatrixLayoutRow({
		id : 'Test',
	});

	var createButtonCell = {};
	beforeEach(function() {
		createButtonCell = jasmine.createSpy('createButtonCell');
		spyOn(oRow, 'addCell');
	});

	it("should be empty if fillButtonRow is called without content", function() {
		sut.fillButtonRow(oRow, "id", [],
				createButtonCell);
		expect(createButtonCell).not.toHaveBeenCalled();
		expect(oRow.addCell).not.toHaveBeenCalled();
	});

	it("should be filled with one cell if one label is given", function() {
		sut.fillButtonRow(oRow, "id", [ 'a'],
				createButtonCell);
		expect(createButtonCell.calls.length).toEqual(1);
		expect(oRow.addCell.calls.length).toEqual(1);
	});

 	it("should be filled with four cells if all four labels are different", function() {
		sut.fillButtonRow(oRow, "id", [ 'a', 'b', 'c', 'd' ],
				createButtonCell);
		expect(createButtonCell.calls.length).toEqual(4);
		expect(oRow.addCell.calls.length).toEqual(4);
	});

	it("should be filled with three cells if two of four labels are equal", function() {
		sut.fillButtonRow(oRow, "id", [ 'a', 'b', 'c', 'c' ],
				createButtonCell);
		expect(createButtonCell.calls.length).toEqual(3);
		expect(oRow.addCell.calls.length).toEqual(3);
	});

	it("should be filled with a cell with correct id, label, colspan and enablement", function() {
		sut.fillButtonRow(oRow, "id", [ '0' ],
				createButtonCell);
		expect(createButtonCell).toHaveBeenCalledWith("id_0", '0', 1, true);
	});

	it("given a prefix '!' in a label, should be filled with a cell with enablement falset", function() {
		sut.fillButtonRow(oRow, "id", [ '!0' ],
				createButtonCell);
		expect(createButtonCell).toHaveBeenCalledWith("id_0", '0', 1, false);
	});

	it("should be filled with only one cell if two cells have the same label", function() {
		sut.fillButtonRow(oRow, "id", [ '0',  '0'],
				createButtonCell);
		expect(createButtonCell).toHaveBeenCalledWith("id_1", '0', 2, true);
	});

	it("should be filled with only one cell if two cells have the same label and the prefix '!'", function() {
		sut.fillButtonRow(oRow, "id", [ '!0',  '!0'],
				createButtonCell);
		expect(createButtonCell).toHaveBeenCalledWith("id_1", '0', 2, false);
	});

	it("should be filled with two cells if two cells have the same label but one has the prefix '!'", function() {
		sut.fillButtonRow(oRow, "id", [ '!0',  '0'],
				createButtonCell);
		expect(createButtonCell).toHaveBeenCalledWith("id_0", '0', 1, false);
		expect(createButtonCell).toHaveBeenCalledWith("id_1", '0', 1, true);
	});

});