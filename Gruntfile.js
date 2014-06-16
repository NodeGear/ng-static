'use strict';

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

	// Configuration
	grunt.initConfig({
		watch: {
			js: {
				files: ['app/js/*.js', 'app/js/**/*.js'],
				tasks: ['newer:copy:js']
			},
			jade: {
				files: ['app/*.jade', 'app/**/*.jade'],
				tasks: ['jade:serve']
			},
			styles: {
				files: ['app/css/{,*/}*.css'],
				tasks: ['newer:copy:css']
			},
			livereload: {
				files: [
					'dist/{,*/}*.{css,js,png,jpg,jpeg,gif,webp,svg,html}'
				],
				options: {
					livereload: true
				}
			}
		},

		connect: {
			server: {
				options: {
					port: 3000,
					hostname: '127.0.0.1',
					livereload: 35729,
					open: false,
					keepalive: true,
					base: 'dist'
				},
			}
		},

		clean: {
			clean: {
				files: [{
					dot: true,
					src: [
						'dist'
					]
				}]
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			css: {
				expand: true,
				cwd: 'app/css',
				dest: 'dist/css/',
				src: '{,*/}*.css'
			},
			js: {
				expand: true,
				cwd: 'app/js',
				dest: 'dist/js/',
				src: '{,*/}*.js'
			},
			img: {
				expand: true,
				cwd: 'app/img',
				dest: 'dist/img/',
				src: '{,*/}*.{png,jpg,jpeg,gif}'
			},
			vendor: {
				files: [{
					expand: true,
					cwd: 'app/vendor',
					dest: 'dist/vendor',
					src: ['**/*.js', '**/*.css', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.woff', '**/*.ttf', '**/*.svg', '**/*.eot']
				}]
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			options: {
				limit: 6
			},
			server: [
				'copy:css',
				'copy:js',
				'copy:vendor',
				'copy:img',
				'jade:serve'
			],
			watch: {
				tasks: [
					'connect:server',
					'watch'
				],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		cssmin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'app/css',
					src: ['**/*.css', '*.css'],
					dest: 'dist/css'
				}]
			}
		},
		uglify: {
			dist: {
				files: [{
					expand: true,
					cwd: 'app/js',
					src: ['**/*.js', '*.js'],
					dest: 'dist/js'
				}]
			}
		},

		jade: {
			serve: {
				options: {
					pretty: false
				},
				files: [{
					expand: true,
					cwd: 'app/views',
					dest: 'dist',
					src: ['**/*.jade', '*.jade'],
					ext: '.html'
				}]
			}
		}
	});
	
	grunt.registerTask('serve', [
		'clean:clean',
		'concurrent:server',
		'concurrent:watch'
	]);

	grunt.registerTask('build', [
		'clean:clean',
		'concurrent:server',
		'cssmin',
		'uglify'
	]);

	grunt.registerTask('default', [
		'build'
	]);
};
