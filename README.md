# scaler-sde-intern


## Frontend


## Backend

### cURL Requests

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
    "link": "https://meet.google.com/new",
    "participants": ["63f4e84588bfed7a84cb1457", "63f4e87788bfed7a84cb1458"]
}'
```

# Working
<td valign="top"><img src="https://i.ibb.co/qnSrVrx/Screenshot-2023-02-22-201556.png" alt="Screenshot-2023-02-22-201556" border="0" width="500" /></td>
<td valign="top"><img src="https://i.ibb.co/h70H5LT/Screenshot-2023-02-22-201514.png" alt="Screenshot-2023-02-22-201514" border="0" width="500" /></td>
<td valign="top"><img src="https://i.ibb.co/GC8Km0w/Screenshot-2023-02-22-201455.png" alt="Screenshot-2023-02-22-201455" border="0" width="500" /></td>
<td valign="top"><img src="https://i.ibb.co/G5LQdcm/Whats-App-Image-2023-02-22-at-20-17-00.jpg" alt="Screenshot-2023-02-22-201455" border="0" width="500" /></td>
