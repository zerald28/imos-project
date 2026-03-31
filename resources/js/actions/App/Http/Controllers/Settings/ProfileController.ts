import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\ProfileController::getSignature
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/imos_admin/profile/signature/get'
 */
export const getSignature = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSignature.url(options),
    method: 'get',
})

getSignature.definition = {
    methods: ["get","head"],
    url: '/imos_admin/profile/signature/get',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::getSignature
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/imos_admin/profile/signature/get'
 */
getSignature.url = (options?: RouteQueryOptions) => {
    return getSignature.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::getSignature
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/imos_admin/profile/signature/get'
 */
getSignature.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSignature.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\ProfileController::getSignature
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/imos_admin/profile/signature/get'
 */
getSignature.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSignature.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Settings\ProfileController::getSignature
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/imos_admin/profile/signature/get'
 */
    const getSignatureForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getSignature.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Settings\ProfileController::getSignature
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/imos_admin/profile/signature/get'
 */
        getSignatureForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getSignature.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Settings\ProfileController::getSignature
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/imos_admin/profile/signature/get'
 */
        getSignatureForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getSignature.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getSignature.form = getSignatureForm
/**
* @see \App\Http\Controllers\Settings\ProfileController::profileInformation
 * @see app/Http/Controllers/Settings/ProfileController.php:66
 * @route '/profile-information'
 */
export const profileInformation = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profileInformation.url(options),
    method: 'get',
})

profileInformation.definition = {
    methods: ["get","head"],
    url: '/profile-information',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::profileInformation
 * @see app/Http/Controllers/Settings/ProfileController.php:66
 * @route '/profile-information'
 */
profileInformation.url = (options?: RouteQueryOptions) => {
    return profileInformation.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::profileInformation
 * @see app/Http/Controllers/Settings/ProfileController.php:66
 * @route '/profile-information'
 */
profileInformation.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profileInformation.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\ProfileController::profileInformation
 * @see app/Http/Controllers/Settings/ProfileController.php:66
 * @route '/profile-information'
 */
profileInformation.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: profileInformation.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Settings\ProfileController::profileInformation
 * @see app/Http/Controllers/Settings/ProfileController.php:66
 * @route '/profile-information'
 */
    const profileInformationForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: profileInformation.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Settings\ProfileController::profileInformation
 * @see app/Http/Controllers/Settings/ProfileController.php:66
 * @route '/profile-information'
 */
        profileInformationForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: profileInformation.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Settings\ProfileController::profileInformation
 * @see app/Http/Controllers/Settings/ProfileController.php:66
 * @route '/profile-information'
 */
        profileInformationForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: profileInformation.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    profileInformation.form = profileInformationForm
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
/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:20
 * @route '/settings/profile'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/settings/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:20
 * @route '/settings/profile'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:20
 * @route '/settings/profile'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:20
 * @route '/settings/profile'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:20
 * @route '/settings/profile'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:20
 * @route '/settings/profile'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:20
 * @route '/settings/profile'
 */
        editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:31
 * @route '/settings/profile'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/settings/profile',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:31
 * @route '/settings/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:31
 * @route '/settings/profile'
 */
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:31
 * @route '/settings/profile'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:31
 * @route '/settings/profile'
 */
        updateForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Settings/ProfileController.php:47
 * @route '/settings/profile'
 */
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/settings/profile',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Settings/ProfileController.php:47
 * @route '/settings/profile'
 */
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Settings/ProfileController.php:47
 * @route '/settings/profile'
 */
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Settings/ProfileController.php:47
 * @route '/settings/profile'
 */
    const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Settings/ProfileController.php:47
 * @route '/settings/profile'
 */
        destroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ProfileController = { getSignature, profileInformation, create, store, edit, update, destroy }

export default ProfileController