import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
/**
* @see \App\Http\Controllers\UserInformationController::show
 * @see app/Http/Controllers/UserInformationController.php:148
 * @route '/profile'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserInformationController::show
 * @see app/Http/Controllers/UserInformationController.php:148
 * @route '/profile'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserInformationController::show
 * @see app/Http/Controllers/UserInformationController.php:148
 * @route '/profile'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserInformationController::show
 * @see app/Http/Controllers/UserInformationController.php:148
 * @route '/profile'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserInformationController::show
 * @see app/Http/Controllers/UserInformationController.php:148
 * @route '/profile'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserInformationController::show
 * @see app/Http/Controllers/UserInformationController.php:148
 * @route '/profile'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserInformationController::show
 * @see app/Http/Controllers/UserInformationController.php:148
 * @route '/profile'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\UserInformationController::updateProfileInformation
 * @see app/Http/Controllers/UserInformationController.php:61
 * @route '/user-informations/{id}'
 */
export const updateProfileInformation = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateProfileInformation.url(args, options),
    method: 'put',
})

updateProfileInformation.definition = {
    methods: ["put"],
    url: '/user-informations/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\UserInformationController::updateProfileInformation
 * @see app/Http/Controllers/UserInformationController.php:61
 * @route '/user-informations/{id}'
 */
updateProfileInformation.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return updateProfileInformation.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserInformationController::updateProfileInformation
 * @see app/Http/Controllers/UserInformationController.php:61
 * @route '/user-informations/{id}'
 */
updateProfileInformation.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateProfileInformation.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\UserInformationController::updateProfileInformation
 * @see app/Http/Controllers/UserInformationController.php:61
 * @route '/user-informations/{id}'
 */
    const updateProfileInformationForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateProfileInformation.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UserInformationController::updateProfileInformation
 * @see app/Http/Controllers/UserInformationController.php:61
 * @route '/user-informations/{id}'
 */
        updateProfileInformationForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateProfileInformation.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateProfileInformation.form = updateProfileInformationForm
const UserInformationController = { create, store, show, updateProfileInformation }

export default UserInformationController