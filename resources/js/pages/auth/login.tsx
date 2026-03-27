import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    return (
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Log in" />

            <Form {...AuthenticatedSessionController.store.form()} resetOnSuccess={['password']} className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-gray-700 dark:text-gray-600">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-sidebar-primary focus:ring-sidebar-primary"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password" className="text-gray-700 dark:text-gray-600">Password</Label>
                                    {canResetPassword && (
                                        <TextLink 
                                            href={request()} 
                                            className="ml-auto text-sm text-sidebar-primary hover:text-sidebar-primary/80 dark:text-sidebar-primary dark:hover:text-sidebar-primary/80 transition-colors" 
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-sidebar-primary focus:ring-sidebar-primary"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox 
                                    id="remember" 
                                    name="remember" 
                                    tabIndex={3}
                                    className="border-gray-300 dark:border-gray-600 data-[state=checked]:bg-sidebar-primary data-[state=checked]:border-sidebar-primary dark:data-[state=checked]:bg-sidebar-primary dark:data-[state=checked]:border-sidebar-primary"
                                />
                                <Label htmlFor="remember" className="text-gray-700 dark:text-gray-700">Remember me</Label>
                            </div>

                            <Button 
                                type="submit" 
                                className="mt-4 w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-white transition-colors" 
                                tabIndex={4} 
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                Log in
                            </Button>
                        </div>

                        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{' '}
                            <TextLink 
                                href={register()} 
                                tabIndex={5}
                                className="text-sidebar-primary hover:text-sidebar-primary/80 dark:text-sidebar-primary dark:hover:text-sidebar-primary/80 transition-colors font-medium"
                            >
                                Sign up
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}