import { useGlobalControls } from './controls/useGlobalControls';
import { useFrameControls } from './controls/useFrameControls';
import { useNavBarControls } from './controls/useNavBarControls';
import { useChatControls } from './controls/useChatControls';
import { useActionControls } from './controls/useActionControls';

export const useThemeControls = () => {
    useGlobalControls();
    useFrameControls();
    useNavBarControls();
    useChatControls();
    useActionControls();
};
