# PostCSS JS-Math 

[PostCSS] plugin to do some math using Javascript Math.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/naaspati/postcss-jsmath.svg
[ci]:      https://travis-ci.org/naaspati/postcss-jsmath

Before: 
```css
.val-math(1+1), .val-math(2+2) {
    margin: math(10+10)px math(100%3)rem;
    z-index: math(15+15);
    background: linear-gradient(90deg, black math(100/3)%, red math(100/3)%, blue math(100/3)%);
}
```
after:
```css
.val-2, .val-4 {
    margin: 20px 1rem;
    z-index: 30;
    background: linear-gradient(90deg, black 33.333333333333336%, red 33.333333333333336%, blue 33.333333333333336%);
}
```

## Usage

```js
postcss([ require('postcss-jsmath') ])
```

See [PostCSS] docs for examples for your environment.
