import React, { FC, useMemo, useState } from "react"
import { FormikConfig, useFormik } from "formik";
import { Button } from "antd";
import { useNavigate } from "react-router"

import ProfileForm from "src/features/forms/ProfileForm/ProfileForm"
import { ProfileFormErrors, ProfileFormValues } from "src/features/forms/ProfileForm/types";
import { isNotDefinedString } from "src/utils/validation";
import './ProfilePage.css'

const ProfilePage: FC = () => {
  const [profile, setProfile] = useState({ name: '', about: '' })
  const navigate = useNavigate()

  const { onSubmit, validate, initialValues } = useMemo<
    Pick<FormikConfig<ProfileFormValues>, 'onSubmit' | 'validate' | 'initialValues'>
  >(() => {
    return {
      initialValues: {
        name: profile?.name,
        about: profile?.about,
      },
      onSubmit: (values, { setErrors }) => {
        try {
          // Сохранение данных формы
          // value - содержит поля формы

          // Переход на главную страницу
          navigate("/")

        } catch (error) {
          // Ошибка сохранения данных формы
          console.log('save error', error)
        }
      },
      validate: (values) => {
        // Валидация формы
        // value - содержит поля формы
        const errors = {} as ProfileFormErrors;
        if (isNotDefinedString(values.name)) {
          errors.name = 'Обязательное поле'
        }
        return errors;
      },
    };
  }, [profile]);

  const formManager = useFormik<ProfileFormValues>({
    initialValues,
    onSubmit,
    validate,
  });
  const { submitForm, setValues } = formManager;

  return (
    <div className="profile">
      <ProfileForm formManager={formManager} />
      <div>
        <Button type="primary" onClick={submitForm}>
          Сохранить
        </Button>
      </div>
    </div>
  )
}

export default ProfilePage