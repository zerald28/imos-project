import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:25
 * @route '/cms/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/cms/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:25
 * @route '/cms/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:25
 * @route '/cms/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:25
 * @route '/cms/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:25
 * @route '/cms/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:25
 * @route '/cms/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:25
 * @route '/cms/create'
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
* @see \App\Http\Controllers\CMS\BlogPostController::store
 * @see app/Http/Controllers/CMS/BlogPostController.php:75
 * @route '/cms/posts'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/cms/posts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CMS\BlogPostController::store
 * @see app/Http/Controllers/CMS/BlogPostController.php:75
 * @route '/cms/posts'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\BlogPostController::store
 * @see app/Http/Controllers/CMS/BlogPostController.php:75
 * @route '/cms/posts'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CMS\BlogPostController::store
 * @see app/Http/Controllers/CMS/BlogPostController.php:75
 * @route '/cms/posts'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CMS\BlogPostController::store
 * @see app/Http/Controllers/CMS/BlogPostController.php:75
 * @route '/cms/posts'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\CMS\FeedController::index
 * @see app/Http/Controllers/CMS/FeedController.php:13
 * @route '/cms/blog'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cms/blog',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CMS\FeedController::index
 * @see app/Http/Controllers/CMS/FeedController.php:13
 * @route '/cms/blog'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\FeedController::index
 * @see app/Http/Controllers/CMS/FeedController.php:13
 * @route '/cms/blog'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CMS\FeedController::index
 * @see app/Http/Controllers/CMS/FeedController.php:13
 * @route '/cms/blog'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CMS\FeedController::index
 * @see app/Http/Controllers/CMS/FeedController.php:13
 * @route '/cms/blog'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CMS\FeedController::index
 * @see app/Http/Controllers/CMS/FeedController.php:13
 * @route '/cms/blog'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CMS\FeedController::index
 * @see app/Http/Controllers/CMS/FeedController.php:13
 * @route '/cms/blog'
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
const blog = {
    create: Object.assign(create, create),
store: Object.assign(store, store),
index: Object.assign(index, index),
}

export default blog