import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\LivestockLossNoticeController::show
 * @see app/Http/Controllers/LivestockLossNoticeController.php:13
 * @route '/livestock-loss-notice'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/livestock-loss-notice',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LivestockLossNoticeController::show
 * @see app/Http/Controllers/LivestockLossNoticeController.php:13
 * @route '/livestock-loss-notice'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LivestockLossNoticeController::show
 * @see app/Http/Controllers/LivestockLossNoticeController.php:13
 * @route '/livestock-loss-notice'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LivestockLossNoticeController::show
 * @see app/Http/Controllers/LivestockLossNoticeController.php:13
 * @route '/livestock-loss-notice'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LivestockLossNoticeController::show
 * @see app/Http/Controllers/LivestockLossNoticeController.php:13
 * @route '/livestock-loss-notice'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LivestockLossNoticeController::show
 * @see app/Http/Controllers/LivestockLossNoticeController.php:13
 * @route '/livestock-loss-notice'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LivestockLossNoticeController::show
 * @see app/Http/Controllers/LivestockLossNoticeController.php:13
 * @route '/livestock-loss-notice'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\LivestockLossNoticeController::sample
 * @see app/Http/Controllers/LivestockLossNoticeController.php:37
 * @route '/livestock-loss-notice/sample'
 */
export const sample = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sample.url(options),
    method: 'get',
})

sample.definition = {
    methods: ["get","head"],
    url: '/livestock-loss-notice/sample',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LivestockLossNoticeController::sample
 * @see app/Http/Controllers/LivestockLossNoticeController.php:37
 * @route '/livestock-loss-notice/sample'
 */
sample.url = (options?: RouteQueryOptions) => {
    return sample.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LivestockLossNoticeController::sample
 * @see app/Http/Controllers/LivestockLossNoticeController.php:37
 * @route '/livestock-loss-notice/sample'
 */
sample.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sample.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LivestockLossNoticeController::sample
 * @see app/Http/Controllers/LivestockLossNoticeController.php:37
 * @route '/livestock-loss-notice/sample'
 */
sample.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sample.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LivestockLossNoticeController::sample
 * @see app/Http/Controllers/LivestockLossNoticeController.php:37
 * @route '/livestock-loss-notice/sample'
 */
    const sampleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: sample.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LivestockLossNoticeController::sample
 * @see app/Http/Controllers/LivestockLossNoticeController.php:37
 * @route '/livestock-loss-notice/sample'
 */
        sampleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sample.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LivestockLossNoticeController::sample
 * @see app/Http/Controllers/LivestockLossNoticeController.php:37
 * @route '/livestock-loss-notice/sample'
 */
        sampleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sample.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    sample.form = sampleForm
/**
* @see \App\Http\Controllers\LivestockLossNoticeController::download
 * @see app/Http/Controllers/LivestockLossNoticeController.php:59
 * @route '/livestock-loss-notice/download'
 */
export const download = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/livestock-loss-notice/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LivestockLossNoticeController::download
 * @see app/Http/Controllers/LivestockLossNoticeController.php:59
 * @route '/livestock-loss-notice/download'
 */
download.url = (options?: RouteQueryOptions) => {
    return download.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LivestockLossNoticeController::download
 * @see app/Http/Controllers/LivestockLossNoticeController.php:59
 * @route '/livestock-loss-notice/download'
 */
download.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LivestockLossNoticeController::download
 * @see app/Http/Controllers/LivestockLossNoticeController.php:59
 * @route '/livestock-loss-notice/download'
 */
download.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LivestockLossNoticeController::download
 * @see app/Http/Controllers/LivestockLossNoticeController.php:59
 * @route '/livestock-loss-notice/download'
 */
    const downloadForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LivestockLossNoticeController::download
 * @see app/Http/Controllers/LivestockLossNoticeController.php:59
 * @route '/livestock-loss-notice/download'
 */
        downloadForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LivestockLossNoticeController::download
 * @see app/Http/Controllers/LivestockLossNoticeController.php:59
 * @route '/livestock-loss-notice/download'
 */
        downloadForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
/**
* @see \App\Http\Controllers\LivestockLossNoticeController::multiple
 * @see app/Http/Controllers/LivestockLossNoticeController.php:80
 * @route '/livestock-loss-notice/multiple'
 */
export const multiple = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: multiple.url(options),
    method: 'get',
})

multiple.definition = {
    methods: ["get","head"],
    url: '/livestock-loss-notice/multiple',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LivestockLossNoticeController::multiple
 * @see app/Http/Controllers/LivestockLossNoticeController.php:80
 * @route '/livestock-loss-notice/multiple'
 */
multiple.url = (options?: RouteQueryOptions) => {
    return multiple.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LivestockLossNoticeController::multiple
 * @see app/Http/Controllers/LivestockLossNoticeController.php:80
 * @route '/livestock-loss-notice/multiple'
 */
multiple.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: multiple.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LivestockLossNoticeController::multiple
 * @see app/Http/Controllers/LivestockLossNoticeController.php:80
 * @route '/livestock-loss-notice/multiple'
 */
multiple.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: multiple.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LivestockLossNoticeController::multiple
 * @see app/Http/Controllers/LivestockLossNoticeController.php:80
 * @route '/livestock-loss-notice/multiple'
 */
    const multipleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: multiple.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LivestockLossNoticeController::multiple
 * @see app/Http/Controllers/LivestockLossNoticeController.php:80
 * @route '/livestock-loss-notice/multiple'
 */
        multipleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: multiple.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LivestockLossNoticeController::multiple
 * @see app/Http/Controllers/LivestockLossNoticeController.php:80
 * @route '/livestock-loss-notice/multiple'
 */
        multipleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: multiple.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    multiple.form = multipleForm
const notice = {
    show: Object.assign(show, show),
sample: Object.assign(sample, sample),
download: Object.assign(download, download),
multiple: Object.assign(multiple, multiple),
}

export default notice