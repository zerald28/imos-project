import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-transparent text-sidebar-primary-foreground">
                <AppLogoIcon className="size-5 fill-current text-sidebar-primary dark:text-sidebar-primary" />
            </div>
            <div className="flex items-center space-x-3">
                <span className="text-lg font-bold text-green-700 dark:text-green-400">IMOSSF Admin</span>
            </div>
 
        </>
    );
}
