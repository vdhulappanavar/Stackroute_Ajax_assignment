const gulp = require('./node_modules/.bin/gulp')
const bable = require('./node_modules/.bin/gulp-babel')

gulp.task('es6' , ()=>{
  return gulp.src('init.js')
    .pipe( babel({
      presets : ['es2015']
    }))
    .pipe(gulp.dest('build'))
});

gulp.task('default' , ()=> {
  gulp.watch('init.js' , ['es6'])
});