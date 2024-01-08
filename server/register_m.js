const mongoose = require('mongoose');

//     MongoClient.connect(url)
//     .then((connectedClient)=>{
//         client=connectedClient
//         const dbo = client.db("dayOff")
//         return dbo.createCollection("user")

    
// })

//     .then((res)=> {

//         var obj={username:userid,email:email,password:password,semester:semester,section:section,dsa:dsa,ddco:ddco,wt:wt,sds:sds,afll:afll};
//         const collection = client.db("dayOff").collection("user")
//         console.log("insert one");
//         return collection.insertOne(obj) 

        
//     })

//         .then((res)=>{
//             // console.log("Database Created")
//             // console.log("Number of documents inserted", res.insertedCount)
//             // console.log("Document Inserted", res)
//             console.log("Documents are ",res)
//             client.close()
//         })
//         .catch((err)=>{
//             console.log("Error occured:",err)
//         }) 
//         }

   // var con = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "Root@123",
    //     database: "timetable_db"
    // });
    // console.log ("create conn ok") ;

    // con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    //     let sql = "SELECT Days, SUM((Class_1 = 'Free') + (Class_2= 'Free') + (Class_3 = 'Free') + (Class_4 = 'Free') + (Class_5 = 'Free') + (Class_6 = 'Free') + (Class_7 = 'Free') + (Class_8 = 'Free') + (Class_9 = 'Free')) AS free_count FROM timetable_db."+section+"_section GROUP BY Days ORDER BY free_count DESC LIMIT " +classes +";";
    //     console.log ("sql query=" + sql)
    //     con.query(sql, function (err, result, fields) {
    //         if (err) throw err;
    //         let output = JSON.stringify(result);
    //         console.log("Output is", output);
    //         let data = JSON.parse(output);
    //         console.log("data is",data);
    //         var days = data.map(item => item.Days).join(', ');
    //         console.log("Days to take off:",days);

    //         retCode = 200;
    //         retMsg = "Successful" ;
    //         let respMessage = {"code":retCode, "text":retMsg} ;
    //         res.json(respMessage)
    //       });

    // }); 