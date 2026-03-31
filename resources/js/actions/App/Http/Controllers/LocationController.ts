import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LocationController::getProvinces
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/provinces'
 */
export const getProvinces = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProvinces.url(options),
    method: 'get',
})

getProvinces.definition = {
    methods: ["get","head"],
    url: '/provinces',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LocationController::getProvinces
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/provinces'
 */
getProvinces.url = (options?: RouteQueryOptions) => {
    return getProvinces.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocationController::getProvinces
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/provinces'
 */
getProvinces.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProvinces.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LocationController::getProvinces
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/provinces'
 */
getProvinces.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getProvinces.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LocationController::getProvinces
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/provinces'
 */
    const getProvincesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getProvinces.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LocationController::getProvinces
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/provinces'
 */
        getProvincesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getProvinces.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LocationController::getProvinces
 * @see app/Http/Controllers/LocationController.php:12
 * @route '/provinces'
 */
        getProvincesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getProvinces.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getProvinces.form = getProvincesForm
/**
* @see \App\Http\Controllers\LocationController::getMunicipalities
 * @see app/Http/Controllers/LocationController.php:17
 * @route '/municipalities/{province_id}'
 */
export const getMunicipalities = (args: { province_id: string | number } | [province_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMunicipalities.url(args, options),
    method: 'get',
})

getMunicipalities.definition = {
    methods: ["get","head"],
    url: '/municipalities/{province_id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LocationController::getMunicipalities
 * @see app/Http/Controllers/LocationController.php:17
 * @route '/municipalities/{province_id}'
 */
getMunicipalities.url = (args: { province_id: string | number } | [province_id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getMunicipalities.definition.url
            .replace('{province_id}', parsedArgs.province_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocationController::getMunicipalities
 * @see app/Http/Controllers/LocationController.php:17
 * @route '/municipalities/{province_id}'
 */
getMunicipalities.get = (args: { province_id: string | number } | [province_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getMunicipalities.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LocationController::getMunicipalities
 * @see app/Http/Controllers/LocationController.php:17
 * @route '/municipalities/{province_id}'
 */
getMunicipalities.head = (args: { province_id: string | number } | [province_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getMunicipalities.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LocationController::getMunicipalities
 * @see app/Http/Controllers/LocationController.php:17
 * @route '/municipalities/{province_id}'
 */
    const getMunicipalitiesForm = (args: { province_id: string | number } | [province_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getMunicipalities.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LocationController::getMunicipalities
 * @see app/Http/Controllers/LocationController.php:17
 * @route '/municipalities/{province_id}'
 */
        getMunicipalitiesForm.get = (args: { province_id: string | number } | [province_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getMunicipalities.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LocationController::getMunicipalities
 * @see app/Http/Controllers/LocationController.php:17
 * @route '/municipalities/{province_id}'
 */
        getMunicipalitiesForm.head = (args: { province_id: string | number } | [province_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getMunicipalities.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getMunicipalities.form = getMunicipalitiesForm
/**
* @see \App\Http\Controllers\LocationController::getBarangays
 * @see app/Http/Controllers/LocationController.php:24
 * @route '/barangays/{municipal_id}'
 */
export const getBarangays = (args: { municipal_id: string | number } | [municipal_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getBarangays.url(args, options),
    method: 'get',
})

getBarangays.definition = {
    methods: ["get","head"],
    url: '/barangays/{municipal_id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LocationController::getBarangays
 * @see app/Http/Controllers/LocationController.php:24
 * @route '/barangays/{municipal_id}'
 */
getBarangays.url = (args: { municipal_id: string | number } | [municipal_id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getBarangays.definition.url
            .replace('{municipal_id}', parsedArgs.municipal_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocationController::getBarangays
 * @see app/Http/Controllers/LocationController.php:24
 * @route '/barangays/{municipal_id}'
 */
getBarangays.get = (args: { municipal_id: string | number } | [municipal_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getBarangays.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LocationController::getBarangays
 * @see app/Http/Controllers/LocationController.php:24
 * @route '/barangays/{municipal_id}'
 */
getBarangays.head = (args: { municipal_id: string | number } | [municipal_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getBarangays.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LocationController::getBarangays
 * @see app/Http/Controllers/LocationController.php:24
 * @route '/barangays/{municipal_id}'
 */
    const getBarangaysForm = (args: { municipal_id: string | number } | [municipal_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getBarangays.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LocationController::getBarangays
 * @see app/Http/Controllers/LocationController.php:24
 * @route '/barangays/{municipal_id}'
 */
        getBarangaysForm.get = (args: { municipal_id: string | number } | [municipal_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getBarangays.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LocationController::getBarangays
 * @see app/Http/Controllers/LocationController.php:24
 * @route '/barangays/{municipal_id}'
 */
        getBarangaysForm.head = (args: { municipal_id: string | number } | [municipal_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getBarangays.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getBarangays.form = getBarangaysForm
const LocationController = { getProvinces, getMunicipalities, getBarangays }

export default LocationController