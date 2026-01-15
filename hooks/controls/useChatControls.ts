import { useEffect } from 'react';
import { useControls, folder } from 'leva';
import { useStyles } from '@/components/context/StylesContext';

export const useChatControls = () => {
    const { styles, patchStyles } = useStyles();

    const chat = styles?.containers?.chat || { wrapper: '', inputForm: '' };

    const [values] = useControls(() => ({
        'Chat Container': folder({
            chatWrapper: { value: chat.wrapper, label: 'Wrapper' },
            chatInput: { value: chat.inputForm, label: 'Input Form' },
        }),
    }), []);

    useEffect(() => {
        const newChatStyles = {
            containers: {
                chat: {
                    wrapper: values.chatWrapper,
                    inputForm: values.chatInput,
                },
            },
        };

        if (JSON.stringify(newChatStyles.containers.chat) !== JSON.stringify(styles?.containers?.chat)) {
            patchStyles(newChatStyles);
        }
    }, [values, patchStyles, styles?.containers?.chat]);
};
