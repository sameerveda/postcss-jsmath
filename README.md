# PostCSS JS-Math 

[PostCSS] plugin to do some math using Javascript```js Math```

[PostCSS]: https://github.com/postcss/postcss


## Installation

```console
$ npm install postcss-jsmath
```

## Usage

```js
postcss([ require('postcss-jsmath') ])
```

gulpfile.js
```js
'use strict';

const gulp = require("gulp"),
    postcss = require("gulp-postcss"),
    rename = require("gulp-rename"),
    math = require("postcss-jsmath");

gulp.task("default", function () {
    gulp.src("test.pcss")
        .pipe(postcss([math]))
        .pipe(rename(p => {
            p.extname = ".css";
        }))
        .pipe(gulp.dest("."));
});
```

test.pcss: 
```scss
.val-math(1+1), .val-math(2+2) {
    margin: math(10+10)px math(100%3)rem;
    z-index: math(15+15);
    background: linear-gradient(90deg, black math(100/3)%, red math(100/3)%, blue math(100/3)%);
}
```
test.css:
```css
.val-2, .val-4 {
    margin: 20px 1rem;
    z-index: 30;
    background: linear-gradient(90deg, black 33.333333333333336%, red 33.333333333333336%, blue 33.333333333333336%);
}
```

gulpfile.js
```js
'use strict';

const gulp = require("gulp"),
    postcss = require("gulp-postcss"),
    rename = require("gulp-rename"),
    math = require("postcss-jsmath");

gulp.task("default", function () {
    gulp.src("_TEST_/test.pcss")
        .pipe(postcss([math({
			e3:12345
		})]))
        .pipe(rename(p => {
            p.extname = ".css";
        }))
        .pipe(gulp.dest("_TEST_"));
});
```

test.pcss
```scss
.wo-math(e3) {}
```

test.css
```css
.wo-12345 {}
```

### Examples
- ![#f03c15](https://placehold.it/15/f03c15/000000?text=sameer) `#f03c15`
- ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) `#c5f015`
- ![#1589F0](https://placehold.it/15/1589F0/000000?text=+) `#1589F0`

