import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\LocationController::provinces
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/provinces'
 */
export const provinces = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provinces.url(options),
    method: 'get',
})

provinces.definition = {
    methods: ["get","head"],
    url: '/provinces',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LocationController::provinces
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/provinces'
 */
provinces.url = (options?: RouteQueryOptions) => {
    return provinces.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocationController::provinces
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/provinces'
 */
provinces.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provinces.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LocationController::provinces
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/provinces'
 */
provinces.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: provinces.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LocationController::provinces
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/provinces'
 */
    const provincesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: provinces.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LocationController::provinces
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/provinces'
 */
        provincesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: provinces.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LocationController::provinces
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/provinces'
 */
        provincesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: provinces.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    provinces.form = provincesForm
/**
* @see \App\Http\Controllers\LocationController::municipalities
 * @see app/Http/Controllers/LocationController.php:17
 * @route '/municipalities/{province_id}'
 */
export const municipalities = (args: { province_id: string | number } | [province_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: municipalities.url(args, options),
    method: 'get',
})

municipalities.definition = {
    methods: ["get","head"],
    url: '/municipalities/{province_id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LocationController::municipalities
 * @see app/Http/Controllers/LocationController.php:17
 * @route '/municipalities/{province_id}'
 */
municipalities.url = (args: { province_id: string | number } | [province_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { province_id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    province_id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        province_id: args.province_id,
                }

    return municipalities.definition.url
            .replace('{province_id}', parsedArgs.province_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocationController::municipalities
 * @see app/Http/Controllers/LocationController.php:17
 * @route '/municipalities/{province_id}'
 */
municipalities.get = (args: { province_id: string | number } | [province_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: municipalities.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LocationController::municipalities
 * @see app/Http/Controllers/LocationController.php:17
 * @route '/municipalities/{province_id}'
 */
municipalities.head = (args: { province_id: string | number } | [province_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: municipalities.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LocationController::municipalities
 * @see app/Http/Controllers/LocationController.php:17
 * @route '/municipalities/{province_id}'
 */
    const municipalitiesForm = (args: { province_id: string | number } | [province_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: municipalities.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LocationController::municipalities
 * @see app/Http/Controllers/LocationController.php:17
 * @route '/municipalities/{province_id}'
 */
        municipalitiesForm.get = (args: { province_id: string | number } | [province_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: municipalities.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LocationController::municipalities
 * @see app/Http/Controllers/LocationController.php:17
 * @route '/municipalities/{province_id}'
 */
        municipalitiesForm.head = (args: { province_id: string | number } | [province_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: municipalities.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    municipalities.form = municipalitiesForm
/**
* @see \App\Http\Controllers\LocationController::barangays
 * @see app/Http/Controllers/LocationController.php:24
 * @route '/barangays/{municipal_id}'
 */
export const barangays = (args: { municipal_id: string | number } | [municipal_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: barangays.url(args, options),
    method: 'get',
})

barangays.definition = {
    methods: ["get","head"],
    url: '/barangays/{municipal_id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LocationController::barangays
 * @see app/Http/Controllers/LocationController.php:24
 * @route '/barangays/{municipal_id}'
 */
barangays.url = (args: { municipal_id: string | number } | [municipal_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { municipal_id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    municipal_id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        municipal_id: args.municipal_id,
                }

    return barangays.definition.url
            .replace('{municipal_id}', parsedArgs.municipal_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocationController::barangays
 * @see app/Http/Controllers/LocationController.php:24
 * @route '/barangays/{municipal_id}'
 */
barangays.get = (args: { municipal_id: string | number } | [municipal_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: barangays.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LocationController::barangays
 * @see app/Http/Controllers/LocationController.php:24
 * @route '/barangays/{municipal_id}'
 */
barangays.head = (args: { municipal_id: string | number } | [municipal_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: barangays.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LocationController::barangays
 * @see app/Http/Controllers/LocationController.php:24
 * @route '/barangays/{municipal_id}'
 */
    const barangaysForm = (args: { municipal_id: string | number } | [municipal_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: barangays.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LocationController::barangays
 * @see app/Http/Controllers/LocationController.php:24
 * @route '/barangays/{municipal_id}'
 */
        barangaysForm.get = (args: { municipal_id: string | number } | [municipal_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: barangays.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LocationController::barangays
 * @see app/Http/Controllers/LocationController.php:24
 * @route '/barangays/{municipal_id}'
 */
        barangaysForm.head = (args: { municipal_id: string | number } | [municipal_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: barangays.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    barangays.form = barangaysForm
const locations = {
    provinces: Object.assign(provinces, provinces),
municipalities: Object.assign(municipalities, municipalities),
barangays: Object.assign(barangays, barangays),
}

export default locations