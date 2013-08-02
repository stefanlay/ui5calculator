sap.ui
		.jsview(
				"ui5calculator.Calculator",
				{

					getControllerName : function() {
						return "ui5calculator.Calculator";
					},

					createContent : function(oController) {
						var that = this; // allow private functions to access this
						function createDisplayRow() {
							var oDisplay = new sap.ui.commons.TextView(
									"display", {
										text : '{/display}',
										textAlign : sap.ui.core.TextAlign.Right
									});

							var oDisplayCell = new sap.ui.commons.layout.MatrixLayoutCell(
									{
										id : 'Cell-Display',
										backgroundDesign : sap.ui.commons.layout.BackgroundDesign.Fill2,
										colSpan : 4,
										hAlign : sap.ui.commons.layout.HAlign.Right
									});
							oDisplayCell.addContent(oDisplay);

							var oRow = new sap.ui.commons.layout.MatrixLayoutRow(
									{
										id : 'Row-0',
										height : '25px'
									});
							oRow.addCell(oDisplayCell);
							return oRow;
						}

						function createButtonRow(rowId, labels) {
							var oRow = new sap.ui.commons.layout.MatrixLayoutRow(
									{
										id : rowId,
										height : '25px'
									});
							function createButtonCell(id, label, colSpan,
									enabled) {
								var oCell = new sap.ui.commons.layout.MatrixLayoutCell(
										{
											id : id,
											colSpan : colSpan,
											hAlign : sap.ui.commons.layout.HAlign.Right
										});
								var oButton = new sap.ui.commons.Button({
									text : label,
									width : '100%',
									enabled : enabled,
									press : function() {
										oController.buttonPressed(label);
									}
								});
								oCell.addContent(oButton);
								return oCell;
							}

							that.fillButtonRow(oRow, rowId, labels, createButtonCell);

							return oRow;
						}

						// matrix
						var oLayout = new sap.ui.commons.layout.MatrixLayout({
							id : 'calcMatrix',
							layoutFixed : true,
							columns : 4,
							width : '200px'
						});

						oLayout.addRow(createDisplayRow());
						oLayout.addRow(createButtonRow('Row-1', [ '!<-', 'C',
								'!CE', '!+/-' ]));
						oLayout.addRow(createButtonRow('Row-2', [ '7', '8',
								'9', '!/' ]));
						oLayout.addRow(createButtonRow('Row-3', [ '4', '5',
								'6', '!*' ]));
						oLayout.addRow(createButtonRow('Row-4', [ '1', '2',
								'3', '!-' ]));
						oLayout.addRow(createButtonRow('Row-5', [ '0', '0',
								'!,', '+' ]));
						oLayout.addRow(createButtonRow('Row-6', [ '=', '=',
								'=', '=' ]));

						var oPanel = new sap.ui.commons.Panel({
							text : "UI5 Calculator",
							width : '210px',
							showCollapseIcon : false,
							areaDesign : sap.ui.commons.enums.AreaDesign.Plain,
							content : oLayout
						});
						return oPanel;
					},

					fillButtonRow : function(oRow, rowId, labels, createButtonCell) {
						var length = labels.length;
						var colSpan = 1;
						for ( var i = 0; i < length; i++) {
							var label = labels[i];
							var next = i + 1;
							if ((next < length) && label == labels[next]) {
								colSpan++;
							} else {
								var enabled;
								if (label.substring(0, 1) === '!') {
									enabled = false;
									label = label.substring(1);
								} else {
									enabled = true;
								}
								var oCell = createButtonCell(rowId + '_'
										+ i, label, colSpan, enabled);
								oRow.addCell(oCell);
								colSpan = 1;
							}
						}
					}
				});
