import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import blog from './blog'
import posts from './posts'
import author from './author'
/**
* @see \App\Http\Controllers\CMS\BlogPostController::__invoke
 * @see app/Http/Controllers/CMS/BlogPostController.php:381
 * @route '/cms/exit'
 */
export const exit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exit.url(options),
    method: 'get',
})

exit.definition = {
    methods: ["get","head"],
    url: '/cms/exit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CMS\BlogPostController::__invoke
 * @see app/Http/Controllers/CMS/BlogPostController.php:381
 * @route '/cms/exit'
 */
exit.url = (options?: RouteQueryOptions) => {
    return exit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\BlogPostController::__invoke
 * @see app/Http/Controllers/CMS/BlogPostController.php:381
 * @route '/cms/exit'
 */
exit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CMS\BlogPostController::__invoke
 * @see app/Http/Controllers/CMS/BlogPostController.php:381
 * @route '/cms/exit'
 */
exit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CMS\BlogPostController::__invoke
 * @see app/Http/Controllers/CMS/BlogPostController.php:381
 * @route '/cms/exit'
 */
    const exitForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CMS\BlogPostController::__invoke
 * @see app/Http/Controllers/CMS/BlogPostController.php:381
 * @route '/cms/exit'
 */
        exitForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CMS\BlogPostController::__invoke
 * @see app/Http/Controllers/CMS/BlogPostController.php:381
 * @route '/cms/exit'
 */
        exitForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exit.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exit.form = exitForm
const cms = {
    blog: Object.assign(blog, blog),
exit: Object.assign(exit, exit),
posts: Object.assign(posts, posts),
author: Object.assign(author, author),
}

export default cms