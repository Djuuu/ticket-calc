module.exports = {
    theme: {
        colors: {
            transparent: 'transparent',

            black: '#000',
            white: '#fff',

            primary:    '#e3001b',
            secondary:  '#0f204b',
            danger:     '#f53d3d',
            light:      '#f2f2f2',
            dark:       '#222',

            positive:   '#a40000',
            negative:   '#668000',
            equal:      '#008000',

            positiveBg: '#798000',
            negativeBg: '#cc001b',
            equalBg:    '#009900',

            gray: {
                100: '#fafafa',
                200: '#f5f5f5',
                300: '#f0f0f0',
                400: '#dedede',
                500: '#bfbfbf',
                600: '#949494',
                700: '#666666',
                800: '#474747',
                900: '#2b2b2b',
            },
        },
        screens: {
            sm: '640px',
        },
        container: {
            center: true,
        },
    },
    variants: {
        borderStyle: ['responsive', 'first-child', 'last-child'],
        borderWidth: ['responsive', 'first-child', 'last-child'],
    },
    plugins: [
        function({ addVariant, e }) {
            addVariant('first-child', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.${e(`first-child${separator}${className}`)}:first-child`
                })
            })
        },
        function({ addVariant, e }) {
            addVariant('last-child', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.${e(`last-child${separator}${className}`)}:last-child`
                })
            })
        },
    ]
};
