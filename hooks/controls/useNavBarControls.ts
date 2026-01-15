import { useEffect } from 'react';
import { useControls, folder } from 'leva';
import { useStyles } from '@/components/context/StylesContext';

export const useNavBarControls = () => {
    const { styles, patchStyles } = useStyles();

    const navBar = styles?.containers?.navBar || { root: '', nav: '', item: '', itemActive: '', itemInactive: '' };

    const [values] = useControls(() => ({
        'NavBar Container': folder({
            navRoot: { value: navBar.root, label: 'Root Classes' },
            navNav: { value: navBar.nav, label: 'Nav Classes' },
            navItem: { value: navBar.item, label: 'Item Classes' },
            navItemActive: { value: navBar.itemActive, label: 'Active Item' },
            navItemInactive: { value: navBar.itemInactive, label: 'Inactive Item' },
        }),
    }), []);

    useEffect(() => {
        const newNavBarStyles = {
            containers: {
                navBar: {
                    root: values.navRoot,
                    nav: values.navNav,
                    item: values.navItem,
                    itemActive: values.navItemActive,
                    itemInactive: values.navItemInactive,
                },
            },
        };

        if (JSON.stringify(newNavBarStyles.containers.navBar) !== JSON.stringify(styles?.containers?.navBar)) {
            patchStyles(newNavBarStyles);
        }
    }, [values, patchStyles, styles?.containers?.navBar]);
};
