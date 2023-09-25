<script setup>
    import { Head } from '@inertiajs/vue3'
</script>

<template>
    <div>
        <Head title="Having this in the template causes SSR server to crash" />
        <ais-instant-search-ssr>
            <ais-search-box />
            <ais-stats />
            <ais-refinement-list attribute="brand" />
            <ais-hits>
                <template v-slot:item="{ item }">
                    <p>
                        <ais-highlight attribute="name" :hit="item" />
                    </p>
                    <p>
                        <ais-highlight attribute="brand" :hit="item" />
                    </p>
                </template>
            </ais-hits>
            <ais-pagination />
        </ais-instant-search-ssr>
    </div>
</template>
