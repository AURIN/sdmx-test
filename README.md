# sdmxtest
ABS SDMX 2.1 Concurrency test



## Requirements

Node.js 12.x



## Installation

```shell script
npm install
``` 


## Execution

```shell script
node index <concurrency>
```

It retrieves all the dataflows metadata in the ABS endpoint with the given amount of concurrency (defaults to 1),
such as:

```shell script
node index 3
```


 
