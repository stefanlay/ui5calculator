sap.ui.controller("ui5calculator.Calculator", {

	operand : undefined,
	startNext : true,

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 */
	onInit : function() {
		this.model = new sap.ui.model.json.JSONModel({
			display : 0
		});
		this.startNext = true;
		sap.ui.getCore().setModel(this.model);
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 */
	// onExit: function() {
	//
	// },
	setDisplayValue : function(value) {
		value = parseInt("" + value);
		this.model.setProperty("/display", value);
	},

	handleAsDigit : function(button) {
		var display = this.model.getProperty("/display");
		if (display == 0) {
			this.setDisplayValue(button);
			this.startNext = false;
		} else {
			if (this.startNext) {
				display = button;
				this.startNext = false;
			} else
				display = "" + display + button;
			this.setDisplayValue(display);
		}
	},

	buttonPressed : function(button) {
		if ('C' == button) {
			this.onInit();
			return;
		}

		if ('+' == button) {
			this.operand = this.model.getProperty("/display");
			this.startNext = true;
			return;
		}

		if ('=' == button) {
			if (this.operand) {
				var sum = this.model.getProperty("/display") + this.operand;
				this.setDisplayValue(sum);
			}
			return;
		}

		this.handleAsDigit(button);
	}

});