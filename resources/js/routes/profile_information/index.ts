import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\ProfileController::create
 * @see app/Http/Controllers/Settings/ProfileController.php:81
 * @route '/profile-information/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/profile-information/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::create
 * @see app/Http/Controllers/Settings/ProfileController.php:81
 * @route '/profile-information/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::create
 * @see app/Http/Controllers/Settings/ProfileController.php:81
 * @route '/profile-information/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\ProfileController::create
 * @see app/Http/Controllers/Settings/ProfileController.php:81
 * @route '/profile-information/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Settings\ProfileController::create
 * @see app/Http/Controllers/Settings/ProfileController.php:81
 * @route '/profile-information/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Settings\ProfileController::create
 * @see app/Http/Controllers/Settings/ProfileController.php:81
 * @route '/profile-information/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Settings\ProfileController::create
 * @see app/Http/Controllers/Settings/ProfileController.php:81
 * @route '/profile-information/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Settings\ProfileController::store
 * @see app/Http/Controllers/Settings/ProfileController.php:87
 * @route '/profile-information/store'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/profile-information/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::store
 * @see app/Http/Controllers/Settings/ProfileController.php:87
 * @route '/profile-information/store'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::store
 * @see app/Http/Controllers/Settings/ProfileController.php:87
 * @route '/profile-information/store'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Settings\ProfileController::store
 * @see app/Http/Controllers/Settings/ProfileController.php:87
 * @route '/profile-information/store'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\ProfileController::store
 * @see app/Http/Controllers/Settings/ProfileController.php:87
 * @route '/profile-information/store'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const profile_information = {
    create: Object.assign(create, create),
store: Object.assign(store, store),
}

export default profile_information