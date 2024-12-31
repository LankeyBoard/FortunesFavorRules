import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config'
const fullConfig = resolveConfig(tailwindConfig);

export const isSmallWindow = (windowWidth: number) => {
    return(windowWidth <= Number(fullConfig.theme.screens.sm.slice(0,-2)));
}