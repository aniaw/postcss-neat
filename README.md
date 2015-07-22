# PostCSS-Neat

[![npm-version]][npm] [![travis-ci]][travis]

## A semantic and fluid grid framework on top of PostCSS

[PostCSS-Neat][postcss-neat] is a fluid grid framework built with the aim of being easy enough to use out of the box and flexible enough to customize down the road.

## Using PostCSS-Neat

Note, that you must use this plugin in conjunction with [postcss-nested][postcss-nested]:

```js
postcss([
  require('postcss-neat')(/* { options } */),
  require('postcss-nested')
])
```

There is a gulp usage:

```js

var gulp = require('gulp');
gulp
  .task('css', function () {
    var processors = [
      require('autoprefixer-core')({ browsers: ['last 1 version'] }),
      require('postcss-neat')(/* { options } */),
      require('postcss-nested')
    ];
    return gulp.src('./input/*.css')
      .pipe(require('gulp-postcss')(processors))
      .pipe(gulp.dest('./output/'));
  })
  .task('default', ['styles']);
```

<!---
If you are planning to override the default grid settings (12 columns, and etc.), it is easier to create a copy of an existing [_variables.less](/stylesheets/core/_variables.less) file for that purpose. Make sure to replace existing import to your version of variables in [_less-neat.less](/stylesheets/_less-neat.less):

```less
@import "core/_local_variables";
```
-->
See the [demo page](http://jo-asakura.github.io/postcss-neat/demo.html) for a full list of features.

Let's walk through a simple example. Include the `outer-container` mixin in the topmost container (to which the `max-width` setting will be applied):

```css
.container {
  @neat-outer-container;
}
```

Then use `span-columns` on any element to specify the number of columns it should span:

```css
.element {
  @neat-span-columns 6;
}
```

If the element's parent isn't the top-most container, you need to add the number of columns of the parent element to keep the right proportions:

```css
.container {
  @neat-outer-container;

  .parent-element {
    @neat-span-columns 8;

    .element {
      @neat-span-columns 6 8;
    }
  }
}
```

To make your layout responsive, use the [postcss-media-minmax](https://github.com/postcss/postcss-media-minmax) media queries functionality to modify both the grid and the layout:

```css
.container {
  @neat-span-columns 4;

  @media (width >= 768px) {
    @neat-span-columns 2;
  }
}
```

## PostCSS-Neat v1

Second version of PostCSS-Neat introduced breaking changes. [Here][old-doc] is old documentation if you're still using PostCSS-Neat version 1.X.X.

## Credits

PostCSS-Neat is created and maintained by Alexandr Marinenko. The project is heavily inspired by amazing Sass framework [Bourbon Neat](http://neat.bourbon.io). Tweet your questions or suggestions to [@jo_asakura](https://twitter.com/jo_asakura).

## License

Copyright © 2015 Alexandr Marinenko. PostCSS-Neat is free software, and may be redistributed under the terms specified in the [license](LICENSE).


  [npm]: https://www.npmjs.com/package/postcss-neat
  [npm-version]: http://img.shields.io/npm/v/postcss-neat.svg?style=flat-square

  [travis]: https://travis-ci.org/jo-asakura/postcss-neat
  [travis-ci]: https://img.shields.io/travis/jo-asakura/postcss-neat/master.svg?style=flat-square

  [postcss-neat]: http://jo-asakura.github.io/postcss-neat/
  [postcss-nested]: https://github.com/postcss/postcss-nested
  [old-doc]: https://github.com/jo-asakura/postcss-neat/blob/0197c392253b13196e00145f6365b330024a1a5f/README.md
