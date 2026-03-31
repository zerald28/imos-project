import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
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
* @see \App\Http\Controllers\UserInformationController::profile
 * @see app/Http/Controllers/UserInformationController.php:148
 * @route '/profile'
 */
export const profile = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})

profile.definition = {
    methods: ["get","head"],
    url: '/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserInformationController::profile
 * @see app/Http/Controllers/UserInformationController.php:148
 * @route '/profile'
 */
profile.url = (options?: RouteQueryOptions) => {
    return profile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserInformationController::profile
 * @see app/Http/Controllers/UserInformationController.php:148
 * @route '/profile'
 */
profile.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserInformationController::profile
 * @see app/Http/Controllers/UserInformationController.php:148
 * @route '/profile'
 */
profile.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: profile.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserInformationController::profile
 * @see app/Http/Controllers/UserInformationController.php:148
 * @route '/profile'
 */
    const profileForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: profile.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserInformationController::profile
 * @see app/Http/Controllers/UserInformationController.php:148
 * @route '/profile'
 */
        profileForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: profile.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserInformationController::profile
 * @see app/Http/Controllers/UserInformationController.php:148
 * @route '/profile'
 */
        profileForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: profile.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    profile.form = profileForm
const user = {
    chooseRole: Object.assign(chooseRole, chooseRole),
profile: Object.assign(profile, profile),
}

export default user