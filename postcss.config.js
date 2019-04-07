
const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
        './public/*.html',
        './src/*.vue',
        './src/**/*.vue',
    ],
    extractors: [{
        extractor: class {
            static extract(content) {
                return content.match(/[A-Za-z0-9-_:/]+/g) || [];
            }
        },
        extensions: ['html', 'vue']
    }]
});

module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        process.env.NODE_ENV === 'production' ? purgecss : null,
    ]
};
