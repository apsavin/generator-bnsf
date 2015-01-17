# generator-bnsf [![Build Status](https://secure.travis-ci.org/apsavin/generator-bnsf.png?branch=master)](https://travis-ci.org/apsavin/generator-bnsf)

> [Yeoman](http://yeoman.io) generator for [bnsf](https://github.com/apsavin/bnsf)


## Getting Started

To instal yo from npm, run:

```bash
npm install -g yo
```

To install generator-bnsf from npm, run:

```bash
npm install -g generator-bnsf
```

###To generate new bnsf project, run:

```bash
yo bnsf project-name && cd project-name
```

###To generate new bnsf page, run:

From the project root directory

```bash
yo bnsf:page NAME
```

where is `NAME` is your page name without the `page-` prefix, for example:

```bash
yo bnsf:page index
```

will generate `page-index`

###To generate new bnsf page browser.js file, run:

From the project root directory

```bash
yo bnsf:pagebrowserjs NAME
```

where is `NAME` is your page name without the `page-` prefix, for example:

```bash
yo bnsf:pagebrowserjs index
```

will generate `page-index.browser.js`

## License

MIT
