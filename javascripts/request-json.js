var url = "http://www.ifixit.com/api/0.1/device/";

window.addEvent('domready', function() {
		
		var jsonRequest = new Request.JSONP({
			url: "http://www.ifixit.com/api/0.1/devices?",
			
			callbackKey: "jsonp",
			
			data: {
				offset: "1",
				limit: "5",
			},
			
			onRequest: function() {
				console.log("Requesting Devices");
			},
			
			onComplete: function(data){
                Array.each(data, function(dev){
					var devName = dev.device;
					var urlName = url.concat(devName.replace(new RegExp(" ","g"), "+"));
					
					var jsonRequest = new Request.JSONP({
						url: urlName,
						
						callbackKey: "jsonp",
						
						data: {
						},
						
						onRequest: function() {
								console.log("Requesting Device Details");
							},
							
							onComplete: function(data){
								//document.getElementById('items').style.backgroundImage = "url('"+ data.image.text +".thumbnail')";
								console.log(devName);
								console.log(urlName);
								console.log(data.image.text);
								
								var element = new Element('div', {'class': 'items'});
                                element.set('html','<span style="font-size:12px">'+devName+'</span>');
								element.inject($('items'));
							},
							
							onSucess : function () {
						}
					}).send();
				})
			},
					
			onSucess : function () {
			}
			
		}).send();
		
})