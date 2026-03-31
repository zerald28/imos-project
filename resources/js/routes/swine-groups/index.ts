import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Swine\SwineGroupController::index
 * @see app/Http/Controllers/Swine/SwineGroupController.php:85
 * @route '/swine-groups'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/swine-groups',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::index
 * @see app/Http/Controllers/Swine/SwineGroupController.php:85
 * @route '/swine-groups'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::index
 * @see app/Http/Controllers/Swine/SwineGroupController.php:85
 * @route '/swine-groups'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Swine\SwineGroupController::index
 * @see app/Http/Controllers/Swine/SwineGroupController.php:85
 * @route '/swine-groups'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Swine\SwineGroupController::index
 * @see app/Http/Controllers/Swine/SwineGroupController.php:85
 * @route '/swine-groups'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineGroupController::index
 * @see app/Http/Controllers/Swine/SwineGroupController.php:85
 * @route '/swine-groups'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineGroupController::index
 * @see app/Http/Controllers/Swine/SwineGroupController.php:85
 * @route '/swine-groups'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Swine\SwineGroupController::store
 * @see app/Http/Controllers/Swine/SwineGroupController.php:18
 * @route '/swine-groups'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/swine-groups',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::store
 * @see app/Http/Controllers/Swine/SwineGroupController.php:18
 * @route '/swine-groups'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::store
 * @see app/Http/Controllers/Swine/SwineGroupController.php:18
 * @route '/swine-groups'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Swine\SwineGroupController::store
 * @see app/Http/Controllers/Swine/SwineGroupController.php:18
 * @route '/swine-groups'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineGroupController::store
 * @see app/Http/Controllers/Swine/SwineGroupController.php:18
 * @route '/swine-groups'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Swine\SwineGroupController::attach
 * @see app/Http/Controllers/Swine/SwineGroupController.php:0
 * @route '/swine-groups/attach'
 */
export const attach = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attach.url(options),
    method: 'post',
})

attach.definition = {
    methods: ["post"],
    url: '/swine-groups/attach',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::attach
 * @see app/Http/Controllers/Swine/SwineGroupController.php:0
 * @route '/swine-groups/attach'
 */
attach.url = (options?: RouteQueryOptions) => {
    return attach.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::attach
 * @see app/Http/Controllers/Swine/SwineGroupController.php:0
 * @route '/swine-groups/attach'
 */
attach.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attach.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Swine\SwineGroupController::attach
 * @see app/Http/Controllers/Swine/SwineGroupController.php:0
 * @route '/swine-groups/attach'
 */
    const attachForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: attach.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineGroupController::attach
 * @see app/Http/Controllers/Swine/SwineGroupController.php:0
 * @route '/swine-groups/attach'
 */
        attachForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: attach.url(options),
            method: 'post',
        })
    
    attach.form = attachForm
const swineGroups = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
attach: Object.assign(attach, attach),
}

export default swineGroups