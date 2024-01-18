import { Images } from '../assets/images';

const en = {
  app: {
    language: {
      en: 'English',
      fr: 'Français',
    },
    terms: 'Terms & Conditions',
    and: ' and ',
    privacy: 'Privacy Policy',
  },
  tutorial: {
    totalPages: 3,
    pages: [
      {
        title: 'Guide',
        image: Images.page_en_1,
        bg: Images.bg_page,
        subTitle: 'The next steps will guide you through connecting your INTUZ Controller to Wireless Network',
      },
      {
        title: 'Strong Wi-fi Signal required',
        image: Images.page_en_2,
        bg: Images.bg_page,
        subTitle: 'Stand where your INTUZ equipment is located and with your mobile device assure that your signal strength to your WIFI network is good to excellent. NOTE: A WEAK SIGNAL WILL CAUSE PROBLEMS!',
      },
      {
        title: 'Powered on?',
        image: Images.page_en_3,
        bg: Images.bg_page,
        subTitle: 'Make Sure the power to INTUZ Controller is turned on. Please make sure the LEDs are lit up.',
      },
      {
        title: 'Connect to Controller',
        image: Images.page_en_3,
        bg: Images.bg_page,
        subTitle: 'Go to your WIFI settings and find the WIFI network starting with INTUZ. Connect to this network. Its password is “password” (all lower case). IMPORTANT: BE SURE YOU ARE CONNECTED TO THIS INTUZ WIFI NETWORK BEFORE CONTINUING!',
      },
    ],
    continue: 'Continue',
    next: 'Next',
    back: 'Back',
    proceed: 'By proceeding you accept our',
  }
};

export { en };
