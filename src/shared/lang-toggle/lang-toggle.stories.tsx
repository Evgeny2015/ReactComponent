import '../../i18n/config';
import { Meta, StoryObj } from '@storybook/react';
import LanguageToggle, { LanguageProvider } from './lang-toggle';
import React from 'react';
import { useTranslation } from 'react-i18next';

const meta: Meta<typeof LanguageToggle> = {
    title: 'Components/LanguageToggle',
    component: LanguageToggle,
    argTypes: {
    }
}

export default meta;

const HelloWorld = () => {
    const { t } = useTranslation();
    return (
        <div>
            <p>{t('HelloWorld')}</p>
        </div>
    )
}

export const Main: StoryObj<typeof LanguageToggle> = {
    render: () => (
        <LanguageProvider>
            <HelloWorld/>
            <LanguageToggle />
        </LanguageProvider>),
    args: {

    }
};