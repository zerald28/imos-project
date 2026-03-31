import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ServiceBookingController::providerBookings
 * @see app/Http/Controllers/ServiceBookingController.php:156
 * @route '/services/provider-bookings'
 */
export const providerBookings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: providerBookings.url(options),
    method: 'get',
})

providerBookings.definition = {
    methods: ["get","head"],
    url: '/services/provider-bookings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServiceBookingController::providerBookings
 * @see app/Http/Controllers/ServiceBookingController.php:156
 * @route '/services/provider-bookings'
 */
providerBookings.url = (options?: RouteQueryOptions) => {
    return providerBookings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceBookingController::providerBookings
 * @see app/Http/Controllers/ServiceBookingController.php:156
 * @route '/services/provider-bookings'
 */
providerBookings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: providerBookings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServiceBookingController::providerBookings
 * @see app/Http/Controllers/ServiceBookingController.php:156
 * @route '/services/provider-bookings'
 */
providerBookings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: providerBookings.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServiceBookingController::providerBookings
 * @see app/Http/Controllers/ServiceBookingController.php:156
 * @route '/services/provider-bookings'
 */
    const providerBookingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: providerBookings.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServiceBookingController::providerBookings
 * @see app/Http/Controllers/ServiceBookingController.php:156
 * @route '/services/provider-bookings'
 */
        providerBookingsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: providerBookings.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServiceBookingController::providerBookings
 * @see app/Http/Controllers/ServiceBookingController.php:156
 * @route '/services/provider-bookings'
 */
        providerBookingsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: providerBookings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    providerBookings.form = providerBookingsForm
const bookings = {
    providerBookings: Object.assign(providerBookings, providerBookings),
}

export default bookings