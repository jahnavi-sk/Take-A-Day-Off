
async function dbWriteRegistrationData(userid, email, password,semester,section,dsa,afll,ddco,wt,sds)
{
    console.log ("inside dbwriteReg ")
    var mysql = require('mysql');
    let retCode = '500';
    let retMsg = 'User registration failed !!' ;

    const  MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017";

    

    MongoClient.connect(url)
        .then((connectedClient) => {
            client = connectedClient;
            const dbo = client.db("dayOff");
            const collection = dbo.collection("user");

            // for making the username unique
            return collection.createIndex({ "username": 1 }, { unique: true })
                .then(() => {

                    var obj = { username: userid, email: email, password: password, semester: semester, section: section, dsa: dsa, ddco: ddco, wt: wt, sds: sds, afll: afll };
                    
                    console.log("insert one");
                    
                    return collection.insertOne(obj);
                });
        })
        .then((res) => {
            console.log("Documents are ", res);
            res.json("successful!")
            client.close();
        })
        .catch((err) => {
            console.log("Error occurred:", err);
            // res.json("Error");
        });
}


async function dbLoginData(userid, password,res)
{
    
    const  MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017";
    return MongoClient.connect(url)
        .then((connectedClient) => {
            const dbo = connectedClient.db("dayOff");
            const collection = dbo.collection("user");


            return collection.findOne({ username: userid, password: password })
            
                .then((result) => {
                    connectedClient.close();
                    // console.log("user is",res);
                    if(result)
                    {
                        console.log("correct");
                        res.json("correct");
                    }
                    else
                    {
                        console.log("wrong");
                        // res.json("wrong");
                    }
                    
                    return res; 
                })
                
                
        })
        .catch((err) => {
            console.log("Error occurred:", err);
            res.json("error");
        });
}


async function dbUpdateData(userid,dsa,afll,ddco,wt,sds,res)
{
    const  MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017";
    console.log ("inside UpdateReg")
    
    const updatedValues = {
        dsa: dsa,
        afll: afll,
        ddco:ddco,
        wt:wt,
        sds:sds
        
    };
    return MongoClient.connect(url)
        .then((connectedClient) => {
            const dbo = connectedClient.db("dayOff");
            const collection = dbo.collection("user");

            return collection.updateOne(
                { userid: userid },
                { $set: updatedValues } 
            ).then(() => {
                connectedClient.close();
                res.json("succes!")
                console.log("Record updated successfully");
            });
        })
        .catch((err) => {
            console.log("Error occurred:", err);
        });
}


async function dbAttendanceData(userid,ddco, dsa, wt, sds, afll, section, classes, res) {
    const MongoClient = require('mongodb').MongoClient;
    let ans;
    
    var url = "mongodb://127.0.0.1:27017";
    let connectedClient;
    // console.log("classes",classes);
    let collection;

    const num_ddco = ddco.split('/').map(Number);
    const ddco_l = 15 - (num_ddco[1] - num_ddco[0]);
    const num_dsa = dsa.split('/').map(Number);
    const dsa_l = 15 - (num_dsa[1] - num_dsa[0]);
    const num_wt = wt.split('/').map(Number);
    const wt_l = 15 - (num_wt[1] - num_wt[0]);
    const num_sds = sds.split('/').map(Number);
    const sds_l = 15 - (num_sds[1] - num_sds[0]);
    const num_afll = afll.split('/').map(Number);
    const afll_l = 15 - (num_afll[1] - num_afll[0]);

    const values = ['DDCO', 'SDS', 'WT', 'AFLL', 'DSA'];
    
    let leftClasses = [ddco_l, sds_l, wt_l, afll_l, dsa_l]; 
    // console.log("left classes:", leftClasses);
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => {
            connectedClient = client;
            const dbo = client.db("dayOff");
            collection = dbo.collection(section + "_tt");

            // Part 1: Fetch days with free counts
            return collection.aggregate([
                {
                    $project: {
                        _id: 0,
                        day: 1,
                        free_count: {
                            $sum: [
                                { $cond: [{ $eq: ["$c1", "free"] }, 1, 0] },
                                { $cond: [{ $eq: ["$c2", "free"] }, 1, 0] },
                                { $cond: [{ $eq: ["$c3", "free"] }, 1, 0] },
                                { $cond: [{ $eq: ["$c4", "free"] }, 1, 0] },
                                { $cond: [{ $eq: ["$c5", "free"] }, 1, 0] },
                                { $cond: [{ $eq: ["$c6", "free"] }, 1, 0] },
                                { $cond: [{ $eq: ["$c7", "free"] }, 1, 0] },
                                { $cond: [{ $eq: ["$c8", "free"] }, 1, 0] },
                                { $cond: [{ $eq: ["$c9", "free"] }, 1, 0] }
                            ]
                        }
                    }
                },
                {
                    $sort: { free_count: -1 }
                },
                {
                    $limit: classes
                },
                {
                    $project: {
                        _id: 0,
                        day: 1
                    }
                }
            ]).toArray();
        })
        .then((result) => {

            ans = result.map(doc => doc.day);
            // console.log(ans); 
            const fields = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];

            // Part 2: Fetch counts for specific values
            let promises = ans.map(day => {
                return Promise.all(fields.map(field => {
                    return collection.aggregate([
                        
                        { $match: { day: day } },
                        { $unwind: `$${field}` },
                        { $match: { [field]: { $in: values } } },
                        { $group: { _id: `$${field}`, count: { $sum: 1 } } }

                    ]).toArray();
                }));
            });

            return Promise.all(promises);
        })
        .then((results) => {
            let countsPerDay = {};

            ans.forEach(day => {
                countsPerDay[day] = {};
                values.forEach(value => {
                    countsPerDay[day][value] = 0;
                });
            });

            results.forEach((dayResults, dayIndex) => {
                dayResults.forEach(result => {
                    result.forEach(doc => {
                        countsPerDay[ans[dayIndex]][doc._id] += doc.count;
                    });
                });
            });

            let valueArrays = values.map(value => ans.map(day => countsPerDay[day][value]));

            let sumArray = values.map(value => ans.reduce((sum, day) => sum + countsPerDay[day][value], 0));

            // console.log("Counts Per Day:", countsPerDay);
            // console.log("Value Arrays:", valueArrays);
            // console.log("Sum Array:", sumArray);

            let isPossible = true;

            for (let i = 0; i < leftClasses.length; i++) {
                if (leftClasses[i] <= sumArray[i]) {
                    isPossible = false;
                    break;
                } else {
                    leftClasses[i] -= sumArray[i];
                }
            }

            if (isPossible) {
                res.json("You can miss the days:\n"+ans.join(', '))
                console.log("You can miss the days: ");
                console.log(ans.join(', '));
                return res;
                // console.log("Updated leftClasses:", leftClasses);
            } else {
                res.json("It's best not to miss "+classes+" days")
                console.log("It's best not to miss "+classes+" days");
                
                return res;
            }

           
            return 100;
        })
        .catch((err) => {
            console.log("Error occurred:", err);
            if (res) {
                res.json("error!");
            }
        })
        .finally(() => {
            if (connectedClient) {
                connectedClient.close();
            }
        });
}




async function getInfo(username, password,classes, res) {
    const MongoClient = require('mongodb').MongoClient;
    const url = "mongodb://127.0.0.1:27017";
    let connectedClient;

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => {
            connectedClient = client;
            const dbo = client.db("dayOff");
            const collection = dbo.collection("user");

            return collection.findOne({ username: username, password: password });
        })
        .then((user) => {
            if (user) {
                // console.log("Login successful!");
                dbAttendanceData(user.username, user.ddco, user.dsa, user.wt, user.sds, user.afll, user.section, classes, res);
            } else {
                console.log("Invalid username or password");
                if (res) {
                    res.json("Invalid username or password");
                }
            }
        })
        .catch((err) => {
            console.log("Error occurred:", err);
            if (res) {
                res.json("error");
            }
        })
        .finally(() => {
            if (connectedClient) {
                connectedClient.close();
            }
        });
}



module.exports = { dbWriteRegistrationData, dbLoginData, dbUpdateData,dbAttendanceData,getInfo };