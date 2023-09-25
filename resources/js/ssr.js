import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'

import VueInstantSearch, {
    createServerRootMixin,
} from "vue-instantsearch/vue3/es"
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
    'latency',
    '6be0576ff61c053d5f9a3225e2a90f76'
);

createServer(page =>
    createInertiaApp({
        page,
        render: renderToString,
        resolve: name => {
            const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
            return pages[`./Pages/${name}.vue`]
        },
        setup({ App, props, plugin }) {
            return createSSRApp({
                mixins: [
                    createServerRootMixin({
                        searchClient,
                        indexName: 'instant_search',
                    }),
                ],
                async serverPrefetch() {
                    const state = await this.instantsearch.findResultsState({
                        component: this,
                        renderToString,
                    })
                    return state
                },
                render: () => h(App, props)
            }).use(plugin).use(VueInstantSearch)
        },
    }),
)
