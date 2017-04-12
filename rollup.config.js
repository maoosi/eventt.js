import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import strip from 'rollup-plugin-strip';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js-harmony';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export default {
    entry: './src/eventt.js',
    plugins: [
        babel(babelrc()),
        strip({
            debugger: true,
            functions: [ 'console.log', 'assert.*', 'debug', 'alert' ],
            sourceMap: true
        }),
        uglify({}, minify)
    ],
    external: external,
    targets: [
        {
            dest: pkg.main,
            format: 'umd',
            moduleName: 'eventt',
            sourceMap: true
        },
        {
            dest: pkg.module,
            format: 'es',
            sourceMap: true
        }
    ]
};
