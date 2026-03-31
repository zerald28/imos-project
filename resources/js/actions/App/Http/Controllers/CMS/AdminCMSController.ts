import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\CMS\AdminCMSController::welcomePage
 * @see app/Http/Controllers/CMS/AdminCMSController.php:190
 * @route '/'
 */
export const welcomePage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: welcomePage.url(options),
    method: 'get',
})

welcomePage.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CMS\AdminCMSController::welcomePage
 * @see app/Http/Controllers/CMS/AdminCMSController.php:190
 * @route '/'
 */
welcomePage.url = (options?: RouteQueryOptions) => {
    return welcomePage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\AdminCMSController::welcomePage
 * @see app/Http/Controllers/CMS/AdminCMSController.php:190
 * @route '/'
 */
welcomePage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: welcomePage.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CMS\AdminCMSController::welcomePage
 * @see app/Http/Controllers/CMS/AdminCMSController.php:190
 * @route '/'
 */
welcomePage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: welcomePage.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CMS\AdminCMSController::welcomePage
 * @see app/Http/Controllers/CMS/AdminCMSController.php:190
 * @route '/'
 */
    const welcomePageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: welcomePage.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CMS\AdminCMSController::welcomePage
 * @see app/Http/Controllers/CMS/AdminCMSController.php:190
 * @route '/'
 */
        welcomePageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: welcomePage.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CMS\AdminCMSController::welcomePage
 * @see app/Http/Controllers/CMS/AdminCMSController.php:190
 * @route '/'
 */
        welcomePageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: welcomePage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    welcomePage.form = welcomePageForm
/**
* @see \App\Http\Controllers\CMS\AdminCMSController::index
 * @see app/Http/Controllers/CMS/AdminCMSController.php:15
 * @route '/cms/admin/bloglist'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cms/admin/bloglist',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CMS\AdminCMSController::index
 * @see app/Http/Controllers/CMS/AdminCMSController.php:15
 * @route '/cms/admin/bloglist'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\AdminCMSController::index
 * @see app/Http/Controllers/CMS/AdminCMSController.php:15
 * @route '/cms/admin/bloglist'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CMS\AdminCMSController::index
 * @see app/Http/Controllers/CMS/AdminCMSController.php:15
 * @route '/cms/admin/bloglist'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CMS\AdminCMSController::index
 * @see app/Http/Controllers/CMS/AdminCMSController.php:15
 * @route '/cms/admin/bloglist'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CMS\AdminCMSController::index
 * @see app/Http/Controllers/CMS/AdminCMSController.php:15
 * @route '/cms/admin/bloglist'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CMS\AdminCMSController::index
 * @see app/Http/Controllers/CMS/AdminCMSController.php:15
 * @route '/cms/admin/bloglist'
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
* @see \App\Http\Controllers\CMS\AdminCMSController::destroy
 * @see app/Http/Controllers/CMS/AdminCMSController.php:160
 * @route '/cms/admin/bloglist/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/cms/admin/bloglist/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CMS\AdminCMSController::destroy
 * @see app/Http/Controllers/CMS/AdminCMSController.php:160
 * @route '/cms/admin/bloglist/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\AdminCMSController::destroy
 * @see app/Http/Controllers/CMS/AdminCMSController.php:160
 * @route '/cms/admin/bloglist/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CMS\AdminCMSController::destroy
 * @see app/Http/Controllers/CMS/AdminCMSController.php:160
 * @route '/cms/admin/bloglist/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CMS\AdminCMSController::destroy
 * @see app/Http/Controllers/CMS/AdminCMSController.php:160
 * @route '/cms/admin/bloglist/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\CMS\AdminCMSController::updateStatus
 * @see app/Http/Controllers/CMS/AdminCMSController.php:72
 * @route '/cms/posts/{id}/status'
 */
export const updateStatus = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStatus.url(args, options),
    method: 'post',
})

updateStatus.definition = {
    methods: ["post"],
    url: '/cms/posts/{id}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CMS\AdminCMSController::updateStatus
 * @see app/Http/Controllers/CMS/AdminCMSController.php:72
 * @route '/cms/posts/{id}/status'
 */
updateStatus.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateStatus.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\AdminCMSController::updateStatus
 * @see app/Http/Controllers/CMS/AdminCMSController.php:72
 * @route '/cms/posts/{id}/status'
 */
updateStatus.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStatus.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CMS\AdminCMSController::updateStatus
 * @see app/Http/Controllers/CMS/AdminCMSController.php:72
 * @route '/cms/posts/{id}/status'
 */
    const updateStatusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CMS\AdminCMSController::updateStatus
 * @see app/Http/Controllers/CMS/AdminCMSController.php:72
 * @route '/cms/posts/{id}/status'
 */
        updateStatusForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, options),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
/**
* @see \App\Http\Controllers\CMS\AdminCMSController::homeFeatured
 * @see app/Http/Controllers/CMS/AdminCMSController.php:180
 * @route '/try'
 */
export const homeFeatured = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: homeFeatured.url(options),
    method: 'get',
})

homeFeatured.definition = {
    methods: ["get","head"],
    url: '/try',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CMS\AdminCMSController::homeFeatured
 * @see app/Http/Controllers/CMS/AdminCMSController.php:180
 * @route '/try'
 */
homeFeatured.url = (options?: RouteQueryOptions) => {
    return homeFeatured.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\AdminCMSController::homeFeatured
 * @see app/Http/Controllers/CMS/AdminCMSController.php:180
 * @route '/try'
 */
homeFeatured.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: homeFeatured.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CMS\AdminCMSController::homeFeatured
 * @see app/Http/Controllers/CMS/AdminCMSController.php:180
 * @route '/try'
 */
homeFeatured.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: homeFeatured.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CMS\AdminCMSController::homeFeatured
 * @see app/Http/Controllers/CMS/AdminCMSController.php:180
 * @route '/try'
 */
    const homeFeaturedForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: homeFeatured.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CMS\AdminCMSController::homeFeatured
 * @see app/Http/Controllers/CMS/AdminCMSController.php:180
 * @route '/try'
 */
        homeFeaturedForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: homeFeatured.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CMS\AdminCMSController::homeFeatured
 * @see app/Http/Controllers/CMS/AdminCMSController.php:180
 * @route '/try'
 */
        homeFeaturedForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: homeFeatured.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    homeFeatured.form = homeFeaturedForm
const AdminCMSController = { welcomePage, index, destroy, updateStatus, homeFeatured }

export default AdminCMSController