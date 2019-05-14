var mysql = require('mysql');

var connection1 = mysql.createConnection({
   host: 'inhd0888',
   //host: '127.0.0.1',
   database: 'crownpeakdb',
   user: 'root'
});

var id, testCaseName, testCategory, testExecutionStatus, testValidity, testExecutionTime;

connection1.connect(function (err) {
   if (err) {
       console.error('Error connecting: ' + err.stack);
       return;
   }

   process.argv.forEach((val, index) => {
       console.log(`${index}: ${val}`);
       if (index == 3){
           testCategory = `${val}`;
       }

   });

   console.log("category for retrieving data from table is " + testCategory);

   getResult();
});


// connect to mysql

function getResult() {
   //Perform a query

   $query = "select id from `result` where testcategory = '" + testCategory + "' order by id desc limit 1;";

   connection1.query($query, function (err, rows, fields) {
       if (err) {
           console.log("An error ocurred performing the query.");
           console.log(err);
           return;
       }
       else {

           Object.keys(rows).forEach(function (keyItem) {
               var row = rows[keyItem]

               id = row.id;
               console.log("last id in table for same test category is " + id);
           });
       }

       console.log("Query succesfully executed", rows);

       insertValueInResultTable();
       endConnection();
   });

}


function increment(n) {

   //n = n + 1000000;
   n++;
   return n;
}

id = increment(id);


function insertValueInResultTable() {

   console.log("inserting data in table");
   process.argv.forEach((val, index) => {
       console.log(`${index}: ${val}`);
       switch (index) {

           case 2: testCaseName = `${val}`;
               break;
           case 3: testCategory = `${val}`;
               break;
           case 4: testExecutionStatus = `${val}`;
               break;
           case 5: testValidity = `${val}`;
               break;
           case 6: testExecutionTime = `${val}`;
               break;
           default:
               break;
       }
   });

   id = increment(id);

   console.log("id while inserting is " + id);
   console.log("test case name  while inserting is " + testCaseName);
   console.log("category  while inserting is " + testCategory);
   console.log("status  while inserting is " + testExecutionStatus);
   console.log("validity  while inserting is " + testValidity);
   console.log("exec time  while inserting is " + testExecutionTime);



   const resultRow = { id: id, testName: testCaseName, testcategory: testCategory, executionStatus: testExecutionStatus, valid: testValidity, duration: testExecutionTime };

   connection1.query('INSERT INTO result SET ?', resultRow, (err, res) => {
       if (err) throw err;

       console.log("id is " + id);
       console.log("test case name while inserting is " + testCaseName);
       console.log("status while inserting is " + testExecutionStatus);

   });

}


function endConnection() {

   //   Close the connection
   connection1.end(function () {
       // The connection has been closed
       console.log("connection to database is closed");
   });
}