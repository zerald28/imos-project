import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Swine\SwineGroupController::assign
 * @see app/Http/Controllers/Swine/SwineGroupController.php:59
 * @route '/swine/{swine}/assign-group'
 */
export const assign = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(args, options),
    method: 'post',
})

assign.definition = {
    methods: ["post"],
    url: '/swine/{swine}/assign-group',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::assign
 * @see app/Http/Controllers/Swine/SwineGroupController.php:59
 * @route '/swine/{swine}/assign-group'
 */
assign.url = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { swine: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { swine: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    swine: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        swine: typeof args.swine === 'object'
                ? args.swine.id
                : args.swine,
                }

    return assign.definition.url
            .replace('{swine}', parsedArgs.swine.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::assign
 * @see app/Http/Controllers/Swine/SwineGroupController.php:59
 * @route '/swine/{swine}/assign-group'
 */
assign.post = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Swine\SwineGroupController::assign
 * @see app/Http/Controllers/Swine/SwineGroupController.php:59
 * @route '/swine/{swine}/assign-group'
 */
    const assignForm = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assign.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineGroupController::assign
 * @see app/Http/Controllers/Swine/SwineGroupController.php:59
 * @route '/swine/{swine}/assign-group'
 */
        assignForm.post = (args: { swine: number | { id: number } } | [swine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assign.url(args, options),
            method: 'post',
        })
    
    assign.form = assignForm
const swineGroup = {
    assign: Object.assign(assign, assign),
}

export default swineGroup