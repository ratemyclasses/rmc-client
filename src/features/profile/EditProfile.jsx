/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';

export function EditProfile({ initValues }) {
  const user = useSelector((state) => state.user.user);
  //const dispatch = useDispatch();
  //const [formValues, setFormValues] = useState(initValues);

  // const onSubmit = (values, { setSubmitting }) => {
  //     dispatch(updateUser({ formData: values }));

  // };
  if (!user) {
    return <div> Loading .. </div>;
  }
  return <div>{user.email}</div>;
}
