var url = "http://www.ifixit.com/api/0.1/device/";
var firstVal = true;
var limit = 20;
var offset = 0;

window.addEvent('domready', function() {
	processData(offset);	
    dbinit();        		
})


function processPos() {
	offset = offset + limit;
	processData(offset);
	callDrag();
}

function processNeg() {
	if (offset - limit < 0) {
		offset = 0;
	} else {
		offset = offset - limit;
	}
	processData(offset);
	callDrag();
}

function processData(off) {
	var jsonRequest = new Request.JSONP({
		url: "http://www.ifixit.com/api/0.1/devices?",
		
		callbackKey: "jsonp",
		
		data: {
			offset: off,
			limit: limit,
		},
		
		onRequest: function() {
			console.log("Requesting Devices " + off);
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
							//console.log(devName);
							//console.log(urlName);
							//console.log(data.image.text);
							
							if (firstVal) {
								$(items).empty();
								firstVal = false;
							}	
							
							var element = new Element('div', {'class': 'item'});
							element.setStyle('background-image',"url('"+ data.image.text +".thumbnail')");
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
	firstVal = true;
}

// Capitalize titles
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}