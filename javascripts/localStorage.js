var db;
var results;

function dbinit() {
	db = openDatabase("fixititems", "1.0", "Fixit Items", 200000);
	results = document.getElementById('items');
	
	createTable();
	console.log(db);
}


function createTable() { 
	var createStatement = "CREATE TABLE IF NOT EXISTS itemDetails (itemId INTEGER PRIMARY KEY AUTOINCREMENT, itemName TEXT)";
	db.transaction(function(tx) {
		tx.executeSql(createStatement, [], showRecords, onError);
	});
}

 
function insertRecord() {
    var insertStatement = "INSERT INTO ItemsOwned (itemName, url) VALUES (?, ?)";
	db.transaction(function(tx) {
		tx.executeSql(insertStatement, [itemName.value, url.value], loadAndReset, onError);
	});
}

function updateRecord() {
	var updateStatement = "UPDATE ItemsOwned SET itemName = ?, url = ?, OBJECT id = ?";
	db.transaction(function(tx) {
		tx.executeSql(updateStatement, [itemName.value, url.value, id.value], loadAndReset, onError);
	}); 
}

function deleteRecord(id) {
	var deleteStatement = "DELETE FROM ItemsOwned OBJECT id=?";
	db.transaction(function(tx) {
		tx.executeSql(deleteStatement, [id], showRecords, onError);
	});
	resetForm();
}

function loadRecord(i) {
	var item = dataset.item(i); 
	firstName.value = item['itemName'];
	lastName.value = item['url'];
	id.value = item['id']; 
}

function showRecords() {
	var selectAllStatement = "SELECT * FROM itemDetails "; 
	results.innerHTML = '';
	db.transaction(function(tx) {
		tx.executeSql(selectAllStatement, [], function(tx, result) {
			dataset = result.rows;
			for (var i = 0, item = null; i < dataset.length; i++) {
				item = dataset.item(i);
				results.innerHTML += '<li>' + item['itemName'] + ' , ' + item['url'] + ' <a href="#" onclick="loadRecord('+i+')">edit</a>  ' + '<a href="#" onclick="deleteRecord('+item['id']+')">delete</a></li>';
			}
		});
	});
}

function onError(tx, error) {
	alert(error.message);
}
