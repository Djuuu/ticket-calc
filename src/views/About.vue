<template>
    <div class="about-page py-2 px-5">

        <h1 class="font-extrabold text-center text-3xl my-2">Ticket-Calc</h1>

        <p class="text-sm text-center mb-4">
            Version {{ version }}
        </p>

        <div class="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden mb-10">
            <div class="flex items-center px-6 py-5">

                <img class="block h-20 mb-0 mr-4 ml-0 rounded-full"
                     src="https://avatars2.githubusercontent.com/u/2388233?s=460&v=4" alt="Djuuu">

                <div class="text-left flex-grow">
                    <div class="ml-2 mb-4">
                        <p class=" leading-tight">Julien Tardot</p>
                        <p class="text-sm leading-tight text-gray-600">Developer</p>
                    </div>

                    <div class="text-center">
                        <a href="https://github.com/Djuuu/ticket-calc" target="_blank" rel="noopener"
                           class="text-xs font-semibold rounded-full px-5 py-2 leading-normal bg-white border text-gray-800 hover:text-primary cursor-pointer">
                            <svg class="inline-block align-center w-5 h-5 mr-1 -mt-1" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
                                <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                            Project page
                        </a>
                    </div>
                </div>

            </div>
        </div>

        <h2 class="font-semibold text-center text-lg mb-2">
            Made with:
        </h2>

        <div class="flex flex-row justify-around max-w-sm mx-auto">
            <a href="https://cli.vuejs.org/" target="_blank" rel="noopener"
            class="tool-link">
                <img src="https://cli.vuejs.org/favicon.png" alt="Vue CLI" class="tool-icon h-16 w-16 mx-2"/>
                <span class="tool-label">
                    Vue CLI
                </span>
            </a>
            <a href="https://tailwindcss.com/" target="_blank" rel="noopener"
            class="tool-link">
                <svg viewBox="6 6 36 36" xmlns="http://www.w3.org/2000/svg" class="tool-icon h-16 w-20">
                    <defs><linearGradient x1="0%" y1="0%" y2="100%" id="a"><stop stop-color="#2383AE" offset="0%"></stop><stop stop-color="#6DD7B9" offset="100%"></stop></linearGradient></defs>
                    <path d="M10 8c1.333-5.333 4.667-8 10-8 8 0 9 6 13 7 2.667.667 5-.333 7-3-1.333 5.333-4.667 8-10 8-8 0-9-6-13-7-2.667-.667-5 .333-7 3zM0 20c1.333-5.333 4.667-8 10-8 8 0 9 6 13 7 2.667.667 5-.333 7-3-1.333 5.333-4.667 8-10 8-8 0-9-6-13-7-2.667-.667-5 .333-7 3z" transform="translate(4 12)" fill="url(#a)" fill-rule="nonzero"></path>
                </svg>
                <span class="tool-label">
                    Tailwind CSS
                </span>
            </a>
        </div>

    </div>
</template>

<script>
    export default {
        computed: {
            version() {
                return process.env.VUE_APP_VERSION;
            },
        }
    }
</script>

<style>
    .tool-link {
        @apply flex flex-col items-center justify-center cursor-pointer p-3;
    }
    .tool-icon {
        @apply block;
    }
    .tool-label {
        @apply text-sm;
    }
</style>
