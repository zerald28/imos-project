import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
 * @see [serialized-closure]:2
 * @route '/swine-mortality-insurance'
 */
export const info = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: info.url(options),
    method: 'get',
})

info.definition = {
    methods: ["get","head"],
    url: '/swine-mortality-insurance',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see [serialized-closure]:2
 * @route '/swine-mortality-insurance'
 */
info.url = (options?: RouteQueryOptions) => {
    return info.definition.url + queryParams(options)
}

/**
 * @see [serialized-closure]:2
 * @route '/swine-mortality-insurance'
 */
info.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: info.url(options),
    method: 'get',
})
/**
 * @see [serialized-closure]:2
 * @route '/swine-mortality-insurance'
 */
info.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: info.url(options),
    method: 'head',
})

    /**
 * @see [serialized-closure]:2
 * @route '/swine-mortality-insurance'
 */
    const infoForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: info.url(options),
        method: 'get',
    })

            /**
 * @see [serialized-closure]:2
 * @route '/swine-mortality-insurance'
 */
        infoForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: info.url(options),
            method: 'get',
        })
            /**
 * @see [serialized-closure]:2
 * @route '/swine-mortality-insurance'
 */
        infoForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: info.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    info.form = infoForm
const mortality = {
    info: Object.assign(info, info),
}

export default mortality