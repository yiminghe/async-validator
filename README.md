# async-validator

Validate form asynchronous. A variation of https://github.com/freeformsystems/async-validate

## differences

- support ie8
- support ``type:url`` ``type:email`` ``type:hex``
- support nice nested object validation message

- remove moment and async dependency
- remove parallel config, defaults to true
- remove ``type:date`` support
- remove .error constructor

## examples

```
npm install
npm start
```

http://localhost:8010/examples/simple.html