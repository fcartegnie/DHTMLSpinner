/*
---
description: DHTMLSpinner class.

license: MIT-style

authors:
- Francois Cartegnie

requires:
- core/1.2.3: '*'

provides: [DHTMLSpinner]

...
*/

var DHTMLSpinner = new Class({
	Implements: [Options, Events],

	options: {
		nb_subdivision: 3,
		duration: Fx.Durations['short'],
		fps: 5,
		max_size: 0.6,
		opacity: 0.8
	},

	initialize: function(el, options){
		this.setOptions(options);
		this.path_index = 0;
		this.target = null;
		this.timer = null;
		this.root_element = new Element('div',{
			'class': 'dhtmlspin_layer',
			'styles': {
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'z-index': 10000
			}
		});

		this.container_element = new Element('div',{
			'class': 'dhtmlspin_container'
		});

		this.root_element.grab(this.container_element);

		var duration = (Math.pow(this.options['nb_subdivision'], 2) / 2) * this.options['duration'];

		for(var i=0;i<this.options['nb_subdivision'];i++){
			for(var j=0;j<this.options['nb_subdivision'];j++){
				var newblock = new Element('div',{
					'class': 'dhtmlspin_element',
					'styles': {
						'float': 'left',
						'opacity': 0.0
					}
				});
				newblock.store('tweenelement', new Fx.Tween(newblock, {'duration': duration, 'fps': this.options['fps']}));
				this.container_element.grab(newblock);
			}
		}

		/* define walking path */
		this.path = new Array( Math.pow(this.options['nb_subdivision'], 2) - Math.pow(this.options['nb_subdivision']-2, 2) );
 		/* outer square minus inner square */
 		i=0;
		for(j=0;j<this.options['nb_subdivision'];j++) { this.path[i++] = j; }
		for(j=2;j<this.options['nb_subdivision'];j++) { this.path[i++] = (this.options['nb_subdivision']*j) - 1; }
		for(j=0;j<this.options['nb_subdivision'];j++) { this.path[i++] = Math.pow(this.options['nb_subdivision'], 2) - j - 1; }
		for(j=this.options['nb_subdivision']-1;j>1;j--) { this.path[i++] = (this.options['nb_subdivision']*j)-this.options['nb_subdivision']; }

		this.setTarget(el);
		window.addEvent('resize', this.adaptSize.bind(this));
		this.root_element.setStyle('visibility', 'hidden');
	},

	setTarget: function(el) {
		if (this.target != null)
		/* clean up if we reattach somewhere else */
			this.target.removeEvent('resize', this.adaptSize.bind(this));
		this.target = document.id(el);
		if (this.target.getStyle('position') != 'absolute')
			this.target.setStyle('position', 'relative');
		this.target.adopt(this.root_element);
		this.adaptSize();
		this.target.addEvent('resize', this.adaptSize.bind(this));
		return this;
	},

	adaptSize: function() {
		var referenceCoords = this.target.getCoordinates();
		this.width = referenceCoords.width;
		this.height = referenceCoords.height;
		this.root_element.setStyle('width', '100%');
		this.root_element.setStyle('height', '100%');

		var bestsize = Math.min(this.width, this.height) * this.options['max_size'];
		this.container_element.setStyle('width', bestsize);
		this.container_element.setStyle('height', bestsize);
		this.container_element.setStyle('margin-left', Math.floor((this.width - bestsize) / 2));
		this.container_element.setStyle('margin-right', Math.floor((this.width - bestsize) / 2));
		this.container_element.setStyle('margin-top', Math.floor((this.height - bestsize) / 2));
		var blocksize = Math.floor(bestsize / this.options['nb_subdivision']);
		this.container_element.getChildren().each(function(e){
			e.setStyle('width', blocksize);
			e.setStyle('height', blocksize);
		});
		return this;
	},

	spinHandler: function(){
		var blocks = this.container_element.getChildren();
		blocks.each(function(e, index){
			if (index == this.path[this.path_index])
				e.retrieve('tweenelement').start('opacity', 1.0, 0.0);		
		}.bind(this));

		this.path_index++;
		if (this.path_index >= this.path.length)
			this.path_index = 0;
	},

	startSpin: function() {
		if (this.timer == null)
		{
			this.adaptSize();
			this.root_element.setStyle('opacity', 0.0);
			this.root_element.setStyle('visibility', 'visible');
			this.root_element.tween('opacity', 0.0, this.options['opacity']);
			this.timer = this.spinHandler.periodical(this.options['duration'], this);
			return true;
		} else return false;
	},

	stopSpin: function() {
		if (this.timer != null)
		{
			this.timer = $clear(this.timer);
			this.root_element.tween('opacity', this.options['opacity'], 0.0);
			(function(){ this.root_element.setStyle('visibility', 'hidden'); }.bind(this)).delay(Fx.Durations['short']);
			return true;
		} else return false;
	}
});//!Class
