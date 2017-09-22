![icon][logo]
# PostCSS JSMath 

[PostCSS] plugin to do some math using Javascript Math

It uses javascript's Math object and eval() to perform Math operations. 

it supports all Math's constants and function.
Also gives the ability to defined custom constants and functions.  

[PostCSS]: https://github.com/postcss/postcss
[logo]: https://raw.githubusercontent.com/naaspati/postcss-jsmath/master/g21.png

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

custom constants and functions.


gulpfile.js: 
```js
'use strict';

const gulp = require("gulp"),
    postcss = require("gulp-postcss"),
    rename = require("gulp-rename"),
    math = require("./postcss-jsmath");

gulp.task("default", function () {
    gulp.src("_TEST_/test.pcss")
        .pipe(postcss([math({
            r: 8.3144598,
            sum(...numbers) {
                return numbers.reduce((x, y) => x + y);
            },
            firstNumber(...numbers) {
                return numbers[0];
            }
        })]))
        .pipe(rename(p => {
            p.extname = ".css";
        }))
        .pipe(gulp.dest("_TEST_"));
});
```

test.pcss
```scss
.cls {
    order: math(sum(1, 2, 3, 5, 6));
    z-index: math(firstnumber(111, 2, 4, 5));
    order: math(r);
    order: math(floor(random()*100));
}
```

test.css
```css
.cls {
    order: 17;
    z-index: 111;
    order: 8.3144598;
    order: 38;
}
```

### Examples
```js
.val-math(1+1), .val-math(2+2)  =>  .val-2, .val-4
math(11+11), math(22+22)  =>  22, 44
math(11+11)math(22+22)  =>  2244
math(65515/8/1024)  =>  7.9974365234375
math(Sqrt(e+1+Sqrt(25)+Abs(-10)))  =>  4.326462969731631
math(sqrt(e+1+sqrt(25)+abs(-10)))  =>  4.326462969731631
math(floor(sqrt(e+1+sqrt(25)+abs(-10))))  =>  4
linear-gradient(90deg, black math(100/3)%, red math(100/3)%, blue math(100/3)%)  =>  linear-gradient(90deg, black 33.333333333333336%, red 33.333333333333336%, blue 33.333333333333336%)
math()  =>
math(sum(1, 2, 3, 5, 6))  =>  17
math(firstnumber(111, 2, 4, 5))  =>  111
math(r)  =>  8.3144598
math(floor(random()*100))  =>  62
```




Icons made by [Trinh Ho](https://www.flaticon.com/authors/trinh-ho) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0](http://creativecommons.org/licenses/by/3.0/)

