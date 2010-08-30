DHTMLSpinner {#DHTMLSpinner}
======================================

Expanding and customizable DHTML spinner overlay class.

DHTMLSpinner Method: constructor {#DHTMLSpinner:constructor}
------------------------------------------------------

### Syntax:

	DHTMLSpinner(target);

### Arguments:

1. target - (*element* or *id*) the overlayed element.
2. options - (*object* optional) see below.

### Options:

* nb_subdivision - (*integer*, defaults to `3`) Spinner's length in blocks. Should not work well with large values.
* duration - (*integer*, defaults to `250`) Duration of a single block (in milliseconds). Will change spinning speed.
* fps - (*integer*, defaults to `5`) Value passed to the blocks opacity fx effect.
* max_size - (*integer*, defaults to `0.6`) Maximum spinner size within the target element. Defaults to 60% (`0.6`).
* opacity - (*integer*, defaults to `0.8`) Spinner's overlay opacity value. Defaults to 80% (`0.8`).
* storage - (*element* or *id*) DHTML Spinner HTML storage. Defaults to document.body.

### Returns:

(object) A new DHTMLSpinner instance.

### Prerequisite:

CSS declarations

	.dhtmlspin_layer { background:#FFFFFF; } /* overlay */
	.dhtmlspin_container {}
	.dhtmlspin_element { /* spinner's blocks */
		background: #C0C0C0;
		-moz-border-radius: 30px; /* Try to round it when possible */
		-webkit-border-radius: 30px;
		border-radius: 30px;
	}

### Example: 

	var spinner = new DHTMLSpinner('spinnable',
	{
		duration: 500, /* spin slower */
		fps: 50, /* Intensive but smoother transitions */
		max_size: 1.0 /* fill up entirely */
	});

	
DHTMLSpinner Method: startSpin {#DHTMLSpinner:startSpin}
--------------------------------------------------

Starts spinning. 

### Syntax:

	spinner.startSpin();


DHTMLSpinner Method: stopSpin {#DHTMLSpinner:stopSpin}
--------------------------------------------------

Stops the spinner. 

### Syntax:

	spinner.stopSpin();
	

DHTMLSpinner Method: setTarget {#DHTMLSpinner:setTarget}
--------------------------------------------------

Binds to and overlays another element.

### Syntax:

	spinner.setTarget('otherelement');
	
### Arguments:

1. target - (*element*) the new overlayed element.


DHTMLSpinner Method: adaptSize {#DHTMLSpinner:adaptSize}
--------------------------------------------------

Force recomputing spinner's sizings.

### Syntax:

	spinner.adaptSize();
