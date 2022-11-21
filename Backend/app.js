const express = require('express');
const Axios = require("axios");
const cors = require('cors')
const client = require('./db.js');
let {PythonShell} = require('python-shell')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

//const name = "errichto"

app.use(cors({
    origin: true
}))

app.use(express.urlencoded({extended: true}));
app.use(express.json());

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
    let statement = 'select name from prob_pdf where code = ' + p_id;
    let data = await client.query(statement);
    //console.log(data.rows);
    return data.rows[0].name;
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

async function getLoginData(usernameORemail) {
    let statement = 'select * from info where email= ' +  "\'" + usernameORemail + "\'" + ';';
    //console.log("SQL STATEMENT :", statement);
    let data = await client.query(statement);
    console.log(data.rows);
    return data.rows;
}

app.post("/login", async (req, res) => {
    console.log("The request is: ", req.body);
    const {usernameORemail, password} = req.body;
    const data = await getLoginData(usernameORemail);
    let pass = data[0].password;
    if (pass == password) {
        const accessToken = jwt.sign({usernameORemail}, process.env.COOKIE_SECRET,{
            expiresIn: '1d'
        });
        // Set cookie (24 hours)
        res.cookie('access_token', accessToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
    
        console.log("USERNAME AND PASSWORD MATCHED");
        console.log('Authentication Success');

        return res.json(data[0])

    } else {
        console.log("USERNAME AND PASSWORD NOT MATCHED");
    }
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


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));