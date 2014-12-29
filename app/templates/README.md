#<%= name %>

## How to start:

```bash
$ npm i
$ bem make
```

Then, you need to start two daemons.

1.
  bem server for static resources:
  ```bash
  $ bem server
  ```

2.
  node server for application itself:
  ```bash
  $ npm start
  ```

##Pro tips:

1. If you want to clean the cache of bem-tools, do `bem make -m clean`

2. In development environment it's better to export BEMHTML_ENV=development and BEMTREE_ENV=development variables.
