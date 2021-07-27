# Outdoor.sy Sample App

This is a NodeJS ExpressJS web application forked from [node-express](https://github.com/plesk/node-express) and modified for uploading and viewing Vehicle data. It uses CDN jQuery, CDN Bootstrap stylesheets, and Mocha for unit tests.

Supported Functionality:
1. File upload - Select a valid vehicle file from `/sample-inputs` to upload vehicles into the table.
2. Vehicle sorting - Select any header to sort the visible vehicles.
3. Fuzzy search - Enter text into the fuzzy search input to filter the visible vehicles.

## Getting Started

1. First install npm dependencies
```
$ npm install
```

2. Start the development server
```
$ npm start
```

3. Navigate to http://localhost:8080

4. Run the tests
```
$ npm test
```

## Vehicle API

`GET /vehicles`

Inputs: None

Outputs: Array of Vehicle objects

`POST /vehicles`

Inputs: data

data - A valid Vehicle textblob. Valid Vehicle textblobs are newline separated lines with Vehicle properties in order separated by either , or |.

Outputs: None

## Vehicle model

```
Vehicle {
    string firstName
    string lastName
    string email
    string type
    string name
    string length # must be of the shape (34 feet, 34 ft, 34', 34)
}
```

### Future Plans

As Outdoor.sy gains more users, this application will grow to meet their needs. Here are a few ideas for improving the Outdoor.sy user experience.

1. **Persistent Data-Store** - Adding a basic data store would prevent vehicle information from being lost when server memory is cleared.
2. **Multi-part/Multi-file Upload** - When uploading very large Vehicle textblob files it's likely we'll run into limitations in browser memory. Reading and uploading batches of vehicle data will enable users to upload massive vehicle files. Uploading multiple files at a time could also be a useful feature.
3. **Pagination** - Once many vehicles are recorded, the UI will need to be paginated to ensure a good UX.
4. **Websocket Real-time Updates** - When vehicles are added, multiple clients could be alerted to the new data via websockets.
5. **Stateless views** - Sort/Filter configurations could be stored in url params so that view states could be shared between users.
6. **Individual Vehicle Upload Form** - A form for single vehicle uploads might be useful in the future.
