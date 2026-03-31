import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Swine\SwineGroupController::destroy
 * @see app/Http/Controllers/Swine/SwineGroupController.php:173
 * @route '/swines/groups/{group}/members/{swine}'
 */
export const destroy = (args: { group: string | number, swine: string | number } | [group: string | number, swine: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/swines/groups/{group}/members/{swine}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::destroy
 * @see app/Http/Controllers/Swine/SwineGroupController.php:173
 * @route '/swines/groups/{group}/members/{swine}'
 */
destroy.url = (args: { group: string | number, swine: string | number } | [group: string | number, swine: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    group: args[0],
                    swine: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        group: args.group,
                                swine: args.swine,
                }

    return destroy.definition.url
            .replace('{group}', parsedArgs.group.toString())
            .replace('{swine}', parsedArgs.swine.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Swine\SwineGroupController::destroy
 * @see app/Http/Controllers/Swine/SwineGroupController.php:173
 * @route '/swines/groups/{group}/members/{swine}'
 */
destroy.delete = (args: { group: string | number, swine: string | number } | [group: string | number, swine: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Swine\SwineGroupController::destroy
 * @see app/Http/Controllers/Swine/SwineGroupController.php:173
 * @route '/swines/groups/{group}/members/{swine}'
 */
    const destroyForm = (args: { group: string | number, swine: string | number } | [group: string | number, swine: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Swine\SwineGroupController::destroy
 * @see app/Http/Controllers/Swine/SwineGroupController.php:173
 * @route '/swines/groups/{group}/members/{swine}'
 */
        destroyForm.delete = (args: { group: string | number, swine: string | number } | [group: string | number, swine: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const members = {
    destroy: Object.assign(destroy, destroy),
}

export default members