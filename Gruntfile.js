module.exports = function (grunt) {
  // Grunt configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    
    // LESS task configuration
    less: {
      development: {
        files: {
          "dev/styles/main.css": "src/styles/main.less",
        },
      },
      production: {
        options: {
          compress: true,
        },
        files: {
          "dist/styles/main.min.css": "src/styles/main.less",
        },
      },
    },
    
    // Watch task configuration
    watch: {
      less: {
        files: ['src/styles/**/*.less'], // Monitors all LESS files in the src/styles directory and subdirectories
        tasks: ['less:development'] // Ensure to use 'tasks' (plural)
      },
      html: {
        files:['src/index.html'],
        tasks:['replace:dev'] 
      }
    },
    
    // Replace task configuration
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: 'ENDERECO_DO_CSS',
              replacement: './styles/main.min.css'
            },
            {
              match: 'ENDERECO_DO_JS',
              replacement: '../src/scripts/main.js'
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['prebuild/index.html'],
            dest: 'dist/'
          }
        ]
      }
    },
    
    // HTML minification task configuration
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'prebuild/index.html': 'src/index.html'
        }
      }
    },
    
    // Clean task configuration
    clean: ['prebuild']
  });

  // Load necessary plugins
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Register default task
  grunt.registerTask("default", ['watch']);
  
  // Register build task for production
  grunt.registerTask("build", ["less:production", "htmlmin:dist", "replace:dist", "clean"]);
};
