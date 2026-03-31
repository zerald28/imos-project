import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import insurance from './insurance'
import schedules from './schedules'
import schedule from './schedule'
import events from './events'
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::index
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:23
 * @route '/admin/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::index
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:23
 * @route '/admin/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::index
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:23
 * @route '/admin/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::index
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:23
 * @route '/admin/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::index
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:23
 * @route '/admin/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::index
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:23
 * @route '/admin/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImosAdmin\DashboardController::index
 * @see app/Http/Controllers/ImosAdmin/DashboardController.php:23
 * @route '/admin/dashboard'
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
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:43
 * @route '/cms/admin/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/cms/admin/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:43
 * @route '/cms/admin/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:43
 * @route '/cms/admin/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:43
 * @route '/cms/admin/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:43
 * @route '/cms/admin/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:43
 * @route '/cms/admin/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CMS\BlogPostController::create
 * @see app/Http/Controllers/CMS/BlogPostController.php:43
 * @route '/cms/admin/create'
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
const admin = {
    index: Object.assign(index, index),
insurance: Object.assign(insurance, insurance),
schedules: Object.assign(schedules, schedules),
schedule: Object.assign(schedule, schedule),
events: Object.assign(events, events),
create: Object.assign(create, create),
}

export default admin