import './bootstrap';

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'

import VueInstantSearch, {
    createServerRootMixin,
} from "vue-instantsearch/vue3/es"
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
    'latency',
    '6be0576ff61c053d5f9a3225e2a90f76'
);

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
        return pages[`./Pages/${name}.vue`]
    },
    setup({ el, App, props, plugin }) {
        createApp({
            mixins: [
                createServerRootMixin({
                    searchClient,
                    indexName: 'instant_search',
                }),
            ],
            render: () => h(App, props)
        })
            .use(plugin)
            .use(VueInstantSearch)
            .mount(el)
    },
})
