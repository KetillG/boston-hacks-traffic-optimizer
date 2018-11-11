# Boston Hack - Burnt Steak

This repository contains web client that is the main entry point to this project. There are four applications:

- A Web Single-Page Application (SPA) built with React.js and Redux.js
- An Authentication server built with Node.js
  https://github.com/KetillG/boston-hacks-traffic-auth
- A Twilio phone server built with python and Twilio API
- A data server built on top of Google Cloud Platform to get traffic data built with python

The apps are simple, because the codebase is meant to be a template on which you can easily hack and get started experimenting with OP's APIs.

## The goal of the hack

The hack had 4 sequential stages that we wanted to finish.

- Allow the user to register for our service. He would provide us with where he lives and works and at what times he goes to work and back home. Using this data we would visualize the average travel time to/from his workplace based on estimations from the Google Cloud Platform. This would help the user see that if he left earlier to work he would spend less time in traffic.
- Allow the user to register how long it takes him to get out of bed until he leaves the house. Using this data we could calculate the latest time he could wake up at, get out of the house and drive to work and not be late. He could use this data to set his alarm accordingly and get more sleep.
- Allow the user to register his phone number with us. We could then with the help of the Twilio API call the user and wake him up at the optimal time each day. This would replace the users normal alarm.
- Integrate this functionality into google home.
