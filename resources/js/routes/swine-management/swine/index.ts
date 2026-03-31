import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/my-swine'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/my-swine',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/my-swine'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/my-swine'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/my-swine'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/my-swine'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/my-swine'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Swine\SwineController::index
 * @see app/Http/Controllers/Swine/SwineController.php:31
 * @route '/my-swine'
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
const swine = {
    index: Object.assign(index, index),
}

export default swine