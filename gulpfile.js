let gulp = require( 'gulp' )
let sass = require( 'sass' )
let autoprefixer = require( 'gulp-autoprefixer' )
let plumber = require( 'gulp-plumber' )
let browserSync = require( 'browser-sync' )

gulp.task( 'browserSync', () => {
    browserSync.init( {
        server: {
            baseDir: '/app',
        }
    } )
} )

gulp.task( 'sass', () => {
    return gulp.src( 'app/assets/sass/**/*.scss' )
        .pipe( plumber() )
        .pipe( sass() )
        .pipe( autoprefixer( {
            browsers: [ 'last 2 versions' ],
            cascade: false
        } ) )
        .pipe( gulp.dest( 'app' ) )
        .pipe( browserSync.reload( {
            stream: true
        } ) )
} )

gulp.task( 'watch', [ 'sass', 'browserSync' ], () => {
    gulp.watch( 'app/scss/**/*.scss', [ 'sass' ] )
    gulp.watch( 'app/*.html', browserSync.reload )
    gulp.watch( 'app/js/**/*.js', browserSync.reload )
})
