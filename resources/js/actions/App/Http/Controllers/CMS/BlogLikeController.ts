import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\CMS\BlogLikeController::toggle
 * @see app/Http/Controllers/CMS/BlogLikeController.php:14
 * @route '/cms/posts/{post}/like'
 */
export const toggle = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

toggle.definition = {
    methods: ["post"],
    url: '/cms/posts/{post}/like',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CMS\BlogLikeController::toggle
 * @see app/Http/Controllers/CMS/BlogLikeController.php:14
 * @route '/cms/posts/{post}/like'
 */
toggle.url = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return toggle.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\BlogLikeController::toggle
 * @see app/Http/Controllers/CMS/BlogLikeController.php:14
 * @route '/cms/posts/{post}/like'
 */
toggle.post = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CMS\BlogLikeController::toggle
 * @see app/Http/Controllers/CMS/BlogLikeController.php:14
 * @route '/cms/posts/{post}/like'
 */
    const toggleForm = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CMS\BlogLikeController::toggle
 * @see app/Http/Controllers/CMS/BlogLikeController.php:14
 * @route '/cms/posts/{post}/like'
 */
        toggleForm.post = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle.url(args, options),
            method: 'post',
        })
    
    toggle.form = toggleForm
/**
* @see \App\Http\Controllers\CMS\BlogLikeController::status
 * @see app/Http/Controllers/CMS/BlogLikeController.php:45
 * @route '/cms/posts/{post}/like-status'
 */
export const status = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '/cms/posts/{post}/like-status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CMS\BlogLikeController::status
 * @see app/Http/Controllers/CMS/BlogLikeController.php:45
 * @route '/cms/posts/{post}/like-status'
 */
status.url = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return status.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\BlogLikeController::status
 * @see app/Http/Controllers/CMS/BlogLikeController.php:45
 * @route '/cms/posts/{post}/like-status'
 */
status.get = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CMS\BlogLikeController::status
 * @see app/Http/Controllers/CMS/BlogLikeController.php:45
 * @route '/cms/posts/{post}/like-status'
 */
status.head = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CMS\BlogLikeController::status
 * @see app/Http/Controllers/CMS/BlogLikeController.php:45
 * @route '/cms/posts/{post}/like-status'
 */
    const statusForm = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: status.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CMS\BlogLikeController::status
 * @see app/Http/Controllers/CMS/BlogLikeController.php:45
 * @route '/cms/posts/{post}/like-status'
 */
        statusForm.get = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CMS\BlogLikeController::status
 * @see app/Http/Controllers/CMS/BlogLikeController.php:45
 * @route '/cms/posts/{post}/like-status'
 */
        statusForm.head = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    status.form = statusForm
const BlogLikeController = { toggle, status }

export default BlogLikeController