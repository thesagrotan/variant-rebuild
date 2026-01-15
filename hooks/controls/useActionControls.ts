import { useControls, button, folder } from 'leva';
import { useStyles } from '@/components/context/StylesContext';

export const useActionControls = () => {
    const { styles } = useStyles();

    useControls(() => ({
        'Actions': folder({
            'Save Changes': button(async () => {
                // We use the styles from context, which are already synced with Leva via other hooks
                const currentStyles = styles;

                const res = await fetch('/api/styles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(currentStyles),
                });

                if (res.ok) {
                    alert('Styles saved!');
                } else {
                    alert('Failed to save styles.');
                }
            }),
            'Reset Session': button(() => {
                if (confirm('Reset styles to session start? Unsaved changes will be lost.')) {
                    location.reload();
                }
            }),
            'Factory Reset': button(async () => {
                if (confirm('Are you sure you want to restore factory default styles? This cannot be undone.')) {
                    await fetch('/api/styles/reset', { method: 'POST' });
                    location.reload();
                }
            })
        })
    }), [styles]);
};
