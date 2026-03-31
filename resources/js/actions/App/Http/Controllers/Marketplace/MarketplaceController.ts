import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::showProfile
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:529
 * @route '/marketplace/profile/{id}'
 */
export const showProfile = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showProfile.url(args, options),
    method: 'get',
})

showProfile.definition = {
    methods: ["get","head"],
    url: '/marketplace/profile/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::showProfile
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:529
 * @route '/marketplace/profile/{id}'
 */
showProfile.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showProfile.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::showProfile
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:529
 * @route '/marketplace/profile/{id}'
 */
showProfile.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showProfile.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::showProfile
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:529
 * @route '/marketplace/profile/{id}'
 */
showProfile.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showProfile.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::showProfile
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:529
 * @route '/marketplace/profile/{id}'
 */
    const showProfileForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showProfile.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::showProfile
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:529
 * @route '/marketplace/profile/{id}'
 */
        showProfileForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showProfile.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::showProfile
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:529
 * @route '/marketplace/profile/{id}'
 */
        showProfileForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showProfile.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showProfile.form = showProfileForm
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::showOwn
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:692
 * @route '/marketplace/profile'
 */
export const showOwn = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showOwn.url(options),
    method: 'get',
})

showOwn.definition = {
    methods: ["get","head"],
    url: '/marketplace/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::showOwn
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:692
 * @route '/marketplace/profile'
 */
showOwn.url = (options?: RouteQueryOptions) => {
    return showOwn.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::showOwn
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:692
 * @route '/marketplace/profile'
 */
showOwn.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showOwn.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::showOwn
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:692
 * @route '/marketplace/profile'
 */
showOwn.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showOwn.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::showOwn
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:692
 * @route '/marketplace/profile'
 */
    const showOwnForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showOwn.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::showOwn
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:692
 * @route '/marketplace/profile'
 */
        showOwnForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showOwn.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::showOwn
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:692
 * @route '/marketplace/profile'
 */
        showOwnForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showOwn.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showOwn.form = showOwnForm
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::index
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:28
 * @route '/marketplace'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/marketplace',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::index
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:28
 * @route '/marketplace'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::index
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:28
 * @route '/marketplace'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::index
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:28
 * @route '/marketplace'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::index
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:28
 * @route '/marketplace'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::index
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:28
 * @route '/marketplace'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::index
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:28
 * @route '/marketplace'
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
* @see \App\Http\Controllers\Marketplace\MarketplaceController::loadMore
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:0
 * @route '/marketplace/load-more'
 */
export const loadMore = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loadMore.url(options),
    method: 'get',
})

loadMore.definition = {
    methods: ["get","head"],
    url: '/marketplace/load-more',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::loadMore
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:0
 * @route '/marketplace/load-more'
 */
loadMore.url = (options?: RouteQueryOptions) => {
    return loadMore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::loadMore
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:0
 * @route '/marketplace/load-more'
 */
loadMore.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loadMore.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::loadMore
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:0
 * @route '/marketplace/load-more'
 */
loadMore.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: loadMore.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::loadMore
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:0
 * @route '/marketplace/load-more'
 */
    const loadMoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: loadMore.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::loadMore
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:0
 * @route '/marketplace/load-more'
 */
        loadMoreForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: loadMore.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::loadMore
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:0
 * @route '/marketplace/load-more'
 */
        loadMoreForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: loadMore.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    loadMore.form = loadMoreForm
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:188
 * @route '/marketplace/{listing}'
 */
export const show = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/marketplace/{listing}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:188
 * @route '/marketplace/{listing}'
 */
show.url = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { listing: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    listing: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        listing: args.listing,
                }

    return show.definition.url
            .replace('{listing}', parsedArgs.listing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:188
 * @route '/marketplace/{listing}'
 */
show.get = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:188
 * @route '/marketplace/{listing}'
 */
show.head = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:188
 * @route '/marketplace/{listing}'
 */
    const showForm = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:188
 * @route '/marketplace/{listing}'
 */
        showForm.get = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::show
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:188
 * @route '/marketplace/{listing}'
 */
        showForm.head = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::storeRequest
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:320
 * @route '/swine-request/store'
 */
export const storeRequest = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRequest.url(options),
    method: 'post',
})

storeRequest.definition = {
    methods: ["post"],
    url: '/swine-request/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::storeRequest
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:320
 * @route '/swine-request/store'
 */
storeRequest.url = (options?: RouteQueryOptions) => {
    return storeRequest.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::storeRequest
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:320
 * @route '/swine-request/store'
 */
storeRequest.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRequest.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::storeRequest
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:320
 * @route '/swine-request/store'
 */
    const storeRequestForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeRequest.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::storeRequest
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:320
 * @route '/swine-request/store'
 */
        storeRequestForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeRequest.url(options),
            method: 'post',
        })
    
    storeRequest.form = storeRequestForm
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::getSwineRequests
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:516
 * @route '/listings/{listing}/swine-requests'
 */
export const getSwineRequests = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSwineRequests.url(args, options),
    method: 'get',
})

getSwineRequests.definition = {
    methods: ["get","head"],
    url: '/listings/{listing}/swine-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::getSwineRequests
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:516
 * @route '/listings/{listing}/swine-requests'
 */
getSwineRequests.url = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { listing: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    listing: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        listing: args.listing,
                }

    return getSwineRequests.definition.url
            .replace('{listing}', parsedArgs.listing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::getSwineRequests
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:516
 * @route '/listings/{listing}/swine-requests'
 */
getSwineRequests.get = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSwineRequests.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::getSwineRequests
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:516
 * @route '/listings/{listing}/swine-requests'
 */
getSwineRequests.head = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSwineRequests.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::getSwineRequests
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:516
 * @route '/listings/{listing}/swine-requests'
 */
    const getSwineRequestsForm = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getSwineRequests.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::getSwineRequests
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:516
 * @route '/listings/{listing}/swine-requests'
 */
        getSwineRequestsForm.get = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getSwineRequests.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Marketplace\MarketplaceController::getSwineRequests
 * @see app/Http/Controllers/Marketplace/MarketplaceController.php:516
 * @route '/listings/{listing}/swine-requests'
 */
        getSwineRequestsForm.head = (args: { listing: string | number } | [listing: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getSwineRequests.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getSwineRequests.form = getSwineRequestsForm
const MarketplaceController = { showProfile, showOwn, index, loadMore, show, storeRequest, getSwineRequests }

export default MarketplaceController