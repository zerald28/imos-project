import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\UserInformationController::create
 * @see app/Http/Controllers/UserInformationController.php:11
 * @route '/user-informations/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/user-informations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserInformationController::create
 * @see app/Http/Controllers/UserInformationController.php:11
 * @route '/user-informations/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserInformationController::create
 * @see app/Http/Controllers/UserInformationController.php:11
 * @route '/user-informations/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserInformationController::create
 * @see app/Http/Controllers/UserInformationController.php:11
 * @route '/user-informations/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserInformationController::create
 * @see app/Http/Controllers/UserInformationController.php:11
 * @route '/user-informations/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserInformationController::create
 * @see app/Http/Controllers/UserInformationController.php:11
 * @route '/user-informations/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserInformationController::create
 * @see app/Http/Controllers/UserInformationController.php:11
 * @route '/user-informations/create'
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
* @see \App\Http\Controllers\UserInformationController::store
 * @see app/Http/Controllers/UserInformationController.php:92
 * @route '/user-informations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/user-informations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserInformationController::store
 * @see app/Http/Controllers/UserInformationController.php:92
 * @route '/user-informations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserInformationController::store
 * @see app/Http/Controllers/UserInformationController.php:92
 * @route '/user-informations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UserInformationController::store
 * @see app/Http/Controllers/UserInformationController.php:92
 * @route '/user-informations'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UserInformationController::store
 * @see app/Http/Controllers/UserInformationController.php:92
 * @route '/user-informations'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const user_informations = {
    create: Object.assign(create, create),
store: Object.assign(store, store),
}

export default user_informations