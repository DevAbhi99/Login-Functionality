const express=require('express');
const mysql=require('mysql2');

const cors=require('cors');

const app=express();

const bodyparser=require('body-parser');

app.use(express.json());

app.use(bodyparser.urlencoded({encoded:false}));


app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
  }));

  //Setup Mysqlconnection

  const connection = mysql.createConnection({
    host: 'localhost',   // Replace with your host
    user: 'root',        // Replace with your database user
    password: 'Trishala@99', // Replace with your database password
    database: 'credentialdb'   // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});





app.get('/data', (req,res)=>{
    const apiData=[{name:"Karan",
        age:23,
        role:'Developer'
    },
        {
            name:"Mohit",
            age:27,
            role:'Software Engineer'
        }]
    res.json(apiData);
})


//Signup code

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    // SQL query to insert data into the signup table
    const query = 'INSERT INTO signup (username, password) VALUES (?, ?)';
  
    connection.query(query, [username, password], (err, results) => {
      if (err) {
        console.error('Error inserting data into the database:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      console.log('User signed up:', results);
      res.json({ message: 'User signed up successfully!' });
    });
  });

const Port=5000;

app.listen(Port, ()=>{
    console.log(`Server running on ${Port}`);
})