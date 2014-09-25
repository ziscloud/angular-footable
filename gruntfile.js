module.exports = function (grunt) {

    grunt.registerTask('default', [ 'dev' ]);
    grunt.registerTask('dev', [ 'jshint', 'build:dev', 'http-server:dev', 'watch:demo' ]);
    grunt.registerTask('dist', [ 'jshint', 'build:dist' ]);
    grunt.registerMultiTask('build', simpleMultiTaskRunner);
    grunt.registerTask('test', [ 'build:dist', 'karma:unit', 'watch:test' ]);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            demo: 'demo',
            dist: 'dist',
            src: {
                js: [ 'src/**/*.js', '!src/**/*.spec.js' ]
            },
            spec: 'src/**/*.spec.js'
        },
        clean: {
            dist: [ '<%= config.dist %>/*' ]
        },
        karma: {
            unit: {
                options: {
                    configFile: 'test/karma.conf.js'
                }
            }
        },
        build: {
            dev: [ 'clean:dist', 'concat:all' ],
            dist: [ 'clean:dist', 'concat:all', 'ngAnnotate:release', 'uglify:release' ]
        },
        concat:{
            all: {
                options: {
                    process: function(src, filepath) {
                        var filename = /\/([^\/]+$)/.exec(filepath)[1];

                        return [
                            '// ### ' + filename + ' >>',
                            src,
                            '// ### << ' + filename,
                            '\n'
                        ].join('\n\n');
                    }
                },
                src: '<%= config.src.js %>',
                dest: '<%= config.dist %>/<%= pkg.name %>.js'
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            release: {
                files: [{
                    src: '<%= config.dist %>/<%= pkg.name %>.js',
                    dest: '<%= config.dist %>/<%= pkg.name %>.js'
                }]
            }
        },
        uglify: {
            options: {
                compress: true
            },
            release: {
                src: '<%= config.dist %>/<%= pkg.name %>.js',
                dest: '<%= config.dist %>/<%= pkg.name %>.min.js'
            }
        },
        watch:{
            demo: {
                options: {
                    livereload: true
                },
                files: [ '<%= config.src.js %>', '<%= config.demo %>/**' ],
                tasks: [ 'jshint', 'build:dev' ]
            },
            test: {
                files: [ '<%= config.src.js %>', '<%= config.spec %>' ],
                tasks: [ 'build:dist', 'test' ]
            }
        },
        jshint:{
            files: [
                'gruntfile.js',
                '<%= config.spec %>',
                '<%= config.src.js %>'
            ]
        },
        'http-server': {
            dev: {
                root: '.',
                port: 8080,
                host: '127.0.0.1',
                cache: 0,
                showDir : true,
                autoIndex: true,
                defaultExt: 'html',
                runInBackground: true
            }
        }
    });

    require('load-grunt-tasks')(grunt);


    function simpleMultiTaskRunner() {
        grunt.task.run(this.data);
    }

};