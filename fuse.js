const fsbx = require('fuse-box');
const FuseBox = fsbx.FuseBox;

const fuse = FuseBox.init({
    homeDir: 'src/',
    outFile: './dist/eventt.js',
    plugins: [
        fsbx.UglifyJSPlugin()
    ]
});

fuse.devServer('> index.js');
