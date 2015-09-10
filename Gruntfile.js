module.exports = function(grunt) {


	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		babel: {
			options: {
				sourceMap: true
			},
			dist: {
				files: [{
					'expand': true,
					'cwd': 'jsx/',
					'src': ['*.jsx'],
					'dest': 'js/',
					'ext': '.js'
				}]
			}
		},

		connect: {
			server: {
				options: {
					hostname: 'localhost',
					open: true,
					port: 1234,
					livereload: true
				}
			}
		},

		jshint: {
			all: ['Gruntfile.js', 'js/main.js']
		},

		sass: {
			all: {
				options: {
					style: 'compressed',
					sourcemap: 'none'
				},
				files: [
					{ 'css/main.css': 'scss/main.scss' }
				]
			}
		},

		watch: {
			html: {
				files: 'index.html',
				options: {
					livereload: true
				}
			},
			sass: {
				files: ['scss/*.scss'],
				tasks: ['sass'],
				options: {
					livereload: true
				}
			},
			js: {
				files: [
					'jsx/*.jsx'
				],
				tasks: [
					'babel'
				],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('transpile', ['babel']);
	grunt.registerTask('default', ['connect', 'watch']);
};