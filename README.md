# PostCSS JS-Math 

[PostCSS] plugin to do some math using Javascript Math

It uses javascript's Math object and eval() to perform Math operations. 

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
```js
- .val-math(1+1), .val-math(2+2)  =>  .val-2, .val-4
- math(11+11), math(22+22)  =>  22, 44
- math(11+11)math(22+22)  =>  2244
- math(65515/8/1024)  =>  7.9974365234375
- math(Sqrt(e+1+Sqrt(25)+Abs(-10)))  =>  4.326462969731631
- math(sqrt(e+1+sqrt(25)+abs(-10)))  =>  4.326462969731631
- math(floor(sqrt(e+1+sqrt(25)+abs(-10))))  =>  4
- linear-gradient(90deg, black math(100/3)%, red math(100/3)%, blue math(100/3)%)  =>  linear-gradient(90deg, black 33.333333333333336%, red 33.333333333333336%, blue 33.333333333333336%)
- math()  =>
```

