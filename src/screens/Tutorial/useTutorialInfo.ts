/**
 * @format
 */
import {ITutorialPage} from 'interface';
import {useTranslation} from 'react-i18next';

const useTutorialInfo = () => {
  const {t} = useTranslation();

  const tutorialInfo = t('tutorial.pages', {
    returnObjects: true,
  }) as ITutorialPage[];

  return {
    tutorialInfo,
  };
};

export {useTutorialInfo};
