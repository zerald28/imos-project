import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UserController::chooseRole
 * @see app/Http/Controllers/UserController.php:32
 * @route '/user/choose-role'
 */
export const chooseRole = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: chooseRole.url(options),
    method: 'post',
})

chooseRole.definition = {
    methods: ["post"],
    url: '/user/choose-role',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserController::chooseRole
 * @see app/Http/Controllers/UserController.php:32
 * @route '/user/choose-role'
 */
chooseRole.url = (options?: RouteQueryOptions) => {
    return chooseRole.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::chooseRole
 * @see app/Http/Controllers/UserController.php:32
 * @route '/user/choose-role'
 */
chooseRole.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: chooseRole.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UserController::chooseRole
 * @see app/Http/Controllers/UserController.php:32
 * @route '/user/choose-role'
 */
    const chooseRoleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: chooseRole.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UserController::chooseRole
 * @see app/Http/Controllers/UserController.php:32
 * @route '/user/choose-role'
 */
        chooseRoleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: chooseRole.url(options),
            method: 'post',
        })
    
    chooseRole.form = chooseRoleForm
/**
* @see \App\Http\Controllers\UserController::ping
 * @see app/Http/Controllers/UserController.php:19
 * @route '/user/ping'
 */
export const ping = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ping.url(options),
    method: 'post',
})

ping.definition = {
    methods: ["post"],
    url: '/user/ping',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserController::ping
 * @see app/Http/Controllers/UserController.php:19
 * @route '/user/ping'
 */
ping.url = (options?: RouteQueryOptions) => {
    return ping.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::ping
 * @see app/Http/Controllers/UserController.php:19
 * @route '/user/ping'
 */
ping.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ping.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UserController::ping
 * @see app/Http/Controllers/UserController.php:19
 * @route '/user/ping'
 */
    const pingForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ping.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UserController::ping
 * @see app/Http/Controllers/UserController.php:19
 * @route '/user/ping'
 */
        pingForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ping.url(options),
            method: 'post',
        })
    
    ping.form = pingForm
/**
* @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:13
 * @route '/users'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:13
 * @route '/users'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:13
 * @route '/users'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:13
 * @route '/users'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:13
 * @route '/users'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:13
 * @route '/users'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:13
 * @route '/users'
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
* @see \App\Http\Controllers\UserController::da_personel
 * @see app/Http/Controllers/UserController.php:61
 * @route '/DA/personnels'
 */
export const da_personel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: da_personel.url(options),
    method: 'get',
})

da_personel.definition = {
    methods: ["get","head"],
    url: '/DA/personnels',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::da_personel
 * @see app/Http/Controllers/UserController.php:61
 * @route '/DA/personnels'
 */
da_personel.url = (options?: RouteQueryOptions) => {
    return da_personel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::da_personel
 * @see app/Http/Controllers/UserController.php:61
 * @route '/DA/personnels'
 */
da_personel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: da_personel.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserController::da_personel
 * @see app/Http/Controllers/UserController.php:61
 * @route '/DA/personnels'
 */
da_personel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: da_personel.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserController::da_personel
 * @see app/Http/Controllers/UserController.php:61
 * @route '/DA/personnels'
 */
    const da_personelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: da_personel.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserController::da_personel
 * @see app/Http/Controllers/UserController.php:61
 * @route '/DA/personnels'
 */
        da_personelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: da_personel.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserController::da_personel
 * @see app/Http/Controllers/UserController.php:61
 * @route '/DA/personnels'
 */
        da_personelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: da_personel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    da_personel.form = da_personelForm
const UserController = { chooseRole, ping, index, da_personel }

export default UserController