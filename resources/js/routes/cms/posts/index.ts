import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
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
* @see \App\Http\Controllers\CMS\AdminCMSController::status
 * @see app/Http/Controllers/CMS/AdminCMSController.php:72
 * @route '/cms/posts/{id}/status'
 */
export const status = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(args, options),
    method: 'post',
})

status.definition = {
    methods: ["post"],
    url: '/cms/posts/{id}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CMS\AdminCMSController::status
 * @see app/Http/Controllers/CMS/AdminCMSController.php:72
 * @route '/cms/posts/{id}/status'
 */
status.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return status.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\AdminCMSController::status
 * @see app/Http/Controllers/CMS/AdminCMSController.php:72
 * @route '/cms/posts/{id}/status'
 */
status.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CMS\AdminCMSController::status
 * @see app/Http/Controllers/CMS/AdminCMSController.php:72
 * @route '/cms/posts/{id}/status'
 */
    const statusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: status.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CMS\AdminCMSController::status
 * @see app/Http/Controllers/CMS/AdminCMSController.php:72
 * @route '/cms/posts/{id}/status'
 */
        statusForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: status.url(args, options),
            method: 'post',
        })
    
    status.form = statusForm
/**
* @see \App\Http\Controllers\CMS\BlogLikeController::like
 * @see app/Http/Controllers/CMS/BlogLikeController.php:14
 * @route '/cms/posts/{post}/like'
 */
export const like = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: like.url(args, options),
    method: 'post',
})

like.definition = {
    methods: ["post"],
    url: '/cms/posts/{post}/like',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CMS\BlogLikeController::like
 * @see app/Http/Controllers/CMS/BlogLikeController.php:14
 * @route '/cms/posts/{post}/like'
 */
like.url = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { post: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    post: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        post: typeof args.post === 'object'
                ? args.post.id
                : args.post,
                }

    return like.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\BlogLikeController::like
 * @see app/Http/Controllers/CMS/BlogLikeController.php:14
 * @route '/cms/posts/{post}/like'
 */
like.post = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: like.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CMS\BlogLikeController::like
 * @see app/Http/Controllers/CMS/BlogLikeController.php:14
 * @route '/cms/posts/{post}/like'
 */
    const likeForm = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: like.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CMS\BlogLikeController::like
 * @see app/Http/Controllers/CMS/BlogLikeController.php:14
 * @route '/cms/posts/{post}/like'
 */
        likeForm.post = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: like.url(args, options),
            method: 'post',
        })
    
    like.form = likeForm
/**
* @see \App\Http\Controllers\CMS\BlogLikeController::likeStatus
 * @see app/Http/Controllers/CMS/BlogLikeController.php:45
 * @route '/cms/posts/{post}/like-status'
 */
export const likeStatus = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: likeStatus.url(args, options),
    method: 'get',
})

likeStatus.definition = {
    methods: ["get","head"],
    url: '/cms/posts/{post}/like-status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CMS\BlogLikeController::likeStatus
 * @see app/Http/Controllers/CMS/BlogLikeController.php:45
 * @route '/cms/posts/{post}/like-status'
 */
likeStatus.url = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { post: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    post: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        post: typeof args.post === 'object'
                ? args.post.id
                : args.post,
                }

    return likeStatus.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\BlogLikeController::likeStatus
 * @see app/Http/Controllers/CMS/BlogLikeController.php:45
 * @route '/cms/posts/{post}/like-status'
 */
likeStatus.get = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: likeStatus.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CMS\BlogLikeController::likeStatus
 * @see app/Http/Controllers/CMS/BlogLikeController.php:45
 * @route '/cms/posts/{post}/like-status'
 */
likeStatus.head = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: likeStatus.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CMS\BlogLikeController::likeStatus
 * @see app/Http/Controllers/CMS/BlogLikeController.php:45
 * @route '/cms/posts/{post}/like-status'
 */
    const likeStatusForm = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: likeStatus.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CMS\BlogLikeController::likeStatus
 * @see app/Http/Controllers/CMS/BlogLikeController.php:45
 * @route '/cms/posts/{post}/like-status'
 */
        likeStatusForm.get = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: likeStatus.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CMS\BlogLikeController::likeStatus
 * @see app/Http/Controllers/CMS/BlogLikeController.php:45
 * @route '/cms/posts/{post}/like-status'
 */
        likeStatusForm.head = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: likeStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    likeStatus.form = likeStatusForm
const posts = {
    index: Object.assign(index, index),
destroy: Object.assign(destroy, destroy),
status: Object.assign(status, status),
like: Object.assign(like, like),
likeStatus: Object.assign(likeStatus, likeStatus),
}

export default posts