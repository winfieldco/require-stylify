require-stylify
===============

require styles in your browserify builds, same as you require your js files, works with css, less and sass

### why use this rather than (node-lessify)[https://github.com/wilson428/node-lessify]
Because this creates a css file on your filesystem and it appends style element with href rather than just appending styles directly into the DOM. This is better, because your less/sass sourcemaps still work. Also I believe having separate CSS and JS is good thing even though you end up with one extra file(your main.less/main.sass).
