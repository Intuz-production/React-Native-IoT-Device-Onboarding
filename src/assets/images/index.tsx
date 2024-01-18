import page_en_1 from './page_en_1.png';
import page_en_2 from './page_en_2.png';
import page_en_3 from './page_en_3.png';
import bg_page from './bg_page.png';
import project_logo from './bootsplash_logo.png'
import refreshIcon from './refresh.png'
import passwordHide from './passwordHide.png'
import passwordShow from './passwordShow.png'
import deviceSuccessConnectIcon from './deviceSuccessConnectIcon.png'
import routerIcon from './routerIcon.png'
import connectionError from './connectionError.png';
import connectionFailed from './connectionFailed.png';

const Images = {  
  page_en_1,
  page_en_2,
  page_en_3,
  bg_page,
  project_logo,
  refreshIcon,
  passwordHide,
  passwordShow,
  deviceSuccessConnectIcon,
  routerIcon,
  connectionError,
  connectionFailed,
};

export type ImagesType = keyof typeof Images;

export {Images};
