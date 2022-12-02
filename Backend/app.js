const express = require('express');
const Axios = require("axios");
const cors = require('cors')
const client = require('./db.js');
let {PythonShell} = require('python-shell')
const {readFileSync, promises: fsPromises} = require('fs');
const path = require('path');
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const multer = require("multer");




const app = express();

const uname = "errichto"

app.use(cors({
    origin: true
}))

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname));

async function bypassCORS(req, res, next) {
    // For CORS errory
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000/",
      "Access-Control-Allow-Credentials" : true 
    });
    next();
  };

client.connect();


async function getSolvers(p_id) {
    let statement = 'select * from problems_solvers where code = ' + p_id + ';';
    let data = await client.query(statement);
    //console.log(data.rows);
    return data.rows;
}

app.post("/get_problem_solvers",  async (req, res) => {
    console.log("Ashchi eikhane get solvers");
    const data = await getSolvers(req.body.p_id);
    console.log("Solvers related info is ", data);
    res.send(data);
});

async function getProblemSet() {
    let statement = 'select * from problem';
    let data = await client.query(statement);
    //console.log(data.rows);
    return data.rows;
}

app.post("/get_problem_set", async (req, res) => {
    console.log("Ashchi eikhane get problem sets");
    const data = await getProblemSet();
    console.log("Problemset related info is ", data);
    res.send(data);
});

async function getPDF(p_id) {
    //let statement = 'select name from prob_pdf where code = ' + p_id;
    //let data = await client.query(statement);
    //console.log(data.rows);
    return p_id;
}

app.post("/get_problem_pdf", async (req, res) => {
    console.log("Ashchi eikhane get problem sets");
    const data = await getPDF(req.body.p_id);
    console.log("PDF related info is ", data);
    res.send(data);
});

async function getProblemVerdicts(p_id) {
    let statement = 'select count(code) from submissions where code = ' + p_id + ' and verdict = \'AC\';'
    let ac = await client.query(statement);
    //console.log(ac.rows[0].count);

    statement = 'select count(code) from submissions where code = ' + p_id + ' and verdict = \'WA\';'
    let wa = await client.query(statement);

    statement = 'select count(code) from submissions where code = ' + p_id + ' and verdict = \'TLE\';'
    let tle = await client.query(statement);

    statement = 'select count(code) from submissions where code = ' + p_id + ' and verdict = \'MLE\';'
    let mle = await client.query(statement);

    statement = 'select count(code) from submissions where code = ' + p_id + ' and verdict = \'RTE\';'
    let rte = await client.query(statement);

    statement = 'select count(code) from submissions where code = ' + p_id + ' and verdict = \'CLE\';'
    let cle = await client.query(statement);
    //console.log(data.rows);
    return {"ac" : ac.rows[0].count, "wa" : wa.rows[0].count, "tle" : tle.rows[0].count, "mle" : mle.rows[0].count, "rte" : rte.rows[0].count, "cle" : cle.rows[0].count};
}

app.post("/get_problem_verdicts", async (req, res) => {
    console.log("Ashchi eikhane get problem verdicts");
    let data = await getProblemVerdicts(req.body.p_id);
    console.log(data);
    data = JSON.stringify(data);
    console.log(data);
    console.log("Problemset related info is ", JSON.parse(data));
    res.send(data);
});

async function getLastLog() {
    const statement = 'SELECT * FROM logs WHERE CTID = (SELECT MAX(CTID) FROM logs);';
    let data = await client.query(statement);
    console.log(data.rows[0]);
    return data.rows[0];
}


app.post("/getOGname", async (req, res) => {
    let data = await getLastLog();
    console.log(data);
    data=JSON.stringify(data);
    res.send(JSON.parse(data));
});

async function getCFHandle() {
    let statement = 'SELECT * FROM logs WHERE CTID = (SELECT MAX(CTID) FROM logs);';
    let data = await client.query(statement);
    console.log(data.rows[0]);
    let un = data.rows[0].uname;
    statement = "select cf_handle from user_table where handle = " + "\'" + un + "\'" + ";";
    console.log(statement);
    data = await client.query(statement);
    return data.rows[0];
}

app.post("/getCFHandle", async (req, res) => {
    let data = await getCFHandle();
    console.log(data);
    data=JSON.stringify(data);
    res.send(JSON.parse(data));
});


async function getLoginData(username) {
    let statement = 'select * from user_table where handle= ' +  "\'" + username + "\'" + ';';
    console.log("SQL STATEMENT :", statement);
    try {
        let data = await client.query(statement);
        console.log(data.rows[0].password);
        return data.rows[0].password;
    } catch (err) {
        console.log(err);
        return "";
    }
    //return data.rows;
}

async function insertLog(name) {
    const statement = 'insert into logs values(' + "\'" + name + "\'" + ");";
    await client.query(statement);
    //console.log(data.rows[0]);
    //return data.rows[0];
}




app.post("/login", async (req, res) => {
    console.log("The request is: ", req.body);
    const {usernameORemail, password} = req.body;
    const data = await getLoginData(usernameORemail);
    let pass = data;
    if (pass == password) {
        await insertLog(usernameORemail)
        res.send({"vd" : 1})

    } else {
        console.log("USERNAME AND PASSWORD NOT MATCHED");
        res.send({"vd" : 0});
    }
});

async function setUserData(name, email, password, cf) {
    let statement = 'insert into user_table values (' + "\'" + name + "\'" + ", " + "\'" + email + "\'" + ", " + "\'" + password + "\'" + ", " + "\'" + cf + "\'" + ");";
    console.log("USER DATA INSERT STATEMENT :", statement);
    await client.query(statement);
    //console.log(data.rows);
    //return data.rows;
}

app.post("/signup", async (req, res) => {
    console.log("The request is: ", req.body);
    const {name, email, password, confPassword, cf} = req.body;
    await setUserData(name, email, password, cf);
    
});

app.post("/cf_user_verdict_count", (req, res) => {
    //console.log("Ashchi eikhane verdict count", req.body.name);
    let options = {       
        args:[req.body.name]
    }
        PythonShell.run("pyscripts/cf_verd_info.py", options, function(err, results) {
            if (err) {
                console.log("ERRROR in verd_info!");
                console.log(err);
            } else {
                const data= JSON.parse(results[0]);
                //console.log(data)
               res.send(data)

            }
        })
});

app.post("/cf_user_rating_history", (req, res) => {
    console.log("Ashchi eikhane rating history", req.body.name);
    let options = {       
        args:[req.body.name]
    }
        PythonShell.run("pyscripts/cf_rating_history.py", options, function(err, results) {
            if (err) {
                console.log("ERRROR in rating_history!");
                console.log(err);
            } else {
                const data= JSON.parse(results[0]);
                console.log("FUCK", data);
                res.send(data)

            }
        })
});

app.post("/cf_user_profile_info", (req, res) => {
    console.log("Ashchi eikhane profile info", req.body.name);
    let options = {
        
        args:[req.body.name]
    }
    PythonShell.run("pyscripts/cf_pp.py", options, function(err, results) {
        if (err) {
            console.log("ERRROR in profile_info!");
            //console.log(results)
            console.log(err);
        } else {
            const data= JSON.parse(results[0]);
            //console.log(data);
            res.send(data);

        }
    })
});

app.post("/cf_prob_rating", (req, res) => {
    console.log("Ashchi eikhane profile info", req.body.name);
    let options = {
        
        args:[req.body.name]
    }
    PythonShell.run("pyscripts/cf_prob_rating.py", options, function(err, results) {
        if (err) {
            console.log("ERRROR in prob_rating!");
            //console.log(results)
            console.log(err);
        } else {
            const data= JSON.parse(results[0]);
            console.log(data);
            res.send(data);

        }
    })
});

app.post("/get_upcoming_contests", (req, res) => {
    console.log("Ashchi eikhane upcoming contests");
    let options = {
        
        args:[]
    }
    PythonShell.run("pyscripts/upcoming_contests.py", options, function(err, results) {
        if (err) {
            console.log("ERRROR in prob_rating!");
            //console.log(results)
            console.log(err);
        } else {
            const data= JSON.parse(results[0]);
            console.log("UPCOMING contests",data);
            res.send(data);
        }
    })

});

async function getLastId() {
    let statement = 'select max(code) from prob_pdf';
    let data = await client.query(statement);
    console.log(data.rows[0].max);
    return data.rows[0].max;
}

const multerConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../Frontend/public/problems/") //path.join(__dirname, '/public/image/')
    },
    filename : async (req, file, callback) => {
        const ext = file.originalname.split('.')[1];
        //console.log("LOLLLL", file);
        let id = await getLastId();
        id = id + 1;
        console.log("NAME : ", id + "." + ext)
        callback(null, id + "." + ext);
    },

});

const upload = multer({
    storage: multerConfig,
});

uploadImage = upload.single('photo')

async function insertProblem(id, name, tag) {
    let statement = 'insert into problem values (' + id + ',' + '\'' + name + '\'' + ',' + '\'' + tag + '\'' + ', 0);'
    console.log("THE PROBLEM RELATED STATEMENT IS :", statement);  
    await client.query(statement);
    //console.log(data.rows);
    //return data.rows;
}

async function addProbPDF(nname, fname) {
    let statement = 'insert into prob_pdf values (' + nname + ", " + "\'" + fname + "\'" + ");";
    console.log(statement);
    let data = await client.query(statement);
    //console.log(data.rows[0].max);
    //return data.rows[0].max;
}

app.post("/uploadPDF", upload.array('photo', 3), function(req, res) {
    console.log("REQ IS", req.files);
    const tag = JSON.parse(req.body.name);
    console.log("TAGGGGG is", tag.name);
    let fname = req.files[0].originalname;
    fname = fname.split('.')[0];
    let nname = req.files[0].filename;
    nname = nname.split('.')[0];

    insertProblem(nname, fname, tag.name);

    addProbPDF(nname, fname);

    //console.log("FILEEEENMEEEEEE", filename)


});

app.post("/compile", (req, res) => {
	//getting the required data from the request
	let code = req.body.code;
	let language = req.body.language;
	let input = req.body.input;
  let vernum = 0;

	if (language === "python") {
		language="python3";
    vernum = 4;
	}else if (language === "c++" || language === "c") {
    language="cpp";
    vernum = 5;
  } else if (language === "java") {
    language="java";
    vernum = 4;
  }

  //console.log("THE INPUT GIVEN IS", input)

  //let result = code.split(/\r?\n/).filter(element => element);
  //result = result.join("\n");
  //console.log(result);

	let data = (
      {
        clientId: "6172ba5de9121d1187452a1c000d6614",
        clientSecret: "bd2c8f4e1e7f996326e5a821ab688003fe381579704ff948fef27704f60e2a89",
        script: code,
        stdin: input,
        language: language,
        versionIndex: vernum
      }
  );
  
	let config = {
		method: "POST",
		url: 'https://api.jdoodle.com/execute',
		headers: {
			'Content-Type': 'application/json'
		},
		data: data
	};

	//calling the code compilation API
    Axios(config)
      //.then((response) => response.json())
      .then((data) => { 
        //let out = "The output is" + data.data.output;
        console.log(data.data);
        res.send(data.data);
  }).catch((e) => console.log("ERROR MESSAGE: ", e.message));
})

async function updAC(id) {
    let statement = 'select * from problem where code = ' + id + ';';
    console.log("THE AC COUNT RELATED STATEMENT IS :", statement);  
    let data = await client.query(statement);
    //console.log(cnt);
    let cnt = data.rows[0].solve_count;
    console.log(cnt);
    cnt = cnt + 1;
    statement = 'delete from problem where code = ' + id + ';';
    console.log(statement);
    await client.query(statement);
    console.log("LMAO");

    data = data.rows[0];

    statement = 'insert into problem values (' + data.code + ',' + '\'' + data.name + '\'' + ',' + '\'' + data.tag + '\'' + ',' +  cnt + ');'

    await client.query(statement);

    console.log("LOL");

    //console.log(data.rows);
    //return data.rows;
}

async function updSolvers(id, uname, tl, ml) {
    tl += " ms";
    ml += " KB";
    let statement = "insert into problems_solvers values (" + id + "," + "\'" + uname + "\'" + "," + "\'" + tl + "\'" +  "," + "\'" + ml + "\'" + ");";

    console.log("UPDSOLVERS: ", statement);

    await client.query(statement);
}

async function updSubmissions(id, uname, vd) {
    let statement = "insert into submissions values (" + id + "," + "\'" + uname + "\'" + "," + "\'" + vd + "\'" + ");";
    console.log("UPD SUBS : ", statement);
    await client.query(statement);
}

app.post("/judgeSolution", (req, res) => {
	//getting the required data from the request
	let code = req.body.code;
	let language = req.body.language;
    let id = req.body.id;
	let input;
    let vernum = 4;
    let ogname = req.body.name;

    //console.log("LLLLLLLLLLLLLL", req.body)

    function syncReadFile(filename) {
        try {
            const contents = readFileSync(filename, 'utf-8');

            const arr = contents;//contents.split(/\r?\n/);

            //console.log("FILE STUFFS BEFORE", arr);
            //input = arr;
            return arr;
        } catch (err) {
            console.log("FILE READING ERROR: ", err);
        }
    }

    let fname = "D://coj.backup//Frontend//public//problems//"
    input = syncReadFile(fname + "1004.txt");
    console.log("FILE STUFFS", input);

    let output = "";
    let correct_output = "";

	if (language === "python") {
		language="python3";
    vernum = 4;
	}else if (language === "c++" || language === "c") {
    language="cpp";
    vernum = 5;
  } else if (language === "java") {
    language="java";
    vernum = 4;
  }

//   //let result = code.split(/\r?\n/).filter(element => element);
//   //result = result.join("\n");
//   //console.log(result);



	let data = (
      {
        clientId: "6172ba5de9121d1187452a1c000d6614",
        clientSecret: "bd2c8f4e1e7f996326e5a821ab688003fe381579704ff948fef27704f60e2a89",
        script: code,
        stdin: input,
        language: language,
        versionIndex: vernum
      }
  );
  
	let config = {
		method: "POST",
		url: 'https://api.jdoodle.com/execute',
		headers: {
			'Content-Type': 'application/json'
		},
		data: data
	};

	//calling the code compilation API
    Axios(config)
      //.then((response) => response.json())
      .then((data) => { 
        //let out = "The output is" + data.data.output;
        
        output = data.data.output;
        output = output.trim();
        console.log("Timeeeeeeee before ", data.data.cpuTime);
        console.log("VERRRRRRR before ", output);

        correct_output = syncReadFile(fname + "1004.out");
        correct_output = correct_output.trim();

        console.log("corr_output before ", correct_output);

        console.log("EQUALITY: ", output == correct_output);

        let vd = "AC";
        let ret = {};
        //console.log("PRINT : ", output.indexOf("ZeroDivisionError"));
        //console.log("PRINT22 : ", output.includes("ZeroDivisionError"));
        if (output.indexOf("ZeroDivisionError") !== -1 || output.indexOf("IndexError") !== -1) {
            vd = "RTE";
            ret = {
                "verdict" : "Run Time Error",
                "Time" : data.data.cpuTime * 1000,
                "Memory" : data.data.memory / 1000,
            }
        } else if (output.indexOf("SyntaxError") !== -1 || output.indexOf("NameError") !== -1 || output.indexOf("TypeError") !== -1) {
            vd = "CLE";
            ret = {
                "verdict" : "Compilation Error",
                "Time" : "0",
                "Memory" : "0",
            } 
        } else if (data.data.cpuTime == null) {
            vd = "TLE";
            ret = {
                "verdict" : "Time Limit Exceeded",
                "Time" : data.data.cpuTime * 1000,
                "Memory" : data.data.memory
            }
        } else if (data.data.memory > 256000) {
            vd = "MLE";
            ret = {
                "verdict" : "Memory Limit Exceeded",
                "Time" : data.data.cpuTime * 1000,
                "Memory" : data.data.memory
            }
        } else if (output == correct_output) {

            vd = "AC";

            updAC(id, ogname);

            updSolvers(id, ogname, data.data.cpuTime * 1000, data.data.memory);

            ret = {
                "verdict" : "Accepted",
                "Time" : data.data.cpuTime * 1000,
                "Memory" : data.data.memory
            } 
        } else {
            vd = "WA";
            ret = {
                "verdict" : "Wrong Answer",
                "Time" : data.data.cpuTime * 1000,
                "Memory" : data.data.memory
            }
        }

        updSubmissions(id, ogname, vd);

        ret = JSON.stringify(ret);
        res.send(JSON.parse(ret));

        //res.send(data.data);
  }).catch((e) => console.log("ERROR MESSAGE IN JUDGING : ", e.message));

})


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));