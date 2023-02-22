# scaler-sde-intern


## Frontend


## Backend
📂 Backend Organization
------------

    ├── node_modules       <- Folder containg node modules 
    ├── .env               <- MongoDB connection string
    ├── app.js             <- Main Express app containing all the api routes
    ├── index.js           <- startup js file intializing the app and the port
    ├── package.json       <- Containing the required node modules start up scripts etc
    ├── middlewares        <- Middleware to check if user is authenticated
    ├── models
    |   ├── Interview.js             <- database schema for interviews
    |   └── Particpant.js            <- database schema for participant
    |
    └── routes
        ├── interview.js             <- event handler for  interviews
        └── particpants.js            <- event handler for  Participants

### Sample cURL Requests

#### <li> All Users</li>
``` 
curl --location --request GET 'https://scaler-sde-intern-production.up.railway.app/api/particpants/all' 
```

#### <li> All Interviews</li>
``` 
curl --location --request GET 'https://scaler-sde-intern-production.up.railway.app/api/interview/all'
```

#### <li>New Interview</li>
``` 
curl --location --request POST 'https://scaler-sde-intern-production.up.railway.app/api/interview/new' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Test Interview",
    "startTime": "2023-02-21T09:42",
    "endTime": "2023-02-21T12:39",
    "participants": ["63f4e84588bfed7a84cb1457", "63f4e87788bfed7a84cb1458"]
}'
```

#### <li>Update Interview</li>
``` 
curl 'https://scaler-sde-intern-production.up.railway.app/api/interview/update/63f63f0870b827a3156e3395' \
  -X 'PUT' \
  -H 'authority: scaler-sde-intern-production.up.railway.app' \
  -H 'accept: */*' \
  -H 'accept-language: en-US,en;q=0.9' \
  -H 'content-type: application/json' \
  -H 'origin: https://imgood123.netlify.app' \
  -H 'referer: https://imgood123.netlify.app/' \
  -H 'sec-ch-ua: "Chromium";v="110", "Not A(Brand";v="24", "Brave";v="110"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'sec-gpc: 1' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36' \
  --data-raw '{"title":"SDE II - Network Engineer","startTime":"2023-02-24T23:43","endTime":"2023-02-25T00:45","participants":["63f4e84588bfed7a84cb1457","63f4e87788bfed7a84cb1458","63f4e89788bfed7a84cb145a"]}' \
  --compressed
```

#### <li>Delete Interview</li>
``` 
curl --location --request DELETE 'http://localhost:5000/api/interview/delete/63f576a17f4a356e24f9f3b7'
```

# Working
<td valign="top"><img src="https://i.ibb.co/qnSrVrx/Screenshot-2023-02-22-201556.png" alt="Screenshot-2023-02-22-201556" border="0" width="500" /></td>
<td valign="top"><img src="https://i.ibb.co/h70H5LT/Screenshot-2023-02-22-201514.png" alt="Screenshot-2023-02-22-201514" border="0" width="500" /></td>
<td valign="top"><img src="https://i.ibb.co/GC8Km0w/Screenshot-2023-02-22-201455.png" alt="Screenshot-2023-02-22-201455" border="0" width="500" /></td>
<td valign="top"><img src="https://i.ibb.co/G5LQdcm/Whats-App-Image-2023-02-22-at-20-17-00.jpg" alt="Screenshot-2023-02-22-201455" border="0" width="500" /></td>
