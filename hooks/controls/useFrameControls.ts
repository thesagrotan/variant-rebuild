import { useEffect } from 'react';
import { useControls, folder } from 'leva';
import { useStyles } from '@/components/context/StylesContext';

export const useFrameControls = () => {
    const { styles, patchStyles } = useStyles();

    const frame = styles?.containers?.frame || { tag: '', body: '' };

    const [values] = useControls(() => ({
        'Frame Container': folder({
            frameTag: { value: frame.tag, label: 'Tag Classes' },
            frameBody: { value: frame.body, label: 'Body Classes' },
        }),
    }), []);

    useEffect(() => {
        const newFrameStyles = {
            containers: {
                frame: {
                    tag: values.frameTag,
                    body: values.frameBody,
                },
            },
        };

        if (JSON.stringify(newFrameStyles.containers.frame) !== JSON.stringify(styles?.containers?.frame)) {
            patchStyles(newFrameStyles);
        }
    }, [values, patchStyles, styles?.containers?.frame]);
};
