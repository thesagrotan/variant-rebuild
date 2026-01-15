'use client';

import React from 'react';
import { Leva } from 'leva';
import { useThemeControls } from '../../hooks/useThemeControls';

export const StyleTweaker = () => {
    useThemeControls();

    return <Leva />;
};
