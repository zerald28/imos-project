import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::create
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:17
 * @route '/insurance/application/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/insurance/application/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::create
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:17
 * @route '/insurance/application/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::create
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:17
 * @route '/insurance/application/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::create
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:17
 * @route '/insurance/application/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::create
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:17
 * @route '/insurance/application/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::create
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:17
 * @route '/insurance/application/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::create
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:17
 * @route '/insurance/application/create'
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
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::store
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:101
 * @route '/insurance/application'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/insurance/application',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::store
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:101
 * @route '/insurance/application'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::store
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:101
 * @route '/insurance/application'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::store
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:101
 * @route '/insurance/application'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::store
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:101
 * @route '/insurance/application'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::show
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:188
 * @route '/insurance/application/{application}'
 */
export const show = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/insurance/application/{application}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::show
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:188
 * @route '/insurance/application/{application}'
 */
show.url = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { application: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    application: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        application: args.application,
                }

    return show.definition.url
            .replace('{application}', parsedArgs.application.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::show
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:188
 * @route '/insurance/application/{application}'
 */
show.get = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::show
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:188
 * @route '/insurance/application/{application}'
 */
show.head = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::show
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:188
 * @route '/insurance/application/{application}'
 */
    const showForm = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::show
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:188
 * @route '/insurance/application/{application}'
 */
        showForm.get = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Form\LivestockInsuranceApplicationController::show
 * @see app/Http/Controllers/Form/LivestockInsuranceApplicationController.php:188
 * @route '/insurance/application/{application}'
 */
        showForm.head = (args: { application: string | number } | [application: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const application = {
    create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
}

export default application