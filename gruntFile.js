module.exports = function (grunt) {

	var os = require("os");

	// load plugins
	grunt.loadNpmTasks('grunt-browserify2');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-open');

	// some other cool plugins to look at...
	// https://npmjs.org/package/grunt-phonegap-build
	// https://npmjs.org/package/grunt-s3

	/* grunt: build a develop dist
	 * grunt: release: build a release dist
	 * grunt server: start server and build a develop dist any time a file changes
	 */

	// default task
	grunt.registerTask('default', ['build','build-shared-libs']);

	// build tasks
	grunt.registerTask('build', ['build-css','build-js']);
	grunt.registerTask('build-css', ['compass:develop']);
	grunt.registerTask('build-js', ['jshint','html2js','browserify2:clothing-customer','browserify2:clothing-clerk']);
	grunt.registerTask('build-shared-libs', ['browserify2:shared-libs']);

	// server task
	grunt.registerTask('server', ['clean','copy','build', 'build-shared-libs', 'server-start', 'open', 'watch']);

    // special tags when I'm running inside of IntelliJ with FileWatchers configured (faster)
	grunt.registerTask('watch-ide', ['watch:assets']);
    grunt.registerTask('server-ide', ['build', 'server-start', 'open', 'watch-ide']);

	grunt.registerTask('server-start', 'Start a custom web server', function() {
		grunt.log.writeln('Started web server on port 8080');
		require('./src/server/app.js');
	});

	grunt.initConfig({

		// ========================================
		// Common
		// ========================================

		// config
		assetsVersion: 7, // increment each release
		distdir: 'dist',
		tempdir: '.temp',
		pkg: grunt.file.readJSON('package.json'),
		banner:
			'/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
				' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
		src: {
			js: ['src/**/*.js'],
			html: ['src/**/*.tpl.html']
		},


		// clean
		clean: ['./dist/*', '<%= tempdir %>/*'],

		// copy
		copy: {
			assets: {
				files: [
					{
						cwd: 'src/assets/',
						src: '**',
						dest: './dist/assets/',
						expand: true
					}
				]
            },
			statichtml: {
				files: [
					{
						cwd: 'src/clothing-customer/',
						src: 'index.html',
						dest: './dist/clothing-customer/',
						expand: true
					},
					{
						cwd: 'src/clothing-clerk/',
						src: 'index.html',
						dest: './dist/clothing-clerk/',
						expand: true
					},
					{
						cwd: 'src/',
						src: 'index.html',
						dest: './dist/',
						expand: true
					}
				]
			}
		},

		// ========================================
		// JavaScript
		// ========================================

		// js hint
		jshint: {
			files: ['gruntFile.js', '<%= src.js %>'],
			options: {
				curly:false,
				eqeqeq:false,
				immed:true,
				latedef:true,
				newcap:true,
				noarg:true,
				sub:true,
				boss:true,
				eqnull:true,
				globals: {}
			}
		},

		// html2js
		html2js: {
			'clothing-clerk': {
				src: ['src/clothing-clerk/**/*.tpl.html'],
				dest: '.temp/clothing-clerk-templates.js',
				module: 'clothing-clerk.templates'
			},
			'clothing-customer': {
				src: ['src/clothing-customer/**/*.tpl.html'],
				dest: '.temp/clothing-customer-templates.js',
				module: 'clothing-customer.templates'
			},
			'test-app': {
				src: ['src/test-app/**/*.tpl.html'],
				dest: '.temp/test-app-templates.js',
				module: 'test-app.templates'
			}
		},

		// browserify
		browserify2: {
			'shared-libs': {
				entry: './src/common/shared-libs.js',
				compile: './dist/assets/js/shared-libs.js',
				options: {
					expose: {
						files: [
							{ cwd: './bower_components/', src: ['**/*.js'] }

							//{ cwd: './bower_components/', src: ['**/*.js'] },
							//{ cwd: '<%= tempdir %>', src: ['*-templates.js'] }
						]
					}
				}
			},
			'clothing-clerk': {
				entry: './src/clothing-clerk/app.js',
				compile: './dist/assets/js/clothing-clerk.js',
				debug: true,
				options: { expose: { 'clothing-clerk-templates': './.temp/clothing-clerk-templates.js' } }
			},
			'clothing-customer': {
				entry: './src/clothing-customer/app.js',
				compile: './dist/assets/js/clothing-customer.js',
				debug: true,
				options: { expose: { 'clothing-customer-templates': './.temp/clothing-customer-templates.js' } }
			},
			'test-app': {
				entry: './src/test-app/app.js',
				compile: './dist/assets/js/test-app.js',
				debug: true,
				options: { expose: { 'test-app-templates': './.temp/test-app-templates.js' } }
			}
		},

		// ========================================
		// COMPASS
		// ========================================

		compass: {
			develop: {
				options: {
					sassDir: 'src',
					cssDir: 'dist/assets/css'
				}
			},
			release: {
				options: {
					sassDir: 'src',
					cssDir: 'dist/assets/css',
					environment: 'production'
				}
			}
		},

		// ========================================
		// Server
		// ========================================

        open : {
            chrome : {
                path: 'http://localhost:8080/index.html',
                app: 'Google Chrome'
            }
        },

		watch: {
			options: {
				livereload: true
			},
			assets: {
				files: 'src/assets/**',
				tasks: ['copy:assets']
			},
			css: {
				files: ['src/**/*.scss'],
				tasks: ['compass:develop']
			},
			js: {
				files: 'src/**/*.js',
				tasks: ['build']
			},
			html: {
				files: ['src/**/*.tpl.html', 'src/**/index.html'],
				tasks: ['copy:statichtml', 'build']
			}
		},

		// ========================================
		// Release
		// ========================================

		// uglify
		uglify: {
			dist: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					'./dist/assets/js/test-app.min.js': ['./dist/assets/js/test-app.js']
				}
			}
		},

		// karma (unit tests)
		karma: {
			unit: {
				configFile: 'test/config/unit.js'
			},
			watch: {
				configFile: 'test/config/unit.js',
				autoWatch: true
			}
		}
	});

};