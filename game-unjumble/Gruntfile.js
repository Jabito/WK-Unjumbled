// Generated on 2016-08-01 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: 'app',
    game: require('./bower.json').appPath || 'game',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep', 'injector']
      },
      js: {
        files: ['<%= yeoman.game %>/assets/js/{,*/}*.js'],
        tasks: ['newer:jshint:all', 'injector'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= yeoman.game %>/assets/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.game %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.game %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/game/assets/styles',
                connect.static('./game/assets/styles')
              ),
              connect.static(appConfig.game)
            ];
          }
        }
      },
      appreload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./game/bower_components')
              ),
              connect().use(
                '/assets',
                connect.static('./game/assets')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.game)
            ];
          }
        }
      },
      app: {
        options: {
          open: true,
          base: '<%= yeoman.app %>'
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.game %>/assets/js/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    //injects dependencies
    injector: {
      options: {
        ignorePath: '<%= yeoman.game %>',
        addRootSlash: false,
      },
      game: {
        files: {
          '<%= yeoman.game %>/index.html': [
            '<%= yeoman.game %>/assets/js/init.js',
            '<%= yeoman.game %>/assets/js/models/*.js',
            '<%= yeoman.game %>/assets/js/states/*.js',
          ]
        },
      },
      dist: {
        files: {
          '<%= yeoman.game %>/index.html': [
            '<%= yeoman.game %>/assets/js/init.js',
            '<%= yeoman.game %>/assets/js/models/*.js',
            '<%= yeoman.game %>/assets/js/states/*.js',
            '<%= yeoman.game %>/assets/js/game.js'
          ]
        }
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      game: {
        directory: './game/bower_components',
        bowerJson: require('./bower.json'),
        src: ['<%= yeoman.game %>/index.html'],
        ignorePath:  /\.\.\//
      },
      // app: {
      //   directory: './app/bower_components',
      //   bowerJson: require('./app/bower.json'),
      //   src: ['<%= yeoman.app %>/index.html'],
      //   ignorePath:  /\.\.\//
      // },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/assets/js/{,*/}*.js',
          '<%= yeoman.dist %>/assets/styles/{,*/}*.css',
          '<%= yeoman.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/assets/styles/*',
          '<%= yeoman.dist %>/assets/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.game %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/assets/styles/{,*/}*.css'],
      // js: ['<%= yeoman.dist %>/assets/js/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/assets/audio',
          '<%= yeoman.dist %>/assets/fonts',
          '<%= yeoman.dist %>/assets/images',
          '<%= yeoman.dist %>/assets/js',
          '<%= yeoman.dist %>/assets/styles'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/assets/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/assets/js/main.js': [
    //         '<%= yeoman.game %>/assets/js/{,*/}*.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },


    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.game %>/assets/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/assets/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.game %>/assets/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/assets/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      replace: {
        src: '<%= yeoman.dist %>/index-dist.html',
        dest: '<%= yeoman.dist %>/index.html',
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.game %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            '*.json',
            'views/{,*/}*.*',
            'assets/audio/{,*/}*.*',
            'assets/fonts/{,*/}*.*',
            'assets/images/{,*/}*.{webp,json,tps,pes}',
            // 'assets/js/{,*/}*.*',
            // 'assets/styles/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/assets/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: 'bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '<%= yeoman.dist %>/assets/fonts'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.game %>/assets/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    game: grunt.file.readJSON('game/manifest.json'),
    aws: grunt.file.readJSON('config/credentials.json'), // Read the file

    aws_s3: {
      options: {
        accessKeyId: '<%= aws.accessKeyId %>', // Use the variables
        secretAccessKey: '<%= aws.secretAccessKey %>', // You can also use env variables
        region: '<%= aws.region %>',
        uploadConcurrency: 10, // 5 simultaneous uploads
        downloadConcurrency: 10 // 5 simultaneous downloads
      },
      production: {
        options: {
          bucket: '<%= aws.bucket %>',
        },
        files: [
          {expand: true, cwd: '<%= yeoman.dist %>', src: ['*.html'], dest: '<%= game.id %>', stream: true},
          {expand: true, cwd: '<%= yeoman.dist %>/assets/fonts', src: ['**'], dest: '<%= game.id %>/assets/fonts', stream: true},
          {expand: true, cwd: '<%= yeoman.dist %>/assets/images', src: ['**'], dest: '<%= game.id %>/assets/images', stream: true},
          {expand: true, cwd: '<%= yeoman.dist %>/assets/js', src: ['**'], dest: '<%= game.id %>/assets/js', stream: true},
          {expand: true, cwd: '<%= yeoman.dist %>/assets/styles', src: ['**'], dest: '<%= game.id %>/assets/styles', stream: true},
          {expand: true, cwd: '<%= yeoman.dist %>/views', src: ['**'], dest: '<%= game.id %>/views', stream: true},          
          // {expand: true, cwd: '<%= yeoman.dist %>/assets/audio', src: ['**'], dest: '<%= game.id %>/assets/audio', stream: true},
        ]
      },
      clean: {
        options: {
          bucket: '<%= aws.bucket %>',
        },
        files: [
          {dest: '<%= game.id %>', action: 'delete'},
        ]
      },
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'injector:game',
      'wiredep',
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  // grunt.registerTask('test', [
  //   'clean:server',
  //   'wiredep',
  //   'concurrent:test',
  //   'autoprefixer',
  //   'connect:test',
  //   'karma'
  // ]);

  grunt.registerTask('build', [
    'clean:dist',
    'injector:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    // 'cdnify',
    'cssmin',
    'uglify',
    // 'filerev',
    'usemin',
    // 'htmlmin'
    'copy:replace'
  ]);

  grunt.registerTask('update', [
    'wiredep',
    'wirelib',
    'injector:game'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'aws_s3:production'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

  grunt.registerTask('app', [
    'wiredep',
    'connect:appreload:keepalive',
  ]);

  grunt.registerTask('wirelib', function() {
    var wirelib = {
      destFile: 'game/index.html',
      cwd: 'game/assets/js/lib',
      folder: 'assets/js/lib',
      block: /(([ \t]*)<!--\s*wirelib\s*-->)(\n|\r|.)*?(<!--\s*endwirelib\s*-->)/gi,
      script: /\"(.)*\"/gi,
    };

    var files = grunt.file.expand({filter: "isFile", cwd: wirelib.cwd}, ['*.js']);
    var html = [];
    files.forEach(function(f) {
      html.push('<script src="'+ wirelib.folder + '/' + f +'"></script>');
    });
    html.unshift("\t<!-- wirelib -->");
    html.push("<!-- endwirelib -->");

    var page = grunt.file.read(wirelib.destFile);
    grunt.file.write(wirelib.destFile, page.replace(wirelib.block, html.join("\n\t")));
  });

};
