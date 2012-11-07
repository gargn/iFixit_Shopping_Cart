var url = "http://www.ifixit.com/api/0.1/device/";

window.addEvent('domready', function() {
		
		var jsonRequest = new Request.JSONP({
			url: "http://www.ifixit.com/api/0.1/devices?",
			
			callbackKey: "jsonp",
			
			data: {
				offset: "0",
				limit: "15",
			},
			
			onRequest: function() {
				console.log("Requesting Devices");
			},
			
			onComplete: function(data){
                Array.each(data, function(dev){
					var devName = dev.device;
					var urlName = url.concat(devName.replace(new RegExp(" ","g"), "+"));
					devName = toTitleCase(devName);
					
					var jsonRequest = new Request.JSONP({
						url: urlName,
						
						callbackKey: "jsonp",
						
						data: {
						},
						
						onRequest: function() {
								console.log("Requesting Device Details");
							},
							
							onComplete: function(data){
								console.log(devName);
								console.log(urlName);
								console.log(data.image.text);
								
								var element = new Element('div', {'class': 'item'});
								element.setStyle('background-image',"url('"+ data.image.text +".thumbnail')");
								element.setStyle('width',150+'px');
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

// Capitalize titles
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}