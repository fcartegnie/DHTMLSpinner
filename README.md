DHTMLSpinner
===========

![Screenshot](http://fcartegnie.github.com/DHTMLSpinner/dhtmlspinner.png)

DHTMLSpinner is an expanding and customizable DHTML spinner overlay.

How to Use
----------

Add and the required css declarations

	.dhtmlspin_layer { background:#FFFFFF; }
	.dhtmlspin_container {}
	.dhtmlspin_element {
		background: #C0C0C0;
		-moz-border-radius: 30px; /* Try to round it when possible */
		-webkit-border-radius: 30px;
		border-radius: 30px;
	}

Then just create an Instance on the target element

	#JS
	var spinner = new DHTMLSpinner('spinnable');
	spinner.startSpin();

The spinner can be rebound to another element at anytime

	#JS
	spinner.setTarget('otherspinnable');

Please note that target elements will host the overlay, and will have their `position` style set to `relative` if none.