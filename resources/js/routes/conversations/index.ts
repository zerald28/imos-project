import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ConversationController::start
 * @see app/Http/Controllers/ConversationController.php:165
 * @route '/conversations/start'
 */
export const start = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(options),
    method: 'post',
})

start.definition = {
    methods: ["post"],
    url: '/conversations/start',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ConversationController::start
 * @see app/Http/Controllers/ConversationController.php:165
 * @route '/conversations/start'
 */
start.url = (options?: RouteQueryOptions) => {
    return start.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ConversationController::start
 * @see app/Http/Controllers/ConversationController.php:165
 * @route '/conversations/start'
 */
start.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ConversationController::start
 * @see app/Http/Controllers/ConversationController.php:165
 * @route '/conversations/start'
 */
    const startForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: start.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ConversationController::start
 * @see app/Http/Controllers/ConversationController.php:165
 * @route '/conversations/start'
 */
        startForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: start.url(options),
            method: 'post',
        })
    
    start.form = startForm
const conversations = {
    start: Object.assign(start, start),
}

export default conversations