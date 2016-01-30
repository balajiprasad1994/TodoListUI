module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  //grunt.loadNpmTasks('grunt-cache-breaker');
  //grunt.loadNpmTasks('grunt-dev-prod-switch');
  grunt.loadNpmTasks('grunt-war');

  // Default task.
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['clean','copy:assets','shell:webpack','war:target']);

  // Print a timestamp (useful for when watching)
  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });

  // Project configuration.
  grunt.initConfig({
    distdir: 'todoapp',
    pkg: grunt.file.readJSON('package.json'),
    banner:
    '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
    ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
    src: {
      js: ['app/**/*.js'],
      jsTpl: ['<%= distdir %>/templates/**/*.js'],
      specs: ['test/**/*.spec.js'],
      scenarios: ['test/**/*.scenario.js'],
      html: ['app/index.html'],
      tpl: {
        app: ['app/app/**/*.tpl.html'],
        common: ['app/common/**/*.tpl.html']
      },
      //less: ['app/less/stylesheet.less'], // recess:build doesn't accept ** in its file patterns
      //lessWatch: ['app/less/**/*.less']
    },
    clean: ['<%= distdir %>/*'],
    copy: {
      assets: {
        files: [
            //{ dest: '<%= distdir %>/assets', src : '**', expand: true, cwd: 'app/assets/'},
            //{ dest: '<%= distdir %>/components', src : '**/**.html', expand: true, cwd: 'app/components/'},
            // { dest: '<%= distdir %>/event', src : '**/**.html', expand: true, cwd: 'app/event/'},
            { dest: '<%= distdir %>/loginUser', src : '**/**.html', expand: true, cwd: 'app/loginUser/'},
            { dest: '<%= distdir %>/registerUser', src : '**/**.html', expand: true, cwd: 'app/registerUser/'},
            { dest: '<%= distdir %>/dashboardofUser', src : '**/**.html', expand: true, cwd: 'app/dashboardofUser/'},
            { dest: '<%= distdir %>/bower_components/html5-boilerplate', src : '**', expand: true, cwd: 'app/bower_components/html5-boilerplate/'},
            //{ dest: '<%= distdir %>/bower_components/bootstrap/dist/css', src : '**', expand: true, cwd: 'app/bower_components/bootstrap/dist/css/'},
            //{ dest: '<%= distdir %>/bower_components/bootstrap/dist/css', src : '**', expand: true, cwd: 'app/bower_components/bootstrap/dist/css/'},
            { dest: '<%= distdir %>/bower_components/angular', src : '**', expand: true, cwd: 'app/bower_components/angular/'},
            { dest: '<%= distdir %>/bower_components/angular-resource', src : '**', expand: true, cwd: 'app/bower_components/angular-resource/'},
            { dest: '<%= distdir %>/bower_components/angular-route', src : '**', expand: true, cwd: 'app/bower_components/angular-route/'},
            { dest: '<%= distdir %>/bower_components/bootstrap', src : '**', expand: true, cwd: 'app/bower_components/bootstrap/'},
            { dest: '<%= distdir %>/bower_components/angular-ui-tree', src : '**', expand: true, cwd: 'app/bower_components/angular-ui-tree/'},
           // { dest: '<%= distdir %>/bower_components/angular-cookies', src : '**', expand: true, cwd: 'app/bower_components/angular-cookies/'},
           // { dest: '<%= distdir %>/bower_components/angular-bootstrap', src : '**', expand: true, cwd: 'app/bower_components/angular-bootstrap/'},
           // { dest: '<%= distdir %>/META-INF', src : '**', expand: true, cwd: 'app/META-INF/'},
            { dest: '<%= distdir %>/WEB-INF', src : '**', expand: true, cwd: 'app/WEB-INF/'},
            { dest: '<%= distdir %>/', src : 'index.html', expand: true, cwd: 'app/'},
            { dest: '<%= distdir %>/', src : 'app.css', expand: true, cwd: 'app/'}
            ]
      }
    },
    shell: {
        webpack: {
            command: 'npm run-script build'
        }
    },
   /* cachebreaker: {
        dev: {
            options: {
                match: ['app.css']
            },
            files: {
                src: ['<%= distdir %>/index.html']
            }
        }
    },
    dev_prod_switch: {
      options: {
          environment: 'prod',
          env_char: '#',
          env_block_dev: 'env:dev',
          env_block_prod: 'env:prod'
      },
      all: {
          files: {
              '<%= distdir %>/index.html': '<%= distdir %>/index.html'
          }
      }
    },*/
    war: {
        target: {
          options: {
            war_dist_folder: '<%= distdir %>',    /* Folder where to generate the WAR. */
            war_name: 'todoapp'                    /* The name fo the WAR file (.war will be the extension) */
          },
          files: [
            {
              expand: true,
              cwd: '<%= distdir %>',
              src: ['**'],
              dest: ''
            }
          ]
        }
    }
  });

};