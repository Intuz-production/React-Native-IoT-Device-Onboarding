/**
 * @format
 */
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';

const initialValues = {ssid: '', pass: '', security: ''};

const useSSIDForm = onSubmit => {
  const {t} = useTranslation();

  const schema = Yup.object().shape({
    ssid: Yup.string().required('Network name is required'),
    pass: Yup.string().test(
      'pass-check',
      'Network password is required',
      function () {
        return this.parent.security !== 0;
      },
    ),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: onSubmit,
  });

  return {formik};
};

export {useSSIDForm};
